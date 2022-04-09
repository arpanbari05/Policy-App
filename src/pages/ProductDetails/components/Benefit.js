import { useEffect, useState } from "react";
import styled from "styled-components";
import FeatureSection from "./FeatureSection/FeatureSection";
import { RiCheckFill } from "react-icons/ri";
import { useTheme, useCart, useAdditionalDiscount } from "../../../customHooks";
import { useParams } from "react-router-dom";
import {
  featureOptionsValidValue,
  isRelianceInfinityPlan,
} from "../../../utils/helper";
import { useGetFeatureOptionsQuery } from "../../../api/api";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import { tabletAndMobile } from "../../../utils/mediaQueries";
import "styled-components/macro";

const useFeatureOptions = (productId, sumInsured) => {
  const featureOptionsQuery = useGetFeatureOptionsQuery({
    productId,
    sumInsured,
  });

  const { groupCode } = useParams();

  const { updateCart } = useCart();

  const { getSelectedAdditionalDiscounts } = useAdditionalDiscount(groupCode);

  const [updateCartMutation] = updateCart(groupCode);

  const updateFeatureOptions = ({ feature_options = {} }) => {
    const additionalDiscounts = getSelectedAdditionalDiscounts();

    //? Only runs the query if there is some feature option selected.
    Object.keys(feature_options)?.length &&
      updateCartMutation({
        additionalDiscounts,
        feature_options: feature_options,
      });
  };

  return { ...featureOptionsQuery, updateFeatureOptions };
};

const Options = ({
  options,
  selectedBenefit,
  setSelectedBenefit,
  checked,
  setChecked,
}) => {
  const primaryKeys = Object.keys(options);

  let optionKeys = [];

  if (primaryKeys.length) {
    optionKeys = Object.keys(options[primaryKeys[0]]);
  }
  const [selectedOption, setSelectedOption] = useState({
    [`feature_${primaryKeys[0]}`]: optionKeys.length ? optionKeys[0] : null,
  });

  useEffect(() => {
    if (checked) {
      setSelectedBenefit({
        ...selectedBenefit,
        ...selectedOption,
      });
    } else {
      const newBenefit = { ...selectedBenefit };
      delete newBenefit[`feature_${primaryKeys[0]}`];
      setSelectedBenefit({
        ...newBenefit,
      });
    }
  }, [checked]);

  return primaryKeys.map(pKey => (
    <select
      onClick={e => {
        e.stopPropagation();
      }}
      name={pKey}
      id={pKey}
      onChange={event => {
        setChecked(true);
        setSelectedOption({
          [`feature_${pKey}`]: event.target.value,
        });
        if (checked) {
          setSelectedBenefit({
            ...selectedBenefit,
            [`feature_${pKey}`]: event.target.value,
          });
        }
        event.stopPropagation();
      }}
    >
      {Object.keys(options[pKey]).map(dKey => (
        <option value={dKey} key={dKey}>
          {options[pKey][dKey]}
        </option>
      ))}
    </select>
  ));
};

const ContentSection = ({
  data,
  theme,
  selectedBenefit,
  setSelectedBenefit,
}) => {
  const { groupCode } = useParams();

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const [checked, setChecked] = useState(isRelianceInfinityPlan(cartEntry));

  return (
    <StyledContentSection
      theme={theme}
      key={data?.name}
      onClick={e => {
        setChecked(prev => !prev);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 10,
        }}
      >
        <section className="cardHead">
          <h2>{data?.name}</h2>
          <p>{data?.description}</p>
        </section>
        <section className="cardOptions">
          {data?.options && (
            <Options
              checked={checked}
              setChecked={setChecked}
              selectedBenefit={selectedBenefit}
              setSelectedBenefit={setSelectedBenefit}
              options={data?.options}
            ></Options>
          )}
        </section>
      </div>
      <div
        style={{
          background: checked ? theme.primary_color : "#eee",
          // border: !checked ? `1px solid #aaa` : "none",
          minWidth: 30,
          minHeight: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          boxShadow: true ? "0 3px 8px rgba(0,0,0,.2)" : "none",
        }}
      >
        {checked && <RiCheckFill color={"#fff"} size={17} />}
      </div>
    </StyledContentSection>
  );
};

const Benefit = ({}) => {
  const { groupCode } = useParams();

  const { colors: theme } = useTheme();

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const {
    isLoading,
    isError,
    data,
    isUninitialized,
    refetch,
    updateFeatureOptions,
  } = useFeatureOptions(cartEntry?.product.id, cartEntry?.sum_insured);

  const {
    colors: { primary_color },
  } = useTheme();

  const [selectedBenefit, setSelectedBenefit] = useState(
    featureOptionsValidValue(cartEntry?.feature_options),
  );

  useEffect(() => {
    console.log("The selected benefit is", selectedBenefit);
    updateFeatureOptions({ feature_options: selectedBenefit });
  }, [selectedBenefit]);

  if (isLoading || isUninitialized)
    return (
      <DetailsSectionWrap isProductDetailsPage={true}>
        <CardSkeletonLoader />
      </DetailsSectionWrap>
    );

  if (isError)
    return (
      <DetailsSectionWrap isProductDetailsPage={true}>
        <div className="d-flex gap-3 align-items-center">
          <p className="m-0">Something went wrong while getting benefits!</p>
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

  if (data?.data?.length) {
    return (
      <div
        css={`
          margin-top: 10px;
        `}
      >
        <hr />
        <FeatureSection
          heading="Select Benefit to Avail"
          subHeading="You can opt and decide which benefit to avail from below given options"
          id="Plan-Feature-Options"
        >
          <BenefitCardWrapper>
            {data &&
              data?.data?.map(data => (
                <ContentSection
                  selectedBenefit={selectedBenefit}
                  setSelectedBenefit={setSelectedBenefit}
                  data={data}
                  theme={theme}
                />
              ))}
          </BenefitCardWrapper>
        </FeatureSection>
      </div>
    );
  }

  return <></>;
};

const StyledContentSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // flex-direction: column;
  gap: 10px;
  padding: 10px 30px 10px 10px;
  box-shadow: 0 3px 13px 0 rgb(0 0 0 / 16%);
  width: 100%;
  background-color: #fff;

  .cardHead {
    h2 {
      font-weight: 900;
      font-size: 15px;
      line-height: normal;
      color: rgb(37, 56, 88);
    }
    p {
      color: rgb(80, 95, 121);
      font-size: 13px;
      margin-bottom: 0;
    }
  }

  .cardOptions {
    display: flex;
    align-items: center;
    gap: 10px;
    label {
      color: #253858;
      font-weight: 900;
      font-size: 16px;
      line-height: normal;
    }
    select {
      padding: 9px 7px;
      font-size: 15px;
      width: 100%;
      max-width: 200px;
      background-color: #eef1f4;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
  @media (max-width: 450px) {
    padding: 10px;
    gap: 10px;
    .cardHead {
      h2 {
        font-size: 14px;
        margin-bottom: 2px;
      }
      p {
        font-size: 12px;
      }
    }
    .cardOptions {
      label {
        font-size: 14px;
      }
      select {
        padding: 6px 5px;
        font-size: 13px;
        max-width: 170px;
      }
    }
  }
`;

const BenefitCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
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

export default Benefit;
