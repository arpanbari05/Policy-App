import CardSkeletonLoader from "./../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import FeatureSection from "./FeatureSection/FeatureSection";

import "styled-components/macro";
import { mobile, small } from "../../../utils/mediaQueries";
import { amount } from "../../../utils/helper";
import {
  useAdditionalDiscount,
  useTenureDiscount,
  useTheme,
} from "../../../customHooks";
import { FaCheck } from "react-icons/fa";

const CheckDiscountSection = ({ groupCode, ...props }) => {
  return (
    <FeatureSection
      heading="Check Discounts"
      subHeading="Save Upto 20% on your premium"
      id="check-discounts"
      css={`
        padding-top: 20px;
      `}
      {...props}
    >
      <TenureDiscounts groupCode={groupCode} />
      <AdditionalDiscounts groupCode={groupCode} />
    </FeatureSection>
  );
};

function TenureDiscounts({ groupCode, ...props }) {
  const {
    applyTenureDiscount,
    isTenureDiscountSelected,
    query: { data, isLoading, isUninitialized, isFetching },
  } = useTenureDiscount(groupCode);

  if (isLoading || isUninitialized || isFetching) return <CardSkeletonLoader />;

  const discounts = data.data;

  if (!discounts || !discounts.length) return <p>No discounts found!</p>;

  const handleChange = discount => {
    if (discount.isSelected) {
      applyTenureDiscount(discount);
    }
  };

  return (
    <WrapWithTitle title="Choose Multiyear Options" {...props}>
      <div
        css={`
          display: flex;
          justify-content: space-around;
          align-items: center;

          ${mobile} {
            flex-direction: column;
          }
        `}
      >
        {discounts?.map(discount => (
          <TenureDiscount
            discount={discount}
            checked={isTenureDiscountSelected(discount)}
            onChange={handleChange}
            key={discount.total_premium}
          />
        ))}
      </div>
    </WrapWithTitle>
  );
}

function TenureDiscount({ discount, checked = false, onChange, ...props }) {
  const { colors } = useTheme();
  const handleChange = evt => {
    onChange && onChange({ ...discount, isSelected: evt.target.checked });
  };

  return (
    <div
      style={{ margin: "0" }}
      css={`
        ${mobile} {
          width: 100%;
        }
      `}
      {...props}
    >
      <input
        type="radio"
        id={discount.total_premium + discount.tenure}
        checked={checked}
        onChange={handleChange}
        name="discount"
        value={discount.total_premium}
        className="visually-hidden"
      />
      <label
        htmlFor={discount.total_premium + discount.tenure}
        css={`
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-around;
          background: white;
          border-radius: 15px;
          padding: 1rem;
          padding-bottom: 0.7rem;
          text-align: center;
          position: relative;
          width: 200px;
          border: 2px solid;
          border-color: ${checked ? colors.primary_color : "#e5e5e5"};
          @media (max-width: 768px) {
            width: 100% !important;
            margin: 10px 0px;
          }
        `}
      >
        {checked ? (
          <span
            css={`
              font-size: 9px;
              position: absolute;
              bottom: 11px;
              right: 11px;
              transform: translateX(-50%);
              height: 23px;
              width: 23px;
              line-height: 30px;
              text-align: center;
              border-radius: 50%;
              background: ${colors.primary_color};
              box-shadow: 0px 2px 5px -2px rgb(0 0 0 / 25%);
              font-family: "font-awesome";
              justify-content: center;
              align-items: center;
              display: flex;
              color: #fff;
            `}
          >
            <FaCheck />
          </span>
        ) : (
          <span
            css={`
              font-size: 11px;
              position: absolute;
              bottom: 11px;
              right: 11px;
              transform: translateX(-50%);
              height: 23px;
              width: 23px;
              line-height: 30px;
              text-align: center;
              border-radius: 50%;
              background: white;

              font-family: "font-awesome";
              border: 2px solid #fff;
              color: #fff;
              border: 2px solid #e4e7ec;
            `}
          >
            <FaCheck />
          </span>
        )}

        {discount.yearly_discount !== "0" ? (
          <div
            css={`
              width: 100px;
              height: 22px;
              background: ${colors.secondary_color};
              border-bottom-left-radius: 300px;
              border-top-right-radius: 180px;
              position: absolute;
              top: -2px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 900;
              color: white;
              font-size: 10px;
              right: -2px;
            `}
          >
            {`${discount.yearly_discount}% off`}
          </div>
        ) : (
          <></>
        )}

        <span
          css={`
            font-size: 15px;
            font-weight: 600;
            color: #253858;
            margin-bottom: 8px;
            @media (max-width: 768px) {
              color: ${colors.primary_color};
              background-color: #eff7ff;
              border-radius: 20px;
              padding: 2px 5px;
            }
          `}
        >
          {discount.tenure >= 2
            ? `${discount.tenure} Years`
            : `${discount.tenure} Year`}
        </span>
        <span
          className="addon_p_g_r"
          css={`
            display: flex;
            align-items: center;
            font-size: 19px;
          `}
        >
          <b
            css={`
              ${mobile} {
                font-size: 16px;
              }
              @media (min-width: 768px) and (max-width: 900px) {
                font-size: 23px;
              }
            `}
          >
            ₹ {parseInt(discount.total_premium).toLocaleString("en-IN")}
          </b>
          <span
            css={`
              display: none;
            `}
          >
            Premium
          </span>
        </span>
      </label>
    </div>
  );
}

