import { act, render, screen } from "@testing-library/react";
import AppProviders from "../../../AppProviders";
import LocationForm from "./LocationForm";

test(`Test LocationForm`, async () => {
  const locationForm = render(<LocationForm />, { wrapper: AppProviders });

  await act(async () => {
    await locationForm.findByLabelText(/pincode\/city/i);
  });

  screen.debug();
});
