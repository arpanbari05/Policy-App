import styled from "styled-components";
import { useTheme } from "../../customHooks";
import { allowOnWebsites } from "../../utils/helper";

export default function PincPosLogout() {
  const { colors } = useTheme();
  const handleClick = async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_API_BASE_URL}logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: localStorage.SSO_user,
      });
      if (data.status === 200) {
        localStorage.removeItem("SSO_user");
        if (window.location.pathname.includes("/input/basic-details")) {
          window.location.href = window.location.origin;
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const handleClickLogin = () => {
    window.location.href = "https://dev.pincnews.co.in";
  };

  return allowOnWebsites(["pincUat"]) ? (
    localStorage.SSO_user ? (
      <StyledLogoutBtn onClick={handleClick} color={colors.primary_color}>
        Logout
      </StyledLogoutBtn>
    ) : (
      <StyledLogoutBtn onClick={handleClickLogin} color={colors.primary_color}>
        Login
      </StyledLogoutBtn>
    )
  ) : (
    <></>
  );
}

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
