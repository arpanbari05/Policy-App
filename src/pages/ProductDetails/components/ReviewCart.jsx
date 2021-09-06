import { useHistory, useParams } from "react-router-dom";
import { useCartProduct } from "../../Cart";
import "styled-components/macro";
import { useSelector } from "react-redux";
import Pencil from "../../../assets/images/pencil_pink.png";
import { useState } from "react";
import ReviewCartPopup from "./ReviewCardPopup";
import EditMembersPopup from "../../QuotesPage/components/EditMembersPopup/EditMembersPopup";
import EditMembersContent from "./EditMembersContent";
import { mobile, small } from "../../../utils/mediaQueries";

export function amount(number = 0) {
  return `₹ ${parseInt(number).toLocaleString("en-In")}`;
}

function CartDetailRow({ title, value }) {
  return (
    <div
      css={`
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 26px;

        ${mobile} {
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }
      `}
    >
      <div
        css={`
          font-size: 14px;

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
      </div>
      <div
        css={`
          font-weight: 900;
          font-size: 16px;

          ${small} {
            font-size: 12px;
            line-height: 14px;
            margin-top: 7px;
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
      <button
        css={`
          margin: 12px 6px 12px 0;
        `}
        onClick={handleRemoveAddOnClick}
      >
        <i
          className="fa fa-close"
          css={`
            font-size: 11px;
            color: #8b9ab0;
            background: #c2d0d973;
            width: 20px;
            height: 20px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        />
      </button>
      <div
        css={`
          width: 30px;
          margin-right: 10px;
        `}
      >
        <img
          css={`
            max-width: 100%;
          `}
          src={logo}
          alt={product.company.alias}
        />
      </div>
      <p
        css={`
          font-size: 13px;
          font-weight: 400;
        `}
      >
        {`${product.name} ${
          members.filter(member => member !== "all").length
            ? `(${members})`
            : ""
        }`}
      </p>
    </div>
  );
  return (
    <CartDetailRow
      title={logoTitle}
      value={
        <p
          css={`
            width: 60px;
            text-align: right;
          `}
        >
          {totalPremium}
        </p>
      }
    />
  );
}

export function BackgroundBorderTitle({ title, ...props }) {
  return (
    <div
      {...props}
      css={`
        border-bottom: 1px solid #ddd;
        position: relative;
      `}
    >
      <div
        css={`
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid var(--abc-red);
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          font-size: 15px;
          font-weight: 900;
          border-radius: 50px;
          padding: 8px 6px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--abc-red);
          width: 100%;
          max-width: 127px;
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

function Discounts({ discounts = [] }) {
  return discounts.length > 0 ? (
    <>
      <div
        css={`
          margin: 37px 0;
        `}
      >
        <BackgroundBorderTitle title="Discounts" />
      </div>
      <div
        css={`
          margin-top: 30px;
        `}
      >
        {discounts.map(({ name }) => (
          <CartDetailRow title={name} />
        ))}
      </div>
    </>
  ) : null;
}

const ReviewCart = ({ groupCode }) => {
  const [reviewCartPopup, setReviewCartPopup] = useState(false);

  const cart = useSelector(state => state.cart);
  const displayPlanType_code  = useSelector(state => state.quotePage.filters.planType) ;
  const existingPlanType =  useSelector(state => state.quotePage.filters.planType)

const displayPlanType = displayPlanType_code === "M"?"Multi Individual":displayPlanType_code === "I"?"Individual":displayPlanType_code === "F"?"Family Floater":existingPlanType;

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
        <CartDetailRow
          title="Plan Type"
          value={
            existingPlanType
          }
        />
        <CartDetailRow title="Cover" value={coverAmount} />
        <CartDetailRow title="Policy Term" value={`${tenure+" "+(tenure>=2?"Years":"Year")} `} />
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
            font-size: 16px;
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
            color: var(--abc-red);
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

  const [expand, setExpand] = useState(false);

  return (
    <>
      <div
        css={`
          position: sticky;
          top: 110px;
          background-color: #fff;
          box-shadow: 0 2px 6px 0 hsl(0deg 0% 64% / 50%);
          padding: 10px 20px;
          padding-top: 18px;
          padding-bottom: 20px;
          border-radius: 12px;
          color: #000;

          ${mobile} {
            width: 100%;
            position: fixed;
            bottom: 0;
            z-index: 11;
            top: unset;
            border-radius: 12px 12px 0 0;
            padding-top: ${expand ? "18px" : "0"};
          }
        `}
      >
        <button
          css={`
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #dbe1ee;
            border-radius: 50%;
            height: 27px;
            width: 27px;
            display: none;
            align-items: center;
            justify-content: center;

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
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;

            ${mobile} {
              justify-content: space-between;
              border-bottom: none;
              padding-bottom: 0;
              display: ${expand ? "flex" : "none"};
            }
          `}
        >
          <div
            css={`
              font-size: 24px;
              font-weight: 900;
              position: relative;

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
              justify-content: flex-end;
              align-items: center;
              max-width: 70%;
            `}
          >
            <div
              css={`
                display: inline-block;
                text-transform: capitalize;
                margin-right: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 15px;
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
              {membersList.join(", ")}
            </div>
            <button
              css={`
                width: 20px;

                ${small} {
                  width: 11px;
                }
              `}
              onClick={() => setShowEditMembers(true)}
            >
              <img
                src={Pencil}
                alt="edit"
                css={`
                  color: var(--dark-pink);
                  background-color: #fff;
                  max-width: 100%;
                `}
              />
            </button>
          </div>
        </div>
        <div
          css={`
            display: none;
            ${mobile} {
              display: block;
            }
          `}
        >
          <div
            css={`
              ${mobile} {
                display: ${expand ? "static" : "none"};
                max-height: 60vh;
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
            {addons.length > 0 ? <AddOnsCoversListMobile /> : null}
          </div>
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
                ${small} {
                  font-size: 14px;
                  line-height: 16px;
                  font-weight: 900;
                }
              `}
            >
              Plan for: {memberGroups[nextGroup]?.join(", ")}
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
                  color: var(--abc-red);
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
                background-color: var(--abc-red);
                padding: 10px 12px;
                color: #fff;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 900;
              `}
              onClick={
                hasNextGroupProduct ? handleProceedClick : handleReviewCartClick
              }
            >
              {hasNextGroupProduct ? "Proceed" : "Review Your Cart"}{" "}
              {isCartProductLoading ? (
                <i className="fa fa-circle-notch rotate" />
              ) : null}
            </button>
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
            className="d-flex justify-content-between"
            css={`
              margin-top: 10px;
              display: flex;
            `}
          >
            <div
              css={`
                max-width: 80px;
                background-color: #fff;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 2px 0px;
                border-radius: 2px;

                ${small} {
                  max-width: 33px;
                }
              `}
            >
              <img src={logoSrc} alt={companyAlias} />
            </div>
            <div
              style={{
                width: "70%",
              }}
            >
              <CartDetailRow
                title="Plan Type"
                value={
                  displayPlanType
                }
              />
              <CartDetailRow title="Cover" value={coverAmount} />
              <CartDetailRow title="Policy Term" value={`${tenure+" "+(tenure>=2?"Years":"Year")} `} />
              <CartDetailRow title="Premium" value={premiumAmount} />
            </div>
          </div>
          <Discounts discounts={discounts} />
          <div css={``}>
            <div
              css={`
                margin: 37px 0;
              `}
            >
              <BackgroundBorderTitle title="Riders" />
            </div>
            <div>
              {!health_riders.length ? (
                <CartDetailRow title="No Riders Selected" />
              ) : (
                health_riders.map(({ name, total_premium }) => (
                  <CartDetailRow
                    key={name + total_premium}
                    title={name}
                    value={amount(total_premium)}
                  />
                ))
              )}
            </div>
          </div>
          <div
            css={`
              margin: 37px 0;
            `}
          >
            <BackgroundBorderTitle title="Add-On Coverages" />
          </div>
          <div>
            {!addons.length ? (
              <CartDetailRow title="No Add-Ons Selected" />
            ) : (
              addons.map((addOn, idx) => (
                <AddOnDetailsRow
                  key={addOn.product.name + addOn.premium + idx}
                  addOn={addOn}
                />
              ))
            )}
          </div>
          <hr />
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 18px;
              padding: 10px;
              border-radius: 2px;
              background-color: #f7f7f7;
              font-weight: 900;
            `}
          >
            <div>Total Premium</div>
            <div
              css={`
                color: var(--abc-red);
                font-size: 21px;
              `}
            >
              {totalPremiumAmount}
            </div>
          </div>
          {hasNextGroupProduct ? (
            <ProceedButton
              members={memberGroups[nextGroup]?.join(", ")}
              loading={isCartProductLoading}
              onProceedClick={handleProceedClick}
            />
          ) : (
            <button
              css={`
                background-color: var(--abc-red);
                color: #fff;
                min-width: 100%;
                border-radius: 2px;
                box-shadow: 0px 13px 27px 0px rgb(163 48 53 / 25%);
                font-size: 18px;
                font-weight: 600px;
                height: 44px;
                margin: 10px auto;
              `}
              onClick={handleReviewCartClick}
              id="review-cart-button"
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
      {!hasNextGroupProduct && reviewCartPopup ? (
        <ReviewCartPopup
          propsoalPageLink={`/proposal?enquiryId=${enquiryId}`}
          onClose={handleReviewPopupClose}
        />
      ) : null}
      {showEditMembers && (
        <EditMembersPopup
          handleClose={() => setShowEditMembers(false)}
          css={`
            ${mobile} {
              width: 90%;
            }
          `}
          editMembersContent={
            <EditMembersContent closePopup={() => setShowEditMembers(false)} />
          }
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
            members={memberGroups[nextGroup]?.join(", ")}
            loading={isCartProductLoading}
            onProceedClick={handleProceedClick}
          />
        </div>
      ) : (
        <button
          css={`
            background-color: var(--abc-red);
            color: #fff;
            min-width: 219px;
            border-radius: 2px;
            box-shadow: 0px 13px 27px 0px rgb(163 48 53 / 25%);
            font-size: 18px;
            font-weight: 600px;
            height: 44px;
            margin: 10px auto;
          `}
          onClick={handleReviewCartClick}
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
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border: 1px dashed var(--abc-red);
        border-radius: 8px;
        margin-top: 20px;
      `}
      id="review-cart-button"
    >
      <div>
        <div
          css={`
            font-size: 14px;
            color: var(--abc-red);
          `}
        >
          Next Step:
        </div>
        <div
          css={`
            text-transform: capitalize;
          `}
        >
          {`Plan for ${members}`}
        </div>
      </div>
      <button
        onClick={onProceedClick}
        css={`
          width: 100px;
          text-align: center;
          background-color: var(--abc-red);
          padding: 6px 12px;
          color: #fff;
          border: 1px solid var(--abc-red);
          font-size: 20px;
          border-radius: 2px;
          &:hover {
            color: var(--abc-red);
            background-color: #fff;
          }
        `}
      >
        {loading ? <i className="fas fa-circle-notch rotate" /> : "Proceed"}
      </button>
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
