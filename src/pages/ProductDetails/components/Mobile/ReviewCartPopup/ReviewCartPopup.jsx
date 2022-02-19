import { Modal, Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { BackgroundBorderTitle } from "../../ReviewCart";
import CorrectIcon from "../../../../../assets/images/correct_icon.png";
import EditIcon from "../../../../../assets/images/edit.png";
import DeleteIcon from "../../../../../assets/images/remove.png";
import useUrlQuery from "../../../../../customHooks/useUrlQuery";
import { useCartProduct } from "../../../../Cart";
import { mobile } from "../../../../../utils/mediaQueries";
import { amount, calculateTotalPremium } from "../../../../../utils/helper";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { selectAdditionalDiscounts } from "../../../productDetails.slice";
import { useTheme } from "../../../../../customHooks";
import { useGetCartQuery, useGetEnquiriesQuery } from "../../../../../api/api";

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
          color: #253858;
          background: #f5f7f9;

          font-weight: 600;
          ${mobile} {
            border: none;
            padding: 10px;
          }
        `}
      >
        {title && (
          <ModalTitle
            css={`
              margin: 10px 9px;
              font-size: 18px;
              @media (max-width: 600px) {
                font-size: 15px;
                margin: 0px;
              }
              @media (max-width: 450px) {
                font-size: 13px;
              }
            `}
          >
            {title}
          </ModalTitle>
        )}
        <i
          onClick={handleClose}
          style={{ cursor: "pointer" }}
          class="fas fa-times"
        ></i>
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

          display: flex;
          justify-content: center;
          &:not(:last-child) {
            border-right: 1px solid #ddd;
          }
        `}
      >
        <div>
          <div
            css={`
              font-size: 14px;
            `}
          >
            {label}
          </div>
          <div
            css={`
              font-size: 15px;
              font-weight: 900;
              color: #505f79;
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
        padding: 20px;
        width: 100%;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          width: 40%;
        `}
      >
        <div className="logo_style_common" style={{ marginBottom: "0px" }}>
          <img src={logoSrc} alt={alias} />
        </div>
        <div
          css={`
            margin-left: 10px;
            font-weight: 900;
            width: 65%;
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
          width: 58%;
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
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <img
                src={logoSrc}
                alt={name}
                css={`
                  width: 100%;
                `}
              />
            </div>
            <span
              css={`
                font-size: 16x;
                margin-left: 1em;
              `}
            >
              {name}
            </span>
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
                    font-size: 12px;
                  `}
                >
                  Cover:
                </div>
                <div
                  css={`
                    font-size: 12px;
                  `}
                >
                  {amount(sum_insured)}
                </div>
              </div>
              {insurance_type.alias === "top_up" ? (
                <div
                  css={`
                    display: flex;
                    font-size: 12px;
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
                    font-size: 12px;
                  `}
                >
                  Premium:
                </div>
                <div
                  css={`
                    font-size: 12px;
                  `}
                >
                  {amount(total_premium)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          css={`
            background: #f5f7f9;
            display: flex;

            flex-direction: column;
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
              <span
                css={`
                  margin-right: 10px;
                  color: #419bf9;
                `}
              >
                <i class="far fa-check-circle"></i>
              </span>
              <span
                css={`
                  font-size: 14px;
                  @media (max-width: 500px) {
                    font-size: 11px;
                  }
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
          <div
            css={`
              border-bottom: 1px solid #d5dce5;
              position: relative;
              margin-bottom: 20px;
            `}
          >
            <div
              css={`
                color: #419bf9;
                border-radius: 15px;
                border: 2px solid #419bf9;
                padding: 5px 10px;
                font-size: 11px;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                left: 50%;

                width: fit-content;
                background: white;
                font-weight: 900;
              `}
            >
              Add-Ons Coverages
            </div>
          </div>
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
                      width: 50px;
                      height: 50px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
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
                  <span
                    css={`
                      font-size: 15x;
                      margin-left: 1em;
                    `}
                  >
                    {addon.product.name}
                  </span>
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
                        font-size: 12px;
                      `}
                    >
                      <div>Cover:</div>
                      <div>{amount(addon.sum_insured)}</div>
                    </div>
                    {insurance_type.alias === "top_up" ? (
                      <div
                        css={`
                          display: flex;
                          justify-content: space-between;
                          font-size: 12px;
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
                        font-size: 12px;
                      `}
                    >
                      <div>Premium:</div>
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

  const { theme } = useSelector(state => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

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
        border: 1px solid #d5dce5;
        padding: 10px 20px;
        border-radius: 10px;
        ${mobile} {
          display: none;
        }
      `}
    >
      <div
        class="row_display_pro_review d-flex"
        style={{ justifyContent: "space-between" }}
      >
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <div className="logo_style_common" style={{ marginBottom: "0px" }}>
            <img
              css={`
                width: 100%;
              `}
              src={logoSrc}
              alt={alias}
            />
          </div>

          <div>
            <span
              css={`
                margin-top: "0";
                font-weight: 900;
              `}
            >
              {name}
            </span>
          </div>
        </div>

        <div
          css={`
            width: 60%;
            display: flex;
          `}
        >
          <div
            className="float_product_cover_pro"
            css={`
              display: flex;
              align-items: center;
              flex: 1;
              justify-content: center;
            `}
          >
            <span class="label-add_product_pro">
              Cover
              <br />
              <span
                class="blk edit_css_product addon_plan_d_inter_1_product_pro"
                css={`
                  font-size: 15px;
                  font-weight: 900;
                  color: #505f79;
                `}
              >
                {amount(sum_insured)}
              </span>
            </span>
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
              <span class="label-add_product_pro">
                Premium
                <br />
                <span
                  class="blk edit_css_product"
                  css={`
                    font-size: 15px;
                    font-weight: 900;
                    color: #505f79;
                  `}
                >
                  {amount(total_premium)} /{" "}
                  {tenure === 1 ? "year" : `${tenure} years`}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="rider-box1"></div>
      </div>
      {health_riders.length > 0 ? <hr /> : null}
      <div class="row w-100 flex-row">
        {health_riders.map(health_rider => (
          <div
            css={`
              margin: 2px;
              width: fit-content;
              font-size: 14px;
              width: 48%;
            `}
          >
            <span
              css={`
                color: ${PrimaryColor};
              `}
            >
              <AiOutlineCheckCircle />
            </span>{" "}
            <span class="font_weight_normal">{health_rider.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCartPopupNew({
  propsoalPageLink,
  onClose = () => {},
  groupCode = 10022793,
}) {
  const { colors } = useTheme();
  const enquiryData = useGetEnquiriesQuery();
  const firstName = enquiryData?.data?.data?.name.split(" ")[0];
  /* const cart = useSelector(state => state.cart);
  console.log("The Cart", cart);
  const { memberGroups } = useSelector(state => state.greetingPage);
  const groupCodes = Object.keys(cart).filter(item =>
    Object.keys(memberGroups).includes(item),
  ;

  const allAddOns = groupCodes.reduce(
    (allAddOns, groupCode) => [...allAddOns, ...cart[groupCode].addons],
    [],
  );

  const additionalDiscounts = useSelector(selectAdditionalDiscounts);

  const findAdditionalDiscount = discountAlias =>
    additionalDiscounts.find(discount => discount.alias === discountAlias);

  let totalPremium = groupCodes.reduce((totalPremium, groupCode) => {
    const { discounts } = cart[groupCode];
    let newTotalPremium = totalPremium + calculateTotalPremium(cart[groupCode]);
    if (discounts) {
      discounts.forEach(discountAlias => {
        const discount = findAdditionalDiscount(discountAlias);
        if (discount) {
          newTotalPremium -= newTotalPremium * (discount.percent / 100);
        }
      });
    }
    return newTotalPremium;
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
  }, {}); */

  const handleCloseClick = () => {
    onClose();
  };

  const cartData = useGetCartQuery();

  const { tenure } = cartData?.data?.data?.find(
    singleProduct => singleProduct?.group.id === groupCode,
  ).product;

  return (
    <PopUpWithCloseButton
      title={
        <div>
          <span
            css={`
              text-transform: capitalize;
              ${mobile} {
                /* display: none; */
              }
            `}
          >
            Hi {firstName}, take a minute and review your cart before you
            proceed
          </span>
        </div>
      }
      onClose={() => handleCloseClick()}
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
        <ProductCard key={groupCode} groupCode={groupCode} onClose={onClose} />

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

              ${mobile} {
                display: flex;
                justify-content: space-between;
                width: 100%;
              }
            `}
          >
            <div
              css={`
                color: #505f79;
                font-size: 13px;
                ${mobile} {
                  font-size: 16px;
                  font-weight: 600;
                }
              `}
            >
              Total Premium :
            </div>
            <div
              css={`
                color: var(--abc-red);
                font-size: 20px;
                text-align: left;
                ${mobile} {
                  font-size: 18px;
                }
              `}
            >
              {amount("9999999")}
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
                background: ${colors.primary_color};
                color: #fff;
                border-radius: 2px;
                height: 49px;
                font-size: 15px;
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
            </div>
          </Link>
        </div>
      </div>
    </PopUpWithCloseButton>
  );
}

export default ReviewCartPopupNew;

function ProductCard({ groupCode, onClose }) {
  const history = useHistory();
  const cartData = useGetCartQuery();
  const product = cartData?.data?.data?.find(
    singleProduct => singleProduct?.group.id === groupCode,
  ).product;
  console.log("the members" , product)
  const urlQuery = useUrlQuery();

  const handleCloseClick = () => {
    onClose();
  };

  const enquiryId = urlQuery.get("enquiryId");

  /* const reducedAddOns = product.addons.reduce((reducedAddOns, addon) => {
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
 */
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
    </>
  );
}

function GradientTitle({ title = "" }) {
  return (
    <span
      className="text_title_filter p_modal_title_bg_filters_product"
      style={{
        textTransform: "capitalize",
        width: "max-content",
        fontSize: "15px",
        marginBottom: "20px",
        fontWeight: "900",
      }}
      css={`
        @media (max-width: 768px) {
          margin-top: 20px;
          margin-bottom: 10px !important;
        }
      `}
    >
      <span
        css={`
          width: 5px;
          height: 25px;
          position: absolute;
          background-color: #2cd44a;
          border-radius: 5px;
        `}
      ></span>
      <span
        css={`
          margin-left: 10px;
        `}
      >
        {title}
      </span>
    </span>
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
`;
