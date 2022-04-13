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
  getDisplayPremium,
  getTotalPremiumWithDiscount,
  premiumWithAddons,
} from "../../../utils/helper";
import {
  useAdditionalDiscount,
  useCart,
  useCompanies,
  useFrontendBoot,
  useMembers,
  useRider,
  useRiders,
  useTenureDiscount,
  useTheme,
  useToggle,
  useUpdateGroupMembers,
  useAddOns,
  useUrlEnquiry,
  useRevisedPremiumModal,
} from "../../../customHooks";
import {
  Button,
  CircleLoader,
  CloseButton,
  MembersList,
  MemberText,
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
import {
  api,
  useGetEnquiriesQuery,
  useUpdateCartMutation,
} from "../../../api/api";
import _ from "lodash";
import { setShowEditMembers } from "../../quotePage/quote.slice";
import {
  setActiveIndex,
  setIsPopupOn,
} from "../../ProposalPage/ProposalSections/ProposalSections.slice";

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

export function CartDetails({ groupCode, ...props }) {
  const { colors } = useTheme();

  const { journeyType } = useFrontendBoot();

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const { unavailable_message, service_tax } = cartEntry;

  const modifyDetailsNotAllowed =
    cartEntry?.product?.company?.alias === "universal_sompo";

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
            <AddOnsList cartEntry={cartEntry} />
            <Taxes service_tax={service_tax} />
            <TotalPremium groupCode={groupCode} />
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
            <QuickPayAndRenewButton groupCode={groupCode} />
            {!modifyDetailsNotAllowed && <ModifyDetailsButton />}
          </div>
        ) : (
          <ReviewCartButtonNew groupCode={groupCode} />
        )}
      </div>
    </CartDetailsWrap>
  );
}

const QuickPayAndRenewButton = ({ groupCode }) => {
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
        cartEntry?.unavailable_message ||
        isLoading ||
        additionalDiscountsQuery?.isLoading ||
        additionalDiscountsQuery?.isFetching ||
        isTotalPremiumLoading
      }
    >
      {"Quick pay & Renew"}
    </Button>
  );
};

