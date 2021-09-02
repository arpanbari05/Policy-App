import { useState, useEffect } from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, SubTitle, ErrorMessage } from "./FormComponents";
import { useSelector, useDispatch } from "react-redux";
import RadioCapsule from "../../../components/RadioCapsule";
import {
  getRegion,
  saveForm1UserDetails,
  setIsDisabled,
} from "../greetingPage.slice";
import "styled-components/macro";
const Form1 = ({ handleChange, currentForm }) => {
  const dispatch = useDispatch();
  const { frontendData } = useSelector((state) => state.frontendBoot);
  const {
    regionDetailsLoading,
    regionDetails,
    proposerDetails,
    isDisabled,
    regionDetailsError,
  } = useSelector((state) => state.greetingPage);
  const { data } = frontendData || [""];
  const { popularcities } = data || [""];

  const [pinCode, setPinCode] = useState("");
  const [customErrors, setCustomErrors] = useState(false);

  useEffect(() => {
    if (pinCode?.length > 2) {
      dispatch(getRegion(pinCode));
    }
  }, [pinCode]);
  useEffect(() => {
    setCustomErrors(regionDetailsError);
  }, [regionDetailsError]);

  const handleSubmit = () => {
    console.log("heheh");
    if (
      !isDisabled &&
      regionDetails?.city?.toLowerCase() === data?.pinCode?.toLowerCase()
    ) {
      setCustomErrors(false);
      dispatch(
        saveForm1UserDetails(
          {
            pinCode: regionDetails.pincode,
            is_pincode_search: regionDetails.is_pincode_search,
          },
          handleChange
        )
      );
    } else if (
      !isDisabled &&
      regionDetails?.city?.toLowerCase() !== data?.pinCode?.toLowerCase()
    ) {
      setCustomErrors("Invalid Pincode or city");
    } else if (isDisabled) {
      setCustomErrors(false);
    }
  };

  return (
    <div
      css={`
        display: ${currentForm !== 1 && "none"};
      `}
    >
      <div
        css={`
          padding: 17px;
        `}
      >
        <Title>Tell Us Where You Live?</Title>
        <CustomProgressBar now={currentForm} total={5} />
        <div
          css={`
            position: relative;
            & .dropdown {
              position: absolute;
              background: #5da400;
              width: 100%;
              border: 1px solid #5da400;
              color: #fff;
              top: 57px;
              height: 51px;
              border-radius: 1px 1px 17px 17px;
              padding: 11px 14px;
            }
          `}
        >
          <TextInput
            styledCss={`margin-bottom: 10px;`}
            clear={() => setPinCode("")}
            value={pinCode}
            label={`Pincode/City`}
            onChange={(e) => {
              setPinCode(e.target.value);
            }}
          />
          {customErrors && <ErrorMessage>{customErrors}</ErrorMessage>}
          {!regionDetailsLoading &&
            regionDetails?.city &&
            pinCode?.length > 2 &&
            proposerDetails.pincode !== regionDetails?.pincode && (
              <div
              onClick={() => {
                setPinCode(regionDetails.city);
                setCustomErrors(false);
                dispatch(
                  saveForm1UserDetails(
                    {
                      pinCode: regionDetails.pincode,
                      is_pincode_search: regionDetails.is_pincode_search,
                    },
                    handleChange,
                  ),
                );
             
              }}
                className="dropdown"
              >
                {regionDetails?.city}
              </div>
            )}
        </div>
        <SubTitle>Popular Cities</SubTitle>
        {popularcities?.map(({ pincode, name }) => (
          <RadioCapsule
            key={name}
            label={name}
            styledCss={`margin-bottom: 10px; margin-right: 5px;`}
            value={name}
            id={name}
            checked={name === pinCode}
            onClick={(e) => {
              setPinCode(`${e.target.value}`);
              dispatch(setIsDisabled(true));
              setCustomErrors(false);
              dispatch(
                saveForm1UserDetails(
                  {
                    pinCode: pincode,
                    is_pincode_search: false,
                  },
                  handleChange
                )
              );
            }}
          />
        ))}
      </div>
      <div>
        <StyledButton
          styledCss={`margin:0; width: 100%;`}
          value={`Get Started`}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Form1;