function AdditionalDiscounts({ groupCode, ...props }) {
  const {
    isAdditionalDiscountSelected,
    toggleAdditionalDiscount,
    query: { data, isLoading, isUninitialized },
  } = useAdditionalDiscount(groupCode);

  if (isLoading || isUninitialized) return <CardSkeletonLoader />;

  const additionalDiscounts = data.data;

  if (!additionalDiscounts?.length) return null;

  const handleApplyClick = additionalDiscount => {
    toggleAdditionalDiscount(additionalDiscount);
  };

  return (
    <>
      <WrapWithTitle title="Additional Discount" {...props}>
        {additionalDiscounts.map(additionalDiscount => (
          <AdditionalDiscount
            onApplyClick={handleApplyClick}
            additionalDiscount={additionalDiscount}
            isSelected={isAdditionalDiscountSelected(additionalDiscount)}
            groupCode={groupCode}
            key={additionalDiscount.alias}
          />
        ))}
      </WrapWithTitle>
      <hr />
    </>
  );
}

function AdditionalDiscount({
  additionalDiscount,
  isSelected,
  groupCode,
  onApplyClick,
  ...props
}) {
  const { name, description } = additionalDiscount;

  const { colors } = useTheme();

  const { getDiscountAmount } = useAdditionalDiscount(groupCode);

  const discountAmount = amount(getDiscountAmount(additionalDiscount));

  const handleApplyClick = () => {
    onApplyClick && onApplyClick(additionalDiscount);
  };

  return (
    <div
      css={`
        background-color: #fff;
        border-radius: 10px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
      `}
      {...props}
    >
      <div>
        <p
          css={`
            font-weight: 900;
            font-size: 18px;

            ${small} {
              font-size: 12px;
              line-height: 14px;
            }
          `}
        >
          {name}
        </p>
        <p
          css={`
            color: ${colors.primary_color};
            background-color: ${colors.primary_shade};
            padding: 3px 10px;
            margin-top: 6px;
            border-radius: 10px;
            ${small} {
              font-size: 9px;
              padding: 3px 6px;
            }
          `}
        >
          {description.replace("{amount}", discountAmount)}
        </p>
      </div>
      <button
        css={`
          background-color: ${colors.primary_color};
          border-radius: 6px;
          padding: 12px 30px;
          color: #fff;
          :focus {
            color: white;
          }
          display: flex;
          align-items: center;
          @media (max-width: 537px) {
            padding: 4px 8px;
            font-size: 13px;
          }
        `}
        onClick={handleApplyClick}
        className="btn"
      >
        <span
          css={`
            margin-right: 5px;
          `}
        >
          Apply
        </span>
        {isSelected ? (
          <i class="fas fa-check"></i>
        ) : (
          <i class="fas fa-plus"></i>
        )}
      </button>
    </div>
  );
}

function WrapWithTitle({ title, children }) {
  return (
    <div
      css={`
        padding: 10px 30px 30px;
        border-radius: 20px;
        border: 1px solid #dfdfdf;
        margin-bottom: 1rem;

        ${mobile} {
          border: none;
          padding: 0;
        }
      `}
    >
      <div
        css={`
          ${mobile} {
            border: none;
            position: relative;
          }
        `}
      >
        <h3
          css={`
            font-size: 17px;
            color: #68758b;
            font-weight: 600;
            margin: auto;
            margin-bottom: 30px;
            text-align: center;

            ${mobile} {
              margin-bottom: 10px;
              position: relative;
              font-size: 16px;
              width: max-content;
              padding: 0 10px;
              background-color: #fff;
              z-index: 10;
            }

            ${small} {
              font-size: 12px;
            }
          `}
        >
          {title}
        </h3>
        <div
          css={`
            display: none;
            ${mobile} {
              display: block;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              height: 1px;
              width: 100%;
              background-color: #ddd;
            }
          `}
        />
      </div>
      {children}
    </div>
  );
}

export default CheckDiscountSection;
