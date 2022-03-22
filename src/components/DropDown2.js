import styled from "styled-components/macro";
import "styled-components/macro";
import { useState, useEffect } from "react";
import { useTheme } from "../customHooks";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { autoCapitalizationHandler } from "../utils/helper";

function DropDown2({ label, value, onChange, options, onBlur }) {
  const [displayDD, setDisplayDD] = useState(false);

  const [filteredOptions, setFilteredOptions] = useState(options);

  const [searchInput, setSearchInput] = useState("");

  // SETS SEARCH TEXT INITIALLY AND WHEN ON OPTIONS CLICK
  useEffect(() => {
    value?.label && setSearchInput(value?.label);
  }, [value?.label]);

  const searchInputChangeHandler = e => {
    if (!/^[a-zA-Z\s]*$/.test(e.target.value)) return;
    
    const filterArray = options.filter(singleOption =>
      singleOption?.label.includes(autoCapitalizationHandler(e.target.value)),
    );
    setSearchInput(autoCapitalizationHandler(e.target.value));
    setFilteredOptions(filterArray);
  };
  return (
    <>
      {displayDD && (
        <NonVisibleBackdrop onClick={setDisplayDD.bind(null, false)} />
      )}
      <DDFieldOuter className="position-relative">
        <div
          className="d-flex align-items-center justify-content-between"
          css={`
            height: 65px;
          `}
        >
          <div
            css={`
              width: 90%;
            `}
          >
            <FloatingPlaceHolder
              displayDD={displayDD}
              onClick={() => {
                setDisplayDD(true);
              }}
              isValueAvailable={value?.label}
            >
              {label}
            </FloatingPlaceHolder>

            {(displayDD || value?.label) && (
              <CustomizedInput
                onChange={searchInputChangeHandler}
                type="text"
                name="search-input"
                autoFocus
                value={searchInput}
                onBlur={() => {
                  setSearchInput(value?.label);
                  onBlur();
                }}
                onClick={() => {
                  value?.label && setDisplayDD(true);
                }}
              />
            )}
          </div>

          {displayDD && (
            <FiChevronUp
              onClick={() => {
                setDisplayDD(false);
              }}
              color="grey"
              size="22px"
            />
          )}
          {!displayDD && (
            <FiChevronDown
              onClick={() => {
                setDisplayDD(true);
              }}
              color="grey"
              size="22px"
            />
          )}
        </div>

        {displayDD && (
          <DropDown
            setDisplayDD={setDisplayDD}
            onChange={onChange}
            options={filteredOptions}
          />
        )}
      </DDFieldOuter>
    </>
  );
}

export default DropDown2;

const DDFieldOuter = styled.div`
  height: 65px;
  width: 100%;
  border: 1px solid grey;
  border-radius: 4px;
  z-index: 10;
  padding: 0px 10px;
`;

const CustomizedInput = styled.input`
  width: 100%;
  z-index: 20;
  font-weight: 900;
  outline: none;
  border: none;
`;

const FloatingPlaceHolder = styled.span`
  color: #505b6d;
  font-weight: 900;
  transition: all 200ms;
  width: ${({ displayDD, isValueAvailable }) =>
    displayDD || isValueAvailable ? "100%" : "90%"};
  height: ${({ displayDD, isValueAvailable }) =>
    displayDD || isValueAvailable ? "fit-content" : "65"};
  display: flex;
  align-items: center;
  font-size: ${({ displayDD, isValueAvailable }) =>
    displayDD || isValueAvailable ? "12px" : "16px"};
  opacity: ${({ displayDD, isValueAvailable }) =>
    displayDD || isValueAvailable ? "0.8" : "1"};
`;

const DropDown = ({ options, onChange, setDisplayDD, ...props }) => {
  const { colors } = useTheme();
  return (
    <DropDownDD {...props}>
      {options ? (
        options?.length ? (
          options?.map((singleOption, index) => (
            <DDItem
              onClick={() => {
                setDisplayDD(false);
                onChange(singleOption.label, singleOption.value);
              }}
              shadow={colors.primary_shade}
              key={index}
            >
              {singleOption.label}
            </DDItem>
          ))
        ) : (
          <DDItem>No Result Found.</DDItem>
        )
      ) : (
        <DDItem>No companies available.</DDItem>
      )}
    </DropDownDD>
  );
};

const DropDownDD = styled.div`
  height: 300px;
  width: 100%;
  position: absolute;
  margin-top: 10px;
  z-index: 10;
  margin-left: -10px;
  border-radius: 4px;
  overflow-y: auto;
  background: #fff;
  padding: 5px 0px;
  box-shadow: 0 0 2px grey;
`;

const DDItem = styled.section`
  height: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
  &:hover {
    background: ${({ shadow }) => shadow};
  }
`;

const NonVisibleBackdrop = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0vh;
  left: 0%;
  z-index: 9;
`;
