import { Modal, Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { amount, BackgroundBorderTitle } from "./ReviewCart";
import CorrectIcon from "../../../assets/images/correct_icon.png";
import EditIcon from "../../../assets/images/edit.png";
import DeleteIcon from "../../../assets/images/remove.png";
import useUrlQuery from "../../../customHooks/useUrlQuery";
import { useCartProduct } from "../../Cart";
import { mobile } from "../../../utils/mediaQueries";
import { calculateTotalPremium } from "../../../utils/helper";

const tabletMedia = `@media (min-width: 768px) and (max-width: 900px)`;

function PopUpWithCloseButton({ title, onClose = () => {}, children }) {
  const handleClose = () => {
    onClose();
  };
  return (
    <Modal
      show
      animation={false}
      style={{
        zIndex: "2000",
        border: "none",
      }}
      css={`
        & .modal-dialog {
          max-width: 800px;
          border-radius: 12px;
          ${mobile} {
            margin: 70px auto;
            width: 90%;
          }
          ${tabletMedia} {
            margin: 70px auto;
            width: 90%;
          }
        }
      `}
    >
      <Modal.Header
        style={{ borderRadius: "12px" }}
        css={`
          ${mobile} {
            border: none;
          }
        `}
      >
        {title && (
          <ModalTitle
            css={`
              margin: 10px 9px;
              font-size: 24px;
              font-weight: 400;

              ${tabletMedia} {
                font-size: 21px;
              }
            `}
          >
            {title}
          </ModalTitle>
        )}
      </Modal.Header>
      <Modal.Body
        style={{ borderRadius: "12px" }}
        css={`
          ${mobile} {
            padding: 0;
            margin-top: -10px;
          }
        `}
      >
        {children}
      </Modal.Body>
      <CloseButton
        type="button"
        className="btn btn-white recom_close_css "
        style={{ marginTop: "-8px", zIndex: 2500 }}
        onClick={handleClose}
      >
        <i className="fa fa-close"></i>
      </CloseButton>
    </Modal>
  );
}

function AddOnDetailsCard({
  addOn: {
    product: {
      name,
      company: { alias },
    },
    members,
    total_premium,
    sum_insured,
  },
}) {
  const companies = useSelector(
    state => state.frontendBoot.frontendData.data.companies,
  );
  const logoSrc = companies[alias].logo;

  function DetailTab({ label = "", value = "" }) {
    return (
      <div
        css={`
          flex: 1;
          color: #000;
          font-weight: 600;
          display: flex;
          justify-content: center;
          &:not(:last-child) {
            border-right: 1px solid #ddd;
          }
        `}
      >
        <div
          css={`
            text-align: center;
          `}
        >
          <div
            css={`
              font-size: 18px;
            `}
          >
            {label}
          </div>
          <div
            css={`
              font-size: 15px;
            `}
          >
            {value}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      css={`
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 10px;
        width: 100%;
        margin: 10px 0;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
        `}
      >
        <div>
          <img src={logoSrc} style={{ width: "60px" }} alt={alias} />
        </div>
        <div
          css={`
            margin-left: 30px;
            font-weight: 600;
            color: #000;
            margin-bottom: 10px;
          `}
        >
          {name}
        </div>
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        `}
      >
        <DetailTab label="Cover" value={`${amount(sum_insured)} / year`} />
        <DetailTab label="Premium" value={`${amount(total_premium)} / year`} />
        <DetailTab
          label="Insured"
          value={
            <span
              css={`
                text-transform: capitalize;
              `}
            >
              {members.join(", ")}
            </span>
          }
        />
      </div>
    </div>
  );
}

function ProductDetailsCardMobile({ cartItem }) {
  const companies = useSelector(
    state => state.frontendBoot.frontendData.data.companies,
  );
  const {
    product: {
      name,
      insurance_type,
      company: { alias },
    },
    total_premium,
    sum_insured,
    health_riders,
    addons,
  } = cartItem;
  const logoSrc = companies[alias].logo;

  return (
    <>
      <div
        css={`
          display: none;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
          ${mobile} {
            display: block;
          }
        `}
      >
        <div
          css={`
            padding: 10px;
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
              padding-bottom: 10px;
              width: 100%;
              border-bottom: 1px solid #ddd;
            `}
          >
            <div
              css={`
                width: 30px;
              `}
            >
              <img
                src={logoSrc}
                alt={name}
                css={`
                  max-width: 100%;
                `}
              />
            </div>
            <p
              css={`
                font-size: 16x;
                margin-left: 1em;
              `}
            >
              {name}
            </p>
          </div>
          <div
            css={`
              display: flex;
              margin-top: 10px;
            `}
          >
            <div
              css={`
                width: 50%;
                padding-right: 10px;
                border-right: 1px solid #ddd;
                margin-right: 10px;
              `}
            >
              <div
                css={`
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <div
                  css={`
                    font-size: 14px;
                  `}
                >
                  Cover:
                </div>
                <div>{amount(sum_insured)}</div>
              </div>
              {insurance_type.alias === "top_up" ? (
                <div
                  css={`
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  <div>Premium:</div>
                  <div>{amount(total_premium)}</div>
                </div>
              ) : null}
            </div>
            <div
              css={`
                width: 50%;
              `}
            >
              <div
                css={`
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <div
                  css={`
                    font-size: 14px;
                  `}
                >
                  Premium:
                </div>
                <div>{amount(total_premium)}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          css={`
            background: #ddd;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          `}
        >
          {health_riders.map(health_rider => (
            <div
              css={`
                /* flex: 1; */
                padding: 3px;
                margin: 3px;
              `}
            >
              <img src={CorrectIcon} class="display_in_m" alt="" />
              <span
                css={`
                  font-size: 14px;
                `}
              >
                {health_rider.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {addons.length > 0 ? (
        <div
          css={`
            margin-top: 37px;
          `}
        >
          <BackgroundBorderTitle title="Add-Ons Coverages" />
          {addons.map(addon => (
            <div
              css={`
                display: none;
                border: 1px solid #ddd;
                border-radius: 12px;
                overflow: hidden;
                margin-top: 37px;
                ${mobile} {
                  display: block;
                }
              `}
            >
              <div
                css={`
                  padding: 10px;
                `}
              >
                <div
                  css={`
                    display: flex;
                    align-items: center;
                    padding-bottom: 10px;
                    width: 100%;
                    border-bottom: 1px solid #ddd;
                  `}
                >
                  <div
                    css={`
                      width: 30px;
                    `}
                  >
                    <img
                      src={companies[addon.product.company.alias].logo}
                      alt={addon.product.name}
                      css={`
                        max-width: 100%;
                      `}
                    />
                  </div>
                  <p
                    css={`
                      font-size: 16x;
                      margin-left: 1em;
                    `}
                  >
                    {addon.product.name}
                  </p>
                </div>
                <div
                  css={`
                    display: flex;
                    margin-top: 10px;
                  `}
                >
                  <div
                    css={`
                      width: 50%;
                      padding-right: 10px;
                      border-right: 1px solid #ddd;
                      margin-right: 10px;
                    `}
                  >
                    <div
                      css={`
                        display: flex;
                        justify-content: space-between;
                      `}
                    >
                      <div
                        css={`
                          font-size: 14px;
                        `}
                      >
                        Cover:
                      </div>
                      <div>{amount(addon.sum_insured)}</div>
                    </div>
                    {insurance_type.alias === "top_up" ? (
                      <div
                        css={`
                          display: flex;
                          justify-content: space-between;
                        `}
                      >
                        <div>Deductible:</div>
                        <div>{amount(sum_insured)}</div>
                      </div>
                    ) : null}
                  </div>
                  <div
                    css={`
                      width: 50%;
                    `}
                  >
                    <div
                      css={`
                        display: flex;
                        justify-content: space-between;
                      `}
                    >
                      <div
                        css={`
                          font-size: 14px;
                        `}
                      >
                        Premium:
                      </div>
                      <div>{amount(addon.total_premium)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

function ProductDetailsCard({ cartItem }) {
  const companies = useSelector(
    state => state.frontendBoot.frontendData.data.companies,
  );
  const {
    product: {
      name,
      company: { alias },
    },
    total_premium,
    tenure,
    sum_insured,
    health_riders,
  } = cartItem;
  const logoSrc = companies[alias].logo;
  return (
    <div
      className="rider-box_product_pro"
      css={`
        ${mobile} {
          display: none;
        }
      `}
    >
      <div
        class="row_display_pro_review"
        style={{ justifyContent: "space-between" }}
      >
        <div
          css={`
            display: flex;
            align-items: center;
            flex: 2;
          `}
        >
          <div class="logo_add_review float_left_addon_c">
            <img
              class="contain img_top_m_custom"
              css={`
                width: 60px;
              `}
              src={logoSrc}
              alt={alias}
            />
          </div>

          <div class="float_left_addon_c ">
            <p class="paln_name_t_product_pro" style={{ marginTop: "0" }}>
              {name}
            </p>
          </div>
        </div>
        <div
          className="float_product_cover_pro"
          css={`
            border-left: 1px solid #ddd;
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: center;
          `}
        >
          <p class="label-add_product_pro">
            Cover
            <br />
            <span
              class="blk edit_css_product addon_plan_d_inter_1_product_pro"
              css={`
                font-size: 15px;
                font-weight: 400;
              `}
            >
              {amount(sum_insured)}
            </span>
          </p>
        </div>

        <div
          className="float_product_premium_pro"
          css={`
            border-left: 1px solid #ddd;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
          `}
        >
          <div class="si_add si_add2">
            <p class="label-add_product_pro">
              Premium
              <br />
              <span
                class="blk edit_css_product"
                css={`
                  font-size: 15px;
                  font-weight: 400;
                `}
              >
                {amount(total_premium)} /{" "}
                {tenure === 1 ? "year" : `${tenure} years`}
              </span>
            </p>
          </div>
        </div>

        <div class="rider-box1"></div>
      </div>
      {health_riders.length > 0 ? <hr /> : null}
      <div class="row">
        {health_riders.map(health_rider => (
          <div
            css={`
              margin: 10px;
            `}
          >
            <img src={CorrectIcon} class="display_in_m" alt="" />
            <span class="font_weight_normal">{health_rider.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCartPopup({ propsoalPageLink, onClose = () => {} }) {
  const name = useSelector(state => state.greetingPage.proposerDetails.name);
  const firstName = name.split(" ")[0];
  const cart = useSelector(state => state.cart);
  const { memberGroups } = useSelector(state => state.greetingPage);
  const groupCodes = Object.keys(cart).filter(item =>
    Object.keys(memberGroups).includes(item),
  );

  const allAddOns = groupCodes.reduce(
    (allAddOns, groupCode) => [...allAddOns, ...cart[groupCode].addons],
    [],
  );

  const totalPremium = groupCodes.reduce((totalPremium, groupCode) => {
    return totalPremium + calculateTotalPremium(cart[groupCode]);
  }, 0);

  const reducedAddOns = allAddOns.reduce((reducedAddOns, addOn) => {
    const { id } = addOn.product;
    if (!reducedAddOns[id]) {
      return {
        ...reducedAddOns,
        [id]: [addOn],
      };
    }
    return { ...reducedAddOns, [id]: [...reducedAddOns[id], addOn] };
  }, {});

  // function addOnsReducer(reducedAddOns, addOn) {
  //   const addOnId = addOn.product.id;
  //   if (!reducedAddOns[addOnId])
  //     return { ...reducedAddOns, [addOnId]: [addOn] };
  //   return {
  //     ...reducedAddOns,
  //     [addOnId]: [...reducedAddOns[addOnId], addOn],
  //   };
  // }

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <PopUpWithCloseButton
      title={
        <div>
          <span
            css={`
              text-transform: capitalize;
              ${mobile} {
                display: none;
              }
            `}
          >
            Hi {firstName}, take a minute and review your cart before you
            proceed
          </span>
          <span
            css={`
              display: block;
              ${mobile} {
                display: inline;
              }
            `}
          >
            Your plan details
          </span>
        </div>
      }
      onClose={handleCloseClick}
    >
      <div
        css={`
          padding: 15px;
          padding-top: 0;
          ${mobile} {
            /* display: none; */
          }
        `}
      >
        {groupCodes.map(groupCode => (
          <ProductCard
            key={groupCode}
            groupCode={groupCode}
            onClose={onClose}
          />
        ))}
        {/* {Object.keys(reducedAddOns).length > 0 && (
          <>
            <GradientTitle title="Add-on Coverages (Valid only 1 year)" />
            <Row
              css={`
                padding: 0 15px;
              `}
            >
              {Object.keys(reducedAddOns).map(addOnId => (
                <AddOnDetailsCard
                  key={addOnId}
                  addOn={reducedAddOns[addOnId][0]}
                />
              ))}
            </Row>
          </>
        )} */}
        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 30px;

            ${mobile} {
              flex-direction: column;
              border-top: 1px dashed #ddd;
              padding-top: 10px;
            }
          `}
        >
          <div
            css={`
              font-weight: 900;
              text-align: center;

              ${mobile} {
                display: flex;
                justify-content: space-between;
                width: 100%;
              }
            `}
          >
            <div
              css={`
                color: #000;
                font-size: 18px;
                ${mobile} {
                  font-size: 16px;
                  font-weight: 600;
                }
              `}
            >
              Total Premium
            </div>
            <div
              css={`
                color: var(--abc-red);
                font-size: 23px;
                text-align: left;
                ${mobile} {
                  font-size: 18px;
                }
              `}
            >
              {amount(totalPremium)}
            </div>
          </div>
          <Link
            to={propsoalPageLink}
            css={`
              ${mobile} {
                width: 100%;
              }
            `}
          >
            <div
              css={`
                width: 216px;
                background: var(--abc-red);
                color: #fff;
                border-radius: 2px;
                height: 49px;
                font-size: 20px;
                display: flex;
                align-items: center;
                justify-content: center;

                ${mobile} {
                  margin-top: 10px;
                  width: 100%;
                  border-radius: 2px;
                }
              `}
            >
              Proceed to Proposal
              {/* <i className="flaticon-next" /> */}
            </div>
          </Link>
        </div>
      </div>
      {/* <div
        css={`
          display: none;
          ${mobile} {
            display: block;
          }
        `}
      ></div> */}
    </PopUpWithCloseButton>
  );
}

export default ReviewCartPopup;

function ProductCard({ groupCode, onClose }) {
  const history = useHistory();
  const { product, deleteProduct } = useCartProduct(groupCode);
  const urlQuery = useUrlQuery();

  const handleCloseClick = () => {
    onClose();
  };

  const enquiryId = urlQuery.get("enquiryId");

  const reducedAddOns = product.addons.reduce((reducedAddOns, addon) => {
    const {
      product: {
        id,
        insurance_type: { alias },
      },
      members,
    } = addon;
    const key = id + alias;
    if (!reducedAddOns[key]) {
      return { ...reducedAddOns, [key]: { ...addon } };
    }
    return {
      ...reducedAddOns,
      [key]: {
        ...reducedAddOns[key],
        members: members.some(member =>
          reducedAddOns[key]["members"].includes(member),
        )
          ? reducedAddOns[key]["members"]
          : [...reducedAddOns[key]["members"], ...members],
      },
    };
  }, {});

  return (
    <>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <GradientTitle title={product.group.members.join(" + ")} />
        <div
          css={`
            display: flex;
          `}
        >
          <Link
            to={`/productdetails/${groupCode}?enquiryId=${enquiryId}`}
            onClick={handleCloseClick}
          >
            <img src={EditIcon} alt="edit" />
          </Link>
          <button
            onClick={() => {
              handleCloseClick();
              deleteProduct().then(() => {
                history.push(`/quotes/${groupCode}?enquiryId=${enquiryId}`);
              });
            }}
          >
            <img src={DeleteIcon} alt="remove-quote" />
          </button>
        </div>
      </div>
      <div
        css={`
          margin-bottom: 20px;
          ${mobile} {
            margin-top: 10px;
          }
        `}
      >
        <ProductDetailsCard cartItem={product} />
        <ProductDetailsCardMobile cartItem={product} />
      </div>
      {product.addons.length > 0 && (
        <div
          css={`
            ${mobile} {
              display: none;
            }
          `}
        >
          <GradientTitle title="Add-on Coverages (Valid only 1 year)" />
          <Row
            css={`
              padding: 0 15px;
            `}
          >
            {Object.keys(reducedAddOns).map(addOnKey => (
              <AddOnDetailsCard
                key={addOnKey}
                addOn={reducedAddOns[addOnKey]}
              />
            ))}
          </Row>
        </div>
      )}
    </>
  );
}

function GradientTitle({ title = "" }) {
  return (
    <h5
      className="text_title_filter p_modal_title_bg_filters_product"
      style={{
        textTransform: "capitalize",
        width: "max-content",
        fontSize: "20px",
      }}
      css={{
        backgroundImage: "linear-gradient(to right, #ffe7e7 37%, #fff 90%)",
      }}
    >
      {title}
    </h5>
  );
}

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;

  ${mobile} {
    display: block !important;
  }
`;

const ModalTitle = styled.h5`
  // font-family: "PFEncoreSansProblck";
  margin: 0 17px;
  margin-bottom: 0;
  line-height: 1.5;
  color: #000;
  font-size: 22px;
  font-weight: 900;
  width: 80%;
  &:after {
    content: "";
    height: 26px;
    width: 7px;
    position: absolute;
    left: 0px;
    top: 28px;
    background-color: #fecc28;
    border-radius: 50px;
  }
`;

// /* eslint-disable jsx-a11y/alt-text */
// import React, { useEffect } from "react";
// import { Col, Row } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { createCartItem } from "./../../QuotesPage/quotePage.slice";
// import editReview from "../../../assets/images/edit.png";
// import correctIcon from "../../../assets/images/correct_icon.png";
// import editPencil from "../../../assets/images/edit_pencil.png";
// import { useHistory } from "react-router";
// import SecureLS from "secure-ls";
// import "./ReviewCardPopup.scss";

// const ReviewCardPopup = ({
//   reviewModalOpen,
//   setReviewModalOpen,
//   totalPremium,
// }) => {
//   const ls = new SecureLS();
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const plan = useSelector(({ quotePage }) => quotePage.selectedPlan);
//   const { first_name } =
//     useSelector(({ greetingPage }) => greetingPage?.proposerDetails) || {};
//   const cartArr = useSelector(({ quotePage }) => quotePage.cartItems);
//   const { selectedRiders, selectedGroup } = useSelector(
//     ({ quotePage }) => quotePage,
//   );
//   const companies = useSelector(
//     state => state.frontendBoot.frontendData.data.companies,
//   );

//   const { memberGroups } = useSelector(state => state.greetingPage);

//   return (
//     <div
//       id="m-md-review"
//       className="modal modal-open"
//       data-backdrop="true"
//       style={
//         reviewModalOpen
//           ? {
//               display: "block",
//               backgroundColor: "rgba(0,0,0,0.3)",
//               overflowY: "auto",
//               overflowX: "hidden",
//             }
//           : { display: "none" }
//       }
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-md" style={{ maxWidth: 800 }}>
//         <div className="modal-content">
//           <div className="modal-header bg_more_header_filters">
//             <div className="product_title_p_bor_modal_filters">
//               <h5 className="modal-title modal_title_margin">
//                 Hey {first_name || "Dev"}, Take a minute and review your cart
//                 before
//                 <br />
//                 you proceed
//               </h5>
//             </div>
//             <button
//               type="button"
//               className="btn btn-white border_radius_modal"
//               data-dismiss="modal"
//               onClick={() => {
//                 setReviewModalOpen(false);
//               }}
//             >
//               <i className="fa fa-close"></i>
//             </button>
//           </div>
//           <div className="modal-body p-lg modal_body_padding_filters_product_page modal_scroll_filter_product">
//             <Row>
//               <Col md={12}>
//                 <div className="section_review_popup">
//                   {cartArr.map(item => (
//                     <>
//                       <Row>
//                         <Col md={8}>
//                           <h5 className="text_title_filter p_modal_title_bg_filters_product">
//                             {JSON.parse(item.members).join(", ")}
//                           </h5>
//                         </Col>
//                         <Col md={4} className="text-right">
//                           <img
//                             onClick={() => {
//                               history.push(
//                                 `/productdetails/${selectedGroup}?enquiry_id=${ls.get(
//                                   "enquiryId",
//                                 )}
// 																}`,
//                               );
//                               setReviewModalOpen(false);
//                             }}
//                             src={editReview}
//                             style={{ float: "right" }}
//                           />
//                         </Col>
//                       </Row>

//                       <div className="rider-box_product_pro">
//                         <div className="row_display_pro_review">
//                           <div className="logo_add float_left_addon_c">
//                             <img
//                               className="contain"
//                               src={
//                                 companies[item?.product?.company?.alias]?.logo
//                               }
//                             />
//                           </div>

//                           <div className="float_left_addon_c ">
//                             <p className="paln_name_t_product_pro">
//                               {item.product.name}
//                             </p>
//                           </div>
//                           <div className="float_product_cover_pro">
//                             <p className="label-add_product_pro">
//                               Cover
//                               <br />
//                               <span
//                                 className="blk edit_css_product addon_plan_d_inter_1_product_pro"
//                                 data-toggle="modal"
//                                 data-target="#mb-3-w_c"
//                               >
//                                 ₹{" "}
//                                 {parseInt(item.sum_insured).toLocaleString(
//                                   "en-IN",
//                                 )}
//                                 / per year
//                               </span>
//                             </p>
//                           </div>

//                           <div className="float_product_premium_pro">
//                             <div className="si_add si_add2">
//                               <p className="label-add_product_pro">
//                                 Premium
//                                 <br />
//                                 <span
//                                   className="blk edit_css_product"
//                                   data-toggle="modal"
//                                   data-target="#mb-3-w_c"
//                                 >
//                                   ₹{" "}
//                                   {parseInt(item.premium).toLocaleString(
//                                     "en-IN",
//                                   )}
//                                   / per year
//                                 </span>
//                               </p>
//                             </div>
//                           </div>

//                           <div className="rider-box1"></div>
//                         </div>
//                         <hr />
//                         <Row>
//                           {selectedRiders[selectedGroup]?.map(item => (
//                             <Col md={4}>
//                               <img src={correctIcon} className="display_in_m" />{" "}
//                               <span className="font_weight_normal">
//                                 {/* Unlimited Recharge */}

//                                 {item.name}
//                               </span>
//                               <p></p>
//                             </Col>
//                           ))}
//                         </Row>
//                       </div>
//                     </>
//                   ))}
//                   <br />
//                   <br />
//                   {/* <Row>
// 										<Col md={12}>
// 											<p className="bottom_addon_cover">Add-ons Coverages</p>
// 											<hr />
// 										</Col>
// 									</Row>
// 									<br />
// 									<div className="rider-box_product_pro">
// 										<div className="row_display_pro_review">
// 											<div className="logo_add float_left_addon_c">
// 												<img
// 													className="contain"
// 													src={companies["care_health"].logo}
// 												/>
// 											</div>

// 											<div className="float_left_addon_c ">
// 												<p className="paln_name_t_product_pro">
// 													Supera Super Topup (I)
// 												</p>
// 												<img src={editPencil} className="margin_add_edit_ic" />
// 											</div>
// 										</div>
// 										<hr />
// 										<Row>
// 											<Col md={4}>
// 												<div className="float_product_cover_pro">
// 													<p className="label-add_product_pro_c">
// 														Cover
// 														<br />
// 														<span
// 															className="blk edit_css_product addon_plan_d_inter_1_product_pro_add"
// 															data-toggle="modal"
// 															data-target="#mb-3-w_c"
// 														>
// 															₹ 5.5L / per year
// 															<i></i>
// 														</span>
// 													</p>
// 												</div>
// 											</Col>
// 											<Col md={4}>
// 												<div className="float_product_premium_pro">
// 													<div className="si_add si_add2">
// 														<p className="label-add_product_pro_c">
// 															Premium
// 															<br />
// 															<span
// 																className="blk edit_css_product addon_plan_d_inter_1_product_pro_add"
// 																data-toggle="modal"
// 																data-target="#mb-3-w_c"
// 															>
// 																₹ 15,225 / per year <i></i>
// 															</span>
// 														</p>
// 													</div>
// 												</div>
// 											</Col>
// 											<Col md={4}>
// 												<div className="float_product_premium_pro">
// 													<div className="si_add si_add2">
// 														<p className="label-add_product_pro_c">
// 															Insured
// 															<br />
// 															<span
// 																className="blk edit_css_product"
// 																data-toggle="modal"
// 																data-target="#mb-3-w_c"
// 															>
// 																Self, Spouse..<i></i>
// 															</span>
// 														</p>
// 													</div>
// 												</div>
// 											</Col>
// 										</Row>
// 									</div> */}

//                   <br />
//                   <Row>
//                     <Col md={6} className="text-left">
//                       <button
//                         type="button"
//                         name="Continue"
//                         className="next"
//                         value="Continue"
//                         style={{ height: 62 }}
//                       >
//                         <span className="color_span_total">Total Premium</span>
//                         <br />{" "}
//                         <span className="color_span_total_red">
//                           <i className="fa fa-inr"></i>{" "}
//                           {parseInt(totalPremium).toLocaleString("en-In")}
//                         </span>
//                       </button>
//                     </Col>
//                     <Col md={6} className="text-right">
//                       <a>
//                         <button
//                           type="button"
//                           name="Continue"
//                           className="next action-button proceed_to_action"
//                           value="Continue"
//                           style={{ height: 62 }}
//                           onClick={() => {
//                             history.push({
//                               pathname: "/proposal",
//                               search: `enquiryId=${ls.get("enquiryId")}`,
//                             });
//                           }}
//                         >
//                           Proceed to Proposal <i className="flaticon-next"></i>
//                         </button>
//                       </a>
//                     </Col>
//                   </Row>
//                   <br />
//                   <br />
//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewCardPopup;
