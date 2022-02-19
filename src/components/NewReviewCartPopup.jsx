import { useState } from "react";
import { Col, Spinner } from "react-bootstrap";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Button } from ".";
import { useGetCartQuery, useGetEnquiriesQuery } from "../api/api";
import { useCompanies, useQuote } from "../customHooks";
import useUrlQuery from "../customHooks/useUrlQuery";
import { removeQuoteFromCart } from "../pages/Cart/cart.slice";
import CardSkeletonLoader from "./Common/card-skeleton-loader/CardSkeletonLoader";
import CardModal from "./Common/Modal/CardModal";
import { useTheme } from "../customHooks";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { amount } from "../../src/utils/helper";
import { mobile, small } from "../utils/mediaQueries";

export function NewReviewCartPopup({ onClose, onContine }) {
  return (
    <CardModal
      title="Hey User, Take a minute and review your cart before you proceed"
      show
      buttonValue="Continue"
      handleClose={onClose}
      content={
        <CartSummaryContent onContine={onContine} closeModal={onClose} />
      }
      noFooter={true}
      usedAsReviewCartPopup={true}
    />
  );
}

function CartSummaryContent({ closeModal, onContine, ...props }) {
  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();
  const { data } = useGetCartQuery();

  let totalPremium =
    data.data && data.data.map(singleEntry => singleEntry.total_premium).length
      ? data?.data
          .map(singleEntry => singleEntry.total_premium)
          .reduce((acc = 0, singlePremium) => (acc = +singlePremium))
      : 0;

  return (
    <div
      {...props}
      css={`
        padding: 1rem;
        ${small} {
          padding: unset;
        }
      `}
    >
      {groups.map(group => (
        <GroupCard group={group} closeModal={closeModal} />
      ))}
      <hr
        css={`
          height: 0.5px;
        `}
      />
      <Footer
        onContine={onContine}
        closeModal={closeModal}
        total_premium={totalPremium}
      />
    </div>
  );
}

function Footer({ closeModal, onContine, total_premium, ...props }) {
  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const { data, isLoading, isUninitialized } = useGetCartQuery();

  if (isLoading || isUninitialized) return null;

  let totalCartEntries = 0;

  if (data) {
    totalCartEntries = data.data.length;

    if (!totalCartEntries) return null;
  }

  const totalGroups = groups.length;

  const isQuoteNotSelected = totalCartEntries < totalGroups;

  function handleContinueClick() {
    onContine && onContine();
  }

  function handleYesClick() {
    setIsConfirmed(true);
  }

  function handleNoClick() {
    closeModal && closeModal();
  }

  return (
    <div className="d-flex justify-content-center mt-3" {...props}>
      {isQuoteNotSelected && !isConfirmed && false ? (
        <div
          className="d-flex align-items-center"
          css={`
            gap: 1em;
          `}
        >
          Are you sure you want to proceed without adding a plan?{" "}
          <Button onClick={handleYesClick}>Yes</Button>{" "}
          <Button onClick={handleNoClick}>No</Button>
        </div>
      ) : (
        <div
          className="d-flex align-items-center justify-content-between"
          css={`
            margin-top: 30px;
            width: 100%;
            ${mobile} {
              flex-direction: column;
              margin-top: unset;
            }
          `}
        >
          <div
            css={`
              ${mobile} {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
            `}
          >
            <span
              css={`
                color: rgb(80, 95, 121);
                font-size: 13px;
                font-weight: 900;
                ${mobile} {
                  font-size: 16px;
                  font-weight: 600;
                }
              `}
            >
              Total Premium
            </span>
            <br
              css={`
                ${mobile} {
                  display: none;
                }
              `}
            />
            <span
              css={`
                font-weight: 900;
                font-size: 20px;
                ${mobile} {
                  font-size: 18px;
                }
              `}
            >
              {amount(total_premium)}
            </span>
          </div>
          <Button
            css={`
              height: 49px;
              width: 216px;
              font-size: 15px;
              font-weight: unset !important;
              ${mobile} {
                width: 100%;
                font-size: 13px;
                margin-top: 10px;
              }
            `}
            onClick={handleContinueClick}
          >
            Proceed To Proposal
          </Button>
        </div>
      )}
    </div>
  );
}

