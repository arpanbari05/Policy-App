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
import { ErrorMessage, Title } from "./FormComponents";
import { every } from "lodash";
import { useGetLocationDetailsQuery } from "../../../api/api";
import "styled-components/macro";
import { InputFormCta } from ".";

function LocationForm() {
  const {
    data: { popularcities },
    journeyType,
  } = useFrontendBoot();
  const { currentForm } = useParams();
  const groupCode = parseInt(currentForm.split("-")[1]);
  const {
    groups,
    getGroupLocation,
    getNextGroup,
    getPreviousGroup,
    getMembersText,
    getGroupMembers,
  } = useMembers();

  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  const [error, setError] = useState(null);

  const getInitialSelectedCity = () => {
    const location = getGroupLocation(groupCode);
    return location;
  };
  const [selectedCity, setSelectedCity] = useState(getInitialSelectedCity);

  const history = useHistory();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const nextGroup = getNextGroup(groupCode);

  const getBackLink = () => {
    const previousGroup = getPreviousGroup(groupCode);

    const isSingleMember = !groups.some(group => group.members.length > 1);

    if (previousGroup)
      return getUrlWithEnquirySearch(`/input/location-${previousGroup.id}`);

    if (journeyType === "top_up" || isSingleMember)
      return getUrlWithEnquirySearch(`/input/members`);

    return getUrlWithEnquirySearch(`/input/plantype`);
  };

  const submit = ({ pincode }) => {
    updateEnquiry({ is_pincode_search: false, pincode, groupCode }).then(
      res => {
        const errors = res.some(res => !!res.error);
        if (errors) return;
        const firstGroup = groups[0];
        let nextPath = getUrlWithEnquirySearch(
          `/input/location-${groupCode + 1}`,
        );
        if (!nextGroup) {
          if (journeyType === "top_up")
            nextPath = getUrlWithEnquirySearch(`/input/deductible`);
          else nextPath = getUrlWithEnquirySearch(`/quotes/${firstGroup.id}`);
        }
        history.push(nextPath);
      },
    );
  };

  const handlePopularCityChange = city => {
    setSelectedCity({ ...city, city: city.name });
    submit(city);
  };

  const checkCitySelected = city =>
    selectedCity && selectedCity.name === city.name;

  const handleSubmit = () => {
    if (!selectedCity) {
      setError("Please enter a valid Pincode or City");
      return;
    }
    submit(selectedCity);
  };

  const {
    reset,
    value: locationSearchQuery,
    ...locationInput
  } = useLocationInput("");

  const handleLocationChange = location => {
    setSelectedCity(location);
    submit(location);
  };

  const clearCity = () => {
    setSelectedCity(null);
    reset();
  };

  const handleSearchQueryChange = evt => {
    locationInput.onChange(evt);
    setSelectedCity(null);
  };

  useEffect(() => {
    setError(null);
  }, [locationSearchQuery, selectedCity]);

  const membersText = getMembersText({ id: parseInt(groupCode) });

  const groupMembers = getGroupMembers(parseInt(groupCode));

  const isSelf = groupMembers.some(member => member.code === "self");

  return (
    <div className="p-3">
      <Title>
        Tell Us Where {isSelf ? "You" : `Your ${membersText}`}{" "}
        {isSelf ? "Live" : "Lives"}?
      </Title>
      <CustomProgressBar now={4} total={5} />
      <div>
        <TextInput
          clear={clearCity}
          label={"Enter Pincode or City"}
          name="location"
          id="location"
          value={selectedCity?.city || locationSearchQuery || ""}
          onChange={handleSearchQueryChange}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!selectedCity && (
          <div>
            <LocationOptions
              selected={selectedCity}
              onChange={handleLocationChange}
              searchQuery={locationSearchQuery}
              showError={!error}
            />
          </div>
        )}
      </div>
      {!selectedCity && (
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
            className="d-flex flex-wrap"
            css={`
              gap: 0.39em;
            `}
          >
            {popularcities.map(city => (
              <PopularCity
                key={city.name}
                onChange={handlePopularCityChange}
                checked={checkCitySelected(city)}
                city={city}
              />
            ))}
          </div>
        </div>
      )}
      <div className="mt-3">
        <InputFormCta
          backLink={getBackLink()}
          onContinueClick={handleSubmit}
          loader={updateEnquiryQuery.isLoading}
        />
      </div>
    </div>
  );
}

export default LocationForm;

function PopularCity({
  city,
  onChange,
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
          padding: 0.73em 2em;
          border-radius: 2em;
          font-size: 0.87rem;
          font-weight: 900;
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

function useLocationInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const onChange = evt => {
    const { value: givenValue } = evt.target;

    if (isNumber(givenValue[0])) {
      const isValidPincode = every([
        isNumber(givenValue),
        givenValue.length <= 6,
      ]);
      if (!isValidPincode) return;
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
  ...props
}) {
  let skip = true;

  if (isNumber(searchQuery[0])) {
    if (searchQuery.length === 6) skip = false;
  } else if (searchQuery.length > 2) {
    skip = false;
  }

  const { isFetching, isUninitialized, data } = useGetLocationDetailsQuery(
    { search: searchQuery },
    { skip },
  );

  if (isUninitialized) return null;

  if (isFetching) return <p>Loading...</p>;

  if (showError && data && !data.length)
    return <ErrorMessage>Please enter a valid Pincode or City</ErrorMessage>;

  const handleChange = location => {
    onChange && onChange(location);
  };

  const checkSelected = location => selected && selected.city === location.city;

  return (
    <div {...props}>
      <ul className="p-0">
        {data.map(location => (
          <Location
            location={location}
            onChange={handleChange}
            isSelected={checkSelected(location)}
            key={location.city}
          />
        ))}
      </ul>
    </div>
  );
}

function Location({ location, isSelected = false, onChange, ...props }) {
  const { colors } = useTheme();

  const handleClick = () => {
    onChange && onChange(location);
  };

  return (
    <li
      {...props}
      role="option"
      aria-selected={isSelected}
      onClick={handleClick}
      css={`
        list-style: none;
        padding: 0.6em;
        &:hover {
          background-color: ${colors.secondary_color};
          color: #fff;
        }
      `}
    >
      {location.city}
    </li>
  );
}
