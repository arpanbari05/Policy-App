import { useEffect, useState } from "react";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { CircleLoader } from "../../../components";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import { useCart, useRider, useRiders, useTheme } from "../../../customHooks";
import {
  amount,
  careRidersConditionChecker,
  featureOptionsValidValue,
} from "../../../utils/helper";
import { mobile, small, tabletAndMobile } from "../../../utils/mediaQueries";
import FeatureSection from "./FeatureSection/FeatureSection";

export function RidersSection({ loaderStop, isProductDetailsPage = false }) {
  let { groupCode } = useParams();

  groupCode = parseInt(groupCode);

  const { getCartEntry } = useCart(groupCode);

  const quote = getCartEntry(groupCode);

  const { replaceRiders } = useRider(groupCode);

  const handleRidersChange = riders => {
    replaceRiders(riders);
  };

  return (
    <div className="pb-3">
      <Riders
        loaderStop={loaderStop}
        quote={quote}
        groupCode={groupCode}
        onChange={handleRidersChange}
        isProductDetailsPage={isProductDetailsPage}
      />
    </div>
  );
}

export function Riders({
  quote,
  groupCode,
  onChange,
  isProductDetailsPage,
  ...props
}) {
  const {
    query: { isLoading, isUninitialized, isError, isFetching, refetch },
    handleChange,
    riders,
  } = useRiders({ quote, groupCode, onChange });

  const feature_options = useCart().getCartEntry(groupCode)?.feature_options;

  const updatedFeatureOptions = featureOptionsValidValue(feature_options);

  const selectedFeatureOption = Object.keys(updatedFeatureOptions)?.length
    ? updatedFeatureOptions[Object.keys(updatedFeatureOptions)[0]]
    : "more_cover";

  const {
    colors: { primary_color },
  } = useTheme();

  if (isLoading || isUninitialized)
    return (
      <DetailsSectionWrap isProductDetailsPage={isProductDetailsPage}>
        <CardSkeletonLoader />
      </DetailsSectionWrap>
    );

  if (isError)
    return (
      <DetailsSectionWrap isProductDetailsPage={isProductDetailsPage}>
        <div className="d-flex gap-3 align-items-center">
          <p className="m-0">Something went wrong while getting riders!</p>
          {/* <p>{error.data?.message}</p> */}
          <button
            className="py-1 px-3 text-[#fff]"
            style={{
              background: primary_color,
              color: "#fff",
              borderRadius: 9999,
            }}
            onClick={refetch}
          >
            Retry
          </button>
        </div>
      </DetailsSectionWrap>
    );

  let header = {
    heading: "Customize Your Plan",
    subHeading:
      "You can add 'Riders' to you basic health insurance plan for additional benefits.",
  };

  if (!riders?.length) {
    header.heading = "Oops! No Riders available.";
    header.subHeading =
      "You can add 'Riders' to you basic health insurance plan for additional benefits. Currently no riders are available for this base plan.";
  }

  return (
    <DetailsSectionWrap
      className="mt-3"
      isProductDetailsPage={isProductDetailsPage}
    >
      <FeatureSection
        css={`
          ${mobile} {
            display: block !important;
          }
        `}
        id="additional-riders"
        {...header}
        {...props}
      >
        <div
          className="d-flex flex-wrap"
          css={`
            gap: 1.2em;
            ${mobile} {
              gap: unset;
            }
          `}
        >
          {riders.map(rider => (
            <RiderCardNew
              rider={rider}
              onChange={handleChange}
              key={rider?.id}
              riders={riders}
              isFetching={isFetching}
              company={quote?.product?.company?.name}
              isProductDetailsPage={isProductDetailsPage}
              isRelianceGeneralPlan={
                quote?.product?.company?.alias === "reliance_general"
              }
              isDisabled={
                careRidersConditionChecker(quote, rider?.alias, riders)
                  ?.isDisabled ||
                (quote?.product?.company?.alias === "reliance_general" &&
                  selectedFeatureOption ===
                    rider?.name?.toLowerCase().split(" ").join("_"))
              }
              showPEDRiderWarning={
                careRidersConditionChecker(quote, rider?.alias, riders)
                  ?.showPEDRiderWarning
              }
            />
          ))}
        </div>
      </FeatureSection>
    </DetailsSectionWrap>
  );
}

