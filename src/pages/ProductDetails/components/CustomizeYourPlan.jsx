import { useCallback, useEffect, useState } from "react";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import { useCartProduct } from "../../Cart";
import RiderCard from "../../../components/Common/RiderCard/RiderCard";
import { getAbhiRiders, getRiders } from "../../SeeDetails/SeeDetails";
import FeatureSection from "./FeatureSection/FeatureSection";
import styled from "styled-components/macro";
import ErrorMessage from "../../../components/Common/ErrorMessage/ErrorMessage";
import { useSelector } from "react-redux";
import { small } from "../../../utils/mediaQueries";
import {
  useCart,
  useFrontendBoot,
  useRider,
  useTheme,
} from "../../../customHooks";
import { useGetRidersQuery } from "../../../api/api";
import { FaCheckCircle } from "react-icons/fa";
import { RiderWrapper } from "../../ComparePage/ComparePage.style";
import { CircleLoader } from "../../../components";
import { useParams } from "react-router-dom";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";

import { amount } from "../../../utils/helper";

const CustomizeYourPlan = ({
  groupCode,
  product: selectedProduct,
  seeDetails,
}) => {
  const [isRidersLoading, setIsRidersLoading] = useState(true);
  const [isAbhiRidersLoading, setIsAbhiRidersLoading] = useState(false);
  const [ridersError, setRidersError] = useState(false);
  const [riders, setRiders] = useState([]);
  const [selectedRiders, setSelectedRiders] = useState({});

  const { updateProductRedux, product: cartItem } = useCartProduct(
    groupCode,
    selectedProduct,
  );

  const { sum_insured, tenure, product, health_riders } = cartItem;

  const {
    proposerDetails: { members: membersWithAge },
  } = useSelector(state => state.greetingPage);

  const fetchRiders = useCallback(
    ({ selected_riders }) => {
      if (product) {
        setRidersError(false);
        getRiders(
          {
            productId: product?.id,
            sum_insured,
            tenure,
            group: groupCode,
            selected_riders,
          },
          (riders, err) => {
            setIsRidersLoading(false);
            if (err) {
              setRidersError(err);
              return;
            }
            //make premium != 0
            setRiders(
              riders.data
                .filter(rider => rider.total_premium !== 0 || rider.options)
                .map(rider => ({ ...rider, rider_id: rider.id })),
            );
            setRidersError(false);
          },
        );
      }
    },
    [groupCode, product, sum_insured, tenure],
  );

  const fetchAbhiRiders = useCallback(
    string => {
      if (product) {
        // setIsRidersLoading(true);
        setIsAbhiRidersLoading(true);
        setRidersError(false);
        getAbhiRiders(
          {
            productId: seeDetails || product?.id,
            sum_insured,
            tenure,
            group: groupCode,
            string,
          },
          (riders, err) => {
            setIsRidersLoading(false);
            if (err) {
              setRidersError(err);
              return;
            }
            //make premium != 0
            setRiders(
              riders.data
                .filter(rider => rider.total_premium !== 0 || rider.options)
                .map(rider => ({ ...rider, rider_id: rider.id })),
            );
            setRidersError(false);
            setIsAbhiRidersLoading(false);
          },
        );
      }
    },
    [groupCode, product, sum_insured, tenure],
  );

  let selectedPlusMendatoryRiders = [
    ...health_riders,
    ...riders.filter(i => i.is_mandatory),
  ];

  useEffect(() => {
    fetchRiders({
      selected_riders: selectedPlusMendatoryRiders.map(rider => rider.alias),
    });
  }, [groupCode, tenure]);

  const handleRidersRetry = () =>
    fetchRiders({
      selected_riders: selectedPlusMendatoryRiders.map(rider => rider.alias),
    });

  const { addRider, removeRider } = useRider(parseInt(groupCode));

  const handleRiderChange = ({
    rider,
    isRiderSelected,
    hasOptions = false,
  }) => {
    if (isRiderSelected) {
      addRider(rider);
    } else {
      removeRider(rider);
    }
    //console.warning("Your rider is below");
    const { health_riders } = cartItem;
    // const newRiders =
    //   !hasOptions && isRiderSelected
    //     ? [...health_riders, rider]
    //     : hasOptions && isRiderSelected
    //     ? health_riders.filter(
    //         health_rider => health_rider.rider_id !== rider.rider_id,
    //       )
    //     : health_riders.filter(
    //         health_rider => health_rider.rider_id !== rider.rider_id,
    //       );

    let newRiders;
    if (!hasOptions && isRiderSelected) {
      newRiders = [...health_riders, rider];
      console.log("newnewnew", newRiders);
    } else if (hasOptions && isRiderSelected) {
      console.log("gege3312", rider, hasOptions);
      const temp = health_riders.filter(
        health_rider => health_rider.rider_id !== rider.rider_id,
      );
      newRiders = [
        ...temp,
        {
          ...rider,
          option_selected: {
            [hasOptions.key]: hasOptions.selectedOption,
          },
        },
      ];
      const tempObj = { ...selectedRiders };
      tempObj[hasOptions.key] = hasOptions.selectedOption;
      setSelectedRiders(tempObj);
    } else {
      const temp = health_riders.filter(
        health_rider => health_rider.rider_id !== rider.rider_id,
      );

      let temp2 = [];
      temp.forEach(data => {
        if (data.parent_rider) {
          temp.some(data2 => data2.alias === data.parent_rider) &&
            temp2.push(data);
        } else {
          temp2.push(data);
        }
      });
      newRiders = [...temp2];
    }

    updateProductRedux({
      ...cartItem,
      health_riders: newRiders,
    });

    if (rider.affects_other_riders) {
      if (isRiderSelected)
        fetchRiders({
          selected_riders: [
            rider.alias,
            ...selectedPlusMendatoryRiders.map(rider => rider.alias),
          ],
        });
      else
        fetchRiders({
          selected_riders: [
            selectedPlusMendatoryRiders
              .filter(selectedRider => selectedRider.alias !== rider.alias)
              .map(rider => rider.alias),
          ],
        });
    }
  };

  useEffect(() => {
    const keys = Object.keys(selectedRiders);
    const string = keys.reduce((a, b) => a + `&${b}=${selectedRiders[b]}`, "");
    fetchAbhiRiders(string);
  }, [selectedRiders]);

  useEffect(() => {
    if (riders.length > 0) {
      updateProductRedux({
        ...cartItem,
        page: "customizehehe",
        health_riders: cartItem.health_riders.map(health_rider =>
          riders.find(rider => rider?.rider_id === health_rider?.rider_id),
        ),
      });
    }
  }, [riders]);

  //   alias: "pa"
  // description: "Provides financial compensation to the Insured's family in case of permanent disability/death caused directly and only due to any accident."
  // id: 103
  // is_mandatory: false
  // name: "Personal Accident"
  // premium: 432
  // sum_insured: 400000
  // tax_amount: 78
  // total_premium: 510
  // 1: {id: 105, name: "Nursi

  return riders.length ? (
    <FeatureSection
      heading="Customize Your Plan"
      subHeading="You can add ‘Riders’ to you basic health insurance plan for additional benefits."
      id="additional-riders"
    >
      <RidersContainer>
        {ridersError ? (
          <ErrorMessage
            title={
              <div>
                <span>Something went wrong while getting Riders</span>
                <button onClick={handleRidersRetry}>Retry</button>
              </div>
            }
            // message={ridersError}
          />
        ) : isRidersLoading ? (
          <CardSkeletonLoader />
        ) : riders?.length === 0 ? (
          "No Riders Found"
        ) : (
          riders?.map(rider => (
            <RiderCard
              productPage={!seeDetails}
              key={rider.name + rider.total_premium}
              rider={rider}
              handleRiderChange={handleRiderChange}
              isMandatory={rider.is_mandatory}
              isRiderSelected={
                rider.is_mandatory ||
                health_riders.some(
                  health_rider => health_rider?.rider_id === rider?.rider_id,
                )
              }
              health_riders={health_riders}
              selectedRiders={selectedRiders}
              isAbhiRidersLoading={isAbhiRidersLoading}
              selectedPlusMendatoryRiders={selectedPlusMendatoryRiders}
              allRiders={riders}
            />
          ))
        )}
      </RidersContainer>
    </FeatureSection>
  ) : (
    <></>
  );
};