function GroupCard({ group, closeModal, ...props }) {
  const { members } = group;
  const { colors } = useTheme();
  return (
    <div
      css={`
        &:not(:first-child) {
          margin-top: 1em;
        }
      `}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        {...props}
      >
        <h5
          className="text_title_filter p_modal_title_bg_filters_product d-flex align-items-center"
          style={{ textTransform: "capitalize" }}
          css={`
            font-weight: bold;
            @media (max-width: 400px) {
              font-size: 15px !important;
            }
          `}
        >
          <div
            css={`
              height: 25px;
              width: 6px;
              border-radius: 3px;
              margin-right: 14px;
              background: ${colors.secondary_color};
            `}
          ></div>
          {members.join(" + ")?.replaceAll("_", "-")}
        </h5>

        <ToggleProductCTA group={group} closeModal={closeModal} />
      </div>
      <RenderProductSummaryCard group={group} />
    </div>
  );
}

function ToggleProductCTA({ group, closeModal, ...props }) {
  const dispatch = useDispatch();
  const { data, isLoading, isUninitialized } = useGetCartQuery();

  const { deleteQuote } = useQuote();

  const history = useHistory();

  const url = useUrlQuery();

  const enquiryId = url.get("enquiryId");
  const { colors } = useTheme();

  if (isLoading || isUninitialized)
    return (
      <Spinner
        animation="border"
        css={`
          height: 1.67em;
          width: 1.67em;
          font-size: 0.67em;
          color: inherit;
          margin: 0;
          padding: 0;
        `}
      />
    );

  let cartEntry = null;

  if (data.data) {
    cartEntry = data.data.find(cartEntry => cartEntry.group.id === group.id);
  }

  function handleAddPlanClick() {
    closeModal && closeModal();
    history.push({
      pathname: `/quotes/${group.id}`,
      search: `enquiryId=${enquiryId}`,
    });
  }

  if (!cartEntry)
    return (
      <Col
        md={4}
        css={`
          display: flex;
          justify-content: flex-end;
          margin-bottom: 11px;
        `}
      >
        <button
          type="submit"
          className="btn"
          css={`
            justify-content: space-between;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 120px;
            background: ${colors.primary_shade};
            color: ${colors.primary_color};
            border: none;
            @media (max-width: 400px) {
              font-size: 10px;
              width: 100px;
            }
          `}
          onClick={handleAddPlanClick}
        >
          <span
            css={`
              margin-right: 5px;
            `}
          >
            {" "}
            Add Plan
          </span>{" "}
          <FaPlusCircle />
        </button>
      </Col>
    );

  function handleDeleteClick() {
    deleteQuote(cartEntry.id);
    dispatch(removeQuoteFromCart(cartEntry.group.id));
  }

  return (
    <button
      css={`
        justify-content: space-between;
        width: 1.67em;
        height: 1.67em;
        color: ${colors.primary_color};
        background: ${colors.primary_shade};
        display: flex;
        font-size: 22px;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        border: none;
        @media (max-width: 400px) {
          font-size: 1.37rem;
          width: 1.6em;
          height: 1.6em;
        }
      `}
      className="btn"
      onClick={handleDeleteClick}
    >
      <FaTrashAlt />
    </button>
  );
}

function RenderProductSummaryCard({ group, ...props }) {
  const { data, isLoading, isUninitialized } = useGetCartQuery();

  if (isLoading || isUninitialized) return <CardSkeletonLoader />;

  let cartEntry = null;

  if (data.data) {
    cartEntry = data.data.find(cartEntry => cartEntry.group.id === group.id);
  }

  if (!cartEntry) return null;

  return <ProductSummaryCard cartEntry={cartEntry} {...props} />;
}

