import { Col, Spinner } from "react-bootstrap";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Button } from ".";
import { useGetCartQuery, useGetEnquiriesQuery } from "../api/api";
import {
  useCompanies,
  useFrontendBoot,
  useQuote,
  useTheme,
} from "../customHooks";
import useUrlQuery from "../customHooks/useUrlQuery";
import { removeQuoteFromCart } from "../pages/Cart/cart.slice";
import CardSkeletonLoader from "./Common/card-skeleton-loader/CardSkeletonLoader";
import CardModal from "./Common/Modal/CardModal";
import { calculateTotalPremium, figureToWords } from "../utils/helper";
import { HeadingTertiary } from "../styles/typography";

function CartSummaryModal({
  selectedRiders = [],
  onClose = () => {},
  onContine = () => {},
  allClose = () => {},
}) {
  const { data: enquiryData } = useGetEnquiriesQuery();
  const firstName = enquiryData?.data?.name?.split(" ")[0];
  return (
    <CardModal
      title={`Hey ${firstName}, Take a minute and review your cart before you proceed`}
      show
      buttonValue="Continue"
      handleClose={onClose}
      content={
        <CartSummaryContent
          selectedRiders={selectedRiders}
          onContine={onContine}
          closeModal={onClose}
          allClose={allClose}
        />
      }
      noFooter={true}
    />
  );
}

function CartSummaryContent({
  closeModal,
  onContine,
  allClose,
  selectedRiders,
  ...props
}) {
  let {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  const { groupCode } = useParams();

  const currentGroup = groups.find(group => group?.id === +groupCode);

  groups = groups.filter(group => group.type === currentGroup?.type);

  return (
    <div {...props}>
      {groups.map((group, index) => (
        <GroupCard
          key={index}
          group={group}
          closeModal={closeModal}
          allClose={allClose}
          selectedRiders={selectedRiders}
        />
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

function Footer({ onContine, ...props }) {
  const { data, isLoading, isUninitialized } = useGetCartQuery();

  if (isLoading || isUninitialized) return null;

  let totalCartEntries = 0;

  if (data) {
    totalCartEntries = data.data.length;

    if (!totalCartEntries) return null;
  }

  function handleContinueClick() {
    onContine && onContine();
  }

  return (
    <div className="d-flex justify-content-center mt-3" {...props}>
      {
        <Button
          css={`
            height: 60px;
            width: 200px;
            font-size: 20px;
            height: 58px !important;
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
      }
    </div>
  );
}

function GroupCard({ group, closeModal, allClose, selectedRiders, ...props }) {
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
              font-size: 12px !important;
            }
          `}
        >
          <div
            css={`
              height: 31px;
              width: 6px;
              border-radius: 3px;
              margin-right: 14px;
              background: ${colors.secondary_color};
            `}
          ></div>
          {members.join(" + ")?.split("_").join("-")}
        </h5>

        <ToggleProductCTA
          group={group}
          closeModal={closeModal}
          allClose={allClose}
        />
      </div>
      <RenderProductSummaryCard selectedRiders={selectedRiders} group={group} />
    </div>
  );
}

function ToggleProductCTA({ group, closeModal, allClose }) {
  const dispatch = useDispatch();
  const { data, isLoading, isUninitialized } = useGetCartQuery();

  const {
    colors: { primary_color, primary_shade },
  } = useTheme();

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
    cartEntry = data.data.find(cartEntry => cartEntry?.group?.id === group?.id);
  }

  const currentGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups")).find(group => group?.id);

  function handleAddPlanClick() {
    closeModal && closeModal();
    allClose();
    history.push({
      pathname: `/quotes/${group?.id}`,
      search: `enquiryId=${enquiryId}&pincode=${currentGroup.pincode}&city=${currentGroup.city}`,
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
            background: ${primary_shade};
            color: ${primary_color};
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
    dispatch(removeQuoteFromCart(cartEntry.group?.id));
  }

  return (
    <button
      css={`
        justify-content: space-between;
        width: 1.67em;
        height: 1.67em;
        color: ${primary_color};
        background: ${primary_shade};
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
    cartEntry = data.data.find(cartEntry => cartEntry?.group?.id === group?.id);
  }

  if (!cartEntry) return null;

  return <ProductSummaryCard cartEntry={cartEntry} {...props} />;
}

function ProductSummaryCard({ cartEntry, selectedRiders, ...props }) {
  const {
    deductible,
    sum_insured,
    total_premium,
    tenure,
    health_riders,
    top_up_riders,
    product: {
      company: { alias },
      name,
    },
  } = cartEntry;

  const { getCompany } = useCompanies();

  const { logo: logoSrc } = getCompany(alias);

  const { journeyType } = useFrontendBoot();

  const removeDuplicateRiders = ridersArray => {
    return ridersArray.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          t => t.rider_id === value.rider_id && t.name === value.name,
        ),
    );
  };

  const netPremium = calculateTotalPremium(
    {
      total_premium,
      health_riders: health_riders.length
        ? removeDuplicateRiders(health_riders)
        : selectedRiders,
      top_up_riders: top_up_riders.length
        ? removeDuplicateRiders(top_up_riders)
        : selectedRiders,
    },
    {},
    journeyType,
  );

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
          {deductible ? (
            <ProductData noBorder>
              <span className="label-add_product">Deductible</span>
              <span>??? {figureToWords(deductible)}</span>
            </ProductData>
          ) : null}
          <ProductData noBorder={!deductible}>
            <span className="label-add_product">Sum Insured</span>
            <span>??? {figureToWords(sum_insured)}</span>
          </ProductData>
          <ProductData>
            <span className="label-add_product">Premium</span>
            <span>??? {parseInt(netPremium).toLocaleString("en-IN")}</span>
          </ProductData>
          <ProductData>
            <span className="label-add_product">Tenure</span>
            <span> {tenure} Year</span>
          </ProductData>
        </span>
      </div>
      <ProductContainer>
        <div>
          <img
            css={`
              max-height: 80px;
            `}
            className="contain"
            src={logoSrc}
            alt={alias}
          />
        </div>
        <div
          css={`
            max-width: 26%;
          `}
        >
          {/* <ProductName flag={name.length > 20}>{name}</ProductName> */}
          <HeadingTertiary>{name}</HeadingTertiary>
        </div>
        {deductible ? (
          <ProductData>
            <span className="label-add_product">Deductible</span>
            <span>??? {figureToWords(deductible)}</span>
          </ProductData>
        ) : null}
        <ProductData>
          <span className="label-add_product">Sum Insured</span>
          <span>??? {figureToWords(sum_insured)}</span>
        </ProductData>
        <ProductData>
          <span className="label-add_product">Premium</span>
          <span>??? {parseInt(netPremium).toLocaleString("en-IN")}</span>
        </ProductData>
        <ProductData>
          <span className="label-add_product">Tenure</span>
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
  padding-left: 28px;

  position: relative;
  left: -16px;
  & .label-add_product {
    color: #000;
    font-size: 16px;
    line-height: 21px;
    font-weight: 900;
  }
  @media (max-width: 767px) {
    border-left: ${props => props.noBorder && "unset"};
    flex-grow: 1;
    padding-left: 0;
    left: unset;
    font-size: 12px;
    text-align: center;
    & .label-add_product {
      font-size: 12px;
    }
  }
  @media (max-width: 400px) {
  }
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
    width: 100%;
    max-width: 95px;
    height: auto;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
