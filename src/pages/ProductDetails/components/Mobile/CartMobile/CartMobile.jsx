import styled from "styled-components/macro";
import "styled-components/macro";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
import {
  amount,
  figureToWords,
  premiumWithAddons,
  getTotalPremiumWithDiscount,
} from "../../../../../utils/helper";
import {
  useAdditionalDiscount,
  useCart,
  useFrontendBoot,
  useMembers,
  useRevisedPremiumModal,
  useRider,
  useRiders,
  useTenureDiscount,
  useTheme,
  useToggle,
  useUpdateGroupMembers,
  useUrlEnquiry,
} from "../../../../../customHooks";
import { Button, CircleLoader, MembersList } from "../../../../../components";
import { mobile, small } from "../../../../../utils/mediaQueries";
import { FaPen } from "react-icons/fa";
import { EditMembersModal } from "../../../../quotePage/components/filters/EditMemberFilter";
import { ErrorMessage } from "../../../../InputPage/components/FormComponents";
import { useHistory, useParams } from "react-router-dom";
import useUrlQuery from "../../../../../customHooks/useUrlQuery";
import ReviewCartPopup from "../../ReviewCardPopup";
import _ from "lodash";
import { RevisedPremiumPopup } from "../../ReviewCart";
import { useDispatch } from "react-redux";
import {
  MemberOptions,
  useMembersForm,
} from "../../../../../components/MemberOptions";
import { setShowEditMembers } from "../../../../quotePage/quote.slice";

const plantypes = {
  M: "Multi Individual",
  I: "Individual",
  F: "Family Floater",
};

const singlePay = id => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = process.env.REACT_APP_API_BASE_URL + "payments";
  form.style.display = "none";
  const input = document.createElement("input");
  input.name = "proposal_id";
  input.value = id;
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

const CartMobile = ({ groupCode, ...props }) => {
  const [toggleCard, setToggleCard] = useState(false);

  const { colors } = useTheme();

  const { getCartEntry } = useCart();

  const reviewCartModalNew = useToggle();

  const url = useUrlQuery();

  const { getNextGroupProduct } = useCart();

  const { journeyType, subJourneyType } = useFrontendBoot();

  const nextGroupProduct = getNextGroupProduct(parseInt(groupCode));

  const enquiryId = url.get("enquiryId");

  const { getSelectedAdditionalDiscounts, getTotalDiscountAmount } =
    useAdditionalDiscount(groupCode);

  const additionalDiscounts = getSelectedAdditionalDiscounts();

  const cartEntry = getCartEntry(groupCode, {
    additionalDiscounts,
  });

  const { addons, netPremiumWithoutDiscount } = cartEntry;

  const total_premium = getTotalPremiumWithDiscount({
    netPremiumWithoutDiscount,
    totalDiscountAmount: getTotalDiscountAmount(),
  });

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  const modifyDetailsNotAllowed =
    cartEntry?.product?.company?.alias === "universal_sompo";

  return (
    <Outer toggleCard={toggleCard}>
      <div className="d-flex align-items-center justify-content-center">
        <StyledButton
          onClick={setToggleCard.bind(null, currentState => !currentState)}
          toggleCard={toggleCard}
        >
          {!toggleCard && <BiChevronUp size="26px" />}
          {toggleCard && <BiChevronDown size="26px" />}
        </StyledButton>
      </div>

      {/*  FIXED AT THE BOTTOM  */}
      <div
        className="d-flex align-items-center justify-content-between"
        css={`
          position: ${toggleCard ? "fixed" : "unset"};
          bottom: 0px;
          width: 100%;
          padding: 0px 10px 10px 10px;
        `}
      >
        <section className="d-flex flex-column align-items-start justify-content-center">
          {nextGroupProduct && (
            <>
              <span
                css={`
                  font-size: 14px;
                  ${small} {
                    font-size: 10px;
                  }
                `}
              >
                Next step :{" "}
              </span>
              <span
                css={`
                  font-size: 12px;
                  ${small} {
                    font-size: 12px;
                    font-weight: 900;
                  }
                `}
              >
                Plan for :{" "}
              </span>
            </>
          )}
          <span
            css={`
              font-size: 14px;
              ${small} {
                font-size: 11px;
                font-weight: 900;
              }
            `}
          >
            Total Premium{" "}
          </span>
          <span
            css={`
              font-size: 14px;
              font-weight: bold;
              color: ${colors.primary_color};
              ${small} {
                font-size: 21px;
              }
            `}
          >
            {isTotalPremiumLoading ? (
              <CircleLoader animation="border" />
            ) : (
              amount(total_premium)
            )}
          </span>
        </section>
        {subJourneyType === "renewal" ? (
          <div
            className="d-flex mt-1"
            css={`
              gap: 0.3em;
              & button {
                flex: 1;
                font-size: 0.79rem;
              }
            `}
          >
            <QuickPayAndRenewButtonMobile groupCode={groupCode} />
            {!modifyDetailsNotAllowed && <ModifyDetailsButtonMobile />}
          </div>
        ) : (
          <ReviewCartButtonMobileNew groupCode={groupCode} />
        )}

        {!nextGroupProduct && reviewCartModalNew.isOn && (
          <ReviewCartPopup
            propsoalPageLink={`/proposal?enquiryId=${enquiryId}`}
            onClose={reviewCartModalNew.off}
          />
        )}
      </div>

      {toggleCard && <CartSection groupCode={groupCode} />}
    </Outer>
  );
};

