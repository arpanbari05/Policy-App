import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFrontendBoot, useTheme } from "../../customHooks";
import { allowOnWebsites } from "../../utils/helper";
import { RiLogoutCircleRLine } from "react-icons/ri";
import usePosVerification from "./usePosVerification";

export default function PincPosLogout() {
  const { colors } = useTheme();
  const { loading } = usePosVerification();
  const [data, setData] = useState();
  const {
    data: { tenant },
  } = useFrontendBoot();

  useEffect(() => {
    if (localStorage.Pos_details) {
      setData(JSON.parse(localStorage.Pos_details));
    }
  }, []);

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
        localStorage.removeItem("Pos_details");
        window.location.href = tenant.broker_dashboard_url;
      }
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const handleClickLogin = () => {
    window.location.href = tenant?.broker_dashboard_url;
  };

  return allowOnWebsites(["pincUat"]) ? (
    localStorage.SSO_user ? (
      !loading ? (
        <StyledOuter>
          <StyledLoggedInUser color={colors.primary_color}>
            {data?.first_name[0]}
          </StyledLoggedInUser>
          <div>
            <h4>{data?.first_name + " " + data?.last_name}</h4>
            <p>{data?.pos_id}</p>
          </div>
          <span
            onClick={handleClick}
            onKeyDown={handleClick}
            title="Logout"
            aria-hidden="true"
          >
            <RiLogoutCircleRLine size={26} color={colors.primary_color} />
          </span>
        </StyledOuter>
      ) : (
        <>...</>
      )
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

const StyledOuter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.7rem;

  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 2px;
  }

  p {
    font-size: 0.8rem;
    margin-bottom: 0 !important;
  }

  span {
    cursor: pointer;
  }
`;

const StyledLoggedInUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background: ${props => props.color};
  border-radius: 50%;
  font-size: 1.4rem;
  text-transform: uppercase;
  text-align: center;
  color: #fff;
  margin-left: 0.8rem;
`;

// const StyledUserDropDown = styled.div`
//   position: absolute;
//   padding: 10px 5px;
//   color: rgb(68, 68, 68);
//   display: block;
//   width: 150px;
//   box-shadow: rgb(0 0 0 / 60%) 0px 0px 10px;
//   background: rgb(255, 255, 255);
//   z-index: 20;
//   left: -40px;
//   top: 22px;
// `;
