import styled from "styled-components/macro";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";
import { useTheme } from "../customHooks";
const WideCustomDD = ({
  ddItems,
  selectedValue,
  setSelectedValue,
  setShowError,
}) => {
  const { colors } = useTheme();

  const [showDD, setShowDD] = useState(false);

  return (
    <>
      <FloatingTitle primaryColor={colors.primary_color}>
        Deductible
      </FloatingTitle>
      <DDOuter
        onClick={() => {
          setShowDD(currentState => !currentState);
        }}
      >
        <StyledDDInput
          type="text"
          name="deductible"
          placeholder={"Select your deductible"}
          readOnly={true}
          value={selectedValue.display}
        />
        {!showDD && <FiChevronDown size="20px" />}
        {showDD && <FiChevronUp size="20px" />}
      </DDOuter>
      {showDD && (
        <StyledDropDown>
          {ddItems.map((item, index) => (
            <DDItem
              onClick={() => {
                setSelectedValue(item);
                setShowDD(false);
                setShowError(false);
              }}
              primaryColor={colors.primary_color}
              key={index}
            >
              {item.display}
            </DDItem>
          ))}
        </StyledDropDown>
      )}
    </>
  );
};
export default WideCustomDD;

const FloatingTitle = styled.span`
  padding: 0px 5px;
  color: ${({ primaryColor }) => primaryColor};
  font-size: 13px;
  font-weight: 700;
  position: absolute;
  top: 73px;
  margin-left: 18px;
  background: #fff;
  @media (max-width: 338px) {
    top: 103px;
  }
`;
const DDOuter = styled.div`
  height: 50px;
  border: 1px solid #4a5971;
  border-radius: 5px;
  margin-top: 20px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDDInput = styled.input`
  border: none;
  color: black;
  font-size: 14px;
  font-weight: 600;
  width: fit-content;
  & :focus {
    outline: none;
  }
  & ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: black;
    opacity: 1; /* Firefox */
    font-weight: 600;
  }

  & :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: black;
    font-weight: 600;
  }

  & ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: black;
    font-weight: 600;
  }
`;

const StyledDropDown = styled.div`
  padding: 5px 10px;
  box-shadow: 0 0 5px grey;
  margin-top: 10px;
  border-radius: 5px;
  max-height: 200px;
  overflow: auto;
`;

const DDItem = styled.section`
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  &:hover {
    background: ${({ primaryColor }) => primaryColor};
    color: #fff;
  }
`;