const Outer = styled.div`
  display: none;
  ${mobile} {
    display: block;
    height: ${({ toggleCard }) => (toggleCard ? "100vh" : "auto")};
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0px;
    box-shadow: rgb(163 163 163 / 50%) 0px 2px 6px 0px;
    z-index: 11;
  }
`;

const StyledButton = styled.button`
  border-radius: 50%;
  height: 27px;
  width: 27px;
  border-radius: 60px;
  background-color: rgb(219, 225, 238);
  position: relative;
  top: ${({ toggleCard }) => (toggleCard ? "0" : "-15px")};
  margin-top: ${({ toggleCard }) => (toggleCard ? "5px" : "0px")};
`;

export default CartMobile;

function ReviewCartButtonMobileNew({ groupCode, ...props }) {
  const history = useHistory();

  const url = useUrlQuery();

  const { updateCart, getCartEntry } = useCart();

  const { query: additionalDiscountsQuery, getTotalDiscountAmount } =
    useAdditionalDiscount(groupCode);

  const [updateCartMutation, query] = updateCart(groupCode);

  const cartEntry = getCartEntry(groupCode);

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  const { getNextGroupProduct } = useCart();

  const nextGroupProduct = getNextGroupProduct(parseInt(groupCode));

  const reviewCartModalNew = useToggle();

  const urlQueryStrings = new URLSearchParams(window.location.search);

  const enquiryId = urlQueryStrings.get("enquiryId");

  const currentGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups")).find(group => group?.id);

  const handleClick = () => {
    const discounted_total_premium = getTotalPremiumWithDiscount({
      netPremiumWithoutDiscount: cartEntry?.netPremiumWithoutDiscount,
      totalDiscountAmount: getTotalDiscountAmount(),
    });

    updateCartMutation({ discounted_total_premium }).then(() => {
      if (nextGroupProduct) {
        const enquiryId = url.get("enquiryId");
        history.push({
          pathname: `/productdetails/${nextGroupProduct.group?.id}`,
          search: `enquiryId=${enquiryId}&pincode=${currentGroup?.pincode}&city=${currentGroup?.city}`,
        });
        return;
      }

      reviewCartModalNew.on();
    });
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        className="w-100"
        loader={!nextGroupProduct && query.isLoading}
        disabled={
          cartEntry.unavailable_message ||
          query.isLoading ||
          additionalDiscountsQuery.isLoading ||
          additionalDiscountsQuery.isFetching ||
          isTotalPremiumLoading
        }
        {...props}
      >
        {"Review Your Cart"}
      </Button>
      {reviewCartModalNew.isOn && (
        <ReviewCartPopup
          propsoalPageLink={`/proposal?enquiryId=${enquiryId}`}
          onClose={reviewCartModalNew.off}
        />
      )}
    </div>
  );
}

const QuickPayAndRenewButtonMobile = ({ groupCode }) => {
  const { getTotalDiscountAmount, query: additionalDiscountsQuery } =
    useAdditionalDiscount(groupCode);

  const { getCartEntry } = useCart();

  const { updateCart } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  const [updateCartMutation, { isLoading }] = updateCart(groupCode);

  const handleClick = () => {
    const discounted_total_premium = getTotalPremiumWithDiscount({
      netPremiumWithoutDiscount: cartEntry?.netPremiumWithoutDiscount,
      totalDiscountAmount: getTotalDiscountAmount(),
    });
    updateCartMutation({
      discounted_total_premium,
      generate_proposal: true,
    }).then(resObj => {
      singlePay(resObj?.data?.data?.proposal_id);
    });
  };

  return (
    <Button
      onClick={handleClick}
      loader={isLoading}
      disabled={
        cartEntry.unavailable_message ||
        isLoading ||
        additionalDiscountsQuery.isLoading ||
        additionalDiscountsQuery.isFetching ||
        isTotalPremiumLoading
      }
    >
      {"Quick pay & Renew"}
    </Button>
  );
};