const RidersContainer = styled.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 1024px) {
    display: block;
    padding: 0px;
  }

  ${small} {
    margin: 0;
  }
`;

export default CustomizeYourPlan;

function isAffectsOtherRiders(rider) {
  return !!rider.affects_other_riders;
}

function isMandatoryRider(rider) {
  return !!rider.is_mandatory;
}

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

  const affectsOtherRiders = riders
    .filter(isRiderSelected)
    .filter(isAffectsOtherRiders)
    .map(rider => rider.alias);

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

  if (isLoading || isUninitialized) return <CardSkeletonLoader />;

  if (isError)
    return (
      <div>
        <p>Something went wrong while getting riders!</p>
        <p>{error.data?.message}</p>
        <button onClick={refetch}>Retry</button>
      </div>
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
    <FeatureSection id="additional-riders" {...header} {...props}>
      <div
        className="d-flex flex-wrap"
        css={`
          gap: 1.2em;
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
    <RiderCardWrap
      className="d-flex align-items-center justify-content-between px-3 py-3"
      {...props}
    >
      <div>
        <RiderName className="w-100">{rider.name}</RiderName>
        <RiderDescription rider={rider} />
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
      </RiderPremium>
    </RiderCardWrap>
  );
}

const RiderPremium = styled.label`
  min-width: 7.9em;
  font-weight: 900;
`;

function RiderOption({
  option: { key, options, selected },
  onChange,
  ...props
}) {
  const { colors } = useTheme();
  const handleChange = evt => {
    onChange && onChange({ key, options, selected: evt.target.value });
  };

  return (
    <div {...props}>
      <select
        className="p-2 mt-2"
        css={`
          background-color: ${colors.primary_shade};
        `}
        name={key}
        value={selected}
        onChange={handleChange}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
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
`;

const RiderName = styled.h1`
  font-size: 1rem;
  color: #253858;
  font-weight: 900;
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
`;

const ShowMoreButton = styled.button`
  font-size: inherit;
`;
