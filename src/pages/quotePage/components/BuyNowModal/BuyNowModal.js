import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import addBtn from "../../../../assets/images/add_btn.png";
import CardModal from "../../../../components/Common/Modal/CardModal";
import remove from "../../../../assets/images/remove.png";
import { useHistory } from "react-router-dom";
import SecureLS from "secure-ls";
import styled from "styled-components";
import "styled-components/macro";
import { useCartProduct } from "../../../Cart";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import { setSelectedGroup } from "../../quote.slice";
function calculateTotalPremium(riders) {
  let total = 0;
  if (riders instanceof Array && riders.length) {
    riders.forEach(item => {
      total += item.total_premium;
    });
  }
  return total;
}
function ProductCard({ product }) {
  const companies = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data.companies,
  );

  if (!product) return null;

  const {
    sum_insured,
    total_premium: premium,
    tenure,
    product: {
      name: productName,
      company: { alias: company_alias },
    },
    health_riders,
  } = product || { product: { company: {} } };
  const ridersPremium = calculateTotalPremium(health_riders);

  const { logo } = companies[company_alias] || {};
  return (
    <>
      <div
        css={`
          display: none;

          @media (max-width: 767px) {
            display: block;

            margin: 11px 0;
            border: 1px solid #ddd;
            box-shadow: 0 3px 15px 0 rgb(0 75 131 / 30%);
          }
        `}
      >
        <span
          css={`
            padding: 20px;
            width: 100%;
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #ddd;
            align-items: flex-start;
            & img {
              width: 48px;
              margin-right: 10px;
            }
            & span {
              font-weight: 900;
            }
          `}
        >
          <img src={logo} />
          <span
            css={`
              @media (max-width: 767px) {
                font-size: 12px !important;
              }
            `}
          >
            {" "}
            {productName}
          </span>
        </span>
        <span
          css={`
            display: flex;
            width: 100%;
            padding: 5px 0;
            justify-content: space-between;
            background: rgb(240 243 247);
          `}
        >
          <ProductData noBorder>
            <span class="label-add_product">Sum Insured</span>
            <span>₹ {parseInt(sum_insured).toLocaleString("en-IN")}</span>
          </ProductData>
          <ProductData>
            <span class="label-add_product">Premium</span>
            <span>
              ₹ {parseInt(premium + health_riders).toLocaleString("en-IN")}
            </span>
          </ProductData>
          <ProductData>
            <span class="label-add_product">Tenure</span>
            <span> {tenure} Year</span>
          </ProductData>
        </span>
      </div>
      <ProductContainer>
        <div>
          <img className="contain" src={logo} alt="logo" />
        </div>
        <div>
          <ProductName flag={productName.length > 20}>
            {productName}
          </ProductName>
        </div>
        <ProductData>
          <span class="label-add_product">Sum Insured</span>
          <span>₹ {parseInt(sum_insured).toLocaleString("en-IN")}</span>
        </ProductData>
        <ProductData>
          <span class="label-add_product">Premium</span>
          <span>
            ₹ {parseInt(premium + ridersPremium).toLocaleString("en-IN")}
          </span>
        </ProductData>
        <ProductData>
          <span class="label-add_product">Tenure</span>
          <span>
            {" "}
            {tenure >= 2 ? `${tenure + " Years"}` : `${tenure + " Year"}`}
          </span>
        </ProductData>
      </ProductContainer>
    </>
  );
}

