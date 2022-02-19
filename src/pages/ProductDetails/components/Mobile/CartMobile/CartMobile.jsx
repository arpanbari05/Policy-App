import styled from "styled-components/macro";
import "styled-components/macro";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
import { amount } from "../../../../../utils/helper";
import {
  useAdditionalDiscount,
  useCart,
  useFrontendBoot,
  useMembers,
  useRider,
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
import CartSummaryModal from "../../../../../components/CartSummaryModal";
import useUrlQuery from "../../../../../customHooks/useUrlQuery";

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
  const cartEntry = getCartEntry(parseInt(groupCode));
  const { total_premium } = cartEntry;
  const cartSummaryModal = useToggle();
  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const url = useUrlQuery();
  const { updateCart } = useCart();
  const [updateCartMutation, query] = updateCart(groupCode);

  const { getNextGroupProduct } = useCart();

  const { getMembersText } = useMembers();

  const nextGroupProduct = getNextGroupProduct(parseInt(groupCode));

  const handleClick = () => {
    updateCartMutation().then(() => {
      if (nextGroupProduct) {
        const enquiryId = url.get("enquiryId");
        history.push({
          pathname: `/productdetails/${nextGroupProduct.group.id}`,
          search: `enquiryId=${enquiryId}`,
        });
        return;
      }

      cartSummaryModal.on();
    });
  };

  const handleContinueClick = () => {
    history.push(getUrlWithEnquirySearch("/proposal"));
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
          <span
            css={`
              font-size: 14px;
            `}
          >
            Next step :{" "}
          </span>
          <span
            css={`
              font-size: 12px;
            `}
          >
            Plan for :{" "}
          </span>
          <span
            css={`
              font-size: 14px;
            `}
          >
            Total Premium{" "}
          </span>
          <span
            css={`
              font-size: 14px;
              font-weight: bold;
              color: ${colors.primary_color};
            `}
          >
            {amount(total_premium)}
          </span>
        </section>
        <Button
          onClick={handleClick}
          disabled={query.isLoading}
          {...props}
          className="rounded"
        >
          {nextGroupProduct && (
            <>
              {"Proceed"}
              {query.isLoading ? <CircleLoader animation="border" /> : null}
            </>
          )}
          {!nextGroupProduct && "Review Your Cart"}
        </Button>
        {cartSummaryModal.isOn && (
          <CartSummaryModal
            onContine={handleContinueClick}
            onClose={cartSummaryModal.off}
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
      <EditMembersButton groupCode={groupCode} />
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
  const cartEntry = getCartEntry(parseInt(groupCode));
  const {
    icLogoSrc,
    plantype,
    sum_insured,
    deductible,
    tenure,
    total_premium,
    product: {
      name,
      company: { alias },
    },
  } = cartEntry;

  const displayPolicyTerm = `${
    tenure + " " + (tenure >= 2 ? "Years" : "Year")
  } `;

  return (
    <PlanCardOuter
      className="d-flex flex-wrap align-items-center justify-content-between"
      {...props}
    >
      <TitleValueRenderer title="Plan Type" value={plantypes[plantype]} />
      <TitleValueRenderer title="Cover" value={amount(sum_insured)} />
      {journeyType === "top_up" ? (
        <TitleValueRenderer title="Deductible" value={amount(deductible)} />
      ) : null}
      <TitleValueRenderer title="Policy term" value={displayPolicyTerm} />
      <TitleValueRenderer title="Premium" value={amount(total_premium)} />
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
  const discountAmount = amount(getDiscountAmount(additionalDiscount));

  return <HorizontalCard title={name} value={discountAmount} {...props} />;
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
