import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useCartProduct } from "../../Cart";
import styled from "styled-components/macro";
import care_health from "../../../assets/logos/Care.png";
import { useSelector, useDispatch } from "react-redux";
import Pencil from "../../../assets/images/pencil_pink.png";
import {
  selectAdditionalDiscounts,
  setexpandMobile,
} from "../productDetails.slice";
import { useEffect, useMemo, useState } from "react";
import ReviewCartPopup from "./ReviewCardPopup";
// import EditMembersPopup from "../../QuotesPage/components/EditMembersPopup/EditMembersPopup";
import EditMembersContent from "./EditMembersContent";
import { mobile, small } from "../../../utils/mediaQueries";
import CardModal from "../../../components/Common/Modal/CardModal";
import { EditMembersModal } from "../../quotePage/components/filters/EditMemberFilter";
import {
  amount,
  figureToWords,
  getDiscountAmount,
} from "../../../utils/helper";
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
} from "../../../customHooks";
import {
  Button,
  CircleLoader,
  CloseButton,
  MembersList,
} from "../../../components";
import { FaChevronRight, FaPen } from "react-icons/fa";
import useUrlQuery from "../../../customHooks/useUrlQuery";
import { ErrorMessage } from "../../InputPage/components/FormComponents";
import { NewReviewCartPopup } from "../../../components/NewReviewCartPopup";
import {
  MemberOptions,
  useMembersForm,
} from "../../../components/MemberOptions";
import { Modal } from "react-bootstrap";
import { api, useGetEnquiriesQuery } from "../../../api/api";
import _ from "lodash";

const plantypes = {
  M: "Multi Individual",
  I: "Individual",
  F: "Family Floater",
};

export function CartDetails({ groupCode, ...props }) {
  const { colors } = useTheme();

  const { journeyType } = useFrontendBoot();

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const { unavailable_message } = cartEntry;

  return (
    <CartDetailsWrap {...props}>
      <div className="d-flex flex-column justify-content-between position-relative">
        <div
          className="rounded-circle position-absolute"
          css={`
            width: 6.3em;
            height: 6.3em;
            background: ${colors.primary_shade};
            top: -59px;
            left: -56px;
            z-index: -1;
          `}
        />
        <h1
          className="m-0"
          css={`
            font-size: 1.261rem;
            font-weight: 900;
            color: #2d3f5e;
          `}
        >
          Your Cart
        </h1>
        <Members groupCode={groupCode} />
      </div>

      <div>
        <BasePlanDetails
          groupCode={groupCode}
          isUnavailable={unavailable_message}
        />
        {unavailable_message ? (
          <UnavailableMessage message={unavailable_message} />
        ) : (
          <div>
            <RidersList groupCode={groupCode} />
            <DiscountsList groupCode={groupCode} />
            <TotalPremium groupCode={groupCode} />{" "}
          </div>
        )}
        {journeyType === "renewal" ? (
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
            <Button>{"Quick Pay & Renew"}</Button>
            <Button>Modify Details</Button>
          </div>
        ) : (
          <ReviewCartButtonNew groupCode={groupCode} />
        )}
      </div>
    </CartDetailsWrap>
  );
}

function UnavailableMessage({ message = "" }) {
  const { colors } = useTheme();
  return (
    <div
      className="p-3 my-3"
      css={`
        background-color: ${colors.secondary_shade};
        color: #666;
        font-size: 0.79rem;
      `}
    >
      {message}
    </div>
  );
}

const CartDetailsWrap = styled.div`
  position: sticky;
  top: 110px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 hsl(0deg 0% 64% / 50%);
  padding: 10px;
  padding-top: 18px;
  border-radius: 2px;
  color: #000;
  overflow: hidden;
`;

