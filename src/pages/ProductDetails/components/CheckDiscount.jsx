import CardSkeletonLoader from "./../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import FeatureSection from "./FeatureSection/FeatureSection";

import "styled-components/macro";
import { mobile, small } from "../../../utils/mediaQueries";
import { amount, isUsgiLifestyleDiscount } from "../../../utils/helper";
import {
  useAdditionalDiscount,
  useTenureDiscount,
  useTheme,
  useCart,
} from "../../../customHooks";
import { FaCheck } from "react-icons/fa";
import { useEffect } from "react";
import { WrapWithTitle } from ".";

const CheckDiscountSection = ({
  loaderStart = () => {},
  groupCode,
  cartEntry,
  ...props
}) => {
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
      <TenureDiscounts groupCode={groupCode} cartEntry={cartEntry} />
      <AdditionalDiscounts groupCode={groupCode} />
    </FeatureSection>
  );
};

function TenureDiscounts({ groupCode, cartEntry, ...props }) {
  const {
    applyTenureDiscount,
    isTenureDiscountSelected,
    query: { data, isLoading, isUninitialized, isFetching },
  } = useTenureDiscount(groupCode);

  const { tenure } = cartEntry;

  const discounts = data?.data;

  useEffect(() => {
    if (discounts) {
      const tenureDiscount = discounts.find(
        discount => +discount?.tenure === tenure,
      );
      if (tenureDiscount) {
        applyTenureDiscount(tenureDiscount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discounts]);

  if (isLoading || isUninitialized || isFetching) return <CardSkeletonLoader />;

  if (!discounts || !discounts?.length) return <p>No discounts found!</p>;

  const handleChange = discount => {
    if (discount?.isSelected) {
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
            key={discount?.total_premium}
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
        id={discount?.total_premium + discount?.tenure}
        checked={checked}
        onChange={handleChange}
        name="discount"
        value={discount?.total_premium}
        className="visually-hidden"
      />
      <label
        htmlFor={discount?.total_premium + discount?.tenure}
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

        {discount?.yearly_discount !== "0" ? (
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
            {`${discount?.yearly_discount}% off`}
          </div>
        ) : (
          <></>
        )}

        <span
          css={`
            font-size: 14px;
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
          {discount?.tenure >= 2
            ? `${discount?.tenure} Years`
            : `${discount?.tenure} Year`}
        </span>
        <span
          className="addon_p_g_r"
          css={`
            display: flex;
            align-items: center;
            font-size: 18px;
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
            ₹ {parseInt(discount?.total_premium).toLocaleString("en-IN")}
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

  const additionalDiscounts = data?.data;

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
            key={additionalDiscount?.alias}
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

  const isMandatory = ["usgilifestyle", "usgiesale"]?.includes(
    additionalDiscount?.alias,
  ); //TODO: change logic when mandatory flag is added from backend

  const handleApplyClick = () => {
    !isMandatory && onApplyClick && onApplyClick(additionalDiscount);
  };

  //* AUTO APPLY FACILITY FOR E-SALE AND LIFESTYLE DISCOUNT OF USGI IS ALREADY DEFINED IN useUsgiDiscount();
  //* AUTO APPLY FACILITY FOR MORE ADDITIONAL DISCOUNT IN FUTURE CAN BE PUT IN THE useUsgiDiscount() BY MAKING HOOK GENERIC;

  return (
    <div
      css={`
        background-color: #fff;
        border-radius: 10px;
        padding: 15px;
        display: flex;
        margin: 10px 0px;
        justify-content: space-between;
        align-items: center;
        opacity: ${isMandatory ? "0.7" : "1"};
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
              font-size: 14px;
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
          cursor: ${isMandatory ? "not-allowed" : "pointer"} !important;
          @media (max-width: 537px) {
            padding: 4px 8px;
            font-size: 13px;
          }
        `}
        onClick={handleApplyClick}
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

export default CheckDiscountSection;
