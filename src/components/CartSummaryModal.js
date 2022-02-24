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
import { figureToWords } from "../utils/helper";

function CartSummaryModal({ onClose, onContine, allClose }) {
  return (
    <CardModal
      title="Hey User, Take a minute and review your cart before you proceed"
      show
      buttonValue="Continue"
      handleClose={onClose}
      content={
        <CartSummaryContent
          onContine={onContine}
          closeModal={onClose}
          allClose={allClose}
        />
      }
      noFooter={true}
    />
  );
}

function CartSummaryContent({ closeModal, onContine, allClose, ...props }) {
  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  return (
    <div {...props}>
      {groups.map(group => (
        <GroupCard group={group} closeModal={closeModal} allClose={allClose} />
      ))}
      <hr
        css={`
          height: 0.5px;
        `}
      />
      <Footer onContine={onContine} closeModal={closeModal} />
    </div>
  );
}

function Footer({ closeModal, onContine, ...props }) {
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
        <Button
          css={`
            height: 60px;
            width: 200px;
            font-size: 20px;
            @media (max-width: 480px) {
              width: 100%;
              font-size: 13px;
              height: 60px !important;
              font-weight: unset !important;
            }
          `}
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      )}
    </div>
  );
}

function GroupCard({ group, closeModal, allClose, ...props }) {
  const { members } = group;

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
              font-size: 10px !important;
            }
          `}
        >
          <div
            css={`
              height: 31px;
              width: 6px;
              border-radius: 3px;
              margin-right: 14px;
              background: #2cd44a;
            `}
          ></div>
          {members.join(" + ")?.replaceAll("_", "-")}
        </h5>

        <ToggleProductCTA
          group={group}
          closeModal={closeModal}
          allClose={allClose}
        />
      </div>
      <RenderProductSummaryCard group={group} />
    </div>
  );
}

function ToggleProductCTA({ group, closeModal, allClose, ...props }) {
  const dispatch = useDispatch();
  const { data, isLoading, isUninitialized } = useGetCartQuery();

  const { deleteQuote } = useQuote();

  const history = useHistory();

  const url = useUrlQuery();

  const enquiryId = url.get("enquiryId");

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
    allClose();
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
            background: rgb(235, 245, 255);
            color: #0d6efd;
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
        color: #168cff;
        background: #eff7ff;
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

  const { getCompany } = useCompanies();

  const { logo: logoSrc } = getCompany(alias);

  return (
    <div {...props}>
      <div
        css={`
          display: none;

          @media (max-width: 767px) {
            display: block;

            margin: 11px 0;
            border: 1px solid #ddd;
            box-shadow: 0 3px 15px 0 rgb(0 75 131 / 30%);
          }
        `}
      >
        <span
          css={`
            padding: 20px;
            width: 100%;
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #ddd;
            align-items: flex-start;
            & img {
              width: 48px;
              margin-right: 10px;
            }
            & span {
              font-weight: 900;
            }
          `}
        >
          <img src={logoSrc} alt={alias} />
          <span
            css={`
              @media (max-width: 767px) {
                font-size: 12px !important;
              }
            `}
          >
            {" "}
            {name}
          </span>
        </span>
        <span
          css={`
            display: flex;
            width: 100%;
            padding: 5px 0;
            justify-content: space-between;
            background: rgb(240 243 247);
          `}
        >
          <ProductData noBorder>
            <span class="label-add_product">Sum Insured</span>
            <span>₹ {figureToWords(sum_insured)}</span>
          </ProductData>
          <ProductData>
            <span class="label-add_product">Premium</span>
            <span>
              ₹{" "}
              {parseInt(total_premium + health_riders).toLocaleString("en-IN")}
            </span>
          </ProductData>
          <ProductData>
            <span class="label-add_product">Tenure</span>
            <span> {tenure} Year</span>
          </ProductData>
        </span>
      </div>
      <ProductContainer>
        <div>
          <img className="contain" src={logoSrc} alt={alias} />
        </div>
        <div>
          <ProductName flag={name.length > 20}>{name}</ProductName>
        </div>
        {deductible ? (
          <ProductData>
            <span class="label-add_product">Deductible</span>
            <span>₹ {figureToWords(deductible)}</span>
          </ProductData>
        ) : null}
        <ProductData>
          <span class="label-add_product">Sum Insured</span>
          <span>₹ {figureToWords(sum_insured)}</span>
        </ProductData>
        <ProductData>
          <span class="label-add_product">Premium</span>
          <span>₹ {parseInt(total_premium).toLocaleString("en-IN")}</span>
        </ProductData>
        <ProductData>
          <span class="label-add_product">Tenure</span>
          <span>
            {" "}
            {tenure >= 2 ? `${tenure + " Years"}` : `${tenure + " Year"}`}
          </span>
        </ProductData>
      </ProductContainer>
    </div>
  );
}

export default CartSummaryModal;

const ProductData = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  border-left: 1px solid #dce2ec;
  padding-left: 34px;

  position: relative;
  left: -16px;
  & .label-add_product {
    color: #000;
    font-size: 18px;
    line-height: 21px;
    font-weight: 900;
  }
  @media (max-width: 767px) {
    border-left: ${props => props.noBorder && "unset"};
    padding-left: 0px;
    left: unset;
    font-size: 12px;
    width: 31%;
    text-align: center;
    & .label-add_product {
      font-size: 12px;
    }
  }
  @media (max-width: 400px) {
  }
`;

const ProductName = styled.span`
  color: #000;
  font-size: 15px;
  font-weight: 900;
  margin-right: -26px;
`;

const ProductContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #dce2ec;
  margin: 10px 0;
  height: 98px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & img {
    width: 68px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
