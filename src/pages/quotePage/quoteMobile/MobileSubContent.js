import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import logo from "../../../assets/images/Care_Health.png";
import seeDetails from "../../../assets/images/back.png";
import { useHistory } from "react-router";
import SecureLS from "secure-ls";
import { useDispatch, useSelector } from "react-redux";
import { cashless } from "../../../assets/index";
import { quoteCardDataset } from "./MobileQuoteCard";
import {
  removeQuotesForCompare,
  setQuotesForCompare,
  setQuotesOnCompare,
} from "../quote.slice";
const MobileSubContent = ({
  quoteCardData,
  quotesForCompare,
  handleClick,
  handleSeeDetails,
  addProduct,
}) => {
  const {
    product: { name, id },
    premium,
    total_premium,
    tenure,
    logo,
    insurance_id,
    cashlessHospitalsCount,
    sum_insured,
    tax_amount,
    company_alias,
    features,
  } = quoteCardData;
  const dispatch = useDispatch();
  const history = useHistory();
  const { theme } = useSelector(state => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const ls = new SecureLS();
  const [isLoading, setIsLoading] = useState(false);
  const [activeCover, setActiveCover] = useState(0);

  const { selectedGroup, cartItems } = useSelector(state => state.quotePage);

  const { memberGroups } = useSelector(state => state.greetingPage);

  const members = memberGroups[selectedGroup];

  const handleBuyNowClick = () => {
    const selectedPlan = {
      // company_alias: mergedQuotes[0]?.company_alias,
      // logo: mergedQuotes[0]?.logo,
      product: { name, id },
      total_premium: total_premium[activeCover],
      // premium: premium[activeCover],
      sum_insured: sum_insured[activeCover],
      tax_amount: tax_amount[activeCover],
      tenure: tenure[activeCover],
    };

    addProduct({
      ...selectedPlan,
      product_id: selectedPlan.product?.id,
      premium: selectedPlan.total_premium,
      group_id: parseInt(selectedGroup),
      service_tax: selectedPlan.tax_amount,
    }).then(handleClick);
  };

  const [checked, setChecked] = useState(
    quotesForCompare.includes(`${id}${sum_insured}`) ? true : false,
  );

  const plansData = [
    ...features?.[activeCover].filter(i => i.is_featured_on_card),
    {
      name: "Cashless Hospital",
      value: cashlessHospitalsCount[activeCover],
      description:
        "A specific percent of claim amount is paid by the Insured person in case the treatment is taken at a hospital not mentioned in the Network Hospitals list.",
      icon: cashless,
    },
  ];

  useEffect(() => {
    if (quotesForCompare.includes(`${id}${sum_insured[activeCover]}`)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [quotesForCompare, checked, activeCover]);

  return (
    <div
      css={`
        position: relative;
        width: 100%;
      `}
    >
      {" "}
      <input
        type="checkbox"
        style={{ display: "contents" }}
        id={`Mcompare_${id}${sum_insured[activeCover]}`}
        onChange={() => {
          dispatch(setQuotesOnCompare());
          if (!checked) {
            const numberOfPlans = window.matchMedia("(max-width: 1023px)")
              .matches
              ? 2
              : 3;
            dispatch(
              setQuotesForCompare([
                `${id}${sum_insured[activeCover]}`,
                numberOfPlans,
              ]),
            );
          } else {
            dispatch(
              removeQuotesForCompare(`${id}${sum_insured[activeCover]}`),
            );
          }
        }}
      />
      <label
        htmlFor={`Mcompare_${id}${sum_insured[activeCover]}`}
        css={`
          position: absolute;
          display: flex;
          align-items: center;
          height: 40px;
          border-radius: 2px 40px 0px 2px;
          width: 159px;
          padding: 0 10px;
          top: 2px;
          z-index: 97;
          left: 4px;
          font-size: 11px;
        `}
      >
        <div
          css={`
            height: 15px !important;
            width: 15px;
            display: flex !important;
            border: 1px solid;
            border-radius: 50%;
            background: #fff;
            border-color: ${checked ? PrimaryColor : "#d2d8e2"};
            align-items: center;
            justify-content: center;

            margin-right: 7px;
            &::after {
              display: ${checked ? "block" : "none"};
              content: "\u2713";
              height: 9px;
              width: 9px;
              background-color: ${PrimaryColor};
              color: #fff;
              border-radius: 50%;
            }
          `}
        />
        <span
          css={`
            position: relative;
            top: 1px;
          `}
        >
          Add to compare
        </span>
      </label>
      <span
        css={`
          position: absolute;
          display: flex;
          align-items: center;
          height: 40px;
          border-radius: 40px 0px 2px 2px;
          width: 130px;
          padding: 0 10px;
          top: 2px;
          z-index: 97;
          right: 4px;
          justify-content: flex-end;
        `}
        onClick={e => {
          e.preventDefault();
          handleSeeDetails({
            quote: quoteCardData,
            activeSum: activeCover,
          });
        }}
      >
        <span
          css={`
            font-size: 11px;
          `}
        >
          See Details{" "}
        </span>
        <img
          css={`
            height: 21px;
            margin-left: 5px;
          `}
          src={seeDetails}
        />
      </span>
      <div
        css={`
          border-radius: 12px;
          background: #fff;
          margin: 34px 0 11px;
          margin-top: 13px;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;

          & div {
            height: 50%;
          }
        `}
      >
        <div
          css={`
            padding: 15px;
            padding-top: 48px;
            display: flex;
            justify-content: space-between;
          `}
        >
          {" "}
          <div
            css={`
              display: flex;
            `}
          >
            <img
              css={`
                object-fit: contain;
                height: 30px;
                width: 60px;
                margin-right: 10px;
              `}
              src={logo}
            />
            <div
              css={`
                display: flex;
                flex-direction: column;
              `}
            >
              <span
                css={`
                  font-weight: 900;
                  line-height: 16px;
                  max-height: 34px;
                  font-size: 13px;
                  overflow: hidden;
                `}
              >
                {name}
              </span>
              <span
                css={`
                  font-size: 11px;
                `}
              >
                Cover:{" "}
                {sum_insured?.length > 1 ? (
                  <select
                    css={`
                      font-size: 11px;
                      font-weight: 100;
                    `}
                    onChange={e => setActiveCover(e.target.value)}
                  >
                    {sum_insured.map((data, i) => {
                      return (
                        <option key={i} value={i}>
                          {data}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <span
                    css={`
                      color: ${PrimaryColor};
                    `}
                  >
                    {sum_insured[activeCover]}
                  </span>
                )}{" "}
              </span>
            </div>
          </div>
          <div
            css={`
              width: 40%;
              height: 100%;
            `}
          >
            <Button onClick={handleBuyNowClick} PrimaryColor={PrimaryColor}>
              {" "}
              <i className="fa fa-inr"></i> {total_premium[activeCover]}
            </Button>
          </div>
        </div>
        <div
          css={`
            background-color: #f8fafc;
            padding: 9px;
          `}
        >
          <div
            css={`
              display: flex;
              flex-direction: row;
            `}
          >
            <div
              css={`
                font-size: 8px;
                line-height: 2;
                width: 100%;
                & .feature-cell:first-child {
                  padding-left: 0 !important;
                }
                & .feature-cell:last-child {
                  padding-right: 0 !important;
                  border-right: unset !important;
                }
              `}
            >
              {plansData.map((data, index) =>
                quoteCardDataset(data, index, PrimaryColor),
              )}
              {/* <span
                className={"feature-cell"}
                css={`
                  padding: 0 10px;
                  border-right: 1px solid #9cacc9;
                `}
              >
                <span>Room Rent: </span>
                <span
                  css={`
                    color: #c7222a;
                  `}
                >
                  Single Private Room{" "}
                  <span
                    css={`
                      font-size: 11px;
                    `}
                  >
                    ⓘ
                  </span>
                </span>
              </span>
              <span
                className={"feature-cell"}
                css={`
                  padding: 0 10px;
                  border-right: 1px solid #9cacc9;
                `}
              >
                <span>No Claim Bonus: </span>
                <span
                  css={`
                    color: #c7222a;
                  `}
                >
                  Up to 50%{" "}
                  <span
                    css={`
                      font-size: 11px;
                    `}
                  >
                    ⓘ
                  </span>
                </span>
              </span>
              <span
                className={"feature-cell"}
                css={`
                  padding: 0 10px;
                  border-right: 1px solid #9cacc9;
                `}
              >
                <span>Pre Existing Disease : </span>
                <span
                  css={`
                    color: #c7222a;
                  `}
                >
                  4 years{" "}
                  <span
                    css={`
                      font-size: 11px;
                    `}
                  >
                    ⓘ
                  </span>
                </span>
              </span>
              <span
                className={"feature-cell"}
                css={`
                  padding: 0 10px;
                  border-right: 1px solid #9cacc9;
                `}
              >
                <span>Copay: </span>
                <span
                  css={`
                    color: #c7222a;
                  `}
                >
                  yes{" "}
                  <span
                    css={`
                      font-size: 11px;
                    `}
                  >
                    ⓘ
                  </span>
                </span>
              </span>
              <span
                className={"feature-cell"}
                css={`
                  padding: 0 10px;
                  border-right: 1px solid #9cacc9;
                `}
              >
                <span>Cashless Hospitals: </span>
                <span
                  css={`
                    color: #c7222a;
                  `}
                >
                  41{" "}
                  <span
                    css={`
                      font-size: 11px;
                    `}
                  >
                    ⓘ
                  </span>
                </span>
              </span> */}
            </div>
            {/* <div
              css={`
                height: 100%;
                background-color: #e8edf2;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                align-content: center;
                justify-content: center;
                width: 70px;
                height: 50px !important;
              `}
            >
              <img
                css={`
                  height: 27px;
                `}
                src={seeDetails}
              />
              <span
                css={`
                  font-size: 11px;
                `}
              >
                {" "}
                see details
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSubContent;

const Button = styled.button.attrs(props => ({
  type: props.type,
}))`
  box-sizing: border-box;
  user-select: none;
  background: ${props => props.PrimaryColor};
  border: none;
  color: white;
  width: 100%;
  cursor: pointer;
  padding: 4px 9px;
  display: block;
  border-radius: 2px;
  font-size: 15px;
  font-weight: 400;
  line-height: 33px;
  height: 42px;
  z-index: 9999;
`;