const ModifyDetailsButton = () => {
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

function AddOnsList({ cartEntry, ...props }) {
  const { addons } = cartEntry;

  if (!addons.length) return null;

  return (
    <CartSection title="Add-On Coverages" {...props}>
      {addons.map((addOn, idx) => (
        <AddOnDetailRow addOn={addOn} key={idx} />
      ))}
    </CartSection>
  );
}

function AddOnDetailRow({ addOn }) {
  return (
    <CartDetailRow
      title={<AddOnTitle addOn={addOn} />}
      value={amount(addOn?.total_premium)}
    />
  );
}

function AddOnTitle({ addOn }) {
  const { members, product } = addOn;
  const { getCompanyLogo } = useCompanies();
  const logo = getCompanyLogo(product?.company?.alias);
  return (
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
          `}
          src={logo}
          alt={product?.company?.alias}
        />
      </div>
      <span
        css={`
          font-size: 11px;
          font-weight: 400;
          width: 100%;
          padding: 0px 5px;
          /* display: flex;
          align-items: center; */
        `}
      >
        {product?.name} <MemberText>({members.join(", ")})</MemberText>
      </span>
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
      {title && (
        <h2
          className="mb-2"
          css={`
            color: ${colors.primary_color};
            font-size: 0.83rem;
          `}
        >
          {title}
        </h2>
      )}
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
          key={additionalDiscount?.alias}
        />
      ))}
    </CartSection>
  );
}

function DiscountDetails({ additionalDiscount, groupCode, ...props }) {
  const { name } = additionalDiscount;

  const { getDiscountAmount } = useAdditionalDiscount(groupCode);

  const discountAmount = getDiscountAmount(additionalDiscount);

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
        riders.map(rider => <RiderDetails rider={rider} key={rider?.id} />)
      )}
    </CartSection>
  );
}

function Taxes({ service_tax }) {
  const { colors } = useTheme();
  return (
    <CartSection>
      <CartDetailRow
        titleCss={`
          color: ${colors.primary_color} !important;
          font-weight: bold;
          margin: 5px 0;
        `}
        title="GST"
        value={amount(service_tax)}
      />
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

function EditMembers({}) {
  const { groupCode } = useParams();

  const revisedPremiumPopupUtilityObject = useRevisedPremiumModal();

  const dispatch = useDispatch();

  const { getGroupMembers } = useMembers();

  const groupMembers = getGroupMembers(groupCode);

  const { getSelectedMembers, ...memberForm } = useMembersForm(groupMembers);

  const {
    updateGroupMembers,
    query: { isLoading, error, isError },
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

export const RevisedPremiumPopup = ({
  revisedPremiumPopupUtilityObject,
  onClose,
  title,
  ...props
}) => {
  const { colors } = useTheme();

  const dispatch = useDispatch();

  const { groupCode: urlGeneratedGroupCode } = useParams(); //? groupCode changes on product details page.

  const isProductDetailsPage =
    window.location.pathname.startsWith("/productdetails");

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
          {title}
        </h1>
      </div>

      {isProductDetailsPage &&
        revisedPremiumPopupUtilityObject?.updatedCartEntries
          ?.filter(
            updatedCartEntry =>
              +updatedCartEntry?.group?.id === +urlGeneratedGroupCode,
          )
          ?.map(
            (
              { group: { id: groupCode }, unavailable_message, premium },
              index,
            ) => (
              <>
                <div key={index} className="p-3 pt-0 pb-0">
                  <Members groupCode={groupCode} editable={false} />
                  <BasePlanDetails
                    groupCode={groupCode}
                    isUnavailable={unavailable_message}
                    revisedPremium
                  />
                  {!unavailable_message ? (
                    <div>
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
                        value={amount(+premium)}
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
                <hr className="mt-0" />
              </>
            ),
          )}

      {!isProductDetailsPage &&
        revisedPremiumPopupUtilityObject?.updatedCartEntries?.map(
          (
            { group: { id: groupCode }, unavailable_message, premium },
            index,
          ) => (
            <>
              <div key={index} className="p-3 pt-0 pb-0">
                <Members groupCode={groupCode} editable={false} />
                <BasePlanDetails
                  groupCode={groupCode}
                  isUnavailable={unavailable_message}
                  revisedPremium
                />
                {!unavailable_message ? (
                  <div>
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
                      value={amount(+premium)}
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
              <hr className="mt-0" />
            </>
          ),
        )}

      <div className="p-3 pt-0 d-flex justify-content-between align-items-center">
        <DetailsWrap>
          <DetailsWrap.Title style={{ fontWeight: "600" }}>
            {isProductDetailsPage
              ? "Previous Premium"
              : "Previous Total Premium"}
          </DetailsWrap.Title>
          <DetailsWrap.Value>
            {isProductDetailsPage
              ? getDisplayPremium({
                  total_premium:
                    +revisedPremiumPopupUtilityObject.getPreviousCartEntryPremium(
                      urlGeneratedGroupCode,
                    ),
                  tenure: 1,
                })
              : getDisplayPremium({
                  total_premium:
                    +revisedPremiumPopupUtilityObject.prevTotalPremium,
                  tenure: 1,
                })}
          </DetailsWrap.Value>
        </DetailsWrap>
        <DetailsWrap>
          <DetailsWrap.Title style={{ color: colors.secondary_color }}>
            {isProductDetailsPage ? "Revised Premium" : "Revised Total Premium"}
          </DetailsWrap.Title>
          <DetailsWrap.Value>
            {isProductDetailsPage
              ? getDisplayPremium({
                  total_premium:
                    +revisedPremiumPopupUtilityObject.getUpdatedCartEntryPremium(
                      urlGeneratedGroupCode,
                    ),
                  tenure: 1,
                })
              : getDisplayPremium({
                  total_premium:
                    +revisedPremiumPopupUtilityObject.updatedTotalPremium,
                  tenure: 1,
                })}
          </DetailsWrap.Value>
        </DetailsWrap>
        <DetailsWrap>
          <Button
            className="w-100"
            css={`
              border-radius: 9px;
            `}
            onClick={() => {
              onClose();
              dispatch(setIsPopupOn(false));
            }}
          >
            Continue
          </Button>
        </DetailsWrap>
      </div>
    </Modal>
  );
};

const DetailsWrap = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

DetailsWrap.Title = styled.span`
  font-size: 15px;
  color: rgb(86, 87, 88);
  text-align: center;
  ${small} {
    font-size: 11px;
  }
`;
DetailsWrap.Value = styled.span`
  font-size: 15px;
  color: rgb(86, 87, 88);
  ${small} {
    font-size: 11px;
  }
`;

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
    premium,
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
                  {amount(premium)}
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

  const { getSelectedAdditionalDiscounts, getTotalDiscountAmount } =
    useAdditionalDiscount(groupCode);

  const additionalDiscounts = getSelectedAdditionalDiscounts();

  const cartEntry = getCartEntry(groupCode, {
    additionalDiscounts,
  });

  const { tenure, netPremiumWithoutDiscount } = cartEntry;

  const total_Premium = getTotalPremiumWithDiscount({
    netPremiumWithoutDiscount,
    totalDiscountAmount: getTotalDiscountAmount(),
  });

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  const displayNetPremium = `${amount(total_Premium)} / ${
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
  const tenureDiscount = useTenureDiscount(group?.id);
  const riders = useRiders({ quote: cartEntry, groupCode: group?.id });

  const isTotalPremiumLoading = _.some([
    isQueryLoading(tenureDiscount?.query),
    isQueryLoading(riders?.query),
  ]);

  return isTotalPremiumLoading;
}

function ReviewCartButtonNew({ groupCode, ...props }) {
  const history = useHistory();

  const url = useUrlQuery();

  const { updateCart, getCartEntry } = useCart();

  const { getTotalDiscountAmount, query: additionalDiscountsQuery } =
    useAdditionalDiscount(groupCode);

  const [updateCartMutation, query] = updateCart(groupCode);

  const cartEntry = getCartEntry(groupCode);

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  const { getNextGroupProduct } = useCart();

  const nextGroupProduct = getNextGroupProduct(parseInt(groupCode));

  const reviewCartModalNew = useToggle();

  const { getMembersText } = useMembers();

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
          pathname: `/productdetails/${nextGroupProduct?.group?.id}`,
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
        loader={!nextGroupProduct && query?.isLoading}
        disabled={
          cartEntry?.unavailable_message ||
          query?.isLoading ||
          additionalDiscountsQuery?.isLoading ||
          additionalDiscountsQuery?.isFetching ||
          isTotalPremiumLoading
        }
        {...props}
      >
        {nextGroupProduct ? (
          <div className="d-flex justify-content-between align-items-center">
            <div
              css={`
                font-size: 0.65rem;
                text-align: left;
              `}
            >
              <div>Next Step:</div>
              <div>Plan for {getMembersText(nextGroupProduct?.group)}</div>
            </div>
            <div>
              Proceed{" "}
              {query?.isLoading ? <CircleLoader animation="border" /> : null}
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
      )}
    </div>
  );
}

function CartDetailRow({ title, value, titleCss }) {
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
          color: #555;
          /* width: 70%; */
          ${titleCss}
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
  const { logo } = companies[product?.company?.alias];
  const totalPremium = amount(total_premium);
  const { groupCode } = useParams();
  const { product: cartProduct, updateProductRedux } =
    useCartProduct(groupCode);
  const removeAddOn = addOnId => {
    updateProductRedux({
      ...cartProduct,
      addons: cartProduct?.addons?.filter(
        addon => addon?.product?.id !== addOnId,
      ),
    });
  };
  const handleRemoveAddOnClick = () => {
    removeAddOn(product?.id);
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
          src={product?.company?.alias === "care_health" ? care_health : logo}
          alt={product?.company?.alias}
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
        {`${product?.name} ${
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
    additionalDiscounts.find(discount => discount?.alias === discountAlias);
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

  const { PrimaryColor } = theme;

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
              ?.map(item => item?.replace("_", " "))
              ?.join(", ")}
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
