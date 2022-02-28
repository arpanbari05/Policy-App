import { useCallback, useEffect, useState } from "react";
import CardSkeletonLoader from "../../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import { useCartProduct } from "../../../Cart";
import RiderCard from "../../../../components/Common/RiderCard/RiderCard";
import { getAbhiRiders, getRiders } from "../../../SeeDetails/SeeDetails";
import FeatureSection from "../FeatureSection/FeatureSection";
import styled from "styled-components/macro";
import ErrorMessage from "../../../../components/Common/ErrorMessage/ErrorMessage";
import { useSelector } from "react-redux";
import { mobile, small } from "../../../../utils/mediaQueries";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { amount } from "../../../../utils/helper";
import {
  useCart,
  useFrontendBoot,
  useRider,
  useTheme,
} from "../../../../customHooks/index";
import { useGetRidersQuery } from "../../../../api/api";
import { FaCheckCircle } from "react-icons/fa";
import { RiderWrapper } from "../../../ComparePage/ComparePage.style";
import { CircleLoader } from "../../../../components";
import { useParams } from "react-router-dom";
import {
  MobileDetailsSectionWrap,
  MobileSeeDetailsTopOuter,
} from "../../../../components/ProductDetails/Mobile/MobileModalComponents";
import { DetailsSectionWrap } from "../../../../components/ProductDetails/ProductDetailsModal";

