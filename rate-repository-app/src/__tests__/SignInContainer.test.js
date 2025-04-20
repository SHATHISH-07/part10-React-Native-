import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Formik } from "formik";
import { SignInContainer } from "../components/SignIn";

describe("SignInContainer", () => {
  it("calls onSubmit with correct values when form is submitted", async () => {
    const onSubmit = jest.fn();

    const initialValues = { username: "", password: "" };

    const { getByTestId } = render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, ...rest }) => (
          <SignInContainer {...rest} onSubmit={handleSubmit} />
        )}
      </Formik>
    );

    fireEvent.changeText(getByTestId("usernameInput"), "kalle");
    fireEvent.changeText(getByTestId("passwordInput"), "password");
    fireEvent.press(getByTestId("submitButton"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
