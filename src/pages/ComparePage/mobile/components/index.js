import { useParams } from "react-router-dom";
import { BackButtonMobile, CircleLoader } from "../../../../components";
import { useTheme, useToggle, useUrlEnquiry } from "../../../../customHooks";
import "styled-components/macro";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import React from "react";
import * as mq from "../../../../utils/mediaQueries";

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
      <div
        className="d-flex align-items-center"
        css={`
          gap: 1em;
        `}
      >
        <BackButtonMobile
          css={`
            color: #fff;
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

export function FeatureValue({ children, isLoading = false, ...props }) {
  const { colors } = useTheme();

  return (
    <div
      className="p-2 d-flex"
      css={`
        gap: 0.6em;
        :not(:last-child) {
          border-right: 1px solid ${colors.border.two};
        }
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
  description = "",
  ...props
}) {
  const { colors } = useTheme();

  const descriptionToggle = useToggle(false);

  return (
    <section
      css={`
        border-top: 2px solid black;
      `}
      {...props}
    >
      <h2
        className="p-2"
        css={`
          font-size: 0.89rem;
          background-color: ${colors.secondary_shade};
        `}
      >
        {title}
        <button onClick={descriptionToggle.on}>
          <IoMdInformationCircleOutline
            className="mx-2"
            css={`
              margin-bottom: 0.2em;
              font-size: 1.2rem;
            `}
          />
        </button>
      </h2>
      <div
        className="p-2"
        css={`
          font-size: 0.83rem;
        `}
      >
        {children}
      </div>
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
    </section>
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
          min-height: 12.7em;
          ${mq.mobile} {
            min-height: 7.97em;
          }
        `}
        onClick={comparePlansPopupToggle.on}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded"
          css={`
            height: 36%;
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
