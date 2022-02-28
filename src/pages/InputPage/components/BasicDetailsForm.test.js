import "@testing-library/jest-dom/";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import AppProviders from "../../../AppProviders";
import BasicDetailsForm from "./BasicDetailsForm";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

const TEST_EMAIL = "testing@testing.com";

test(`render basic details form`, async () => {
  const history = createMemoryHistory();
  history.push("/test");

  const { findByLabelText } = render(
    <Provider store={store}>
      <Router history={history}>
        <BasicDetailsForm />
      </Router>
    </Provider>,
  );

  await act(async () => {
    const emailField = await findByLabelText(/email id/i);
    expect(emailField).toBeInTheDocument();
    await userEvent.type(emailField, TEST_EMAIL);
    expect(emailField).toHaveValue(TEST_EMAIL);
  });
});
