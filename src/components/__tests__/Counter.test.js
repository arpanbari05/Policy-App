import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Counter } from "..";

function TestCounter() {
  const [count, setCount] = useState(1);

  const handleIncrement = newCount => setCount(newCount);
  const handleDecrement = newCount => setCount(newCount);

  return (
    <Counter
      min={1}
      max={3}
      count={count}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );
}

test(`Render counter`, async () => {
  const { findByLabelText } = render(<TestCounter />);

  await act(async () => {
    const incrementBtn = await findByLabelText(/increment/i);

    const count = await findByLabelText(/count/i);

    userEvent.click(incrementBtn);
    userEvent.click(incrementBtn);


    expect(count).toHaveTextContent(1);
  });

  screen.debug();
});
