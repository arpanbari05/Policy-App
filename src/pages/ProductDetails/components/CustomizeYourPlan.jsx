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
    selectedProduct
  );

  const { sum_insured, tenure, product, health_riders } = cartItem;

  const {
    proposerDetails: { members: membersWithAge },
  } = useSelector((state) => state.greetingPage);

  const fetchRiders = useCallback(() => {
    if (product) {
      setRidersError(false);
      getRiders(
        { productId: product?.id, sum_insured, tenure, group: groupCode },
        (riders, err) => {
          setIsRidersLoading(false);
          if (err) {
            setRidersError(err);
            return;
          }
          //make premium != 0
          setRiders(
            riders.data
              .filter((rider) => rider.total_premium !== 0 || rider.options)
              .map((rider) => ({ ...rider, rider_id: rider.id }))
          );
          setRidersError(false);
        }
      );
    }
  }, [groupCode, product, sum_insured, tenure]);

  const fetchAbhiRiders = useCallback(
    (string) => {
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
                .filter((rider) => rider.total_premium !== 0 || rider.options)
                .map((rider) => ({ ...rider, rider_id: rider.id }))
            );
            setRidersError(false);
            setIsAbhiRidersLoading(false);
          }
        );
      }
    },
    [groupCode, product, sum_insured, tenure]
  );

  useEffect(() => {
    fetchRiders();
  }, [groupCode, tenure]);

  const handleRidersRetry = () => fetchRiders();

  const handleRiderChange = ({
    rider,
    isRiderSelected,
    hasOptions = false,
  }) => {
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
        (health_rider) => health_rider.rider_id !== rider.rider_id
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
        (health_rider) => health_rider.rider_id !== rider.rider_id
      );

      let temp2 = [];
      temp.forEach((data) => {
        if (data.parent_rider) {
          temp.some((data2) => data2.alias === data.parent_rider) &&
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
        page: 'customizehehe',
        health_riders: cartItem.health_riders.map((health_rider) =>
          riders.find((rider) => rider?.rider_id === health_rider?.rider_id)
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

  return (
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
          riders?.map((rider) => (
            <RiderCard
              productPage={!seeDetails}
              key={rider.name + rider.total_premium}
              rider={rider}
              handleRiderChange={handleRiderChange}
              isMandatory={rider.is_mandatory}
              isRiderSelected={
              rider.is_mandatory ||
              health_riders.some(
              (health_rider) => health_rider?.rider_id === rider?.rider_id
              )
              }
              health_riders={health_riders}
              selectedRiders={selectedRiders}
              isAbhiRidersLoading={isAbhiRidersLoading}
            />
          ))
        )}
      </RidersContainer>
    </FeatureSection>
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