function CartSection({ title = "", children, ...props }) {
  const { colors } = useTheme();
  return (
    <div
      className="pt-2 mb-2"
      css={`
        border-top: 1px solid #ddd;
      `}
      {...props}
    >
      <h2
        className="mb-2"
        css={`
          color: ${colors.primary_color};
          font-size: 0.83rem;
        `}
      >
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

function DiscountsList({ groupCode, ...props }) {
  const { getSelectedAdditionalDiscounts } = useAdditionalDiscount(groupCode);

  const selectedAdditionalDiscounts = getSelectedAdditionalDiscounts();

  if (!selectedAdditionalDiscounts.length) return null;

  return (
    <CartSection title="Discounts" {...props}>
      {selectedAdditionalDiscounts.map(additionalDiscount => (
        <DiscountDetails
          additionalDiscount={additionalDiscount}
          groupCode={groupCode}
          key={additionalDiscount.alias}
        />
      ))}
    </CartSection>
  );
}

function DiscountDetails({ additionalDiscount, groupCode, ...props }) {
  const { name } = additionalDiscount;
  // const { getDiscountAmount } = useAdditionalDiscount(groupCode);
  // const discountAmount = amount(getDiscountAmount(additionalDiscount));

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const discountAmount = getDiscountAmount(additionalDiscount, cartEntry);

  return (
    <CartDetailRow title={name} value={amount(discountAmount)} {...props} />
  );
}

function RidersList({ groupCode, ...props }) {
  const { getSelectedRiders } = useRider(groupCode);

  const riders = getSelectedRiders();

  const isRidersSelected = riders.length;

  return (
    <CartSection title="Riders" {...props}>
      {!isRidersSelected ? (
        <CartDetailRow title={"No Riders Selected"} />
      ) : (
        riders.map(rider => <RiderDetails rider={rider} key={rider.id} />)
      )}
    </CartSection>
  );
}

function RiderDetails({ rider, ...props }) {
  const { name, total_premium } = rider;
  return (
    <CartDetailRow title={name} value={amount(total_premium)} {...props} />
  );
}

function Members({ groupCode, editable = true, ...props }) {
  const { getGroupMembers } = useMembers();
  const currentGroupMembers = getGroupMembers(groupCode);

  return (
    <div
      className="d-flex align-items-center justify-content-between w-100"
      {...props}
    >
      <MembersList
        members={currentGroupMembers}
        css={`
          color: #616161;
          font-size: 0.763rem;
        `}
      />
      {editable ? <EditMembersButton groupCode={groupCode} /> : null}
    </div>
  );
}

function getCartEntryFromUpdateResult(updateResultData, groupCode) {
  const cartEntry = updateResultData.getCartResult.data.find(
    cartEntry => +cartEntry.group.id === +groupCode,
  );

  return cartEntry;
}

function EditMembersButton({ groupCode, ...props }) {
  const { colors } = useTheme();

  const modalToggle = useToggle(false);

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
        onClick={modalToggle.on}
      >
        <FaPen />
      </Button>
      {modalToggle.isOn && <EditMembers onClose={modalToggle.off} />}
    </div>
  );
}

function EditMembers({ onClose }) {
  const { colors } = useTheme();

  const { groupCode } = useParams();

  const {
    data: {
      data: { name },
    },
  } = useGetEnquiriesQuery();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const firstName = name.split(" ")[0];

  const { getCartEntry } = useCart();

  const currentCartEntry = useMemo(() => getCartEntry(groupCode), []);

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
      if (res.error) return;
      dispatch(
        api.util.invalidateTags([
          "Cart",
          "Rider",
          "AdditionalDiscount",
          "TenureDiscount",
        ]),
      );
      const updatedCartEntry = getCartEntryFromUpdateResult(
        res.data,
        groupCode,
      );
      if (updatedCartEntry.total_premium === currentCartEntry.total_premium)
        onClose && onClose();
    });
  };

  let serverErrors;

  if (isError) serverErrors = Object.values(error.data.errors);

  if (data) {
    const { unavailable_message, ...updatedCartEntry } =
      getCartEntryFromUpdateResult(data, groupCode);
    const handleCloseClick = () => {
      onClose && onClose();
    };
    return (
      <Modal
        show
        onHide={onClose}
        css={`
          & .modal-dialog {
            max-width: 600px;
          }
        `}
      >
        <div className="p-3 position-relative">
          <div
            className="position-absolute"
            css={`
              height: 2em;
              width: 0.37em;
              background-color: ${colors.primary_color};
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              border-radius: 1em;
            `}
          />
          <h1
            css={`
              font-weight: 900;
              font-size: 1.27rem;
            `}
          >
            Hi <span className="text-capitalize">{firstName}, </span>
            {unavailable_message
              ? "Plan Unavailable due to change in date of birth"
              : "Revised Premium due to change in date of birth"}
          </h1>
        </div>

        <div className="p-3 pt-0">
          <Members groupCode={groupCode} editable={false} />
          <BasePlanDetails
            groupCode={groupCode}
            isUnavailable={unavailable_message}
            revisedPremium
          />
          {!unavailable_message ? (
            <div>
              <CartDetailRow
                title="Premium"
                value={
                  <span
                    css={`
                      text-decoration: line-through;
                    `}
                  >
                    {amount(currentCartEntry.total_premium)}
                  </span>
                }
              />
              <CartDetailRow
                title={
                  <span
                    css={`
                      color: ${colors.secondary_color};
                    `}
                  >
                    Revised Premium
                  </span>
                }
                value={amount(updatedCartEntry.total_premium)}
              />
            </div>
          ) : null}
          {unavailable_message ? (
            <UnavailableMessage message={unavailable_message} />
          ) : (
            <div>
              <RidersList groupCode={groupCode} />
              <DiscountsList groupCode={groupCode} />
            </div>
          )}
        </div>
        <div
          className="p-3 pt-0 d-flex justify-content-center"
          css={`
            gap: 1em;
          `}
        >
          <Button className="w-50" onClick={handleCloseClick}>
            Close
          </Button>
          <Link
            to={getUrlWithEnquirySearch(`/quotes/${groupCode}`)}
            className="w-50 d-flex align-items-center justify-content-center"
            css={`
              background-color: ${colors.primary_color};
              &,
              &:hover {
                color: #fff;
              }
            `}
          >
            View Quotes <FaChevronRight />
          </Link>
        </div>
      </Modal>
    );
  }

  return (
    <EditMembersModal onClose={onClose}>
      <div className="p-3">
        <MemberOptions {...memberForm} selectable={false} />
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
  );
}

const StyledErrorMessage = styled(ErrorMessage)`
  font-size: 1rem;
  text-align: center;
`;

