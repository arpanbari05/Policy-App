import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useCartProduct } from "../../Cart";
import { mobile, small } from "../../../utils/mediaQueries";
import "styled-components/macro";
import { amount } from "./ReviewCart";

function ProductCard({ groupCode }) {
  const { groupCode: groupCodeParam } = useParams();
  const { companies } = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data,
  );
  const { product, totalPremium } = useCartProduct(groupCode || groupCodeParam);

  if (!product) return <p>Empty Cart</p>;

  const {
    product: {
      name: productName,
      company: { alias: companyAlias },
    },
  } = product;

  const logoSrc = companies[companyAlias].logo;

  const totalPremiumAmount = parseInt(totalPremium).toLocaleString("en-In");

  return (
    <div
      css={`
        /* background-color: var(--light-pink); */
        /* height: 106px; */
        /* border-radius: 4px; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* padding: 0 20px; */
        border-radius: 12px;
        padding: 8px 30px;
        background: #fff1f1;
        border: 1px solid #d68d87;
        box-shadow: 0 20px 30px -19px #e6dcdc;

        ${mobile} {
          padding: 12px 10px;
        }

        ${small} {
          padding: 16px 6px;
          border-radius: 7px;
        }
      `}
    >
      <div
        css={`
          flex: 1;
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={`
            max-width: 90px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
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
          css={`
            margin-left: 20px;
            ${mobile} {
              margin-left: 10px;
            }
          `}
        >
          <h3
            css={`
              font-size: 22px;
              ${mobile} {
                font-size: 16px;
                font-weight: 600;
              }
              ${small} {
                font-size: 13px;
              }
            `}
          >
            {productName}
          </h3>
          <p
            css={`
              font-size: 16px;
              color: var(--abc-red);

              ${mobile} {
                font-size: 14px;
                color: #000;
                font-weight: 400;
              }

              ${small} {
                font-size: 11px;
                line-height: normal;
                margin-top: 3px;
              }
            `}
          >
            {amount(product.sum_insured)}
          </p>
        </div>
      </div>
      <div
        css={`
          background-color: #fff;
          border-radius: 8px;
          text-align: center;
          padding: 10px 26px;
          font-size: 20px;

          ${mobile} {
            padding: 4px 10px;
          }

          ${small} {
            height: 37px;
            /* width: 67px; */
            border-radius: 7px;

          }
        `}
      >
        <p
          css={`
            color: #000;
            font-size: 16px;
            /* width: 90px; */

            ${mobile} {
              font-size: 14px;
              font-weight: 400;
            }

            ${small} {
              font-size: 8px;
              width: auto;
              line-height: normal;
            }
          `}
        >
          Total Premium
        </p>
        <p
          css={`
            color: var(--abc-red);
            font-size: 22px;
            font-weight: 900;

            ${mobile} {
              font-size: 18px;
            }

            ${small} {
              font-size: 13px;
            }
          `}
        >
          ₹ {totalPremiumAmount}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
