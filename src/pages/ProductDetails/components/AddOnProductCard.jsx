import { useParams } from "react-router";
import styled from "styled-components/macro";
import { useGetEnquiriesQuery } from "../../../api/api";
import {
  useAdditionalDiscount,
  useCart,
  useFrontendBoot,
  useTheme,
} from "../../../customHooks";
import {
  amount,
  getTotalPremiumWithDiscount,
  numberToDigitWord,
  tenureInWords,
} from "../../../utils/helper";
import { mobile, small } from "../../../utils/mediaQueries";

function ProductCard() {
  const { groupCode } = useParams();

  const { colors } = useTheme();

  const { subJourneyType } = useFrontendBoot();

  const { getCartEntry } = useCart();

  const { getSelectedAdditionalDiscounts, getTotalDiscountAmount } =
    useAdditionalDiscount(groupCode);

  const additionalDiscounts = getSelectedAdditionalDiscounts();

  const cartEntry = getCartEntry(groupCode, {
    additionalDiscounts,
  });

  if (!cartEntry) return <p>Empty Cart</p>;

  const {
    product: {
      name: productName,
      company: { alias: companyAlias },
    },
    sum_insured,
    icLogoSrc,
    netPremiumWithoutDiscount,
  } = cartEntry;

  const sumInsured = numberToDigitWord(sum_insured);

  const totalPremiumAmount = getTotalPremiumWithDiscount({
    netPremiumWithoutDiscount,
    totalDiscountAmount: getTotalDiscountAmount(),
  });

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
          border: 1px solid ${colors?.primary_color};
          background-color: ${colors?.primary_shade};
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
                font-size: 12px;
              }
            `}
          >
            {" "}
            {sumInsured}
          </div>
        </div>
      </div>

      {subJourneyType === "renewal" ? (
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
              font-size: 12px;
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
              font-size: 14px;
            }

            ${small} {
              font-size: 14px;
              color: #0a87ff;
            }
          `}
        >
          {amount(totalPremiumAmount)}
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
    premium,
    tenure,
  } = cartEntry;

  const sumInsured = amount(sum_insured);

  const displayPremium = `${amount(premium)} / ${
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
  const { data } = useGetEnquiriesQuery();

  const name = data?.data?.name;
  const policy_number = data?.data?.renewal_policy?.prev_policy_no;

  return (
    <div
      css={`
        font-size: 0.79rem;
        @media (max-width: 1200px) {
          display: none !important;
        }
      `}
      className="d-flex"
    >
      <Detail label={"Proposer Name"}>{name}</Detail>
      <Detail label={"Policy No."}>{policy_number}</Detail>
      <Detail label={"Policy Term"}>{tenureInWords(tenure)}</Detail>
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
          color: ${colors?.font?.one};
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
