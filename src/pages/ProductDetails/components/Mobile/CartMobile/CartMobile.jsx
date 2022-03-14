import styled from "styled-components/macro";
import "styled-components/macro";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
import {
  amount,
  figureToWords,
  getDiscountAmount,
} from "../../../../../utils/helper";
import {
  useAdditionalDiscount,
  useCart,
  useFrontendBoot,
  useMembers,
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
import { useHistory } from "react-router-dom";
import useUrlQuery from "../../../../../customHooks/useUrlQuery";
import CartSummaryModal from "../../../../../components/CartSummaryModal";
import { NewReviewCartPopup } from "../../../../../components/NewReviewCartPopup";
import ReviewCartPopup from "../../ReviewCardPopup";
import _ from "lodash";

const plantypes = {
  M: "Multi Individual",
  I: "Individual",
  F: "Family Floater",
};
const CartMobile = ({ groupCode, ...props }) => {
  const [toggleCard, setToggleCard] = useState(false);

  const { colors } = useTheme();

  const history = useHistory();

  const { getCartEntry } = useCart();

  const reviewCartModalNew = useToggle();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const url = useUrlQuery();

  const { updateCart } = useCart();

  const [updateCartMutation, query] = updateCart(groupCode);

  const { getNextGroupProduct } = useCart();

  const { getMembersText } = useMembers();

  const nextGroupProduct = getNextGroupProduct(parseInt(groupCode));

  const enquiryId = url.get("enquiryId");

  const { getSelectedAdditionalDiscounts, query: additionalDiscountsQuery } =
    useAdditionalDiscount(groupCode);

  const additionalDiscounts = getSelectedAdditionalDiscounts();

  const cartEntry = getCartEntry(groupCode, {
    additionalDiscounts,
  });

  const { netPremium } = cartEntry;

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  const handleClick = () => {
    updateCartMutation({ additionalDiscounts }).then(() => {
      if (nextGroupProduct) {
        history.push({
          pathname: `/productdetails/${nextGroupProduct.group.id}`,
          search: `enquiryId=${enquiryId}`,
        });
        return;
      }

      reviewCartModalNew.on();
    });
  };

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
              amount(netPremium)
            )}
          </span>
        </section>
        <Button
          onClick={handleClick}
          disabled={query.isLoading}
          css={`
            color: ${query.isLoading ? "black" : "white"};
          `}
          {...props}
          className="rounded"
        >
          {additionalDiscountsQuery.isLoading ||
          additionalDiscountsQuery.isFetching ? (
            <CircleLoader animation="border" />
          ) : (
            <>
              {nextGroupProduct && (
                <>
                  {"Proceed"}
                  {query.isLoading ? <CircleLoader animation="border" /> : null}
                </>
              )}
              {!nextGroupProduct && "Review Your Cart"}
              {query.isLoading && !nextGroupProduct && (
                <CircleLoader animation="border" />
              )}
            </>
          )}
        </Button>
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
      {/* <EditMembersButton groupCode={groupCode} /> */}
    </div>
  );
};

function EditMembersButton({ groupCode, ...props }) {
  const { colors } = useTheme();

  const [showEditMembersModal, setShowEditMembersModal] = useState(false);

  const handleClick = () => {
    setShowEditMembersModal(true);
  };

  const closeEditMembersModal = () => setShowEditMembersModal(false);

  const {
    updateGroupMembers,
    query: { isLoading, error, isError },
  } = useUpdateGroupMembers(groupCode);

  const handleSubmit = data => {
    updateGroupMembers(data.members).then(res => {
      if (res.error) return;
      closeEditMembersModal();
    });
  };

  let serverErrors;

  if (isError) serverErrors = Object.values(error.data.errors);

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
        onClick={handleClick}
      >
        <FaPen />
      </Button>
      {showEditMembersModal && (
        <EditMembersModal
          onClose={closeEditMembersModal}
          onSubmit={handleSubmit}
          groupCode={groupCode}
        >
          {serverErrors
            ? serverErrors.map(error => (
                <StyledErrorMessage key={error}>{error}</StyledErrorMessage>
              ))
            : null}
        </EditMembersModal>
      )}
    </div>
  );
}

const StyledErrorMessage = styled(ErrorMessage)`
  font-size: 1rem;
  text-align: center;
`;

function EditMembers({ groupCode, ...props }) {}

const PlanCard = ({ groupCode, ...props }) => {
  const { getCartEntry } = useCart();

  const { journeyType } = useFrontendBoot();

  const { getSelectedAdditionalDiscounts } = useAdditionalDiscount(groupCode);

  const additionalDiscounts = getSelectedAdditionalDiscounts();

  const cartEntry = getCartEntry(groupCode, {
    additionalDiscounts,
  });

  const { plantype, sum_insured, deductible, tenure, netPremium } = cartEntry;

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  const displayPolicyTerm = `${
    tenure + " " + (tenure >= 2 ? "Years" : "Year")
  } `;

  return (
    <PlanCardOuter
      className="d-flex flex-wrap align-items-center justify-content-between"
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
      <TitleValueRenderer
        title="Premium"
        value={
          isTotalPremiumLoading ? (
            <CircleLoader animation="border" />
          ) : (
            amount(netPremium)
          )
        }
      />
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

  console.log("the selectedAdditionalDiscounts", selectedAdditionalDiscounts);

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

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const discountAmount = getDiscountAmount(additionalDiscount, cartEntry);

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
  const tenureDiscount = useTenureDiscount(group.id);
  const riders = useRiders({ quote: cartEntry, groupCode: group.id });

  const isTotalPremiumLoading = _.some([
    isQueryLoading(tenureDiscount.query),
    isQueryLoading(riders.query),
  ]);

  return isTotalPremiumLoading;
}
