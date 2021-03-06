import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomProgressBar from "../../../components/ProgressBar";
import TextInput from "../../../components/TextInput";
import {
  useFrontendBoot,
  useMembers,
  useTheme,
  useUpdateEnquiry,
  useUrlEnquiry,
} from "../../../customHooks";
import { ErrorMessage, SubTitle, Title } from "./FormComponents";
import { every } from "lodash";
import { useGetLocationDetailsQuery, api } from "../../../api/api";
import "styled-components/macro";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setEditStep, setShowEditMembers } from "../../quotePage/quote.slice";
import { Button } from "../../../components";

function LocationForm({ edit = false, posContent }) {
  const { colors } = useTheme();
  const {
    data: { popularcities },
    journeyType,
  } = useFrontendBoot();
  const { currentForm, groupCode: groupId } = useParams();
  const {
    groups: allGroups,
    getGroupLocation,
    getNextGroup,
    getPreviousGroup,
    getMembersText,
    getGroupMembers,
    getGroup,
  } = useMembers();
  const groupCode = parseInt(currentForm?.split("-")[1] || groupId);
  const currentGroup = getGroup(groupCode);
  const groups = allGroups.filter(group => group.type === currentGroup.type);
  const groupWithoutLocation = groups.find(group => !group.pincode);
  const [currentGroupCode, setCurrentGroupCode] = useState(
    currentGroup?.type === "all"
      ? groups[0]?.id
      : groupWithoutLocation?.id || groupCode,
  );

  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  const [error, setError] = useState(null);

  const [input, setInput] = useState({});

  const dispatch = useDispatch();

  const getInitialSelectedCity = () => {
    const location = getGroupLocation(currentGroupCode);
    return location;
  };

  const [selectedCity, setSelectedCity] = useState(getInitialSelectedCity);

  const history = useHistory();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const nextGroup = getNextGroup(currentGroupCode);

  const previousGroup = getPreviousGroup(currentGroupCode);

  useEffect(() => {
    setSelectedCity(getInitialSelectedCity);
    reset();
  }, [currentGroupCode]);

  const goBack = () => {
    if (previousGroup) {
      setCurrentGroupCode(prev => prev - 1);
    } else {
      dispatch(setEditStep(1));
    }
  };

  const submit = ({ pincode }) => {
    updateEnquiry({
      is_pincode_search: false,
      pincode,
      groupCode: currentGroupCode,
    }).then(res => {
      const errors = res.some(res => !!res.error);
      if (errors) return;
      if (edit) {
        if (nextGroup) {
          if (
            !groupWithoutLocation ||
            groupWithoutLocation?.id === currentGroupCode
          ) {
            dispatch(api.util.invalidateTags(["custom_quotes"]));
            return dispatch(setShowEditMembers(false));
          } else {
            setCurrentGroupCode(prev => prev + 1);
          }
        } else {
          if (
            groupWithoutLocation &&
            groupWithoutLocation?.id !== currentGroupCode
          ) {
            setCurrentGroupCode(groupWithoutLocation?.id);
          } else {
            dispatch(api.util.invalidateTags(["custom_quotes"]));
            return dispatch(setShowEditMembers(false));
          }
        }
      } else {
        let nextPath = getUrlWithEnquirySearch(
          `/input/location-${currentGroupCode + 1}`,
        );
        if (!nextGroup) {
          if (journeyType === "top_up")
            nextPath = getUrlWithEnquirySearch(`/input/deductible`);
          else nextPath = getUrlWithEnquirySearch(`/input/medicalHistory`);
        }
        history.push(nextPath);
      }
    });
  };

  const handlePopularCityChange = city => {
    setSelectedCity({ ...city, city: city.name });
    !edit && submit(city);
  };

  const checkCitySelected = city =>
    selectedCity && selectedCity.name === city.name;

  const handleSubmit = () => {
    if (!selectedCity) {
      locationSearchQuery.length >= 6 && !error
        ? setError("Please select a City from options")
        : setError("Please enter a valid Pincode or City");
      return;
    }
    return submit(selectedCity);
  };

  const {
    reset,
    value: locationSearchQuery,
    ...locationInput
  } = useLocationInput("");

  const handleLocationChange = location => {
    setSelectedCity(location);
    !edit && submit(location);
  };

  const clearCity = () => {
    setSelectedCity(null);
    setInput(prev => ({ ...prev, [currentGroupCode]: "" }));
    reset();
  };

  const handleSearchQueryChange = evt => {
    locationInput.onChange(evt);
    setSelectedCity(null);
    setInput(prev => ({ ...prev, [currentGroupCode]: evt.target.value }));
  };

  const membersText = getMembersText({ id: parseInt(currentGroupCode) });

  const groupMembers = getGroupMembers(parseInt(currentGroupCode));

  const isSelf = groupMembers.some(member => member.code === "self");

  return (
    <div className="p-3">
      {edit && (
        <>
          {getGroup(currentGroupCode).pincode && (
            <div
              css={`
                text-align: center;
                margin-bottom: 2em;
                color: ${colors.secondary_color};

                @media (max-width: 768px) {
                  margin-bottom: 1em;
                }
              `}
            >
              <SubTitle>Location already exist. Do you want to edit?</SubTitle>
            </div>
          )}
          <div
            css={`
              @media (max-width: 768px) {
                margin: 0 auto;
                overflow: auto;
                height: 80px;
                text-align: center;
              }

              &::-webkit-scrollbar {
                display: none;
              }
            `}
            className="d-flex align-items-center gap-3"
          >
            {groups.map(group => (
              <GroupWrapper
                key={group?.id}
                active={group?.id === currentGroupCode}
                color={colors.primary_color}
                onClick={() => setCurrentGroupCode(group?.id)}
              >
                <Group
                  active={group?.id === currentGroupCode}
                  color={colors.primary_color}
                  shade={colors.secondary_shade}
                >
                  {group?.members
                    ?.map(memberText => memberText.split("_").join("-"))
                    .join(",")}
                </Group>
                <span className="pointer"></span>
              </GroupWrapper>
            ))}
          </div>
        </>
      )}

      {!edit && (
        <Title
          dangerouslySetInnerHTML={{
            __html: posContent.question
              ? posContent.question
              : `Tell Us Where ${isSelf ? "You" : "Your" + membersText}
            ${isSelf ? "Live" : "Lives"}?`,
          }}
        ></Title>
      )}
      {!edit && <CustomProgressBar now={4} total={5} />}
      <div
        css={`
          margin-top: 1em;
          position: relative;
        `}
      >
        <TextInput
          clear={clearCity}
          label={"Enter Pincode or City"}
          name="location"
          id="location"
          value={
            selectedCity?.city ||
            locationSearchQuery ||
            input[currentGroupCode] ||
            ""
          }
          onChange={handleSearchQueryChange}
          maxLength={35}
          styledCss={
            edit &&
            `width: 70%; margin-left: auto; margin-right: auto; @media(max-width: 768px) {width: 100%;}`
          }
        />
        {error?.groupCode === currentGroupCode && (
          <div css={edit && `width: 70%; margin: 3px auto;`}>
            <ErrorMessage>{error?.error}</ErrorMessage>
          </div>
        )}
        {!selectedCity && (
          <div
            css={`
              ${edit && "position: absolute; width: 100%;"}
            `}
          >
            <LocationOptions
              selected={selectedCity}
              onChange={handleLocationChange}
              searchQuery={locationSearchQuery}
              showError={!error}
              setError={setError}
              groupCode={currentGroupCode}
              css={
                edit &&
                `width: 70%; margin-left: auto; margin-right: auto; @media(max-width: 768px) {width: 100%;}`
              }
            />
          </div>
        )}

        {edit && (
          <div
            css={`
              width: 70%;
              margin-left: auto;
              margin-right: auto;
              @media (max-width: 768px) {
                width: 100%;
              }
            `}
            className="mt-3"
          >
            <SubTitle>
              Tell Us Where {isSelf ? "You" : `Your ${membersText}`}{" "}
              {isSelf ? "Live" : "Lives"}?
            </SubTitle>
          </div>
        )}
      </div>
      {!edit && (
        <div className="mt-3">
          <h2
            css={`
              font-size: 1rem;
              font-weight: 900;
            `}
          >
            Popular Cities
          </h2>
          <div
            css={`
              display: flex;
              flex-wrap: wrap;
              gap: 0.49em;
              margin: 10px 0;
              padding-right: 10px;
            `}
          >
            {popularcities.map(city => (
              <PopularCity
                key={city.name}
                onChange={handlePopularCityChange}
                checked={checkCitySelected(city)}
                city={city}
                selectedCity={selectedCity}
              />
            ))}
          </div>
        </div>
      )}

      {/* {false ? (
        <div
          css={`
            text-align: center;
          `}
        >
          <Button
            css={`
              width: 40%;
              height: 3em;
              margin: 1em auto 0 auto;
            `}
            onClick={() => submit(selectedCity)}
            disabled={!selectedCity?.pincode}
            loader={updateEnquiryQuery?.isLoading}
          >
            Update
          </Button>
        </div>
      ) : ( */}
      <div
        css={`
          margin-top: 2.5rem;
          ${edit
            ? `width: 70%; margin-left: auto; margin-right: auto; @media(max-width: 768px) {width: 100%;}`
            : ""}
        `}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          css={`
            padding: ${edit ? "0" : "0px 28px"};
            @media (max-width: 480px) {
              padding: "0 17px";
            }
          `}
        >
          <button
            onClick={goBack}
            css={`
              color: #000;
              height: 58px;
              width: 172px;
              background: unset;
              padding: 10px 11px;
              color: rgb(37, 56, 88);
              font-weight: 900;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              font-weight: 600;
              gap: 3px;
              cursor: pointer;

              @media (max-width: 480px) {
                background: rgb(239, 243, 245);
                color: rgb(70, 86, 113);
                font-size: 13px;
                height: 40px;
                max-width: 120px;
                width: 100%;
                padding: 0;
              }
            `}
          >
            <span>Back</span>
          </button>
          <Button
            loaderPrimaryColor
            disabled={!selectedCity?.pincode}
            onClick={handleSubmit}
            arrow
            loader={updateEnquiryQuery.isLoading}
            css={`
              height: 58px;
              width: 100%;
              max-width: 172px;
              font-size: 20px;
              font-weight: 400;

              @media (max-width: 480px) {
                font-size: 13px;
                height: 40px;
                width: 100%;
                max-width: 120px;
                padding: 5px 11px;
                font-weight: normal;
              }
            `}
          >
            Continue
          </Button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default LocationForm;

function PopularCity({
  city,
  onChange,
  selectedCity,
  checked = false,
  disabled = false,
  ...props
}) {
  const { name } = city;

  const { colors } = useTheme();

  const handleChange = evt => {
    const { checked } = evt.target;
    if (!checked) return;
    onChange && onChange(city);
  };

  return (
    <div {...props}>
      <input
        id={name}
        name={name}
        className="visually-hidden"
        type="radio"
        checked={checked}
        onChange={handleChange}
        css={`
          & + label {
            ${selectedCity?.city === name &&
            `
            box-shadow: ${colors.primary_color} 0px 0px 1px 1px;
            background-color: #fff;
            border-color: transparent;
            color: ${colors.primary_color};
            `}
          }
          & + label:hover,
          &:checked + label {
            box-shadow: ${colors.primary_color} 0px 0px 1px 1px;
            background-color: #fff;
            border-color: transparent;
            color: ${colors.primary_color};
          }
        `}
        disabled={disabled}
      />
      <label
        htmlFor={name}
        css={`
          cursor: pointer;
          background-color: ${colors.secondary_shade};
          border: 1px solid ${colors.secondary_shade};

          border-radius: 2em;
          font-size: 0.87rem;
          font-weight: 900;
          line-height: 12px;
          letter-spacing: 1px;
          font-weight: 900;
          padding: 13px 26px;

          @media (max-width: 480px) {
            min-width: fit-content;
            padding: 13px 20px;
            font-size: 12px !important;
          }
        `}
      >
        {name}
      </label>
    </div>
  );
}

function isNumber(value) {
  return !isNaN(value);
}

const isValidCharacter = value => {
  return /^[a-zA-Z]$/.test(value);
};

const isSpecialCharacter = value => {
  return /^[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/.test(value);
};

function useLocationInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const onChange = evt => {
    const { value: givenValue } = evt.target;

    // PUTTING VALIDATION BY RECOGNIZING THE FIRST INPUT AS NUMBER.
    if (isNumber(givenValue[0])) {
      const isValidPincode = every([
        isNumber(givenValue),
        givenValue.length <= 6,
        /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(givenValue),
      ]);
      if (!isValidPincode) return;
    }
    // PUTTING VALIDATION BY RECOGNIZING THE FIRST INPUT AS ALPHABET.
    if (isValidCharacter(givenValue[0])) {
      const isValidCityName = /^[a-zA-Z]*$/.test(givenValue);
      if (!isValidCityName) return;
    }
    if (isSpecialCharacter(givenValue[0])) {
      return;
    }
    setValue(givenValue);
  };

  const reset = () => setValue("");

  return { value, reset, onChange };
}

function LocationOptions({
  searchQuery = "",
  selected,
  onChange,
  showError = true,
  groupCode,
  setError = () => {},

  ...props
}) {
  const [mouseEntered, setMouseEntered] = useState(false);

  let skip = true;

  if (isNumber(searchQuery[0])) {
    if (searchQuery.length === 6) skip = false;
  } else if (searchQuery.length > 2) {
    skip = false;
  }

  const { colors } = useTheme();

  const { isFetching, isUninitialized, data } = useGetLocationDetailsQuery(
    { search: searchQuery },
    { skip },
  );

  if (isUninitialized) return null;

  if (isFetching) return <p>...</p>;

  if (showError && data && !data.length) {
    const errorMsg = "Please enter a valid Pincode or City";
    setError({ error: errorMsg, groupCode });
    return <ErrorMessage>{errorMsg}</ErrorMessage>;
  }

  const handleChange = location => {
    onChange && onChange(location);
  };

  const checkSelected = location => selected && selected.city === location.city;

  return (
    <div {...props}>
      <CityDropDownStyles
        colors={colors}
        mouseEntered={mouseEntered}
        onMouseEnter={() => {
          setMouseEntered(true);
        }}
        onMouseLeave={() => {
          setMouseEntered(false);
        }}
      >
        {data?.map(location => (
          <Location
            location={location}
            onChange={handleChange}
            isSelected={checkSelected(location)}
            key={location.city}
          />
        ))}
      </CityDropDownStyles>
    </div>
  );
}

function Location({ location, isSelected = false, onChange, ...props }) {
  const handleClick = () => {
    onChange && onChange(location);
  };

  return (
    <li
      {...props}
      role="option"
      aria-selected={isSelected}
      onClick={handleClick}
    >
      {location.city}
    </li>
  );
}

const CityDropDownStyles = styled.ul`
  background-color: white;
  box-shadow: 0 0 1px 1px #34343433;
  border-radius: 4px;
  margin-top: 2px;
  overflow: hidden;

  li {
    cursor: pointer;
    list-style: none;
    padding: 0.6em;
    &:first-child {
      background-color: ${props =>
        !props.mouseEntered && props.colors.secondary_color};
      color: ${props => (!props.mouseEntered ? "white" : "black")};
    }
    &:hover {
      color: white;
      background-color: ${props => props.colors.secondary_color};
    }
  }
`;

const Group = styled.div`
  width: 130px;
  white-space: nowrap;
  text-transform: capitalize;
  overflow: hidden !important;
  text-overflow: ellipsis;
  font-size: 0.9em;
  font-weight: bold;
  position: relative;
  color: ${props => (props.active ? "#fff" : "black")};
  padding: 0.75rem 0.8rem;
  background: ${props => (props.active ? props.color : props.shade)};
  border-radius: 1000px;
  text-align: center;
  transition: width 4s;

  &:hover {
    min-width: 130px;
    width: max-content;
    white-space: wrap;
    overflow: none;
    text-overflow: none;
  }
`;

const GroupWrapper = styled.div`
  position: relative;
  cursor: pointer;

  &:first-child {
    margin-left: auto;
  }
  &:last-child {
    margin-right: auto;
  }

  & span {
    content: "";
    width: 15px;
    height: 10px;
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    -webkit-clip-path: polygon(0 0, 50% 100%, 100% 0);
    background: ${props => props.color};
    display: ${props => (props.active ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 90%);
  }
`;
