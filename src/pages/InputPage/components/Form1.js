import { useState, useEffect } from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, SubTitle, ErrorMessage, formButtons } from "./FormComponents";
import { useSelector, useDispatch } from "react-redux";
import RadioCapsule from "../../../components/RadioCapsule";
import {
  getRegion,
  saveForm1UserDetails,
  setIsDisabled,
} from "../greetingPage.slice";
import "styled-components/macro";
import { useHistory } from "react-router";
import SecureLS from "secure-ls";
const Form1 = ({
  handleChange,
  currentForm,
  member,
  index,
  lastForm,
  memberGroup,
}) => {
  const dispatch = useDispatch();
  const { frontendData } = useSelector((state) => state.frontendBoot);
  const {
    regionDetailsLoading,
    regionDetails,
    proposerDetails,
    isDisabled,
    regionDetailsError,
    memberGroups,
  } = useSelector((state) => state.greetingPage);
  const { data } = frontendData || [""];
  const { popularcities } = data || [""];

  const ls = new SecureLS();
  const history = useHistory();
  const [isIndividualPlan, setIsIndividualPlan] = useState(false);
  useEffect(() => {
    if (proposerDetails.plan_type && proposerDetails.plan_type === "I") {
      setIsIndividualPlan(true);
    } else {
      setIsIndividualPlan(false);
    }
  }, [proposerDetails.plan_type]);
  const [pinCode, setPinCode] = useState("");
  const [customErrors, setCustomErrors] = useState(false);
  console.log(pinCode, "asdfa");

  useEffect(() => {
    if (pinCode?.length > 2) {
      dispatch(getRegion(pinCode));
    }
  }, [pinCode]);
  useEffect(() => {
    setCustomErrors(regionDetailsError);
  }, [regionDetailsError]);

  // const pushToQuotes = (groupCode) => {
  //   history.push({
  //     pathname: `/quotes/${groupCode}`,
  //     search: `enquiryId=${ls.get("enquiryId")}`,
  //   });
  // };

  let form = lastForm ? 5 : parseFloat(`4.${index + 1}`);
  const handleSubmit = () => {
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
          handleChange,
          memberGroup,
          form
          // pushToQuotes
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
        display: ${`${currentForm}` !== `4.${index}` && "none"};
      `}
    >
      <div
        css={`
          padding: 17px;
        `}
      >
        <Title>
          Tell Us Where
          {member.includes("self") ? (
            " You Live?"
          ) : (
            <>
              <span
                css={`
                  text-transform: capitalize;
                `}
              >
                {" "}
                Your {member.join(", ")}
              </span>
              {member.length > 1 ? " lives?" : " lives?"}
            </>
          )}
        </Title>
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
            autoComplete={`off`}
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
            proposerDetails?.[memberGroup]?.pincode !==
              regionDetails?.pincode && (
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
                      // pushToQuotes
                      handleChange,
                      memberGroup,
                      form
                    )
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
            id={name + memberGroup}
            checked={name === pinCode}
            onClick={(e) => {
              console.log("asdg", member);
              setPinCode(`${e.target.value}`);
              dispatch(setIsDisabled(true));
              setCustomErrors(false);
              dispatch(
                saveForm1UserDetails(
                  {
                    pinCode: pincode,
                    is_pincode_search: false,
                  },
                  // pushToQuotes
                  handleChange,
                  memberGroup,
                  form
                )
              );
            }}
          />
        ))}
      </div>
      {/* {formButtons(
        () => {
          handleChange(currentForm - 1);
        },
        handleSubmit,
        true
      )} */}
      {formButtons(() => {
        console.log("asfdd", index);
        if (isIndividualPlan) {
          handleChange(2);
        } else if (index === 1) {
          handleChange(3);
        } else {
          handleChange(parseFloat(`4.${index - 1}`));
        }
      }, handleSubmit)}
      <div>
        {/* <StyledButton
          styledCss={`margin:0; width: 100%;`}
          value={`Get Started`}
          onClick={handleSubmit}
        /> */}
      </div>
    </div>
  );
};

export default Form1;
