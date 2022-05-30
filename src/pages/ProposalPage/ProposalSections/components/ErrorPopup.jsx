import React from "react";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { ButtonWrapper, Popup, PopupWrapper, Container } from "./BMI";
import { ClickSound } from "../../../../utils/helper";
import { useTheme } from "../../../../customHooks";

const ErrorPopup = ({ head, msg, htmlProps, handleClose }) => {
  const { showErrorPopup } = useSelector(({ proposalPage }) => proposalPage);
  const { colors } = useTheme();
  return (
    <PopupWrapper>
      <Popup>
        <FaTimes
          onClick={handleClose}
          style={{
            margin: "10px 10px 0 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        ></FaTimes>

        <Container>
          {head && <span>{head}</span>}
          {htmlProps && <div dangerouslySetInnerHTML={{ __html: htmlProps }} />}
          {/* Based on your medical declaration, this plan is not valid for you,
              Please choose a different plan/insurer */}
          {msg && <p>{msg}</p>}
          <ButtonWrapper>
            <button
              className="btn"
              css={`
                background: ${`${colors?.primary_color} !important`};
              `}
              onClick={() => {
                ClickSound();
                handleClose();
                showErrorPopup?.onCloseCallBack &&
                  showErrorPopup.onCloseCallBack();
              }}
            >
              OK
            </button>
          </ButtonWrapper>
        </Container>
      </Popup>
    </PopupWrapper>
  );
};

export default ErrorPopup;
