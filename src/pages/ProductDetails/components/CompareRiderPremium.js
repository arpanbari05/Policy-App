import { useTheme } from "../../../customHooks";
import styled from "styled-components";
import { CircleLoader } from "../../../components";
import { amount } from "../../../utils/helper";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";

export function CompareRiderPremium({
  quote,
  rider,
  isLoading = false,
  onChange,
}) {
  const { colors } = useTheme();
  const { isSelected } = rider;

  const handleChange = evt => {
    if (rider?.is_mandatory) return;
    onChange && onChange({ ...rider, isSelected: evt.target.checked });
  };

  return (
    <RiderPremiumWrap
      className="py-2 rounded"
      htmlFor={rider?.id + rider?.total_premium + quote?.sum_insured}
      css={`
        cursor: pointer;
        background-color: ${isSelected ? colors.primary_shade : "#f3f3f3"};
      `}
    >
      <div className="d-flex align-items-center justify-content-center">
        {isLoading ? (
          <CircleLoader
            animation="border"
            className="m-0"
            css={`
              font-size: 0.73rem;
            `}
          />
        ) : (
          <div
            css={`
              gap: 0.6em;
            `}
            className="d-flex align-items-center justify-content-center"
          >
            <div>{amount(rider?.total_premium)}</div>

            {isSelected ? (
              <BsCheckCircleFill
                css={`
                  color: ${colors.primary_color};
                  font-size: 1.37em;
                `}
              />
            ) : (
              <AiTwotoneCheckCircle
                css={`
                  color: #fff;
                  font-size: 1.37em;
                `}
              />
            )}
          </div>
        )}
      </div>
      <input
        className="visually-hidden"
        type="checkbox"
        name={rider?.id}
        id={rider?.id + rider?.total_premium + quote?.sum_insured}
        checked={!!isSelected}
        onChange={event => {
          handleChange(event);
        }}
        disabled={isLoading}
      />
    </RiderPremiumWrap>
  );
}

const RiderPremiumWrap = styled.label`
  min-width: 7.9em;
  font-weight: 900;
`;
