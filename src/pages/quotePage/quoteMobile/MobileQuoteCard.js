import React, { useState } from "react";
import styled from "styled-components/macro";
import info from "../../../assets/svg/tooltip-icon";
import seeDetails from "../../../assets/images/back.png";
import MobileSubContent from "./MobileSubContent";
import { Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
// import useQuoteCard from "./QuoteCard/useQuoteCard";
import { cashless, downArrow } from "../../../assets";
import {
  removeQuotesForCompare,
  saveSelectedPlan,
  setQuotesForCompare,
  setQuotesOnCompare,
} from "../quote.slice";
import { useCartProduct } from "../../Cart";
import { useParams } from "react-router";
import useQuoteCard from "../components/useQuoteCard";

const MobileQuoteCard = ({ handleClick, item, handleSeeDetails,isRecommended }) => {
  const [open, setOpen] = useState(false);
  const {
    dispatch,
    show,
    setShow,
    checked,
    mergedQuotes,
    quotesForCompare,
    activeCover,
    setActiveCover,
  } = useQuoteCard({ item });
  const { groupCode: selectedGroup } = useParams();
  const { addProduct, isCartProductLoading } = useCartProduct(selectedGroup);

  const handleBuyNowClick = () => {
    const selectedPlan = {
      // company_alias: mergedQuotes[0]?.company_alias,
      // logo: mergedQuotes[0]?.logo,
      product: mergedQuotes[0]?.product,
      total_premium: mergedQuotes[0]?.total_premium[activeCover],
      // premium: mergedQuotes[0]?.premium[activeCover],
      sum_insured: mergedQuotes[0]?.sum_insured[activeCover],
      tax_amount: mergedQuotes[0]?.tax_amount[activeCover],
      tenure: mergedQuotes[0]?.tenure[activeCover],
    };

    addProduct({
      ...selectedPlan,
      product_id: selectedPlan.product?.id,
      premium: selectedPlan.total_premium,
      group_id: parseInt(selectedGroup),
      service_tax: selectedPlan.tax_amount,
    }).then(handleClick);
  };

  return (
    <div
      css={`
        position: relative;
        width: 100%;
        
      `}
    >
      {/* <div
        css={`
          display: ${true ? "block" : "none"};
          position: absolute;
          right: 0;
          left: 0;
          margin: auto;
          width: 219px;
          font-size: 13px;
          padding: 0px 17px;
          bottom: -20px;
          border-radius: 0px 0px 20px 20px;
          background: #c72229;
          color: #fff;
          text-align: center;
          & span {
            font-weight: 900;
          }
        `}
      >
        Recommended Score:<span> 9.6/10</span>
      </div> */}
      <input
        type="checkbox"
        style={{display:"contents"}}
        onChange={() => {
          dispatch(setQuotesOnCompare());

          if (!checked) {
            const numberOfPlans = window.matchMedia("(max-width: 1023px)")
              .matches
              ? 2
              : 3;
            dispatch(
              setQuotesForCompare([
                `${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`,
                numberOfPlans,
              ]),
            );
          } else {
            dispatch(
              removeQuotesForCompare(
                `${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`,
              ),
            );
          }
        }}
        id={`${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`}
      />
      <label
        htmlFor={`${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`}
        css={`
          position: absolute;
          display: flex;
          background-color: #eef1f5;
          align-items: center;
          height: 31px;
          border-radius: 2px 40px 0px 2px;
          width: 127px;
          padding: 0 10px;
          top: -29px;
          left: 16px;
          font-size: 11px;
        `}
      >
        <div
          css={`
            height: 15px;
            width: 15px;
            display: flex !important;
            border: 1px solid;
            border-radius: 50%;
            background: #fff;
            border-color: ${checked ? "#0a87ff" : "#d2d8e2"};
            align-items: center;
            justify-content: center;

            margin-right: 7px;
            &::after {
              
              display: ${checked ? "block" : "none"};
              content: "\u2713";
              height: 9px;
              width: 9px;
              background-color: #0a87ff;
              color: #fff;
              border-radius: 50%;
            }
          `}
        />
        <span>Add to compare</span>
      </label>
      <span
        css={`
          position: absolute;
          display: flex;
          background-color: #eef1f5;
          align-items: center;
          height: 29px;
          border-radius: 40px 0px 2px 2px;
          width: 109px;
          padding: 0 10px;
          top: -29px;
          right: 16px;
          justify-content: flex-end;
          font-size: 11px;
        `}
        onClick={e => {
          e.preventDefault();
          handleSeeDetails({
            quote: mergedQuotes[0],
            activeSum: activeCover,
          });
          const selectedPlan = {
            company_alias: mergedQuotes[0]?.company_alias,
            logo: mergedQuotes[0]?.logo,
            product: mergedQuotes[0]?.product,
            total_premium: mergedQuotes[0]?.total_premium[activeCover],
            premium: mergedQuotes[0]?.premium[activeCover],
            sum_insured: mergedQuotes[0]?.sum_insured[activeCover],
            tax_amount: mergedQuotes[0]?.tax_amount[activeCover],
            tenure: mergedQuotes[0]?.tenure[activeCover],
          };
          dispatch(saveSelectedPlan(selectedPlan));
        }}
      >
        <span>See Details </span>
        <img
          css={`
            height: 21px;
            margin-left: 5px;
          `}
          src={seeDetails}
        />
      </span>
      <span
        onClick={() => {
          setOpen(!open);
        }}
        css={`
          position: absolute;
          background: #fff;
          bottom: -20px;
          margin-left: auto;
          margin-right: auto;
          left: 0;
          right: 0;
          text-align: center;
          height: 20px;
          width: 94px;
          border-radius: 0 0 12px 12px;
          z-index: 2;
          font-size: 11px;
        `}
        style={{ visibility: mergedQuotes.length < 2 && "hidden" }}
      >
        <span
          css={`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          {!open ? `${mergedQuotes?.slice(1).length} more ${mergedQuotes?.slice(1).length >=2?"Plans":"Plan"}` : `hide ${mergedQuotes?.slice(1).length >=2?"Plans":"Plan"}`}
          <img
            css={`
              height: 16px;
              transform: ${open && "rotate(180deg)"};
            `}
            src={downArrow}
          />
        </span>
      </span>
      <div
        css={`
          border-radius: 12px;
          background-color: #fff;
          margin: 54px 14px;
          height: 100%;
          box-shadow: 0px 10px 20px rgb(134 156 213 / 25%);
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
            padding: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          {" "}
          <div
            css={`
              display: flex;
              align-items: center;
              width: 70%;
            `}
          >
            <img
              css={`
                object-fit: contain;
                height: 30px;
                width: 60px;
                margin-right: 10px;
              `}
              src={mergedQuotes[0]?.logo}
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
                  max-height: 37px;
                  font-size: 13px;
                  overflow:hidden;

                `}
              >
                {mergedQuotes[0]?.product.name}
              </span>
              <span
                css={`
                  font-size: 11px;
                `}
              >
                Cover:
                {mergedQuotes[0]?.sum_insured.length > 1 ? (
                  <select
                    css={`
                      font-size: 11px;
                      font-weight: 100;
                    `}
                    onChange={e => setActiveCover(e.target.value)}
                  >
                    {mergedQuotes[0]?.sum_insured.map((data, i) => {
                      return (
                        <option value={i} key={i}>
                          {parseInt(data).toLocaleString("en-In")}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <span
                    css={`
                      color: #0a87ff;
                    `}
                  >
                    {parseInt(
                      mergedQuotes[0]?.sum_insured[activeCover],
                    ).toLocaleString("en-In")}
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
            <Button onClick={handleBuyNowClick}>
            ₹{" "}
              {parseInt(
                mergedQuotes[0]?.total_premium[activeCover],
              ).toLocaleString("en-In")}
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
                font-size: 10px;
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
              {mergedQuotes.length > 0 &&
                [
                  ...mergedQuotes?.[0]?.features?.[activeCover],
                  {
                    name: "Cashless Hospital",
                    value: "16+",
                    description:
                      "A specific percent of claim amount is paid by the Insured person in case the treatment is taken at a hospital not mentioned in the Network Hospitals list.",
                    icon: cashless,
                  },
                ]?.map((data, index) => {
                  if (data.name === "Cashless Hospital") {
                    return quoteCardDataset(
                      {
                        ...data,
                        value:
                          mergedQuotes[0]?.cashlessHospitalsCount[activeCover],
                      },
                      index,
                    );
                  }

                  if (data.is_featured_on_card)
                    return quoteCardDataset(data, index);
                  return null;
                })}
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
        <div
          css={`
          display:${isRecommended ? 'block': 'none'};
          background: #F5BC00;
          padding: 4px 11px;
          font-size: 13px;
          font-weight: 900;
            & span {
              border-radius: 13px;
              padding: 2px 10px;
              background: white;
              margin-left: 2px;
              position: relative;          
            }
          `}
        >
          Recommended: <span> 9.6/10</span>
        </div>
        <Collapse in={open}>
          <span id="example-collapse-text">
            {mergedQuotes?.slice(1).map((item, index) => (
              <MobileSubContent
                addProduct={addProduct}
                key={index}
                id={index}
                quoteCardData={item}
                quotesForCompare={quotesForCompare}
                handleClick={handleClick}
                handleSeeDetails={handleSeeDetails}
              />
            ))}
          </span>
        </Collapse>
      </div>
    </div>
  );
};

export default MobileQuoteCard;

const Button = styled.button.attrs(props => ({
  type: props.type,
}))`
  box-sizing: border-box;
  user-select: none;
  background: #0a87ff;
  color: white;
  width: 100%;
  cursor: pointer;
  padding: 4px 9px;
  display: block;
  border-radius: 2px;
  border:none;
  font-size: 15px;
  font-weight: 400;
  line-height: 33px;
  height: 42px;
  z-index: 9999;
`;

export function quoteCardDataset({ name, value, description }, index) {
  const renderTooltip = props => <Tooltip {...props}>{description}</Tooltip>;

  return (
    <span
      className={"feature-cell"}
      css={`
        padding-right: 10px;
    margin-right: 10px;
        border-right: 1px solid #9cacc9;
        & svg {
          position: relative;
          
          left: 3px;
        }
      `}
    >
      <span>{name}: </span>
      <span
        css={`
          color: #0a87ff;
        `}
      >
        {value}{" "}
        <OverlayTrigger
          //  placement={
          //    name === "Pre Existing Disease Cover" ? "left" : "right"
          //  }
          overlay={renderTooltip}
        >
          <span>{info()}</span>
        </OverlayTrigger>
      </span>
    </span>
  );
}
