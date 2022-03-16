import { useParams } from "react-router";
import { mobile, small } from "../../../utils/mediaQueries";
import styled from "styled-components/macro";
import {
  useAdditionalDiscount,
  useCart,
  useFrontendBoot,
  useRiders,
  useTenureDiscount,
  useTheme,
} from "../../../customHooks";
import { amount, numberToDigitWord } from "../../../utils/helper";
import "styled-components/macro";
import _ from "lodash";

function ProductCard() {
  const { groupCode } = useParams();

  const { journeyType } = useFrontendBoot();

  const { getCartEntry } = useCart();

  const { getSelectedAdditionalDiscounts } = useAdditionalDiscount(groupCode);

  const additionalDiscounts = getSelectedAdditionalDiscounts();

  const cartEntry = getCartEntry(groupCode, {
    additionalDiscounts,
  });

  const {
    product: {
      name: productName,
      company: { alias: companyAlias },
    },
    sum_insured,
    icLogoSrc,
    netPremium,
    tenure,
  } = cartEntry;

  const isTotalPremiumLoading = useTotalPremiumLoader(cartEntry);

  if (!cartEntry) return <p>Empty Cart</p>;

  const sumInsured = amount(sum_insured);

  const totalPremiumAmount = amount(netPremium);

  return (
    <div
      css={`
        display: flex;
        align-items: center;
        justify-content: space-between;
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
            max-width: 100%;
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
          <img
            css={`
              height: 100% !important;
            `}
            src={icLogoSrc}
            alt={companyAlias}
          />
        </div>
        {/* *************name*********** */}
        <div
          css={`
            margin-left: 10px;

            /* width: fit-content; */
            max-width: 170px;
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
              font-size: 14px;
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

      {journeyType === "renewal" ? (
        <PolicyDetails cartEntry={cartEntry} />
      ) : (
        <PlanDetails cartEntry={cartEntry} />
      )}

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
            border-radius: 7px;
            background-color: white;
          }
        `}
      >
        <span
          css={`
            color: #5a6981;
            font-size: 13px;
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

function PlanDetails({ cartEntry }) {
  const {
    product: {
      company: { csr: companyCSR },
    },
    sum_insured,
    total_premium,
    tenure,
  } = cartEntry;

  const sumInsured = amount(sum_insured);

  const displayPremium = `${amount(total_premium)} / ${
    tenure > 1 ? `${tenure} Years` : "Year"
  }`;
  return (
    <DetailDispalyPanel className="d-flex">
      <div className="detail_child">
        <LabelStyle mobile={mobile} small={small}>
          Cover :
        </LabelStyle>
        <ValueStyle mobile={mobile} small={small} className="detail_amount">
          {" "}
          {sumInsured}
        </ValueStyle>
      </div>

      <div className="detail_child">
        <LabelStyle mobile={mobile} small={small}>
          Premium :
        </LabelStyle>
        <ValueStyle mobile={mobile} small={small} className="detail_amount">
          {" "}
          {displayPremium}
        </ValueStyle>
      </div>

      <div className="detail_child">
        <LabelStyle mobile={mobile} small={small}>
          Claim Settlement Ratio :
        </LabelStyle>
        <ValueStyle mobile={mobile} small={small} className="detail_amount">
          {" "}
          {companyCSR}%
        </ValueStyle>
      </div>
    </DetailDispalyPanel>
  );
}

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

const ValueStyle = styled.span`
  font-size: 12px;
  color: #565657;
  font-weight: 600;
  @media (max-width: 1350px) {
    font-size: 12px !important;
  }
  ${props => props.mobile} {
    font-size: 14px;
    color: #000;
    font-weight: 400;
  }

  ${props => props.small} {
    font-size: 11px;
    line-height: normal;
    margin-top: 3px;
  }
`;

const LabelStyle = styled.span`
  color: #5a6981;
  font-size: 12px;
  @media (max-width: 1350px) {
    font-size: 12px !important;
  }

  ${props => props.mobile} {
    font-size: 14px;
    font-weight: 400;
  }

  ${props => props.small} {
    font-size: 8px;
    width: auto;
    line-height: normal;
  }
`;

function PolicyDetails({ cartEntry }) {
  const { sum_insured, tenure } = cartEntry;
  return (
    <div
      css={`
        font-size: 0.79rem;
      `}
      className="d-flex"
    >
      <Detail label={"Proposer Name"}>Testing With A Very Long Name</Detail>
      <Detail label={"Policy No."}>123123123</Detail>
      <Detail label={"Policy Term"}>{tenure}Yr</Detail>
      <Detail label={"Sum Insured"}>{numberToDigitWord(sum_insured)}</Detail>
    </div>
  );
}

function Detail({ label, children }) {
  const { colors } = useTheme();

  return (
    <div
      css={`
        :not(:last-child) {
          border-right: 1px solid;
        }
        padding: 0 2em;
      `}
    >
      <div
        css={`
          color: ${colors.font.one};
        `}
      >
        {label}
      </div>
      <div
        css={`
          font-weight: 900;
        `}
      >
        {children}
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
