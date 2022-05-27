import styled from "styled-components";
import { useTheme } from "../../customHooks";
import { notVerified } from "../../assets/images/index";
import useIsUserVerified from "./useIsUserVerifed";

const KeyVerificationModal = () => {
  const { colors } = useTheme();
  const { status, loading } = useIsUserVerified();
  return !loading && status === "false" ? (
    <StyledOuter color={colors.primary_color}>
      <div className="ValidationBox">
        <img src={notVerified} alt="not verified" />
        <code>
          &quot;Dear Partner Please complete Your POSP certification in order to
          issue policy&quot;
        </code>
        <StyledLogoutBtn
          color={colors.primary_color}
          onClick={() => {
            window.RB_AMS_SDK.prototype.jsWidgetlogout();
            window.location.reload();
          }}
        >
          OK
        </StyledLogoutBtn>
      </div>
    </StyledOuter>
  ) : (
    <></>
  );
};

const StyledLogoutBtn = styled.button`
  cursor: pointer;
  background: ${props => props.color};
  padding: 6px 30px;
  border-radius: 5px;
  border: none;
  color: #fff;
  margin-left: 4px;
  @media (max-width: 720px) {
    padding: 4px 15px;
    border-radius: 5px;
  }
`;

const StyledOuter = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: #9999;

  .ValidationBox {
    min-height: 400px;
    max-width: 500px;
    width: 100%;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;

    code {
      margin: 10px 0;
      color: ${props => props.color};
      font-size: 1.2rem;
      text-align: center;
    }

    img {
      max-height: 200px;
    }
  }
`;

export default KeyVerificationModal;
