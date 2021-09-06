import { useEffect, useState } from "react";
import styled from "styled-components/macro";

export function Quantity({
  max = 100,
  min = 0,
  onChange = () => {},
  value = min,
  onIncrement = () => {},
  onDecrement = () => {},
  ...props
}) {
  const [quantity, setQuantity] = useState(value);

  const handleQuantityChange = (evt) => {
    setQuantity(evt.target.value);
    onChange(evt.target.value);
  };

  const handleIncrement = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
      onChange(quantity + 1);
      onIncrement(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
      onChange(quantity - 1);
      onDecrement(quantity - 1);
    }
  };

  useEffect(() => {
    if (quantity < min) setQuantity(min);
    if (quantity > max) setQuantity(max);
  }, [quantity, min, max]);

  useEffect(() => {
    setQuantity(value);
    onChange(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <QuantityButtonsAdded {...props}>
      <QuantityButtonsAddedMinus
        type="button"
        value="-"
        placeholder=""
        onClick={handleDecrement}
      />
      <QuantityInputText
        type="number"
        step="1"
        min="1"
        max=""
        name="quantity"
        value={quantity}
        title="Qty"
        size="4"
        pattern=""
        inputmode=""
        placeholder=""
        onChange={handleQuantityChange}
      />
      <QuantityButtonsAddedPlus
        type="button"
        value="+"
        onClick={handleIncrement}
      />
    </QuantityButtonsAdded>
  );
}

export function LabeledQuantity({ label, ...props }) {
  return (
    <BorderDivEditMembers style={{ marginTop: "3px", marginBottom: "14px" }}>
      <LabelEditPlan>{label}</LabelEditPlan>
      <Quantity {...props} />
    </BorderDivEditMembers>
  );
}

const BorderDivEditMembers = styled.div`
  border: 1px solid #eaedf2;
  /* padding: 24px; */
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
`;

const LabelEditPlan = styled.p`
  /* position: absolute; */
  /* margin-top: -14px; */
  /* left: 22px; */
  font-size: 13px;
  color: #000;
  font-weight: 900;
  font-family: PFEncoreSansPromed;
`;

const StyledQuantity = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
`;

const QuantityButtonsAdded = styled(StyledQuantity)`
  text-align: left;
  /* position: relative; */
  white-space: nowrap;
  vertical-align: top;
  /* margin: 6px 102px -4px; */
  /* margin-bottom: 6px; */
  background: #f4f6fa;
  width: 117px;
  /* margin: 4px 111px; */
  /* padding: 0 17px; */
  border-radius: 7px;
  height: 37px;
  /* margin-left: 88px; */
`;

const QuantityButtonsAddedInput = styled.input`
  display: inline-block;
  /* margin: 0; */
  vertical-align: top;
  box-shadow: none;

  &:hover {
    background: #eeeeee;
  }
`;

const QuantityButtonsAddedMinus = styled(QuantityButtonsAddedInput)`
  border-right: 0;
  padding: 0px 5px 0px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000024;
  border-radius: 50px !important;
  color: #0bccb1;
  width: 20px;
  height: 20px;
  /* margin: 8px 0; */
  line-height: 12px;
`;

const QuantityButtonsAddedPlus = styled(QuantityButtonsAddedInput)`
  border-left: 0;
  padding: 0px 4px 0px;
  /* height: 37px !important; */
  background-color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000024;
  border-radius: 50px !important;
  color: #ff4864;
  width: 20px !important;
  height: 20px !important;
  /* margin: 8px 27px; */
  line-height: 12px;
`;

const QuantityInputText = styled.input`
  color: #757575;
  /* font-weight: bold; */
  font-size: 15px;
  margin: 0 10px;
  display: inline-block;
  margin: 0;
  vertical-align: top;
  box-shadow: none;
  width: 35px;
  height: 37px;
  padding: 0 0px 0 3px;
  text-align: center;
  background-color: transparent;
  border: 1px solid #efefef;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