export function RiderCardNew({
  rider,
  onChange,
  riders,
  isFetching,
  company,
  isProductDetailsPage,
  isDisabled,
  showPEDRiderWarning,
  isRelianceGeneralPlan,
  ...props
}) {
  const { isSelected, disable } = rider;

  const { colors } = useTheme();

  //? CARE RIDERS RESTRICTIONS-1
  useEffect(() => {
    if (
      company === "Care Health Insurance" &&
      rider?.name === "No Claim Bonus" &&
      !rider?.isSelected
    ) {
      const carePEDRider = riders?.find(
        singleRider => singleRider?.alias === "REDPEDWAITPRD",
      );

      onChange({
        ...carePEDRider,
        isSelected: false,
      });
    }
  }, [rider?.isSelected]);

  //? CARE RIDERS RESTRICTIONS-2
  useEffect(() => {
    if (isDisabled && showPEDRiderWarning) {
      !isRelianceGeneralPlan && onChange({ ...rider, isSelected: false });
    }
  }, [isDisabled]);

  const handleRiderOptionChange = riderOption => {
    onChange &&
      onChange({
        ...rider,
        isSelected,
        options_selected: {
          ...rider.options_selected,
          [riderOption?.key]: riderOption?.selected,
        },
      });
  };

  return (
    <RiderCardWrap
      {...props}
      isSelected={isSelected}
      isDisabled={isDisabled || disable}
    >
      {showPEDRiderWarning && (
        <div className="d-flex align-items-center justify-content-end">
          <span
            css={`
              box-sizing: border-box;
              padding: 0 15px;
              border-radius: 0 0 0 15px;
              background: ${isDisabled ? "grey" : colors.secondary_color};
              color: white;
              font-size: 12px;
              ${tabletAndMobile} {
                font-size: 10px;
              }
            `}
          >
            Can only be availed with No claim bonus
          </span>
        </div>
      )}
      <div
        className={`d-flex align-items-center justify-content-between px-3 py-3 ${
          !showPEDRiderWarning && "h-100"
        }`}
      >
        <div>
          <RiderName className="w-100">{rider?.name}</RiderName>
          <RiderDescription
            rider={rider}
            isProductDetailsPage={isProductDetailsPage}
          />
          <div
            className="d-flex flex-wrap mt-2"
            css={`
              gap: 0.6em;
            `}
          >
            {rider?.options &&
              Object.keys(rider?.options).map(riderOptionKey => (
                <RiderOption
                  option={{
                    options: rider?.options[riderOptionKey],
                    key: riderOptionKey,
                    selected: rider?.options_selected?.[riderOptionKey],
                  }}
                  onChange={handleRiderOptionChange}
                  key={riderOptionKey}
                />
              ))}
          </div>
        </div>
        <RiderPremium
          rider={rider}
          onChange={isDisabled || disable ? () => {} : onChange}
          isLoading={isFetching}
        />
      </div>
    </RiderCardWrap>
  );
}
export function CompareRiderPremium({
  quote,
  rider,
  isLoading = false,
  onChange,
}) {
  const { colors } = useTheme();
  const { isSelected } = rider;

  const handleChange = evt => {
    if (rider?.is_mandatory) return;
    onChange && onChange({ ...rider, isSelected: evt.target.checked });
  };

  return (
    <RiderPremiumWrap
      className="py-2 rounded"
      htmlFor={rider?.id + rider?.total_premium + quote?.sum_insured}
      css={`
        cursor: pointer;
        background-color: ${isSelected ? colors.primary_shade : "#f3f3f3"};
      `}
    >
      <div className="d-flex align-items-center justify-content-center">
        {isLoading ? (
          <CircleLoader
            animation="border"
            className="m-0"
            css={`
              font-size: 0.73rem;
            `}
          />
        ) : (
          <div
            css={`
              gap: 0.6em;
            `}
            className="d-flex align-items-center justify-content-center"
          >
            <div>{amount(rider?.total_premium)}</div>

            {isSelected ? (
              <BsCheckCircleFill
                css={`
                  color: ${colors.primary_color};
                  font-size: 1.37em;
                `}
              />
            ) : (
              <AiTwotoneCheckCircle
                css={`
                  color: #fff;
                  font-size: 1.37em;
                `}
              />
            )}
          </div>
        )}
      </div>
      <input
        className="visually-hidden"
        type="checkbox"
        name={rider?.id}
        id={rider?.id + rider?.total_premium + quote?.sum_insured}
        checked={!!isSelected}
        onChange={event => {
          handleChange(event);
        }}
        disabled={isLoading}
      />
    </RiderPremiumWrap>
  );
}

