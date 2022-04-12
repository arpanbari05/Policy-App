import "styled-components/macro";
import { claimBtn, claimContent } from "../ClaimProcessMain/ClaimMain";
import { useTheme } from "../../../../../customHooks";
import { useState } from "react";

const ClaimBanner = ({ claimBannerArray }) => {
  const claimBannerArrayWithIds = claimBannerArray.map((item, index) => ({
    ...item,
    id: index,
  }));

  const [activeTabOption, setActiveTabOption] = useState(
    claimBannerArrayWithIds[0],
  );

  const [activeDelayedBtn, setActiveDelayedBtn] = useState(
    claimBannerArrayWithIds[0]?.id,
  );

  const handleClick = id => {
    setActiveTabOption(claimBannerArrayWithIds[id]);
    setTimeout(() => setActiveDelayedBtn(id), 500);
  };

  const { colors } = useTheme();

  return (
    <>
      <div>
        <h2
          css={`
            color: #253858;
            font-weight: 900;
            font-size: 23px;
            margin-bottom: 24px;
          `}
        >
          How do I file a claim?
        </h2>
      </div>

      <ul
        css={`
          padding: 0;
        `}
      >
        <li
          className="nav-item flex-sm-fill"
          style={{
            display: "flex",
          }}
        >
          {claimBannerArrayWithIds.map(singleClaimBannerOption =>
            claimBtn(
              singleClaimBannerOption?.title,
              singleClaimBannerOption?.id,
              handleClick,
              activeTabOption?.id,
              colors.primary_color,
              colors.secondary_shade,
            ),
          )}
        </li>
      </ul>

      <div
        className="tab-content"
        css={`
          margin-left: 10px;
          font-family: "Inter-Regular" !important;
          & p {
            margin: 0px;
          }
        `}
      >
        {claimContent(
          activeTabOption?.title,
          activeTabOption?.data || "No data available",
          activeTabOption?.id,
          activeTabOption?.id,
          activeDelayedBtn,
        )}
      </div>
    </>
  );
};
export default ClaimBanner;
