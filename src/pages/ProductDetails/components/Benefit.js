import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FeatureSection from "./FeatureSection/FeatureSection";
import { setFeatureOptions } from "../../Cart/cart.slice";
import { RiCheckFill } from "react-icons/ri";
import { useTheme } from "../../../customHooks";
import HttpClient from "../../../api/httpClient";

const useRoomRent = (productId, sumInsured) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setLoading(true);
    HttpClient(`product/${productId}/options?sum_insured=${sumInsured}`).then(
      response => {
        if (response.statusCode === 200) {
          if (response.data.data.length !== 0) {
            setStatus("success");
            setResponse(response.data.data);
          } else {
            setStatus("fail");
          }
          setLoading(false);
        } else {
          setStatus("fail");
          setLoading(false);
        }
      },
    );
  }, [productId, sumInsured]);

  return {
    loading,
    response,
    status,
  };
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
  const [checked, setChecked] = useState(false);

  return (
    <StyledContentSection
      theme={theme}
      key={data.name}
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
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </section>
        <section className="cardOptions">
          {data.options && (
            <Options
              checked={checked}
              setChecked={setChecked}
              selectedBenefit={selectedBenefit}
              setSelectedBenefit={setSelectedBenefit}
              options={data.options}
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

const Benefit = ({ cartEntry: cart }) => {
  const { colors: theme } = useTheme();

  const { loading, status, response } = useRoomRent(
    cart?.product.id,
    cart?.sum_insured,
  );

  const [selectedBenefit, setSelectedBenefit] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (response.length) {
      if (!cart.feature_options) {
        dispatch(
          setFeatureOptions({
            ...selectedBenefit,
          }),
        );
      }
    }
  }, [status, loading]);

  useEffect(() => {
    dispatch(
      setFeatureOptions({
        ...selectedBenefit,
      }),
    );
  }, [selectedBenefit]);

  return (
    !loading &&
    status === "success" && (
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
            {response &&
              response?.map(data => (
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
    )
  );
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

export default Benefit;
