import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { useTheme } from "../customHooks";
import { updateTheme } from "../FrontendBoot/reducer/frontendBoot.slice";
import StyledButton from "./StyledButton";

const ThemeModal = ({ show, setShow }) => {
  const dispatch = useDispatch();

  const { colors } = useTheme();

  const [primaryColor, setPrimaryColor] = useState(colors.primary_color);
  const [secondaryColor, setSecondaryColor] = useState(colors.secondary_color);
  const [primaryShade, setPrimaryShade] = useState(colors.primary_shade);
  const [secondaryShade, setSecondaryShade] = useState(colors.secondary_shade);

  const handleSubmit = () => {
    const obj = {
      PrimaryColor: primaryColor,
      SecondaryColor: secondaryColor,
      PrimaryShade: primaryShade,
      SecondaryShade: secondaryShade,
    };
    dispatch(updateTheme({ ...obj }));
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#f5f7f9",
        }}
      >
        Change Theme
      </Modal.Header>
      <Modal.Body>
        <InputWrapper>
          <span>Select Primary Color</span>
          <input
            type="text"
            value={primaryColor}
            onChange={e => setPrimaryColor(e.target.value)}
          />
          <input
            css={`
              position: absolute;
              right: 0;
            `}
            type="color"
            value={primaryColor}
            onChange={e => setPrimaryColor(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <span>Select Secondary Color</span>
          <input
            type="text"
            value={secondaryColor}
            onChange={e => setSecondaryColor(e.target.value)}
          />
          <input
            css={`
              position: absolute;
              right: 0;
            `}
            type="color"
            value={secondaryColor}
            onChange={e => setSecondaryColor(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <span>Select Primary Shade</span>
          <input
            type="text"
            value={primaryShade}
            onChange={e => setPrimaryShade(e.target.value)}
          />
          <input
            css={`
              position: absolute;
              right: 0;
            `}
            type="color"
            value={primaryShade}
            onChange={e => setPrimaryShade(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <span>Select Secondary Shade</span>
          <input
            type="text"
            value={secondaryShade}
            onChange={e => setSecondaryShade(e.target.value)}
          />
          <input
            css={`
              position: absolute;
              right: 0;
            `}
            type="color"
            value={secondaryShade}
            onChange={e => setSecondaryShade(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <StyledButton
            noIcon
            styledCss={`width: 270px`}
            onClick={handleSubmit}
          >
            Apply
          </StyledButton>
        </InputWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default ThemeModal;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  position: relative;
`;
