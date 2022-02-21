import { useState } from "react";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import FeatureSection from "./FeatureSection/FeatureSection";
import styled from "styled-components/macro";
import { small } from "../../../utils/mediaQueries";
import { useCart, useRider, useRiders, useTheme } from "../../../customHooks";
import { CircleLoader } from "../../../components";
import { useParams } from "react-router-dom";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { mobile } from "../../../utils/mediaQueries";
import { amount } from "../../../utils/helper";

export function RidersSection() {
  let { groupCode } = useParams();

  groupCode = parseInt(groupCode);

  const { getCartEntry } = useCart(groupCode);

  const quote = getCartEntry(groupCode);

  const { replaceRiders } = useRider(groupCode);

  const handleRidersChange = riders => {
    replaceRiders(riders);
  };

  return (
    <Riders
      quote={quote}
      groupCode={groupCode}
      defaultSelectedRiders={quote.health_riders}
      onChange={handleRidersChange}
    />
  );
}

export function Riders({
  quote,
  groupCode,
  onChange,
  defaultSelectedRiders = [],
  ...props
}) {
  const {
    query: { isLoading, isUninitialized, isError, error, isFetching, refetch },
    handleChange,
    riders,
  } = useRiders({ quote, groupCode, onChange, defaultSelectedRiders });

  if (isLoading || isUninitialized) return <CardSkeletonLoader />;

  if (isError)
    return (
      <div>
        <p>Something went wrong while getting riders!</p>
        <p>{error.data?.message}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );

  let header = {
    heading: "Customize Your Plan",
    subHeading:
      "You can add 'Riders' to you basic health insurance plan for additional benefits.",
  };

  if (!riders.length) {
    header.heading = "Oops! No Riders available.";
    header.subHeading =
      "You can add 'Riders' to you basic health insurance plan for additional benefits. Currently no riders are available for this base plan.";
  }

  return (
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
            key={rider.id}
            isFetching={isFetching}
          />
        ))}
      </div>
    </FeatureSection>
  );
}

export function RiderCardNew({ rider, onChange, isFetching, ...props }) {
  const { isSelected } = rider;

  const handleRiderOptionChange = riderOption => {
    onChange &&
      onChange({
        ...rider,
        isSelected,
        options_selected: {
          ...rider.options_selected,
          [riderOption.key]: riderOption.selected,
        },
      });
  };

  return (
    <RiderCardWrap
      className="d-flex align-items-center justify-content-between px-3 py-3"
      {...props}
      isSelected={isSelected}
    >
      <div>
        <RiderName className="w-100">{rider.name}</RiderName>
        <RiderDescription rider={rider} />
        <div
          className="d-flex flex-wrap mt-2"
          css={`
            gap: 0.6em;
          `}
        >
          {rider.options &&
            Object.keys(rider.options).map(riderOptionKey => (
              <RiderOption
                option={{
                  options: rider.options[riderOptionKey],
                  key: riderOptionKey,
                  selected: rider.options_selected?.[riderOptionKey],
                }}
                onChange={handleRiderOptionChange}
                key={riderOptionKey}
              />
            ))}
        </div>
      </div>
      <RiderPremium rider={rider} onChange={onChange} />
    </RiderCardWrap>
  );
}

export function RiderPremium({ rider, isLoading = false, onChange }) {
  const { colors } = useTheme();
  const { isSelected } = rider;

  const handleChange = evt => {
    if (rider.is_mandatory) return;
    onChange && onChange({ ...rider, isSelected: evt.target.checked });
  };

  return (
    <RiderPremiumWrap
      className="py-2 rounded"
      htmlFor={rider.id}
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
            <div>{amount(rider.total_premium)}</div>

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
        name={rider.id}
        id={rider.id}
        checked={!!isSelected}
        onChange={handleChange}
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
  const handleChange = evt => {
    onChange && onChange({ key, options, selected: evt.target.value });
  };

  let optionsList = [];

  if (typeof options[0] === "string") {
    optionsList = options.map(optionString => ({
      code: optionString,
      display_name: optionString,
    }));
  }

  if (typeof options[0] === "object") {
    optionsList = options.map(opitonObject => ({
      code: Object.keys(opitonObject)[0],
      display_name: Object.values(opitonObject)[0],
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
          <option key={option.code} value={option.code}>
            {option.display_name}
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
  min-height: 7.9em;

  &:hover {
    box-shadow: 0 8px 12px 0 rgb(16 24 48 / 12%);
  }

  ${mobile} {
    flex: unset;
    gap: 1em;
    width: 100%;
    margin: 10px 0px;
    background: rgb(243, 244, 249) !important;
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
  ${mobile} {
    font-size: 13px;
  }
`;

function RiderDescription({ rider, ...props }) {
  const { description } = rider;

  const [showMore, setShowMore] = useState(false);

  const { colors } = useTheme();

  const toggleShowMore = () => setShowMore(!showMore);

  const handleShowMore = evt => {
    evt.stopPropagation();
    toggleShowMore();
  };

  return (
    <RiderDescriptionWrap className="m-0" {...props}>
      {showMore ? description : description.slice(0, 40)}
      {description.length > 40 ? (
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
  color: #253858;
  font-size: 0.81rem;
  overflow: hidden;
  ${mobile} {
    font-size: 10px;
  }
`;

const ShowMoreButton = styled.button`
  font-size: inherit;
`;
