import { useState, useEffect } from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, SubTitle, ErrorMessage, formButtons } from "./FormComponents";
import { useSelector, useDispatch } from "react-redux";
import RadioCapsule from "../../../components/RadioCapsule";
import {
  createRegionData,
  getRegion,
  saveForm1UserDetails,
  setIsDisabled,
} from "../greetingPage.slice";
import "styled-components/macro";
import { useHistory } from "react-router";
import SecureLS from "secure-ls";
import { useGetCitiesMutation } from "../../../api/api";

const Form1 = ({
  handleChange,
  currentForm,
  member,
  index,
  lastForm,
  memberGroup,
}) => {
  const dispatch = useDispatch();
  const { frontendData, theme } = useSelector(state => state.frontendBoot);
  const { PrimaryColor, SecondaryColor, PrimaryShade } = theme;
  const {
    regionDetailsLoading,
    regionDetails,
    proposerDetails,
    isDisabled,
    regionDetailsError,
    memberGroups,
  } = useSelector(state => state.greetingPage);

  const forbiddedSymbols = [
    "!",
    "%",
    "$",
    "&",
    "+",
    "=",
    "^",
    "*",
    "`",
    "~",
    "_",
    "(",
    "#",
    "\\",
    "-",
    ",",
    "/",
    ".",
    ")",
    "{",
    "}",
    ";",
    "?",
    '"',
    "'",
    "@",
    ">",
    "[",
    "]",
    "<",
    "|",
  ];
  //console.log("The member group", memberGroup);
  const { data } = frontendData || [""];
  const { popularcities } = data || [""];

  const ls = new SecureLS();
  const history = useHistory();
  const [isIndividualPlan, setIsIndividualPlan] = useState(false);
  useEffect(() => {
    console.log("useEffect 1 executed");
    if (proposerDetails?.plan_type && proposerDetails?.plan_type === "I") {
      setIsIndividualPlan(true);
    } else {
      setIsIndividualPlan(false);
    }
  }, [proposerDetails?.plan_type]);
  const [pinCode, setPinCode] = useState("");
  const [customErrors, setCustomErrors] = useState(false);

  const [getCities, { isLoading: isGetCitiesLoading, data: cities }] =
    useGetCitiesMutation();

  useEffect(() => {
    console.log("I m executed with pincode", pinCode);
    if (pinCode?.length > 2) {
      console.log("disptached getRegion");
      // dispatch(getRegion(pinCode));
      getCities({ searchQuery: pinCode });
    }
  }, [pinCode]);
  useEffect(() => {
    console.log("useEffect 3 executed");
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
          form,
          // pushToQuotes
        ),
      );
    } else if (
      proposerDetails?.[memberGroup]?.city?.toLowerCase() ===
      pinCode?.toLowerCase()
    ) {
      handleChange(form);
    } else if (
      !isDisabled &&
      regionDetails?.city?.toLowerCase() !== data?.pinCode?.toLowerCase()
    ) {
      console.log("I executed");
      setCustomErrors("Invalid Pincode or city");
    } else if (isDisabled) {
      setCustomErrors(false);
    }
  };

  const displayDropDownDecider = "";

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
              background: ${SecondaryColor};
              width: 100%;
              border: 1px solid ${SecondaryColor};
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
            onChange={e => {
              console.log("Change occured in input", e.target.value);
              let falseChar = false;
              e.target.value.split("").map(char => {
                if (forbiddedSymbols.indexOf(char) >= 0) falseChar = true;
              });
              // forbiddedSymbols
              if (!falseChar) {
                setPinCode(e.target.value);
              }
            }}
          />
          {customErrors && <ErrorMessage>{customErrors}</ErrorMessage>}
          {/*console.log(
            "!regionDetailsLoading,regionDetails.city,pinCode.length > 2,proposerDetails?.[memberGroup]?.pincode,regionDetails?.pincode",
            !regionDetailsLoading,
            regionDetails.city,
            pinCode.length > 2,
            proposerDetails?.[memberGroup]?.pincode,
            regionDetails?.pincode,
            "Result of evaluation",
            !regionDetailsLoading &&
              regionDetails?.city &&
              pinCode.length > 2 &&
              proposerDetails?.[memberGroup]?.pincode !== regionDetails?.pincode
          )*/}
          {console.log("prosperDeatials ", proposerDetails)}
          {console.log("memeber group", memberGroup)}
          {/* {!regionDetailsLoading &&
            regionDetails?.city &&
            pinCode.length > 2 &&
            proposerDetails?.[memberGroup]?.pincode !==
              regionDetails?.pincode && (
              <div
                onClick={() => {
                  console.log("click detected");
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
            )} */}
          {!isGetCitiesLoading &&
            cities &&
            pinCode.length > 2 &&
            !cities.some(
              city => city.pincode === proposerDetails?.[memberGroup]?.pincode,
            ) && (
              <div className="dropdown" style={{ height: "auto" }}>
                {cities.map(city => (
                  <div
                    css={`
                      &:not(:last-child) {
                        padding-bottom: 10px;
                      }
                    `}
                    onClick={() => {
                      console.log("click detected");
                      setPinCode(city.city);
                      setCustomErrors(false);
                      dispatch(
                        saveForm1UserDetails(
                          {
                            pinCode: city.pincode,
                            is_pincode_search: city.is_pincode_search,
                          },
                          // pushToQuotes
                          handleChange,
                          memberGroup,
                          form,
                        ),
                      );
                      dispatch(createRegionData(city));
                    }}
                  >
                    {city?.city}
                  </div>
                ))}
              </div>
            )}
        </div>
        <SubTitle>Popular Cities</SubTitle>
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {popularcities?.map(({ pincode, name }) => (
            <RadioCapsule
              key={name}
              label={name}
              styledCss={`margin-bottom: 10px; margin-right: 5px;`}
              value={name}
              id={name + memberGroup}
              checked={name === pinCode}
              onClick={e => {
                setPinCode(`${e.target.value}`);
                dispatch(setIsDisabled(true));
                setCustomErrors(false);
                dispatch(
                  saveForm1UserDetails(
                    {
                      city: name,
                      pinCode: pincode,
                      is_pincode_search: false,
                    },
                    // pushToQuotes
                    handleChange,
                    memberGroup,
                    form,
                  ),
                );
              }}
            />
          ))}
        </div>
      </div>
      {/* {formButtons(
        () => {
          handleChange(currentForm - 1);
        },
        handleSubmit,
        true
      )} */}
      <div
        css={`
          margin: 0px 17px !important;
        `}
      >
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
      </div>

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