const ModifyDetailsButtonMobile = () => {
  const history = useHistory();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  return (
    <Button
      onClick={() => {
        history.push(getUrlWithEnquirySearch(`/proposal`));
      }}
    >
      Modify Details
    </Button>
  );
};

const CartSection = ({ groupCode, ...props }) => {
  return (
    <CartSectionOuter {...props}>
      <h1
        css={`
          font-size: 18px;
          font-weight: 900;
          color: rgb(45, 63, 94);
        `}
      >
        Your Cart
      </h1>
      <MemberAndEdit groupCode={groupCode} />
      <PlanCard groupCode={groupCode} />
      <Discounts groupCode={groupCode} />
      <Riders groupCode={groupCode} />
    </CartSectionOuter>
  );
};
const CartSectionOuter = styled.div`
  height: 200px;
  width: 100%;
  padding: 0px 10px 10px 10px;
`;

const MemberAndEdit = ({ groupCode, ...props }) => {
  const { getGroupMembers } = useMembers();
  const currentGroupMembers = getGroupMembers(groupCode);
  return (
    <div
      className="d-flex align-items-center justify-content-between"
      {...props}
    >
      <MembersList members={currentGroupMembers} />
      <EditMembersButton groupCode={groupCode} />
    </div>
  );
};

function EditMembersButton({ groupCode, ...props }) {
  const { colors } = useTheme();

  const dispatch = useDispatch();

  return (
    <div {...props}>
      <Button
        className="rounded-circle"
        css={`
          font-size: 0.837rem;
          width: 2rem;
          height: 2rem;
          background: ${colors.primary_shade};
          color: ${colors.primary_color};
          padding: 0;
        `}
        onClick={() => dispatch(setShowEditMembers(true))}
      >
        <FaPen />
      </Button>
      <EditMembers />
    </div>
  );
}

const StyledErrorMessage = styled(ErrorMessage)`
  font-size: 1rem;
  text-align: center;
`;

function EditMembers({}) {
  const { groupCode } = useParams();

  const revisedPremiumPopupUtilityObject = useRevisedPremiumModal();

  const dispatch = useDispatch();

  const { getGroupMembers } = useMembers();

  const groupMembers = getGroupMembers(groupCode);

  const { getSelectedMembers, ...memberForm } = useMembersForm(groupMembers);

  const {
    updateGroupMembers,
    query: { isLoading, error, isError, data },
  } = useUpdateGroupMembers(groupCode);

  const handleSubmit = () => {
    const members = getSelectedMembers();

    updateGroupMembers(members).then(res => {
      if (res?.error) return;

      dispatch(setShowEditMembers(false));

      revisedPremiumPopupUtilityObject.getUpdatedCart();
    });
  };

  let serverErrors;

  if (isError) serverErrors = Object.values(error?.data?.errors);

  return (
    <>
      <EditMembersModal>
        <div className="p-3">
          <MemberOptions
            showCounter={false}
            {...memberForm}
            selectable={false}
          />
          {serverErrors
            ? serverErrors.map(error => (
                <StyledErrorMessage key={error}>{error}</StyledErrorMessage>
              ))
            : null}
        </div>
        <Button className="w-100" onClick={handleSubmit} loader={isLoading}>
          Update
        </Button>
      </EditMembersModal>

      {revisedPremiumPopupUtilityObject?.isOnProductDetails && (
        <RevisedPremiumPopup
          revisedPremiumPopupUtilityObject={revisedPremiumPopupUtilityObject}
          onClose={revisedPremiumPopupUtilityObject.off}
          title={
            revisedPremiumPopupUtilityObject.getUpdatedCartEntry(groupCode)
              ?.unavailable_message
              ? "Plan Unavailable due to change in date of birth"
              : "Revised Premium due to change in date of birth"
          }
        />
      )}
    </>
  );
}

