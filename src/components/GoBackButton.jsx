import "styled-components/macro";
import { useHistory } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

const GoBackButton = ({ backPath, shouldFollowPath = false, ...extras }) => {
  const history = useHistory();
  return (
    <button
      {...extras}
      css={`
        width: max-content;
        margin-right: 10px;
        margin-bottom: 10px;
        color: var(--abc-red);
        font-size: 17px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        padding: 0px !important;
        cursor: pointer;
      `}
      onClick={() => {
        if (shouldFollowPath && backPath) {
          window.location.href = backPath;
        } else {
          history.goBack();
        }
      }}
    >
      <span
        css={`
          background: rgb(241, 244, 248);
          width: 45px;
          margin-right: 20px;
          border-radius: 100%;
          height: 45px;
          color: rgb(112, 123, 139);
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <FaChevronLeft color="#777" />
      </span>
      <span
        css={`
          color: rgb(59, 76, 105);
          font-weight: 600;
        `}
      >
        Go Back
      </span>
    </button>
  );
};

export default GoBackButton;