function BuyNowModalProduct({ groupCode, setShowBuyNow = () => {} }) {
  const members = useSelector(
    state => state.greetingPage.memberGroups[groupCode],
  );
  const dispatch = useDispatch();
  const { product, deleteProduct } = useCartProduct(groupCode);
  const { loadingQuotes } = useSelector(state => state.quotePage);
  const history = useHistory();

  const urlSearchParams = useUrlQuery();

  const enquiryId = urlSearchParams.get("enquiryId");

  const currentGroup = JSON.parse(localStorage.getItem("groups")).find(
    group => group.id,
  );

  if (!members) return <p>No Members found for groupCode {groupCode}</p>;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h5
          className="text_title_filter p_modal_title_bg_filters_product d-flex align-items-center"
          style={{ textTransform: "capitalize" }}
          css={`
            @media (max-width: 400px) {
              font-size: 10px !important;
            }
          `}
        >
          <div
            css={`
              height: 31px;
              width: 6px;
              border-radius: 3px;
              margin-right: 14px;
              background: #2cd44a;
            `}
          ></div>
          {members.join(" + ")?.replaceAll("_", "-")}
        </h5>

        {product ? (
          <>
            {/* <a
              css={`
                display: none !important;
                @media (max-width: 767px) {
                  display: flex !important;
                  justify-content: flex-end;
                }
              `}
              onClick={deleteProduct}
            >
              {" "}
              <img src={remove} alt="remove" />
            </a> */}
            <button
              css={`
                justify-content: space-between;
                width: 35px;
                height: 35px;
                color: #168cff;
                background: #eff7ff;
                display: flex;
                font-size: 22px;
                align-items: center;
                justify-content: center;
                border-radius: 100%;
                @media (max-width: 400px) {
                  font-size: 15px;
                  width: 30px;
                  height: 30px;
                }
              `}
              className="btn"
              onClick={deleteProduct}
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </>
        ) : (
          <Col
            md={4}
            css={`
              display: flex;
              justify-content: flex-end;
              margin-bottom: 11px;
              pointer-events: ${loadingQuotes && "none"};
              filter: ${loadingQuotes && "grayscale(100%)"};
              opacity: ${loadingQuotes && "0.7"};
            `}
          >
            <button
              type="submit"
              className="btn"
              css={`
                justify-content: space-between;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                background: rgb(235, 245, 255);
                color: #0d6efd;
                @media (max-width: 400px) {
                  font-size: 10px;
                  width: 100px;
                }
              `}
              onClick={() => {
                setShowBuyNow(false);
                history.push({
                  pathname: `/quotes/${groupCode}`,
                  search: `enquiryId=${enquiryId}&pincode=${currentGroup.pincode}&city=${currentGroup.city}`,
                });
                dispatch(setSelectedGroup(groupCode));
              }}
            >
              <span
                css={`
                  margin-right: 5px;
                `}
              >
                {" "}
                Add Plan
              </span>{" "}
              <i class="fas fa-plus-circle"></i>
            </button>
          </Col>
        )}
      </div>
      <ProductCard product={product} />
    </>
  );
}

const PopupContent = (a, b, setShowBuyNow) => {
  const { memberGroups } = useSelector(state => state.greetingPage);

  return (
    <div
      css={`
        :not(:last-child) {
          margin-bottom: 10px;
        }
      `}
    >
      {Object.keys(memberGroups).map(groupCode => (
        <BuyNowModalProduct
          groupCode={groupCode}
          setShowBuyNow={setShowBuyNow}
        />
      ))}
    </div>
  );
};

const BuyNowModal = ({ showBuyNow, setShowBuyNow }) => {
  const plan = useSelector(({ quotePage }) => quotePage.selectedPlan);

  const { companies } = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data,
  );
  const { memberGroups } = useSelector(state => state.greetingPage);
  const history = useHistory();
  const ls = new SecureLS();
  const cart = useSelector(state => state.cart);
  const selectedGroupCodes = Object.keys(cart);
  const allMemberGroups = Object.keys(memberGroups);
  const firstMemberGroup = selectedGroupCodes.find(
    groupCode =>
      cart[groupCode] !== null && allMemberGroups.includes(groupCode),
  );
  return (
    <CardModal
      show={showBuyNow}
      handleClose={() => {
        setShowBuyNow(false);
      }}
      content={PopupContent(showBuyNow, companies, setShowBuyNow, plan)}
      title={"Hey User, Take a minute and review your cart before you proceed"}
      handleClick={() =>
        history.push(
          `/productdetails/${firstMemberGroup}?enquiryId=${ls.get(
            "enquiryId",
          )}`,
        )
      }
      showButton={!!firstMemberGroup}
      buttonValue={"Continue"}
      customClass={"buynow-modal"}
    />
  );
};

export default BuyNowModal;

const ProductData = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  border-left: 1px solid #dce2ec;
  padding-left: 34px;

  position: relative;
  left: -16px;
  & .label-add_product {
    color: #000;
    font-size: 18px;
    line-height: 21px;
    font-weight: 900;
  }
  @media (max-width: 767px) {
    border-left: ${props => props.noBorder && "unset"};
    padding-left: 0px;
    left: unset;
    font-size: 12px;
    width: 31%;
    text-align: center;
    & .label-add_product {
      font-size: 12px;
    }
  }
  @media (max-width: 400px) {
  }
`;
const ProductName = styled.span`
  color: #000;
  font-size: 15px;
  font-weight: 900;
  margin-right: -26px;
`;

const ProductContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #dce2ec;
  margin: 10px 0;
  height: 98px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & img {
    width: 68px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
