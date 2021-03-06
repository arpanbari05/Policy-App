import React, { useEffect, useState } from "react";
import "./ComparePopup.scss";
import "styled-components/macro";
import PlanContainer from "./components/PlanContainer";
import sbiLogo from "../../../../assets/images/IcSbiLogo.png";
import { useSelector, useDispatch } from "react-redux";
import {
  removeAllQuotesForCompare,
  setQuotesOnCompare,
} from "../../quote.slice";
import { useHistory } from "react-router-dom";
import SecureLS from "secure-ls";
import { resetFeature } from "../../../ComparePage/compare.slice";
const dislayPlanContainer = selectedQuotes => {
  const containerArray = [];

  for (let i = 0; i < 3; i++) {
    containerArray.push(
      <PlanContainer
        customClassName={`${i === 2 && "showOnDesktopFlex"}`}
        key={i}
        id={selectedQuotes[i] ? selectedQuotes[i] : undefined}
      />,
    );
  }
  return containerArray;
};

const ComparePopup = ({ groupCode }) => {
  const { theme } = useSelector(state => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const ls = new SecureLS();
  const history = useHistory();
  const { quotesOnCompare } = useSelector(state => state.quotePage);
  const { quotesForCompare } = useSelector(state => state.quotePage);
  const { quotes } = useSelector(state => state.quotePage);

  const dispatch = useDispatch();
  const filteredQuotes = [];
  const [selectedQuotes, setSelectedQuotes] = useState(filteredQuotes);

  // will display compare popup when quotesOnCompare is true
  const [show, setShow] = useState(quotesOnCompare);

  useEffect(() => {
    quotes.map(quote => {
      quote?.map(data => {
        if (
          quotesForCompare.includes(`${data.product.id}${data.sum_insured}`) &&
          filteredQuotes.length < 3
        ) {
          filteredQuotes.push(`${data.product.id}${data.sum_insured}`);
        }
      });
    });
    setSelectedQuotes(filteredQuotes);
    if (show && !quotesForCompare.length) {
      setShow(false);
    }
  }, [quotesForCompare]);

  useEffect(() => {
    if (!show && quotesForCompare.length > 0) {
      setShow(quotesOnCompare);
    }
  }, [quotesOnCompare]);
  useEffect(() => {
    setShow(false);
  }, [groupCode]);

  const currentGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups")).find(group => group?.id);

  return (
    <div
      css={`
        .quotes_compare_plan_name {
          margin: 0px 10px;
        }
        .quotes_compare_image,
        .quotes_compare_image1 {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          & img {
            width: 100%;
          }
        }
        @media (max-width: 500px) {
          .quotes_compare_plan_name {
            margin: 0px 5px !important;
          }
        }
        @media (max-width: 767px) {
          & .quotes_compare_plan_name {
            align-items: center;
            justify-content: center;
          }
          & .quotes_compare_span_add_plan {
            width: unset;
          }
          & .quotes_compare_image,
          .quotes_compare_image1 {
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            & img {
              width: 100%;
            }
          }
          height: 182px;

          & .quotes_compare_container_wrapper {
            flex-direction: column;
            background-color: voilet;
          }
          & .quotes_compare_buttons_div {
            width: unset;
            & .quotes_compare_button {
              width: 100%;
              margin: unset;
              margin-top: 12px !important;
            }
            // & .quotes_compare_remove_button{
            //   display: none;
            // }
          }
          & .quotes_compare_div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
        }
      `}
      className="quotes_compare_container"
      style={{ display: show ? "block" : "none" }}
    >
      <div
        className="quotes_compare_container_wrapper"
        css={`
          margin-top: 18px !important;
        `}
      >
        <div className="quotes_compare_div">
          {dislayPlanContainer(selectedQuotes)}
        </div>
        <div className="quotes_compare_buttons_div">
          {
            //redirect to compare
          }
          <a href="#">
            <button
              className="quotes_compare_button"
              id="quotes_compare_btn"
              onClick={() => {
                history.push({
                  pathname: `/compare/${groupCode}`,
                  search: `enquiryId=${ls.get("enquiryId")}&pincode=${
                    currentGroup?.pincode
                  }&city=${currentGroup?.city}`,
                });
              }}
              style={{
                backgroundColor:
                  selectedQuotes.length < 2 ? "#dfe1e6" : PrimaryColor,
                color: selectedQuotes.length < 2 && "#7a869a",
              }}
              disabled={selectedQuotes.length > 1 ? false : true}
            >
              Compare Now
            </button>
          </a>
          {
            //close button
          }
          <label
            css={`
              display: none;
              @media (max-width: 767px) {
                display: block;
                position: absolute;
                top: 6px;
                left: 17px;
                font-size: 15px;
              }
            `}
          >
            Compare Plans
          </label>
          <button
            className="quotes_compare_remove_button"
            onClick={() => {
              setShow(false);
              dispatch(setQuotesOnCompare());
              dispatch(removeAllQuotesForCompare());
              dispatch(resetFeature());
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparePopup;