function MobileAddOnCoverages({
  quote,
  groupCode,
  onChange,
  defaultSelectedRiders = [],
  ...props
}) {
  const {
    sum_insured,
    tenure,
    product: { id },
  } = quote;

  const getInititalRiders = useCallback(() => {
    return defaultSelectedRiders.map(rider => ({
      ...rider,
      id: rider.rider_id,
      isSelected: true,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupCode]);

  const [riders, setRiders] = useState(getInititalRiders);

  const { journeyType } = useFrontendBoot();

  useEffect(() => setRiders(getInititalRiders), [getInititalRiders]);

  const findLocalRider = riderToFind =>
    riders.find(rider => rider.id === riderToFind.id);

  const isRiderSelected = riderToCheck => {
    if (riderToCheck.is_mandatory) return true;
    const localRider = findLocalRider(riderToCheck);
    return localRider && localRider.isSelected;
  };
  function isAffectsOtherRiders(rider) {
    return !!rider.affects_other_riders;
  }

  function isMandatoryRider(rider) {
    return !!rider.is_mandatory;
  }

  const affectsOtherRiders = riders
    .filter(isRiderSelected)
    .filter(isAffectsOtherRiders)
    .map(rider => rider.alias);

  function getRiderOptionsQueryString(riders = []) {
    const riderOptionsQueryString = riders.reduce(
      (urlQueries, rider) =>
        rider.options_selected
          ? urlQueries.concat(
              Object.keys(rider.options_selected)
                .map(
                  riderOptionKey =>
                    `${riderOptionKey}=${rider.options_selected[riderOptionKey]}&`,
                )
                .join("&"),
            )
          : urlQueries,
      "",
    );
    return riderOptionsQueryString;
  }
  const getRidersQueryParams = {
    sum_insured,
    tenure,
    productId: id,
    group: groupCode,
    additionalUrlQueries: getRiderOptionsQueryString(riders),
    journeyType,
  };

  if (quote.deductible) {
    getRidersQueryParams.deductible = quote.deductible;
  }

  if (affectsOtherRiders.length)
    getRidersQueryParams.selected_riders = affectsOtherRiders;

  const {
    isLoading,
    isUninitialized,
    isFetching,
    data,
    isError,
    error,
    refetch,
  } = useGetRidersQuery(getRidersQueryParams);

  useEffect(() => {
    if (data) {
      const { data: ridersData } = data;
      setRiders(riders => {
        return ridersData.map(rider => {
          const localRider = riders.find(
            localRider => localRider.id === rider.id,
          );
          return {
            ...rider,
            isSelected:
              rider.is_mandatory || (localRider && localRider.isSelected),
            options_selected: localRider
              ? localRider.options_selected
              : rider.options_selected,
          };
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    onChange &&
      onChange(
        riders
          .filter(rider => rider.isSelected)
          .filter(rider => !isMandatoryRider(rider)),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riders]);

  if (isLoading || isUninitialized)
    return (
      <>
        <DetailsSectionWrap>
          <CardSkeletonLoader />
        </DetailsSectionWrap>

        <MobileDetailsSectionWrap>
          <CardSkeletonLoader />
        </MobileDetailsSectionWrap>
      </>
    );

  if (isError)
    return (
      <>
        <DetailsSectionWrap>
          <div>
            <p>Something went wrong while getting riders!</p>
            <p>{error.data?.message}</p>
            <button onClick={refetch}>Retry</button>
          </div>
        </DetailsSectionWrap>

        <MobileDetailsSectionWrap>
          <div>
            <p>Something went wrong while getting riders!</p>
            <p>{error.data?.message}</p>
            <button onClick={refetch}>Retry</button>
          </div>
        </MobileDetailsSectionWrap>
      </>
    );

  const handleChange = changedRider => {
    setRiders(riders => {
      const updatedRiders = riders.map(rider =>
        rider.id === changedRider.id ? changedRider : rider,
      );
      return updatedRiders;
    });
  };

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
    <div
      css={`
        display: none !important;
        ${mobile} {
          background: white;
          padding: 20px 10px;
          display: block !important;
          padding-bottom: 92px;
        }
      `}
    >
      <FeatureSection
        css={`
          display: none;
          ${mobile} {
            display: block;
          }
        `}
        id="additional-riders"
        {...header}
        {...props}
      >
        <div className="d-flex flex-wrap">
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
    </div>
  );
}

export default MobileAddOnCoverages;

function RiderCardNew({ rider, onChange, isFetching, ...props }) {
  const { isSelected } = rider;

  const { colors } = useTheme();

  const handleChange = evt => {
    if (rider.is_mandatory) return;
    onChange && onChange({ ...rider, isSelected: evt.target.checked });
  };

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
    <MobileRiderCardWrap
      className="d-flex align-items-center justify-content-between px-3 py-3"
      {...props}
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
      <RiderPremium
        className="py-2 rounded"
        htmlFor={rider.id}
        css={`
          cursor: pointer;
          background-color: ${isSelected ? colors.primary_shade : "#f3f3f3"};
        `}
      >
        <div className="d-flex align-items-center justify-content-center">
          {isFetching ? (
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
              <div
                css={`
                  font-size: 15px;
                `}
              >
                {amount(rider.total_premium)}
              </div>

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
      </RiderPremium>
    </MobileRiderCardWrap>
  );
}

const RiderPremium = styled.label`
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

const MobileRiderCardWrap = styled.div`
  border-radius: 10px;
  box-shadow: unset;
  background: rgb(243, 244, 249) !important;
  gap: 1em;
  box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
  min-height: 110px;
  width: 100%;
  margin: 10px 0px;
  &:hover {
    box-shadow: 0 8px 12px 0 rgb(16 24 48 / 12%);
  }
  ${small} {
    gap: unset;
  }
`;

const RiderName = styled.h1`
  font-size: 13px;
  color: rgb(37, 56, 88) !important;
  font-weight: 900;
`;

function RiderDescription({ rider, ...props }) {
  const { description } = rider;

  const [showMore, setShowMore] = useState(true);

  const { colors } = useTheme();

  const toggleShowMore = () => setShowMore(!showMore);

  const handleShowMore = evt => {
    evt.stopPropagation();
    toggleShowMore();
  };

  return (
    <RiderDescriptionWrap className="m-0" {...props}>
      {showMore ? description : description.slice(0, 40)}
      {/*description.length > 40 ? (
        <ShowMoreButton
          className="btn p-0 mx-1"
          css={`
            &,
            &:hover {
              color: ${colors.primary_color};
            }
          `}
          onClick={handleShowMore}
          type="button"
        >
          {showMore ? "Read less" : "...Read more"}
        </ShowMoreButton>
          ) : null*/}
    </RiderDescriptionWrap>
  );
}

const RiderDescriptionWrap = styled.p`
  color: #253858;
  font-size: 10px;
  overflow: hidden;
`;

const ShowMoreButton = styled.button`
  font-size: inherit;
`;
