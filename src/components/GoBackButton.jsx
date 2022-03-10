import "styled-components/macro";
import { useHistory } from "react-router-dom";
const GoBackButton = ({ backPath, ...extras }) => {
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
        history.push(backPath);
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
        <i className="fas fa-chevron-left"></i>
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