function ProductSummaryCard({ cartEntry, ...props }) {
  const {
    deductible,
    sum_insured,
    total_premium,
    tenure,
    health_riders,
    product: {
      company: { alias },
      name,
    },
  } = cartEntry;

  console.log("The cartEntry", cartEntry);
  const { getCompany } = useCompanies();

  const { logo: logoSrc } = getCompany(alias);

  return (
    <div {...props}>
      <ProductCardOuter>
        <div
          className="d-flex align-items-center justify-content-between"
          css={`
            padding: 10px 20px;
            ${mobile} {
              flex-direction: column;
              align-items: flex-start !important;
              padding: unset;
            }
          `}
        >
          <LogoAndName>
            <img
              src={logoSrc}
              width="80px"
              css={`
                ${mobile} {
                  width: 40px;
                  margin-right: 20px;
                }
              `}
              alt={alias}
            />

            <span
              css={`
                font-size: 16px;
                font-weight: 900;
                display: block;
              `}
            >
              {name}
            </span>
          </LogoAndName>

          <PlanDetails>
            {deductible && (
              <SinglePlanDetail
                title={"Deductible"}
                value={`₹ ${parseInt(deductible).toLocaleString("en-IN")}`}
              />
            )}
            <SinglePlanDetail
              title={"Cover"}
              value={`₹ ${parseInt(sum_insured).toLocaleString("en-IN")}`}
            />
            <SinglePlanDetail
              title={"Total Premium"}
              value={`₹
              ${parseInt(total_premium + health_riders).toLocaleString(
                "en-IN",
              )} / ${
                tenure >= 2 ? `${tenure + " Years"}` : `${tenure + " Year"}`
              }`}
            />
          </PlanDetails>
        </div>
        <hr
          css={`
            margin: 5px;
            ${mobile} {
              display: none;
            }
          `}
        />
        <div
          className="d-flex flex-wrap align-items-center justify-content-between"
          css={`
            ${mobile} {
              background: rgb(245, 247, 249);
            }
          `}
        >
          {health_riders.map((singleRider, index) => (
            <RiderDisplayCard key={index} title={singleRider.name} />
          ))}
        </div>
      </ProductCardOuter>
    </div>
  );
}

const ProductCardOuter = styled.div`
  width: 100%;
  border: 1px solid #dce2ec;
  border-radius: 8px;
  margin-top: 10px;
`;

const LogoAndName = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: start;
  ${mobile} {
    width: 100%;
    border-bottom: 1px solid #dce2ec;
    padding: 10px 20px;
  }
`;
const PlanDetails = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mobile} {
    width: 100%;
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const SinglePlanDetail = ({ title, value, ...props }) => {
  return (
    <div
      {...props}
      css={`
        ${mobile} {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px 5px;
          margin: 3px 0px;
          border-right: 1px solid #dce2ec;
        }
      `}
    >
      <span
        css={`
          font-size: 16px;
          font-weight: 400;
          ${mobile} {
            font-size: 12px;
          }
          ${small} {
            font-size: 10px;
          }
        `}
      >
        {title}
      </span>
      <br
        css={`
          ${mobile} {
            display: none;
          }
        `}
      />
      <span
        css={`
          font-size: 15px;
          font-weight: 900;
          color: rgb(80, 95, 121);
          ${mobile} {
            font-size: 12px;
            font-weight: unset;
            color: #000;
          }
          ${small} {
            font-size: 10px;
          }
        `}
      >
        {value}
      </span>
    </div>
  );
};

const RiderDisplayCard = ({ title, ...props }) => {
  const { colors } = useTheme();
  return (
    <div
      css={`
        width: 50%;
        padding: 2px;
        font-size: 14px;
        display: flex;
        align-items: center;
        ${mobile} {
          width: 100%;
          height: 30px;
          margin-top: 3px;
          padding: 3px;
        }
      `}
      {...props}
    >
      <IoIosCheckmarkCircleOutline
        color={colors.primary_color}
        css={`
          font-weight: bold;
          font-size: 15px;
          ${mobile} {
            font-size: 17px;
          }
        `}
      />
      <span
        css={`
          margin-left: 10px;
          ${small} {
            font-size: 10px;
          }
        `}
      >
        {title}
      </span>
    </div>
  );
};
