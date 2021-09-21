import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useCartProduct } from "../../Cart";
import { mobile, small } from "../../../utils/mediaQueries";
import "styled-components/macro";
import styled from "styled-components/macro";
import { amount } from "./ReviewCart";

function ProductCard({ groupCode }) {
  const { groupCode: groupCodeParam } = useParams();
  const { companies } = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );
  const { product, totalPremium } = useCartProduct(groupCode || groupCodeParam);

  if (!product) return <p>Empty Cart</p>;

  const {
    product: {
      name: productName,
      company: { alias: companyAlias, csr: companyCSR },
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
        border-radius: 3px;
        padding: 8px 10px;
        background: white;
        border: 1px solid #dfdfdf;

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
          display: flex;
          align-items: center;
        `}
      >
        {/* ************logo******** */}
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
          <img src={logoSrc} alt={companyAlias} className="w-100" />
        </div>
        {/* *************name*********** */}
        <div
          css={`
            margin-left: 18px;

            min-width: fit-content;
            max-width: 250px;

            ${mobile} {
              margin-left: 10px;
            }
          `}
        >
          <span
            css={`
              font-size: 17px;
              font-weight: 600;
              color: #394a68;
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
          </span>
        </div>
      </div>

      {/* ***********detail display panel********* */}
      <DetailDispalyPanel className="d-flex">
        <div className="detail_child">
          <span
            css={`
              color: #5a6981;
              font-size: 13px;
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
            Cover :
          </span>
          <span
            className="detail_amount"
            css={`
              font-size: 13px;
              color: #565657;
              font-weight: 600;
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
            {" "}
            {amount(product.sum_insured)}
          </span>
        </div>

        <div className="detail_child">
          <span
            css={`
              color: #5a6981;
              font-size: 11px;
              /* width: 90px; */

              ${mobile} {
                font-size: 12px;
                font-weight: 400;
              }

              ${small} {
                font-size: 8px;
                width: auto;
                line-height: normal;
              }
            `}
          >
            Total Premium :
          </span>
          <span
            className="detail_amount"
            css={`
              font-size: 13px;
              color: #565657;
              font-weight: 600;
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
            {" "}
            ₹ {totalPremiumAmount}/ Year
          </span>
        </div>

        <div className="detail_child">
          <span
            css={`
              color: #5a6981;
              font-size: 13px;
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
            Claim Settlement Ratio :
          </span>
          <span
            className="detail_amount"
            css={`
              font-size: 13px;
              color: #565657;
              font-weight: 600;
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
            {" "}
            {companyCSR}%
          </span>
        </div>
      </DetailDispalyPanel>

      {/* **********totalPremium panel*********** */}
      <div
        css={`
          background-color: #f4f6f8;
          border-radius: 8px;
          text-align: center;
          padding: 5px 10px;
          font-size: 20px;
          display: flex;
          flex-direction: column;
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
        <span
          css={`
            color: #5a6981;
            font-size: 13px;
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
          Total Premium :
        </span>
        <span
          css={`
            color: #253858;
            font-size: 18px;
            font-weight: 900;

            ${mobile} {
              font-size: 18px;
            }

            ${small} {
              font-size: 13px;
            }
          `}
        >
          ₹ {totalPremiumAmount} / Year
        </span>
      </div>
    </div>
  );
}

export default ProductCard;

const DetailDispalyPanel = styled.div`
  .detail_child:not(:last-child):after {
    content: " | ";
  }
`;
