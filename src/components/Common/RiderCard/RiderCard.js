import { useState } from "react";
import styled from "styled-components/macro";
import { mobile, small, tablet } from "../../../utils/mediaQueries";
import useWindowSize from "../../../customHooks/useWindowSize";
import Checkbox from "../../../pages/ComparePage/components/Checkbox/Checbox";

function RiderCard({
  rider,
  productPage,
  isRiderSelected,
  isMandatory,
  selectedRiders,
  health_riders,
  isAbhiRidersLoading,
  handleRiderChange = () => {},
  ...props
}) {
  const riderName = rider.name;
  const riderPremium = parseInt(rider.total_premium).toLocaleString("en-In");
  const riderDescription = rider.description;
  console.log(health_riders, "gege3");
  const parent_rider = rider.parent_rider;
  const options = rider?.options?.[Object.keys(rider?.options)[0]] || [];
  // const parent_selected = true
  const parent_selected = health_riders.some(
    (data) => data.alias === parent_rider
  );
  const [windowHeight, windowWidth] = useWindowSize();
  const handleRiderClick = () => {
    !isMandatory &&
      handleRiderChange({ rider, isRiderSelected: !isRiderSelected });
  };

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {(!parent_rider || parent_selected) && (
        <RiderCardWrap
          {...props}
          isRiderSelected={isRiderSelected}
          htmlFor={(options.length > 0 && `${riderName}"hehe"`) || undefined}
          onClick={() => {
            handleRiderClick();
          }}
          css={`
            /* transition: all 0.33s; */
            max-height: ${showMore ? "300px" : "max-content"};
            min-height: 145px;
            /* &:hover {
        max-height: 300px;
      } */
          `}
        >
          <div
            css={`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              padding: 5px 10px;
              flex: 3;
            `}
          >
            <div
              css={`
                color: #0a87ff;

                font-weight: 900;
                font-size: 18px;
                line-height: normal;

                @media (max-width: 1024px) {
                  white-space: ${productPage ? "normal" : "nowrap"};
                  font-size: 18px;
                }
                ${small},${tablet} {
                  font-size: 13px;
                  font-weight: 900;
                  line-height: 1.6;
                  &::after {
                    right: -30px;
                    top: 0px;
                  }
                }
                @media (max-width: 1200px) {
                  font-size: 21px;
                }
                @media (max-width: 900px) {
                  font-size: 15px;
                }
              `}
            >
              {riderName}
            </div>

            {/* <div

css={`
margin-top: 10px;
color: ${productPage ? "var(--abc-red)" : "var(--font-gray)"};
font-size: 16px;
font-weight:bold;
@media (max-width: 767px) {
  
  font-size:12px;
  color:gray;
}
`}
>
{riderDescription}

</div> */}

            <RiderDescription
              description={riderDescription}
              productPage={productPage}
              onShowMore={(val) => {
                setShowMore(val);
              }}
            />
            {options.length > 0 && (
              <select
                disabled={isAbhiRidersLoading && true}
                onClick={(e) => e.stopPropagation()}
                css={`
                  padding: 9px 7px;
                  font-size: 15px;
                  margin-top: 13px;
                  width: 174px;
                  background-color: #eff7ff;
                `}
                value={
                  (Object.keys(rider?.options)[0] in selectedRiders &&
                    selectedRiders[Object.keys(rider?.options)[0]]) ||
                  options[0]
                }
                onChange={(e) => {
                  handleRiderChange({
                    rider,
                    isRiderSelected: true,
                    hasOptions: {
                      key: Object.keys(rider?.options)[0],
                      selectedOption: e.target.value,
                    },
                  });
                }}
              >
                {options.map((data) => (
                  <option onClick={(e) => e.stopPropagation()}>{data}</option>
                ))}
              </select>
            )}
          </div>
          <div
            css={`
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <button
              type="button"
              css={`
                outline: none;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 23px;
                font-weight: 900;
                padding: 10px 28px;
                border-radius: 0.25em;
                cursor: pointer;
                background-color: var(--light-pink);
                margin: 0 3px;
                width: 137px;
                padding-left: 7px;
                min-width: fit-content;
                border: none;
                background-color: #eff7ff;
                & span {
                  position: relative;
                  top: 6px;
                  left: 10px;
                }
              `}
            >
              {riderPremium}
              <span>
                <Checkbox checked={isRiderSelected} />
              </span>
            </button>
          </div>
        </RiderCardWrap>
      )}
    </>
  );
}

function RiderDescription({
  description = "",
  productPage,
  onShowMore = () => {},
}) {
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = (evt) => {
    evt.stopPropagation();
    setShowMore(!showMore);
    onShowMore(!showMore);
  };
  const [windowHeight, windowWidth] = useWindowSize();
  return (
    <div
      css={`
        margin-top: ${productPage ? "6px" : "10px"};
        color: #505f79;
        font-size: 13px;
        overflow: hidden;
        ${mobile} {
          font-size: ${productPage ? "14px" : "12px"} !important;
          margin-top: 0;
        }
      `}
    >
      <p
        css={`
          line-height: normal;
          font-weight: 400;
          color: #253858;

          ${small} {
            font-size: 11px;

            line-height: 1.67;
          }

          @media (max-width: 900px) {
            font-size: 14px;
          }
        `}
      >
        {showMore
          ? description
          : windowWidth < 400
          ? description.slice(0, 40)
          : description.slice(0, 90)}
        {description.length > 90 ? (
          <p
            css={`
              color: #0d6efd;
              display: ${showMore ? "block" : "inline"};
              margin-left: 3px;
              font-weight: bold;
              ${small} {
                color: #3e3737;
                font-weight: bold;
              }
            `}
            onClick={handleShowMore}
            type="button"
          >
            {showMore ? "Show less" : "...Show more"}
          </p>
        ) : null}
      </p>
    </div>
  );
}

const RiderCardWrap = styled.div`
  display: flex;
  position: relative;
  width: 49%;
  margin: 10px 0;
  border: 1px solid
    ${({ isRiderSelected }) => (isRiderSelected ? "#0d6efd;" : "#d5dce5")};
  padding: 10px 16px;
  box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
  cursor: pointer;
  &:hover {
    border-color: #0d6efd;
  }
  box-shadow: 0 8px 12px 0 rgb(16 24 48 / 12%);

  background-color: #fff;

  ${mobile} {
    flex: 0 0 100%;
    margin: 10px 0;
    padding: 0px 6px;
  }

  ${small} {
    border-radius: 11px;
    padding: 12px 0 9px 0;
  }

  @media (max-width: 900px) {
    padding: 0px 6px;
  }
`;

export default RiderCard;