const PlanCard = ({ groupCode, ...props }) => {
  const { getCartEntry } = useCart();

  const { journeyType } = useFrontendBoot();

  const { getSelectedAdditionalDiscounts } = useAdditionalDiscount(groupCode);

  const additionalDiscounts = getSelectedAdditionalDiscounts();

  const cartEntry = getCartEntry(groupCode, {
    additionalDiscounts,
  });

  const { plantype, sum_insured, deductible, tenure, premium, service_tax } =
    cartEntry;

  const displayPolicyTerm = `${
    tenure + " " + (tenure >= 2 ? "Years" : "Year")
  } `;

  return (
    <PlanCardOuter
      className="d-flex flex-wrap align-items-center g-8"
      {...props}
    >
      <TitleValueRenderer title="Plan Type" value={plantypes[plantype]} />
      <TitleValueRenderer
        title="Cover"
        value={`₹ ${figureToWords(sum_insured)}`}
      />
      {journeyType === "top_up" ? (
        <TitleValueRenderer
          title="Deductible"
          value={`₹ ${figureToWords(deductible)}`}
        />
      ) : null}
      <TitleValueRenderer title="Policy term" value={displayPolicyTerm} />
      <TitleValueRenderer title="Premium" value={amount(premium)} />
      <TitleValueRenderer title="GST" value={amount(service_tax)} />
    </PlanCardOuter>
  );
};
const PlanCardOuter = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: rgb(247, 247, 247);
  padding: 18px;
  border-radius: 8px;
  display: block;
  gap: 10px;
`;

const TitleValueRenderer = ({ title, value }) => {
  return (
    <div
      css={`
        width: 30%;
        height: 50px;
      `}
      className="d-flex flex-column align-items-start justify-content-center"
    >
      <span
        css={`
          font-size: 11px;
          color: rgb(92, 89, 89);
        `}
      >
        {title}
      </span>
      <span
        css={`
          line-height: 14px;
          margin-top: 7px;
          font-weight: 900;
          font-size: 11px;
        `}
      >
        {value}
      </span>
    </div>
  );
};

const Discounts = ({ groupCode, ...props }) => {
  const { colors } = useTheme();

  const { getSelectedAdditionalDiscounts } = useAdditionalDiscount(groupCode);

  const selectedAdditionalDiscounts = getSelectedAdditionalDiscounts();

  if (!selectedAdditionalDiscounts.length) return null;

  return (
    <>
      <h3
        css={`
          color: ${colors.primary_color};
          font-size: 18px;
          font-weight: 900;
          margin-top: 10px;
        `}
      >
        Discounts
      </h3>
      {selectedAdditionalDiscounts.map(additionalDiscount => (
        <DiscountDetails
          additionalDiscount={additionalDiscount}
          groupCode={groupCode}
          key={additionalDiscount.alias}
        />
      ))}
    </>
  );
};

function DiscountDetails({ additionalDiscount, groupCode, ...props }) {
  const { name } = additionalDiscount;

  const { getDiscountAmount } = useAdditionalDiscount(groupCode);

  const discountAmount = getDiscountAmount(additionalDiscount);

  return (
    <HorizontalCard
      title={name}
      value={amount(Math.floor(discountAmount))}
      {...props}
    />
  );
}

const Riders = ({ groupCode, ...props }) => {
  const { getSelectedRiders } = useRider(groupCode);

  const riders = getSelectedRiders();

  const isRiderSelected = riders.length;

  const { colors } = useTheme();
  return (
    <>
      <h3
        css={`
          color: ${colors.primary_color};
          font-size: 18px;
          font-weight: 900;
          margin-top: 10px;
        `}
      >
        Riders
      </h3>

      {!isRiderSelected ? (
        <HorizontalCard title={"No Riders Selected"} />
      ) : (
        riders.map(rider => <RiderDetails rider={rider} key={rider.id} />)
      )}
    </>
  );
};

function RiderDetails({ rider, ...props }) {
  const { name, total_premium } = rider;
  return (
    <HorizontalCard title={name} value={amount(total_premium)} {...props} />
  );
}

const HorizontalCard = ({ title, value, ...props }) => {
  return (
    <div
      {...props}
      className="d-flex align-items-center justify-content-between"
    >
      <span
        css={`
          font-size: 11px;
          color: #555555;
          ${mobile} {
            color: #5c5959;
          }
          ${small} {
            font-size: 10px;
            line-height: 12px;
          }
        `}
      >
        {title}
      </span>
      <span
        css={`
          font-weight: 900;
          font-size: 11px;
          text-align: right;
          ${mobile} {
            text-align: left !important;
            line-height: 14px;
            margin-top: 7px;
          }
          @media (max-width: 400px) {
            font-size: 10px;
          }
        `}
      >
        {value}
      </span>
    </div>
  );
};

function isQueryLoading(query) {
  return _.some([query.isUninitialized, query.isLoading, query.isFetching]);
}

function useTotalPremiumLoader(cartEntry) {
  const { group } = cartEntry;
  const tenureDiscount = useTenureDiscount(group?.id);
  const riders = useRiders({ quote: cartEntry, groupCode: group?.id });

  const isTotalPremiumLoading = _.some([
    isQueryLoading(tenureDiscount.query),
    isQueryLoading(riders.query),
  ]);

  return isTotalPremiumLoading;
}
