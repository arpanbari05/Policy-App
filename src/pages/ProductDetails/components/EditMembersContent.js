import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
//import { getAge } from "../../QuotesPage/components/EditMembersPopup/Data";
import GreetingFormDropdown from "../../../components/RoundDD2";
// import { updateUser } from "../../GreetingPage/ServiceApi/serviceApi";
// import { updateProposerDetails } from "../../GreetingPage/reducer/greetingPage.slice";
import "styled-components/macro";

// import { getQutoes } from "../../QuotesPage/ServiceApi/serviceApi";
import { useCartProduct } from "../../Cart";
import { mobile } from "../../../utils/mediaQueries";
import { fetchQuotes } from "../../quotePage/quote.slice";
import { getQutoes } from "../../quotePage/serviceApi";
import { updateUser } from "../../InputPage/ServiceApi/serviceApi";
import { updateProposerDetails } from "../../InputPage/greetingPage.slice";
import { getAge } from "../../InputPage/components/data";
import StyledButton from "../../../components/StyledButton";

function useFetchQuotes({ groupCode }) {
  const dispatch = useDispatch();
  const { companies, covers, baseplantypes, plantypes } = useSelector(
    (state) => state.frontendBoot.frontendData.data
  );
  const { multiYear, ...quoteFilters } = useSelector(
    (state) => state.quotePage.filters
  );

  const getCode = (display_name, list) =>
    list.find((item) => item.display_name === display_name)?.code;

  const plan_type = getCode(quoteFilters.planType, plantypes);
  const sum_insured = getCode(quoteFilters.cover, covers);
  const basePlanType = getCode(quoteFilters.basePlanType, baseplantypes);
  const tenure = parseInt(multiYear);
  const member = groupCode;

  const callFetchQuotes = () => {
    console.log("fetchquotes EditMembersCOntent");
    console.log("I executed");
    dispatch(
      fetchQuotes(companies, {
        sum_insured,
        tenure,
        plan_type,
        member,
        basePlanType,
      })
    );
  };
  return {
    callFetchQuotes,
    filtersData: { plan_type, sum_insured, basePlanType, tenure, member },
  };
}

function EditMembersContent({ closePopup = () => {} }) {
  const { groupCode } = useParams();
  const { filtersData } = useFetchQuotes({ groupCode });

  const {
    updateProductRedux,
    product: { group, health_riders, addons },
  } = useCartProduct(groupCode);

  const {
    id: cartId,
    product: {
      id,
      company: { alias },
    },
    sum_insured,
    group: { members: thisGroupMembers },
  } = useSelector((state) => state.cart[groupCode]);

  const {
    data: { members: allMembers },
  } = useSelector((state) => state.frontendBoot.frontendData);

  const {
    proposerDetails: { members: allMembersWithAge },
  } = useSelector((state) => state.greetingPage);

  const checkMember = (member) => {
    if (member.type === "son" || member.code === "son") {
      return (
        thisGroupMembers.includes("son1") || thisGroupMembers.includes("son2")
      );
    } else if (member.type === "daughter" || member.code === "daughter") {
      return (
        thisGroupMembers.includes("daughter1") ||
        thisGroupMembers.includes("daughter2")
      );
    } else return thisGroupMembers.includes(member.type ?? member.code);
  };

  const thisMembersData = allMembers.filter((member) => checkMember(member));

  const thismembersWithAge = allMembersWithAge.filter((member) =>
    checkMember(member)
  );

  const [selectedMembers, setSelectedMembers] = useState(thismembersWithAge);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  //   const showUpdateButton = selectedMembers.some(
  //     selectedMember =>
  //       selectedMember.age !==
  //       thismembersWithAge.find(
  //         thismemberWithAge => thismemberWithAge.type === selectedMember.type,
  //       ).age,
  //   );

  const handleUpdateClick = () => {
    const selectedMembersIncludes = (member) =>
      selectedMembers.some(
        (selectedmember) => selectedmember.type === member.type
      );
    setLoading(true);
    updateUser({
      members: allMembersWithAge
        .filter((member) => !selectedMembersIncludes(member))
        .concat(selectedMembers),
    }).then((response) => {
      getQutoes({
        ...filtersData,
        plan_type: group.plan_type,
        alias,
        base_plan_type: filtersData.basePlanType,
      }).then((res) => {
        const newProduct = res.data.data.find(
          (quote) =>
            quote.product.id === id && quote.sum_insured === sum_insured
        );
        if (newProduct)
          updateProductRedux({
            ...newProduct,
            id: cartId,
            group,
            health_riders,
            addons,
            page: "edit members",
          });
        // updateCartApi({
        //   cartId,
        //   group_id: groupCode,
        //   ...newProduct,
        //   product_id: newProduct.product.id,
        //   service_tax: newProduct.tax_amount,
        //   riders: health_riders,
        //   addons,
        //   features: undefined,
        //   ppmc_age_limit: undefined,
        //   product: undefined,
        //   company_alias: undefined,
        //   tax_amount: undefined,
        // }).then(() => {
        dispatch(updateProposerDetails(response));
        setLoading(false);
        closePopup();
        // });
      });
    });
  };

  return (
    <div
      css={`
        margin-bottom: 70px;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
          ${mobile} {
            flex-direction: column;
          }
        `}
      >
        {thisMembersData.map((memberData) => {
          const selectedMember = selectedMembers.find((member) =>
            member.type.includes(memberData.code)
          );

          const selectedMemberAge = selectedMember.age.includes(".")
            ? selectedMember.age.split(".")[1] +
              `${selectedMember.age.split(".")[1] === 1 ? " month" : " months"}`
            : selectedMember.age;
          return (
            <div
              css={`
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px;
                margin-bottom: 10px;
                width: 47%;
                border: 1px solid #bcc7d7;
                border-radius: 3px;

                & .GreetingDD__Header {
                  margin: 0;
                  ${mobile} {
                    width: 175px;
                  }
                }

                & .GreetingDD__Wrapper {
                  left: 0;
                  top: 0;
                }

                & .GreetingDD__List {
                  left: -2px !important;
                }

                & label {
                  margin: 0;
                  line-height: normal;
                }

                ${mobile} {
                  width: 100%;
                  justify-content: space-between;
                  max-width: 80%;
                  &:not(:last-child) {
                    margin-bottom: 20px;
                  }
                }
              `}
            >
              <div>{memberData.display_name}</div>
              <GreetingFormDropdown
                list={getAge(memberData.min_age, memberData.max_age)}
                selected={selectedMemberAge}
                product_detail={true}
                handleChange={(_, selectedAge) =>
                  setSelectedMembers((selectedMembers) =>
                    selectedMembers.map((member) =>
                      member.type.includes(memberData.code)
                        ? { ...member, age: selectedAge }
                        : member
                    )
                  )
                }
              />
            </div>
          );
        })}
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          bottom: 0;
          left: -4px;
          width: 100%;
          position: absolute;
        `}
      >
        <StyledButton width={"100%"} noIcon onClick={handleUpdateClick}>
          Update
          {loading ? (
            <i
              className="fas fa-circle-notch rotate"
              css={`
                margin-left: 10px;
              `}
            />
          ) : null}
        </StyledButton>
      </div>
    </div>
  );
}

export default EditMembersContent;
