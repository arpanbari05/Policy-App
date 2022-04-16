import { useParams } from "react-router-dom";
import { BackButtonMobile, CircleLoader } from "../../../../components";
import {
  useRiders,
  useTheme,
  useToggle,
  useUrlEnquiry,
} from "../../../../customHooks";
import "styled-components/macro";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import React from "react";
import * as mq from "../../../../utils/mediaQueries";
import { CompareRiderPremium } from "../../../ProductDetails/components/CustomizeYourPlan";
import { useState } from "react";
// import { CompareRiderPremium } from "../../../ProductDetails/components/CompareRiderPremium";

export function Header() {
  const { colors } = useTheme();
  const { groupCode } = useParams();
  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  return (
    <header
      className="p-3 d-flex align-items-center justify-content-between"
      css={`
        background-color: ${colors.primary_color};
        color: #fff;
      `}
    >
      <div className="d-flex align-items-center">
        <BackButtonMobile
          css={`
            color: #fff;
            margin-right: 10px;
          `}
          path={getUrlWithEnquirySearch(`/quotes/${groupCode}`)}
        />
        <h1
          css={`
            font-size: 1rem;
            font-weight: 900;
          `}
        >
          Compare Plans
        </h1>
      </div>
    </header>
  );
}

export function FeatureRow({ children, css = ``, className = "", ...props }) {
  return (
    <div
      className={`d-flex justify-content-between ${className}`}
      css={`
        & > * {
          flex: 1;
        }
        ${css};
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function FeatureValue({
  children,
  css = "",
  isLoading = false,
  ...props
}) {
  const { colors } = useTheme();

  return (
    <div
      className="p-2 d-flex"
      css={`
        gap: 0.6em;
        :not(:last-child) {
          border-right: 1px solid ${colors.border.two};
        }

        ${css}
      `}
      {...props}
    >
      {isLoading ? <CircleLoader animation="border" /> : children}
    </div>
  );
}

export function FeatureSection({
  title,
  children,
  select,
  description = "",
  ...props
}) {
  const { colors } = useTheme();
  const [selectBlock, setSelectBlock] = useState(false);

  return (
    <section
      css={`
        border-top: 2px solid black;
      `}
      {...props}
    >
      <div
        className="p-2"
        css={`
          background-color: ${colors.secondary_shade};
        `}
      >
        <section
          css={`
            display: flex;
            align-items: center;
            gap: 10px;
          `}
        >
          <input
            type="checkbox"
            css={`
              height: 15px;
              width: 15px;
            `}
            onChange={() => {
              let demoObject = {};

              if (!selectBlock) {
                setSelectBlock(true);
                demoObject[`${title}`] = true;
                select.setSelectedSectionView({
                  ...select.selectedSectionView,
                  ...demoObject,
                });
              } else {
                setSelectBlock(false);
                demoObject[`${title}`] = false;
                select.setSelectedSectionView({
                  ...select.selectedSectionView,
                  ...demoObject,
                });
              }
            }}
          />
          <h1
            css={`
              font-size: 0.89rem;
            `}
          >
            {title}
            <InfoPopupToggle title={title} description={description} />
          </h1>
        </section>

        {selectBlock && (
          <button
            css={`
              color: #0a87ff;
              text-decoration: underline;
              padding-left: 25px;
              cursor: pointer;
              font-size: 10px;
              font-weight: 600;
            `}
            onClick={() => {
              if (select.isSelectedSectionView) {
                select.setIsSelectedSectionView(false);
              } else {
                select.setIsSelectedSectionView(true);
              }
            }}
          >
            {select.isSelectedSectionView
              ? "Show All Rows"
              : "Show Only Selected"}
          </button>
        )}
      </div>
      <div
        className="p-2"
        css={`
          font-size: 0.83rem;
        `}
      >
        {children}
      </div>
    </section>
  );
}

export function InfoPopupToggle({ title, description }) {
  const descriptionToggle = useToggle(false);

  return (
    <div className="d-inline-block">
      <button onClick={descriptionToggle.on}>
        <IoMdInformationCircleOutline
          className="mx-2 compare-pdf-hide"
          css={`
            margin-bottom: 0.2em;
            font-size: 1.2em;
          `}
        />
      </button>
      <Modal
        centered
        show={descriptionToggle.isOn && !!description}
        onHide={descriptionToggle.off}
      >
        <div className="p-2">
          <div
            className="p-2"
            css={`
              border: 1px solid;
              text-align: center;
            `}
          >
            <h1
              css={`
                font-size: 1rem;
              `}
            >
              {title}
            </h1>
            <p
              className="m-0 mt-2"
              css={`
                font-size: 0.79rem;
              `}
            >
              {description}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function AddPlanCard({ compareQuotes, children, ...props }) {
  const { colors } = useTheme();

  const comparePlansPopupToggle = useToggle();

  return (
    <div
      css={`
        ${mq.mobile} {
          padding: 1em;
          background-color: ${colors.primary_shade};
          &:not(:last-child) {
            margin-right: 1em;
          }
        }
      `}
      {...props}
    >
      <button
        className="d-flex flex-column align-items-center justify-content-center rounded h-100 w-100 border-0"
        css={`
          background-color: ${colors.primary_shade};
          color: ${colors.primary_color};
          font-weight: 900;
          min-height: 12em;
          ${mq.mobile} {
            min-height: 7.97em;
          }
        `}
        onClick={comparePlansPopupToggle.on}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded"
          css={`
            height: 34%;
            width: 36%;

            background-color: ${colors.secondary_shade};
            border: 1px dashed;
          `}
        >
          <BsPlusLg
            css={`
              font-size: 2rem;
            `}
          />
        </div>
        <div className="mt-3">Add Plan</div>
      </button>
      {comparePlansPopupToggle.isOn &&
        React.Children.map(children, child =>
          React.cloneElement(child, { onClose: comparePlansPopupToggle.off }),
        )}
    </div>
  );
}

export function OptionalCoversValue({ quote, onChange }) {
  const { groupCode } = useParams();

  const handleRidersChange = riders => {
    onChange && onChange({ riders, quote });
  };

  const {
    query: { isLoading, isFetching, isUninitialized },
    riders,
    handleChange,
  } = useRiders({ quote, onChange: handleRidersChange, groupCode });

  return (
    <FeatureValue isLoading={isLoading || isFetching || isUninitialized}>
      <div
        className="d-flex flex-column"
        css={`
          gap: 1em;
        `}
      >
        {riders.length ? (
          riders.map((rider, idx) => (
            <Rider
              currentQuote={quote}
              rider={rider}
              onChange={handleChange}
              key={idx + rider.total}
            />
          ))
        ) : (
          <div
            css={`
              color: #273a5a;
              h4 {
                font-size: 0.9rem;
                font-weight: 600;
              }
              p {
                font-size: 0.7rem;
              }
            `}
          >
            <h4>Oops! No Riders available.</h4>
            <p>
              You can add 'Riders' to you basic health insurance plan for
              additional benefits. Currently no riders are available for this
              base plan.
            </p>
          </div>
        )}
      </div>
    </FeatureValue>
  );
}

function Rider({ currentQuote, rider, onChange, ...props }) {
  const {
    colors: { primary_shade },
  } = useTheme();
  return (
    <div
      className="p-2 rounded d-flex flex-column"
      css={`
        background-color: ${primary_shade};
      `}
      {...props}
      ƒ
    >
      <div
        className="mb-2"
        css={`
          font-size: 0.73rem;
        `}
      >
        {rider.name}
        <InfoPopupToggle title={rider.name} description={rider.description} />
      </div>

      <CompareRiderPremium
        quote={currentQuote}
        rider={rider}
        onChange={onChange}
      />
    </div>
  );
}
