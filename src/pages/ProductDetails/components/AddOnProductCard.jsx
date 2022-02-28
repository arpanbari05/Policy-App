import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useCartProduct } from "../../Cart";
import { mobile, small } from "../../../utils/mediaQueries";
import "styled-components/macro";
import styled from "styled-components/macro";
import { useCart } from "../../../customHooks";
import { amount } from "../../../utils/helper";

function ProductCard() {
  const { groupCode } = useParams();

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(parseInt(groupCode));

  if (!cartEntry) return <p>Empty Cart</p>;

  const {
    product: {
      name: productName,
      company: { alias: companyAlias, csr: companyCSR },
    },
    sum_insured,
    icLogoSrc,
    total_premium,
    netPremium,
    tenure,
  } = cartEntry;

  const sumInsured = amount(sum_insured);

  const totalPremiumAmount = amount(netPremium);

  const displayPremium = `${amount(total_premium)} / ${
    tenure > 1 ? `${tenure} Years` : "Year"
  }`;

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
        padding: 5px 10px;

        background: white;
        border: 1px solid #dfdfdf;

        ${mobile} {
          padding: 12px 10px;
        }

        ${small} {
          padding: 16px 6px;
          border-radius: 7px;
          border: 1px solid #0a87ff;
          background-color: #eff7ff;
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
            height: 50px; 
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2px 0px;
            border-radius: 2px;

            ${small} {
              height: 45px;
            }
          `}
        >
          <img css={`height: 100% !important;`} src={icLogoSrc} alt={companyAlias} />
        </div>
        {/* *************name*********** */}
        <div
          css={`
            margin-left: 18px;

            /* width: fit-content; */
            width: 170px;
            max-width: 100%;
            @media (max-width: 1201px) {
              width: 100%;
            }

            ${mobile} {
              margin-left: 10px;
            }
          `}
        >
          <div
            css={`
              font-size: 15px;
              font-weight: 600;
              color: #394a68;

              ${mobile} {
                font-size: 14px;
                font-weight: 600;
              }
              ${small} {
                font-size: 13px;
              }
            `}
          >
            {productName}
          </div>
          <div
            css={`
              display: none;
              @media (max-width: 1200px) {
                display: block;
              }
              @media (max-width: 536px) {
                font-size: 10px;
              }
            `}
          >
            {" "}
            {sumInsured}
          </div>
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
            {sumInsured}
          </span>
        </div>

        <div className="detail_child">
          <span
            css={`
              color: #5a6981;
              font-size: 13px;
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
            Premium :
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
            {displayPremium}
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
          @media (max-width: 537px) {
            width: 125px !important;
          }
          ${small} {
            height: 37px;
            /* width: 67px; */
            border-radius: 7px;
            background-color: white;
          }
        `}
      >
        <span
          css={`
            color: #5a6981;
            font-size: 13px;
            /* width: 90px; */
            @media (max-width: 992px) {
              font-size: 11px;
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

            @media (max-width: 992px) {
              font-size: 12px;
            }

            ${small} {
              font-size: 12px;
              color: #0a87ff;
            }
          `}
        >
          {totalPremiumAmount}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;

const DetailDispalyPanel = styled.div`
  background: #fafbfc;
  padding: 17px;
  border-radius: 10px;

  @media (max-width: 1200px) {
    display: none !important;
  }
  .detail_child:not(:last-child):after {
    content: " | ";
    font-size: 15px;
    margin: 0px 15px;
    color: #dedfe0;
  }
`;
