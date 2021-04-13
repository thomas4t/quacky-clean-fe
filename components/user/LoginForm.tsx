import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useAccount } from "../../lib/context/AccountContext";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
`;

interface MyFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC<{}> = () => {
  const account = useAccount();
  const { enqueueSnackbar: notify } = useSnackbar();
  const [isError, setIsError] = useState(false);
  const initialValues: MyFormValues = { username: "", password: "" };

  const onSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    setIsError(false);

    const wasSuccess = await account.login({
      username: values.username.trim(),
      password: values.password.trim(),
    });
    if (wasSuccess) {
      notify("Logged in!", {
        variant: "success",
      });
    } else {
      setIsError(true);
    }

    // console.log({ values, actions });
    actions.setSubmitting(false);
  };

  return (
    <LoginContainer>
      {account.isLogged ? (
        <div>Already signed in!</div>
      ) : (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <div style={{ margin: "10px" }}>
              <label htmlFor="username">Username: </label>

              <Field
                id="username"
                name="username"
                placeholder="Username, not email pls"
              />
            </div>

            <div style={{ margin: "10px" }}>
              <label htmlFor="password">Password: </label>
              <Field
                id="password"
                name="password"
                placeholder="super secret"
                type="password"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="outlined" color={"primary"}>
                Submit
              </Button>
              {isError && (
                <div style={{ color: "red" }}>
                  <span>There has been an error, try again</span>
                </div>
              )}
            </div>
          </Form>
        </Formik>
      )}
    </LoginContainer>
  );
};

export default LoginForm;