function BasePlanDetails({
  groupCode,
  isUnavailable = false,
  revisedPremium = false,
  ...props
}) {
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
    <div className="d-flex justify-content-between flex-column mb-2" {...props}>
      <div
        className="d-flex align-items-center mt-2"
        css={`
          gap: 1em;
        `}
      >
        <div className="d-flex align-items-center">
          <img
            css={`
              height: 45px;
            `}
            src={icLogoSrc}
            alt={alias}
          />
        </div>
        <div>{name}</div>
      </div>
      {!isUnavailable ? (
        <div className="mt-2">
          <CartDetailRow title="Plan Type" value={plantypes[plantype]} />
          {journeyType === "top_up" ? (
            <CartDetailRow
              title="Deductible"
              value={`₹ ${figureToWords(deductible)}`}
            />
          ) : null}
          <CartDetailRow
            title="Cover"
            value={`₹ ${figureToWords(sum_insured)}`}
          />
          <CartDetailRow title="Policy Term" value={displayPolicyTerm} />
          {!revisedPremium ? (
            <CartDetailRow
              title="Premium"
              value={
                <span
                  css={`
                    text-decoration: ${revisedPremium
                      ? "line-through"
                      : "none"};
                  `}
                >
                  {amount(total_premium)}
                </span>
              }
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function TotalPremium({ groupCode, ...props }) {
  const { getCartEntry } = useCart();

  const { getSelectedAdditionalDiscounts } = useAdditionalDiscount(groupCode);

  const additionalDiscounts = getSelectedAdditionalDiscounts();

  const cartEntry = getCartEntry(groupCode, {
    additionalDiscounts,
  });

  const { netPremium, tenure } = cartEntry;

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  const displayNetPremium = `${amount(netPremium)} / ${
    tenure === 1 ? "Year" : `${tenure} Years`
  }`;

  return (
    <div
      className="d-flex align-items-center justify-content-between p-3"
      css={`
        font-size: 0.83rem;
        background-color: #f7f7f7;
        font-weight: 900;
      `}
      {...props}
    >
      <div
        css={`
          color: #6d798f;
        `}
      >
        Total Premium <br />
        <small>*Inc. GST</small>
      </div>
      <div
        css={`
          color: var(--abc-red);
          font-size: 17px;
        `}
      >
        {isTotalPremiumLoading ? (
          <CircleLoader animation="border" />
        ) : (
          displayNetPremium
        )}
      </div>
    </div>
  );
}

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

function ReviewCartButtonNew({ groupCode, ...props }) {
  const history = useHistory();
  const url = useUrlQuery();
  const { updateCart, getCartEntry } = useCart();

  const { getSelectedAdditionalDiscounts, query: additionalDiscountsQuery } =
    useAdditionalDiscount(groupCode);

  const additionalDiscounts = getSelectedAdditionalDiscounts();

  const [updateCartMutation, query] = updateCart(groupCode);

  const cartEntry = getCartEntry(groupCode);

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  const { getNextGroupProduct } = useCart();

  const reviewCartModalNew = useToggle();

  const { getMembersText } = useMembers();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const nextGroupProduct = getNextGroupProduct(parseInt(groupCode));

  const urlQueryStrings = new URLSearchParams(window.location.search);

  const enquiryId = urlQueryStrings.get("enquiryId");

  const handleClick = () => {
    updateCartMutation({ additionalDiscounts }).then(() => {
      if (nextGroupProduct) {
        const enquiryId = url.get("enquiryId");
        history.push({
          pathname: `/productdetails/${nextGroupProduct.group.id}`,
          search: `enquiryId=${enquiryId}`,
        });
        return;
      }

      reviewCartModalNew.on();
    });
  };

  const handleContinueClick = () => {
    history.push(getUrlWithEnquirySearch("/proposal"));
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
        {nextGroupProduct ? (
          <div className="d-flex justify-content-between align-items-center">
            <div
              css={`
                font-size: 0.79rem;
                text-align: left;
              `}
            >
              <div>Next Step:</div>
              <div>Plan for {getMembersText(nextGroupProduct.group)}</div>
            </div>
            <div>
              Proceed{" "}
              {query.isLoading ? <CircleLoader animation="border" /> : null}
            </div>
          </div>
        ) : (
          "Review Your Cart"
        )}
      </Button>
      {reviewCartModalNew.isOn && (
        <ReviewCartPopup
          propsoalPageLink={`/proposal?enquiryId=${enquiryId}`}
          onClose={reviewCartModalNew.off}
        />

        // <NewReviewCartPopup
        //   onContine={handleContinueClick}
        //   onClose={reviewCartModalNew.off}
        // />
      )}
    </div>
  );
}

function CartDetailRow({ title, value }) {
  return (
    <div
      css={`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
        width: 100%;
        ${mobile} {
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }
      `}
    >
      <div
        css={`
          font-size: 11px;
          color: #555555;
          /* width: 70%; */
          ${mobile} {
            color: #5c5959;
          }

          ${small} {
            font-size: 10px;
            line-height: 12px;

            width: 100%;
          }
        `}
      >
        {title}
      </div>
      <div
        css={`
          font-weight: 900;
          font-size: 11px;
          min-width: 80px;
          text-align: right;
          @media (max-width: 768px) {
            text-align: left !important;

            line-height: 14px;
            margin-top: 7px;
            width: 100%;
          }
          @media (max-width: 400px) {
            font-size: 10px;
          }
        `}
      >
        {value}
      </div>
    </div>
  );
}

function AddOnDetailsRow({ addOn }) {
  const { product, total_premium, members } = addOn;
  const companies = useSelector(
    state => state.frontendBoot.frontendData.data.companies,
  );
  const { logo } = companies[product.company.alias];
  const totalPremium = amount(total_premium);
  const { groupCode } = useParams();
  const { product: cartProduct, updateProductRedux } =
    useCartProduct(groupCode);
  const removeAddOn = addOnId => {
    updateProductRedux({
      ...cartProduct,
      addons: cartProduct.addons.filter(addon => addon.product.id !== addOnId),
    });
  };
  const handleRemoveAddOnClick = () => {
    removeAddOn(product.id);
  };
  const logoTitle = (
    <div
      css={`
        display: flex;
        align-items: center;
      `}
    >
      <div
        css={`
          width: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 25px;
        `}
      >
        <img
          css={`
            width: 100%;
            /* margin-bottom: 5px; */
          `}
          src={product.company.alias === "care_health" ? care_health : logo}
          alt={product.company.alias}
        />
      </div>
      <span
        css={`
          font-size: 11px;
          font-weight: 400;
          width: 100%;
          padding: 0px 5px;
          display: flex;
          align-items: center;
        `}
      >
        {`${product.name} ${
          members.filter(member => member !== "all").length
            ? `(${members})`
            : ""
        }`}
      </span>
    </div>
  );
  return (
    <CartDetailRow
      title={logoTitle}
      value={
        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: flex-end;
          `}
        >
          <span
            css={`
              text-align: right;
            `}
          >
            {totalPremium}
          </span>
          {/* <span
            css={`
              margin-left: 20px;
              font-size: 11px;
              color: #8b9ab0;
              background: #c2d0d973;
              width: 25px;
              height: 25px;
              border-radius: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
            onClick={handleRemoveAddOnClick}
          >
            <i class="fas fa-times"></i>
          </span> */}
        </div>
      }
    />
  );
}

export function BackgroundBorderTitle({ title, ...props }) {
  const { colors } = useTheme();

  return (
    <div
      {...props}
      css={`
        position: relative;
        width: 100%;
        margin-top: 2px;

        color: ${colors.primary_color};
      `}
    >
      <div
        css={`
          font-size: 13px;
          font-weight: 900;
        `}
      >
        {title}
      </div>
    </div>
  );
}

function useReviewCartButton({ groupCode }) {
  const [reviewCartPopup, setReviewCartPopup] = useState(false);

  const cart = useSelector(state => state.cart);

  const memberGroups = useSelector(state => state.greetingPage.memberGroups);

  const memberGroupsList = Object.keys(memberGroups);

  const nextGroup = memberGroupsList[memberGroupsList.indexOf(groupCode) + 1];

  const hasNextGroupProduct = cart[nextGroup];

  const {
    product,
    totalPremium,
    updateProduct: addProduct,
    isCartProductLoading,
  } = useCartProduct(groupCode);

  const {
    sum_insured,
    tenure,
    total_premium,
    premium,
    health_riders,
    addons,
    group,
  } = product;

  const membersList = group.members;

  const coverAmount = amount(sum_insured);

  const premiumAmount = amount(total_premium || premium);

  const totalPremiumAmount = amount(totalPremium);

  const urlQueryStrings = new URLSearchParams(window.location.search);

  const enquiryId = urlQueryStrings.get("enquiryId");

  const getNextLink = () => {
    if (!hasNextGroupProduct) return `/proposal?enquiryId=${enquiryId}`;
    return `/productdetails/${nextGroup}?enquiryId=${enquiryId}`;
  };

  const history = useHistory();

  const handleProceedClick = () => {
    addProduct(product).then(status => {
      if (status) history.push(getNextLink());
    });
  };

  const handleReviewCartClick = () => {
    addProduct(product).then(status => {
      if (status) setReviewCartPopup(true);
    });
  };

  const handleReviewPopupClose = () => {
    setReviewCartPopup(false);
  };

  return {
    handleReviewCartClick,
    hasNextGroupProduct,
    memberGroups,
    nextGroup,
    isCartProductLoading,
    handleProceedClick,
    reviewCartPopup,
    enquiryId,
    handleReviewPopupClose,
  };
}

function Discounts({ discounts = [], premium }) {
  const additionalDiscounts = useSelector(selectAdditionalDiscounts);
  const findAdditionalDiscount = discountAlias =>
    additionalDiscounts.find(discount => discount.alias === discountAlias);
  return discounts.length > 0 ? (
    <>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          /* padding: 5px 0px; */
          border-bottom: 1px solid #ddd;
          flex-direction: column;
          /* padding-left: 12px; */
        `}
      >
        <div
          css={`
            width: 30%;
            max-width: 80px;
          `}
        >
          <BackgroundBorderTitle title="Discounts" />
        </div>
        <div
          css={`
            font-size: 11px;
            color: #555555;
            /* padding-left: 12px; */
            margin-top: 7px;
            width: 100%;
          `}
        >
          {discounts.map(discountAlias => {
            const discount = findAdditionalDiscount(discountAlias);
            return (
              <>
                <div
                  css={`
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    margin-bottom: 4px;
                  `}
                >
                  <span>{discount?.name}</span>
                  <span
                    css={`
                      font-weight: 900;
                      font-size: 11px;
                      min-width: 100px;
                      text-align: right;
                      color: black;
                    `}
                  >
                    - ₹ {(premium / 100) * discount?.percent}
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  ) : null;
}

const ReviewCart = ({ groupCode, unEditable }) => {
  const [reviewCartPopup, setReviewCartPopup] = useState(false);

  const cart = useSelector(state => state.cart);
  const displayPlanType_code = useSelector(
    state => state.quotePage.filters.planType,
  );
  const existingPlanType = useSelector(
    state => state.quotePage.filters.planType,
  );

  const displayPlanType =
    displayPlanType_code === "M"
      ? "Multi Individual"
      : displayPlanType_code === "I"
      ? "Individual"
      : displayPlanType_code === "F"
      ? "Family Floater"
      : existingPlanType;

  const memberGroups = useSelector(state => state.greetingPage.memberGroups);

  const memberGroupsList = Object.keys(memberGroups);

  const nextGroup = memberGroupsList[memberGroupsList.indexOf(groupCode) + 1];

  const hasNextGroupProduct = cart[nextGroup];

  const { companies } = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data,
  );

  const {
    product,
    totalPremium,
    updateProduct: addProduct,
    isCartProductLoading,
  } = useCartProduct(groupCode);

  const {
    product: {
      name: productName,
      company: { alias: companyAlias },
    },
  } = product;

  const logoSrc = companies[companyAlias].logo;

  const {
    sum_insured,
    tenure,
    total_premium,
    premium,
    health_riders,
    addons,
    group,
    discounts,
  } = product;

  const planType = memberGroups[groupCode]?.length;

  const membersList = group?.members;

  const coverAmount = amount(sum_insured);

  const premiumAmount = amount(total_premium || premium);

  const totalPremiumAmount = amount(totalPremium);

  const urlQueryStrings = new URLSearchParams(window.location.search);

  const enquiryId = urlQueryStrings.get("enquiryId");

  const getNextLink = () => {
    if (!hasNextGroupProduct) return `/proposal?enquiryId=${enquiryId}`;
    return `/productdetails/${nextGroup}?enquiryId=${enquiryId}`;
  };

  const history = useHistory();

  const handleProceedClick = () => {
    addProduct(product).then(status => {
      if (status) history.push(getNextLink());
    });
  };

  const handleReviewCartClick = () => {
    addProduct(product).then(status => {
      if (status) setReviewCartPopup(true);
    });
  };

  const handleReviewPopupClose = () => {
    setReviewCartPopup(false);
  };

  const [showEditMembers, setShowEditMembers] = useState(false);

  const DetailsListMobile = () => (
    <div
      css={`
        display: none;
        ${mobile} {
          margin-top: 10px;
          background-color: #f7f7f7;
          padding: 18px;
          border-radius: 8px;
          display: block;
        }
      `}
    >
      <div
        css={`
          display: flex;
        `}
      >
        <CartDetailRow title="Plan Type" value={existingPlanType} />
        <CartDetailRow title="Cover" value={figureToWords(coverAmount)} />
        <CartDetailRow
          title="Policy Term"
          value={`${tenure + " " + (tenure >= 2 ? "Years" : "Year")} `}
        />
      </div>
      <div
        css={`
          display: flex;
          margin-top: 10px;
        `}
      >
        <CartDetailRow title="Premium" value={premiumAmount} />
      </div>
    </div>
  );

  const AddOnInfoMobile = ({ title, value }) => (
    <div
      css={`
        display: flex;
        justify-content: space-between;
      `}
    >
      <span
        css={`
          font-size: 14px;
          color: #5c5959;
          margin-left: 43px;
          @media (max-width: 767px) {
            margin-left: unset;
          }
          ${small} {
            font-size: 12px;
          }
        `}
      >
        {title}
      </span>
      <span
        css={`
          ${small} {
            font-size: 12px;
            font-weight: 900;
          }
        `}
      >
        {value}
      </span>
    </div>
  );

  const AddOnDetailMobile = ({ addOn }) => {
    const companies = useSelector(
      state => state.frontendBoot.frontendData.data.companies,
    );
    const logoSrc = companies[addOn.product.company.alias].logo;
    return (
      <div
        css={`
          margin-top: 10px;
        `}
      >
        <div
          css={`
            display: flex;
          `}
        >
          <div
            css={`
              max-width: 37px;
            `}
          >
            <img
              css={`
                width: 100%;
                margin-bottom: 5px;
              `}
              src={logoSrc}
              alt={addOn.product.company.alias}
            />
          </div>
          <span
            css={`
              font-size: 14px;
              margin-left: 6px;

              ${small} {
                font-size: 13px;
                line-height: 16px;
                font-weight: 900;
              }
            `}
          >
            {addOn.product.name}
          </span>
        </div>
        <AddOnInfoMobile
          title="Cover Amount"
          value={amount(addOn.sum_insured)}
        />
        <AddOnInfoMobile title="Premium" value={amount(addOn.total_premium)} />
      </div>
    );
  };

  const AddOnsCoversListMobile = () => {
    return (
      <div>
        <h3
          css={`
            color: #0a87ff;
            font-size: 18px;
            font-weight: 900;
            margin-top: 10px;

            ${small} {
              font-size: 15px;
              line-height: 18px;
            }
          `}
        >
          Addon Covers
        </h3>

        {addons.map(addon => (
          <AddOnDetailMobile addOn={addon} />
        ))}
      </div>
    );
  };

  const RiderMobile = ({ rider }) => {
    const { name, premium } = rider;
    return (
      <>
        <div className="d-flex justify-content-between">
          <span
            css={`
              font-size: 14px;
              color: #5c5959;
              margin-left: 43px;
              @media (max-width: 767px) {
                margin-left: unset;
              }
              @media (max-width: 537px) {
                font-size: 12px !important;
              }
            `}
          >
            {name}
          </span>
          <span
            css={`
              @media (max-width: 537px) {
                font-size: 12px;
                font-weight: 900;
              }
            `}
          >
            ₹ {premium}
          </span>
        </div>
      </>
    );
  };

  const RidersListMobile = () => {
    return (
      <div>
        <h3
          css={`
            color: #0a87ff;
            font-size: 18px;
            font-weight: 900;
            margin-top: 10px;

            ${small} {
              font-size: 15px;
              line-height: 18px;
            }
          `}
        >
          Riders
        </h3>

        {health_riders.map(rider => (
          <RiderMobile rider={rider} />
        ))}
      </div>
    );
  };

  const DiscountsMobile = ({ discounts, premium }) => {
    const additionalDiscounts = useSelector(selectAdditionalDiscounts);
    const findAdditionalDiscount = discountAlias =>
      additionalDiscounts.find(discount => discount.alias === discountAlias);
    console.log(discounts, "discount");
    return (
      <>
        <div>
          <h3
            css={`
              color: #0a87ff;
              font-size: 18px;
              font-weight: 900;
              margin-top: 10px;

              ${small} {
                font-size: 15px;
                line-height: 18px;
              }
            `}
          >
            Discount
          </h3>

          {discounts.map(discountAlias => {
            const discount = findAdditionalDiscount(discountAlias);
            return (
              <div className="d-flex justify-content-between">
                <span
                  css={`
                    font-size: 14px;
                    color: #5c5959;
                    margin-left: 43px;
                    @media (max-width: 767px) {
                      margin-left: unset;
                    }
                    @media (max-width: 537px) {
                      font-size: 12px !important;
                    }
                  `}
                >
                  {discount?.name}
                </span>
                <span
                  css={`
                    @media (max-width: 537px) {
                      font-size: 12px;
                      font-weight: 900;
                    }
                  `}
                >
                  - ₹ {(premium / 100) * discount?.percent}
                </span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const expand = useSelector(({ productPage }) => productPage.expandMobile);
  const dispatch = useDispatch();
  const setExpand = () => dispatch(setexpandMobile(!expand));
  const { theme } = useSelector(state => state.frontendBoot);
  const { riders_visibilty, addons_visibilty } = useSelector(
    state => state.frontendBoot.frontendData.data.settings,
  );

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  // const [expand, setExpand] = useState(false);

  return (
    <>
      <div
        css={`
          position: sticky;
          top: 110px;
          background-color: #fff;
          box-shadow: 0 2px 6px 0 hsl(0deg 0% 64% / 50%);
          padding: 10px;
          padding-top: 18px;
          padding-bottom: ${hasNextGroupProduct ? "25px" : "10px"};
          /* padding-bottom: 20px; */
          border-radius: 2px;
          color: #000;
          overflow: hidden;
          ${mobile} {
            width: 100%;

            height: ${expand ? "100%" : "auto"};
            position: fixed;
            bottom: 0;
            z-index: 11;
            top: unset;
            border-radius: ${expand ? "0px" : "12px 12px 0 0"};
            padding-top: ${expand ? "18px" : "0"};
            overflow: ${expand ? "scroll" : "inherit"}!important;
          }
        `}
      >
        <button
          css={`
            position: absolute;
            top: ${expand ? "20px" : "0"};
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #dbe1ee;
            border-radius: 50%;
            height: 27px;
            width: 27px;
            display: none;
            align-items: center;
            justify-content: center;
            border: none;
            z-index: 999;
            ${mobile} {
              display: flex;
            }
          `}
          onClick={() => setExpand(!expand)}
        >
          <i className={`fa ${expand ? "fa-angle-down" : "fa-angle-up"}`} />
        </button>
        <div
          css={`
            display: flex;

            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            /* border-bottom: 1px solid #ddd; */
            /* padding-bottom: 10px; */
            position: relative;

            ${mobile} {
              justify-content: space-between;
              border-bottom: none;
              padding-bottom: 0;
              display: ${expand ? "flex" : "none"};
            }
          `}
        >
          <span
            css={`
              width: 100px;
              height: 100px;
              border-radius: 100%;
              background: ${PrimaryShade};
              position: absolute;
              top: -59px;
              z-index: -1;

              left: -56px;
              @media (max-width: 768px) {
                display: none;
              }
            `}
          ></span>
          <div
            css={`
              font-size: 20px;
              font-weight: 900;
              position: relative;
              color: #2d3f5e;
              &::before {
                content: "";
                height: 39px;
                width: 9px;
                top: -2px;
                left: -20px;
                position: absolute;
                background-color: var(--yellow-one);
                border-radius: 0 15px 15px 0;

                ${mobile} {
                  display: none;
                }
              }

              ${mobile} {
                font-size: 18px;
                margin-right: 10%;
              }

              ${small} {
                font-size: 16px;
              }
            `}
          >
            Your Cart
          </div>
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            `}
          >
            <div
              css={`
                display: inline-block;
                text-transform: capitalize;
                color: #616161;
                margin-right: 12px;
                overflow: hidden;
                /* white-space: nowrap; */
                text-overflow: ellipsis;
                font-size: 12px;
                font-weight: 900;

                ${mobile} {
                  font-size: 14px;
                  font-weight: 400;
                }

                ${small} {
                  font-size: 11px;
                  margin-right: 6px;
                }
              `}
            >
              {membersList.join(", ").legth > 10
                ? `${membersList.join(", ").slice(0, 10)} ...}`
                : membersList.join(", ")}
            </div>
            <div
              css={`
                width: 30px;
                height: 30px;
                background: ${PrimaryShade};
                border-radius: 100%;
                display: ${unEditable ? "none" : "flex"};
                color: ${PrimaryColor};
                align-items: center;
                justify-content: center;
                font-size: 13px;

                ${small} {
                  width: 11px;
                }
              `}
              className="btn"
              onClick={() => setShowEditMembers(true)}
            >
              <FaPen />
            </div>
          </div>
        </div>
        <div
          css={`
            display: none;

            ${mobile} {
              display: block;
              margin-bottom: ${expand ? "200px" : "0px"};
            }
          `}
        >
          <div
            css={`
              ${mobile} {
                display: ${expand ? "static" : "none"};

                overflow-y: auto;

                &::-webkit-scrollbar {
                  display: none;
                }

                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}
          >
            <DetailsListMobile />
            {discounts?.length > 0 ? (
              <DiscountsMobile discounts={discounts} premium={premium} />
            ) : null}

            {health_riders.length > 0 ? <RidersListMobile /> : null}
            {addons.length > 0 ? <AddOnsCoversListMobile /> : null}
          </div>

          <div
            css={
              expand &&
              `
             background:white;
             width: 94%;
             position: fixed;
             bottom: 0;
             left: 50%;
             transform: translateX(-50%);`
            }
          >
            <div
              css={`
                margin-top: 10px;

                ${mobile} {
                  border-top: ${expand ? "1px solid #ddd" : "none"};
                  margin-top: ${expand ? "10px" : "0"};
                }
              `}
            >
              <span
                css={`
                  font-size: 14px;
                  font-weight: 400;

                  ${small} {
                    font-weight: 400;
                    font-size: 10px;
                    line-height: 16px;
                  }
                `}
              >
                Next step:
              </span>
              <div
                css={`
                  font-size: 12px;
                  ${small} {
                    font-size: 12px;
                    line-height: 16px;
                    font-weight: 900;
                  }
                `}
              >
                Plan for:{" "}
                {memberGroups[nextGroup]
                  ?.map(item => item.replace("_", " "))
                  .join(", ")}
              </div>
            </div>
            <div
              css={`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <div>
                <span
                  css={`
                    font-size: 14px;

                    ${small} {
                      font-size: 11px;
                      font-weight: 900;
                    }
                  `}
                >
                  Total Premium
                </span>
                <div
                  css={`
                    color: #0a87ff;
                    font-weight: 900;

                    ${small} {
                      font-size: 21px;
                    }
                  `}
                >
                  {totalPremiumAmount}
                </div>
              </div>
              <button
                css={`
                  background-color: #0a87ff;
                  padding: 10px 12px;
                  color: #fff;
                  border-radius: 6px;
                  font-size: 16px;
                  font-weight: 900;
                `}
                className="btn"
                onClick={
                  hasNextGroupProduct
                    ? handleProceedClick
                    : handleReviewCartClick
                }
              >
                {hasNextGroupProduct ? "Proceed" : "Review Your Cart"}{" "}
                {isCartProductLoading ? (
                  <i className="fa fa-circle-notch rotate" />
                ) : null}
              </button>
            </div>
          </div>
        </div>
        <div
          css={`
            ${mobile} {
              display: none;
            }
          `}
        >
          <div
            className="d-flex justify-content-between flex-column"
            css={`
              display: flex;
              padding-bottom: 5px;
              margin-bottom: 5px;
              border-bottom: 1px solid #ddd;
            `}
          >
            <div
              css={`
                width: 55px;
                height: auto;
                background-color: #fff;
                display: flex;
                margin: 5px 0px 10px;
                align-items: center;
                justify-content: flex-start;
                /* padding: 2px 10px; */
                border-radius: 2px;

                ${small} {
                  max-width: 33px;
                }
              `}
            >
              <img src={logoSrc} alt={companyAlias} class="w-100" />
            </div>
            <div
              style={{
                width: "100%",
                // paddingLeft: "12px",
              }}
            >
              <CartDetailRow title="Plan Type" value={displayPlanType} />
              <CartDetailRow title="Cover" value={coverAmount} />
              <CartDetailRow
                title="Policy Term"
                value={`${tenure + " " + (tenure >= 2 ? "Years" : "Year")} `}
              />
              <CartDetailRow title="Premium" value={premiumAmount} />
            </div>
          </div>

          {riders_visibilty !== "0" ? (
            <div
              css={`
                display: flex;
                width: 100%;
                align-items: flex-start;
                justify-content: space-between;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
                /* padding-left: 12px; */
                flex-direction: column;
                margin-bottom: 5px;
              `}
            >
              <div
                css={`
                  width: 100%;

                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                `}
              >
                <BackgroundBorderTitle title="Riders" />
              </div>

              {/* IT SHOULD BE COLLAPSIBLE */}
              {health_riders.length > 0 ? (
                <div
                  css={`
                    width: 100%;
                    margin-top: 5px;
                  `}
                >
                  {health_riders.length &&
                    health_riders.map(({ name, total_premium }) => (
                      <CartDetailRow
                        key={name + total_premium}
                        title={name}
                        value={amount(total_premium)}
                      />
                    ))}
                </div>
              ) : (
                <div
                  css={`
                    width: 100%;
                    margin-top: 5px;
                  `}
                >
                  {!health_riders.length && (
                    <CartDetailRow title="No Riders Selected" />
                  )}
                </div>
              )}
            </div>
          ) : (
            <></>
          )}

          <Discounts discounts={discounts} premium={premium} />

          {addons_visibilty !== "0" ? (
            <div
              css={`
                display: flex;
                width: 100%;
                align-items: flex-start;
                justify-content: space-between;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
                padding-left: 12px;
                flex-direction: column;
              `}
            >
              <div
                css={`
                  width: 100%;

                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                `}
              >
                <BackgroundBorderTitle title="Add-On Coverages" />
              </div>
              {addons.length > 0 ? (
                <div
                  css={`
                    width: 100%;
                  `}
                >
                  {addons.length &&
                    addons.map((addOn, idx) => (
                      <AddOnDetailsRow
                        key={addOn.product.name + addOn.premium + idx}
                        addOn={addOn}
                      />
                    ))}
                </div>
              ) : (
                <div
                  css={`
                    width: 100%;
                  `}
                >
                  {!addons.length && (
                    <CartDetailRow title="No Add-Ons Selected" />
                  )}
                </div>
              )}
            </div>
          ) : (
            <></>
          )}

          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
              padding: 10px;
              border-radius: 2px;
              background-color: #f7f7f7;
              font-weight: 900;
              margin-bottom: ${unEditable ? "10px" : "40px"};
            `}
          >
            <div
              css={`
                color: #6d798f;
              `}
            >
              Total Premium <br />
              <small>*Inc. GST</small>
            </div>
            <div
              css={`
                color: var(--abc-red);
                font-size: 17px;
              `}
            >
              {totalPremiumAmount}/ {tenure >= 2 ? `${tenure} Years` : "Year"}
            </div>
          </div>
          <div
            css={`
              bottom: 0px;
              left: 0px;
              width: 100%;
              display: ${unEditable ? "none" : "flex"};
              position: absolute;
              border-top-left-radius: 0px;
              border-top-right-radius: 0px;
              border-bottom-right-radius: 8px;
              border-bottom-left-radius: 8px;
            `}
          >
            {hasNextGroupProduct ? (
              <ProceedButton
                members={memberGroups[nextGroup]
                  ?.map(item => item.replace("_", " "))
                  .join(", ")}
                loading={isCartProductLoading}
                onProceedClick={handleProceedClick}
              />
            ) : (
              <button
                css={`
                  background-color: ${PrimaryColor};
                  color: #fff;

                  margin: 0 !important;
                  min-width: 100%;
                  border-radius: 2px;
                  box-shadow: 0px 13px 27px 0px rgb(163 48 53 / 25%);
                  font-size: 18px;
                  font-weight: 600px;
                  height: 44px;
                  margin: 10px auto;
                  :hover {
                    color: white !important;
                  }
                `}
                onClick={handleReviewCartClick}
                id="review-cart-button"
                className="btn"
              >
                {/* Review Your Cart <i className="flaticon-next" /> */}
                Review Your Cart
                {isCartProductLoading ? (
                  <i
                    className="fa fa-circle-notch rotate"
                    css={`
                      margin-left: 1rem;
                    `}
                  />
                ) : null}
              </button>
            )}
          </div>
        </div>
      </div>

      {!hasNextGroupProduct && reviewCartPopup ? (
        <>
          <ReviewCartPopup
            propsoalPageLink={`/proposal?enquiryId=${enquiryId}`}
            onClose={handleReviewPopupClose}
          />
        </>
      ) : null}
      {showEditMembers && (
        // <CardModal
        //   show={showEditMembers}
        //   handleClose={() => setShowEditMembers(false)}
        //   showButton={false}
        //   title={`Edit Members`}
        //   css={`
        //     ${mobile} {
        //       width: 90%;
        //     }
        //   `}
        //   noFooter
        //   content={
        //     <EditMembersContent closePopup={() => setShowEditMembers(false)} />
        //   }
        // />
        <EditMembersModal
          onClose={() => setShowEditMembers(false)}
          group={group}
        />
      )}
    </>
  );
};

export default ReviewCart;

export function ReviewCartButton() {
  const { groupCode } = useParams();
  const {
    handleReviewCartClick,
    hasNextGroupProduct,
    memberGroups,
    nextGroup,
    isCartProductLoading,
    handleProceedClick,
    reviewCartPopup,
    enquiryId,
    handleReviewPopupClose,
  } = useReviewCartButton({ groupCode });
  const { theme } = useSelector(state => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

  return (
    <>
      {hasNextGroupProduct ? (
        <div
          css={`
            margin-bottom: 12px;
            width: 100%;
          `}
        >
          <ProceedButton
            members={memberGroups[nextGroup]
              ?.map(item => item.replace("_", " "))
              .join(", ")}
            loading={isCartProductLoading}
            onProceedClick={handleProceedClick}
          />
        </div>
      ) : (
        <button
          css={`
            min-width: 219px;
            width: 100%;
            color: white;

            background-color: ${PrimaryColor};
            border-radius: 2px;
            :hover {
              color: white !important;
            }
            font-size: 18px;
            font-weight: 600px;
            height: 44px;
            margin: 10px auto;
          `}
          onClick={handleReviewCartClick}
          className="btn"
        >
          Review Your Cart
          {isCartProductLoading ? (
            <i
              className="fa fa-circle-notch rotate"
              css={`
                margin-left: 1rem;
              `}
            />
          ) : null}
          {/* Review Your Cart <i className="flaticon-next" /> */}
        </button>
      )}
      {!hasNextGroupProduct && reviewCartPopup ? (
        <ReviewCartPopup
          propsoalPageLink={`/proposal?enquiryId=${enquiryId}`}
          onClose={handleReviewPopupClose}
        />
      ) : null}
    </>
  );
}

function ProceedButton({
  loading = false,
  members = "",
  onProceedClick = () => {},
}) {
  const { theme } = useSelector(state => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

  return (
    <div
      onClick={onProceedClick}
      css={`
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        cursor: pointer;
        margin: 0 !important;
        width: 100%;
        color: white;
        display: flex;
        background-color: ${PrimaryColor};
        border: 1px dashed var(--abc-red);

        margin-top: 20px;
      `}
      id="review-cart-button"
    >
      <div>
        <div
          css={`
            font-size: 12px;
          `}
        >
          Next Step:
        </div>
        <div
          css={`
            text-transform: capitalize;
            font-size: 12px;
          `}
        >
          {`Plan for ${members}`}
        </div>
      </div>
      <span
        css={`
          width: 75px;
          text-align: center;
          /* background-color: #5fb0ff; */
          padding: 6px 12px;

          color: #fff;
          /* border: 1px solid var(--abc-red); */
          font-size: 15px;
          border-radius: 2px;
        `}
      >
        {loading ? <i className="fas fa-circle-notch rotate" /> : "Proceed"}
      </span>
    </div>
  );
}

// const ls = new SecureLS();
//   const history = useHistory();
//   const [openEditSidebar, setOpenEditSidebar] = useState(false);
//   const [reviewModalOpen, setReviewModalOpen] = useState(false);
//   const [showSubMenu, setShowSubMenu] = useState(false);
//   const quotes = useSelector(({ quotePage }) => quotePage.selectedQuotes);
//   const { selectedRiders, selectedGroup, selectedAddOns } = useSelector(
//     ({ quotePage }) => quotePage,
//   );

//   const filters = useSelector(({ quotePage }) => quotePage.filters);
//   const { memberGroups } = useSelector(state => state.greetingPage);

//   const {
//     totalPremium,
//     totalRidersPremium,
//     product: { sum_insured, tenure, ...product },
//   } = useCartProduct(groupCode);

//   const plan = quotes[groupCode];

//   const totalRiderTax = selectedRiders[groupCode]
//     ? selectedRiders[groupCode].reduce(
//         (sum, rider) => parseInt(sum + rider.tax_amount),
//         0,
//       )
//     : 0;

//   const { premium, tax_amount } = quotes
//     ? quotes[groupCode]
//       ? quotes[groupCode]
//       : {}
//     : {};

//   const basePlanPremium = premium;

//   const gst = tax_amount + totalRiderTax;

//   const cart = useSelector(state => state.cart);

//   const cartGroups = Object.keys(cart);

//   const nextGroup = cartGroups[cartGroups.indexOf(groupCode) + 1];

//   const urlParams = new URLSearchParams(window.location.search);

//   const enquiryId = urlParams.get("enquiryId") || ls.get("enquiryId");

//   return (
//     <>
//       <div>
//         <Row>
//           <Col md={5} lg={12}>
//             <div className="addon_plan_a_t_addon_cover_r_cart">
//               <p className="text-left plan_ic_name_y">Your Cart</p>
//             </div>
//           </Col>
//           <Col md={7}>
//             <p
//               className="plan_right_member_e_c adjust-self-spouse-1024"
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginBottom: "10px",
//               }}
//             >
//               <span style={{ textTransform: "capitalize" }}>
//                 {memberGroups[selectedGroup]?.join(", ").replaceAll("_", "-")}
//               </span>
//               <span
//                 onClick={() => setOpenEditSidebar(true)}
//                 className="plan_ic_name badge clr_blue_bold menu-button sidebar-menu-open"
//                 style={{ marginLeft: "10px" }}
//               >
//                 <i className="fa fa-pencil font_size_pencil_icon_addon_right"></i>
//               </span>
//               <div
//                 id="sidebar-menu"
//                 className={`eCommerce-side-menu ${
//                   openEditSidebar ? "show-menu" : ""
//                 }`}
//               >
//                 <EditMembers setOpenEditSidebar={setOpenEditSidebar} />
//               </div>
//             </p>
//           </Col>
//         </Row>
//         <hr className="hr_product_d" />
//         <div className="theme-sidebar-widget">
//           <div className="single-block mb-80 main-menu-list">
//             <ul className="list-item">
//               <li>
//                 <a>
//                   Plan Type{" "}
//                   <span className="font_bold adjust-plan-1024">
//                     {" "}
//                     {filters.planType ? filters.planType : "Family Floater"}
//                   </span>
//                 </a>
//               </li>

//               <li>
//                 <a>
//                   Cover
//                   <span className="font_bold adjust-plan-1024">
//                     {/* {numberToDigitWord(plan?.sum_insured?.toString())} */}
//                     {numberToDigitWord(sum_insured)}
//                   </span>
//                 </a>
//               </li>
//               <li>
//                 <a>
//                   Policy Term
//                   <span className="font_bold adjust-plan-1024">
//                     {" "}
//                     {tenure} years
//                   </span>
//                 </a>
//               </li>
//               <li>
//                 <a>
//                   Premium
//                   <span className="font_bold adjust-plan-1024">
//                     ₹ {parseInt(product.premium).toLocaleString("en-IN")}
//                   </span>
//                 </a>
//               </li>
//               <li className="dropdown-holder">
//                 <a>
//                   Rider Premium{" "}
//                   <span
//                     className="font_bold adjust-plan-1024"
//                     style={{ right: 16 }}
//                     onClick={() => setShowSubMenu(!showSubMenu)}
//                   >
//                     ₹ {parseInt(totalRidersPremium).toLocaleString("en-IN")}
//                   </span>
//                   <button
//                     type="button"
//                     class="expander"
//                     onClick={() => setShowSubMenu(!showSubMenu)}
//                   >
//                     <i class="fa fa-chevron-down" aria-hidden="true"></i>
//                   </button>
//                 </a>
//                 <ul
//                   className="sub-menu"
//                   style={{ display: `${showSubMenu ? "block" : "none"}` }}
//                 >
//                   <li>
//                     <a>
//                       Base Plan Premium{" "}
//                       <span className="margin_top__10">
//                         <i className="fa fa-inr"></i>
//                         {basePlanPremium}
//                       </span>
//                     </a>
//                   </li>
//                   {/* <li>
// 										<a>
// 											Additional Coverages{" "}
// 											<span className="margin_top__10">
// 												<i className="fa fa-inr"></i>
// 												1000
// 											</span>
// 										</a>
// 									</li> */}
//                   {/* <li>
// 										<a>
// 											19 Critical illness{" "}
// 											<span className="margin_top__10">
// 												<i className="fa fa-inr"></i>
// 												1000
// 											</span>
// 										</a>
// 									</li> */}
//                   <li>
//                     <a>
//                       Additional Riders{" "}
//                       <span className="margin_top__10">
//                         <i className="fa fa-inr"></i>
//                         {/* {additionalRiders} */}
//                       </span>
//                     </a>
//                   </li>
//                   <li>
//                     <a>
//                       GST{" "}
//                       <span className="margin_top__10">
//                         <i className="fa fa-inr"></i> {gst}
//                       </span>
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <br />
//               <hr className="hr_product_d" />
//               <p className="addon_cover_btn adjust-addon-1024">Addon Covers</p>
//               {!selectedAddOns[selectedGroup] ||
//               Object.keys(selectedAddOns[selectedGroup]).length === 0 ? (
//                 <p style={{ textAlign: "center" }}>No Add-Ons Selected</p>
//               ) : (
//                 Object.values(selectedAddOns).map(addOns =>
//                   addOns.map(({ gross_premium, product }) => (
//                     <li>
//                       <a className="btn_addon_c_right_bg_w adjust-1024 review-addons adjust-1024-flex">
//                         <img
//                           className="contain img_right_panel_addon_add adjust-1024-img"
//                           src={companies?.companies[plan?.company_alias]?.logo}
//                           alt="care_image"
//                         />
//                         <p className="adjust-1024-p">{product.name}</p>
//                         <span className="font_bold btn_addon_cover_r adjust-1024-span">
//                           {/* ₹{parseInt(addOn.gross_premium).toLocaleString("en-IN")} */}
//                           ₹ {gross_premium}
//                         </span>
//                       </a>
//                     </li>
//                   )),
//                 )
//               )}
//               <hr />
//               <li>
//                 <a
//                   className="total-prem-head"
//                   style={{
//                     color: "#000",
//                     fontSize: "20px !important",
//                     marginTop: "10px",
//                   }}
//                 >
//                   Total Premium
//                   <span className="font_bold total_premium_btn_addon_r ">
//                     ₹{" "}
//                     {/* {parseInt(
//                       plan?.gross_premium + Number(2344)
//                     ).toLocaleString("en-IN")} */}
//                     {parseInt(totalPremium).toLocaleString("en-In")}
//                   </span>
//                 </a>
//               </li>
//               <br />
//               {/* {multiplePlan && (
//                 <li
//                   style={{
//                     display: "block",
//                     fontSize: "14px",
//                     marginBottom: "20px",
//                     fontfamily: "PFEncoreSansPromed",
//                   }}
//                   className="proceed_proposal_right_next_step"
//                 >
//                   <div
//                     style={{
//                       fontSize: "15px",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     Next Step:
//                     <br />
//                     Other Plans selected
//                   </div>
//                   <a
//                     style={{
//                       color: "#000",
//                       fontSize: "12px !important",
//                       bottom: "45px",
//                     }}
//                   >
//                     <button
//                       className="font_bold total_premium_btn_addon_r_product_pro"
//                       style={{
//                         position: "absolute",
//                         right: "0",
//                       }}
//                       onClick={() => {
//                         dispatch(setSteps(steps + 1));
//                         // history.push({
//                         // 	pathname: "/productdetails",
//                         // 	search: `enquiryId=${ls.get("enquiryId")}`,
//                         // });
//                         history.push(
//                           `productdetails/${
//                             quotes[index + 1]
//                           }?enquiry_id=${ls.get("enquiryId")}
// 													}`,
//                         );
//                       }}
//                     >
//                       Proceed{" "}
//                       <i className="flaticon-next" aria-hidden="true"></i>
//                     </button>
//                   </a>
//                 </li>
//               )} */}
//             </ul>
//             {/* {!multiplePlan && ( */}
//             <Row className="review-your-cart-btn-div">
//               <div
//                 data-toggle="modal"
//                 data-target="#m-md-review"
//                 onClick={() => {
//                   !nextGroup && setReviewModalOpen(true);
//                   nextGroup &&
//                     history.push({
//                       pathname: `/productdetails/${nextGroup}`,
//                       search: `enquiryId=${enquiryId}`,
//                     });

//                   // history.push({
//                   // 	pathname: "/proposal",
//                   // 	search: `enquiryId=${ls.get("enquiryId")}`,
//                   // });
//                 }}
//               >
//                 <button
//                   className="solid-button-one_plan text-center adjust-add-to-cart-1024"
//                   type="button"
//                 >
//                   {nextGroup ? "Proceed to next" : "Review You Cart"}
//                   <i className="flaticon-next"></i>
//                 </button>
//               </div>
//             </Row>
//             {/* )} */}
//           </div>
//         </div>
//       </div>
//       <ReviewCardPopup
//         totalPremium={totalPremium}
//         reviewModalOpen={reviewModalOpen}
//         setReviewModalOpen={setReviewModalOpen}
//       />
//     </>
//   );
