import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { updateTheme } from "../FrontendBoot/reducer/frontendBoot.slice";
import StyledButton from "./StyledButton";

const ThemeModal = ({ show, setShow }) => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade,SecondaryShade } = theme;
  const [primaryColor, setPrimaryColor] = useState(PrimaryColor);
  const [secondaryColor, setSecondaryColor] = useState(SecondaryColor);
  const [primaryShade, setPrimaryShade] = useState(PrimaryShade);
  const [secondaryShade, setSecondaryShade] = useState(SecondaryShade);

  const handleSubmit = () => {
    if (
      primaryColor !== PrimaryColor ||
      secondaryColor !== SecondaryColor ||
      primaryShade !== PrimaryShade ||
      secondaryShade !== SecondaryShade
    ) {
      dispatch(
        updateTheme({
          PrimaryColor: primaryColor,
          SecondaryColor: secondaryColor,
          PrimaryShade: primaryShade,
        })
      );
    }
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
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
          <input
            css={`
              position: absolute;
              right: 0;
            `}
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <span>Select Secondary Color</span>
          <input
            type="text"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
          />
          <input
            css={`
              position: absolute;
              right: 0;
            `}
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <span>Select Primary Shade</span>
          <input
            type="text"
            value={primaryShade}
            onChange={(e) => setPrimaryShade(e.target.value)}
          />
          <input
            css={`
              position: absolute;
              right: 0;
            `}
            type="color"
            value={primaryShade}
            onChange={(e) => setPrimaryShade(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <span>Select Secondary Shade</span>
          <input
            type="text"
            value={secondaryShade}
            onChange={(e) => setSecondaryShade(e.target.value)}
          />
          <input
            css={`
              position: absolute;
              right: 0;
            `}
            type="color"
            value={secondaryShade}
            onChange={(e) => setSecondaryShade(e.target.value)}
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