export function RiderPremium({ rider, isLoading = false, onChange }) {
  const { colors } = useTheme();
  const { isSelected } = rider;

  const handleChange = evt => {
    if (rider?.is_mandatory) return;
    onChange && onChange({ ...rider, isSelected: evt.target.checked });
  };

  return (
    <RiderPremiumWrap
      className="py-2 rounded"
      htmlFor={rider?.id}
      css={`
        cursor: pointer;
        background-color: ${isSelected ? colors.primary_shade : "#f3f3f3"};
      `}
    >
      <div className="d-flex align-items-center justify-content-center">
        {isLoading ? (
          <CircleLoader
            animation="border"
            className="m-0"
            css={`
              font-size: 0.73rem;
            `}
          />
        ) : (
          <div
            css={`
              gap: 0.6em;
            `}
            className="d-flex align-items-center justify-content-center"
          >
            <div>{amount(rider?.total_premium)}</div>

            {isSelected ? (
              <BsCheckCircleFill
                css={`
                  color: ${colors.primary_color};
                  font-size: 1.37em;
                `}
              />
            ) : (
              <AiTwotoneCheckCircle
                css={`
                  color: #fff;
                  font-size: 1.37em;
                `}
              />
            )}
          </div>
        )}
      </div>
      <input
        className="visually-hidden"
        type="checkbox"
        name={rider?.id}
        id={rider?.id}
        checked={!!isSelected}
        onChange={event => {
          handleChange(event);
        }}
        disabled={isLoading}
      />
    </RiderPremiumWrap>
  );
}

const RiderPremiumWrap = styled.label`
  min-width: 7.9em;
  font-weight: 900;
`;

function RiderOption({
  option: { key, options = [], selected },
  onChange,
  ...props
}) {
  const { colors } = useTheme();

  /* useEffect(() => {
    onChange && onChange({ key, options, selected: options[0] });
  }, []); */

  const handleChange = evt => {
    onChange && onChange({ key, options, selected: evt.target.value });
  };

  let optionsList = [];

  if (typeof options[0] === "string") {
    optionsList = options?.map(optionString => ({
      code: optionString,
      display_name: optionString,
    }));
  }

  if (typeof options[0] === "object") {
    optionsList = options?.map(optionObject => ({
      code: Object.keys(optionObject)[0],
      display_name: Object.values(optionObject)[0],
    }));
  }

  return (
    <div {...props}>
      <select
        className="p-2"
        css={`
          background-color: ${colors.primary_shade};
          ${small} {
            max-width: 150px;
          }
        `}
        name={key}
        value={selected}
        onChange={handleChange}
      >
        {optionsList.map(option => (
          <option key={option?.code} value={option?.code}>
            {option?.display_name}
          </option>
        ))}
      </select>
    </div>
  );
}

const RiderCardWrap = styled.div`
  flex: 0 1 calc(50% - 0.6em);
  gap: 1em;
  box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
  min-height: 110px;
  background: ${({ isDisabled }) => isDisabled && "#f0f0f070"};

  &:hover {
    box-shadow: ${({ isDisabled }) =>
      !isDisabled && "0 8px 12px 0 rgb(16 24 48 / 12%)"};
  }

  opacity: ${({ isDisabled }) => (isDisabled ? "0.7" : "1")};
  ${mobile} {
    flex: unset;
    gap: 1em;
    width: 100%;
    margin: 10px 0px;
    background: rgb(243, 244, 249, 0.5) !important;
    border-radius: 10px;
    box-shadow: ${({ isSelected }) =>
      isSelected ? "rgb(16 24 48 / 12%) 0px 8px 12px 0px" : "unset"};
  }
  ${small} {
    gap: unset;
  }
`;

const RiderName = styled.h1`
  font-size: 1rem;
  color: #253858;
  font-weight: 900;
  margin-bottom: 7px;
  ${mobile} {
    font-size: 13px;
  }
`;

function RiderDescription({ rider, isProductDetailsPage, ...props }) {
  const { description } = rider;

  const [showMore, setShowMore] = useState(!isProductDetailsPage);

  const { colors } = useTheme();

  const toggleShowMore = () => setShowMore(!showMore);

  const handleShowMore = evt => {
    evt.stopPropagation();
    toggleShowMore();
  };

  return (
    <RiderDescriptionWrap className="m-0" {...props}>
      {showMore ? description : description.slice(0, 40)}

      {isProductDetailsPage && description?.length > 40 ? (
        <ShowMoreButton
          className="btn p-0 mx-1"
          css={`
            &,
            &:hover {
              color: ${colors.primary_color};
            }
            ${mobile} {
              font-weight: bold;
            }
          `}
          onClick={handleShowMore}
          type="button"
        >
          {showMore ? "Read less" : "...Read more"}
        </ShowMoreButton>
      ) : null}
    </RiderDescriptionWrap>
  );
}

const RiderDescriptionWrap = styled.p`
  color: rgb(37, 56, 88);
  font-weight: 400;
  font-size: 12px;
  overflow: hidden;
  ${mobile} {
    font-size: 10px;
  }
`;

const ShowMoreButton = styled.button`
  font-size: inherit;
`;

export const DetailsSectionWrap = styled.section`
  padding: 0;
  margin: auto;
  margin-top: 40px;
  ${tabletAndMobile} {
    padding: 0;
    margin: auto;
    padding-top: 20px;
  }
`;
