import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useAccount } from "../../lib/context/AccountContext";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CredentialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledFormField = styled(Field)`
  padding: 2px 0;
  margin: 10px 0 10px 5px;
`;

const StyledFormLabel = styled.label`
  font-weight: bold;
`;

const SubmitSection = styled.div`
  display: flex;
  flex-direction: column;
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
      <h1>Login</h1>

      {account.isLogged ? (
        <div>Already signed in!</div>
      ) : (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <CredentialContainer>
              <StyledFormLabel htmlFor="username">Username: </StyledFormLabel>
              <StyledFormField
                id="username"
                name="username"
                placeholder="Username, not email pls"
              />
            </CredentialContainer>

            <CredentialContainer>
              <StyledFormLabel htmlFor="password">Password: </StyledFormLabel>
              <StyledFormField
                id="password"
                name="password"
                placeholder="super secret"
                type="password"
              />
            </CredentialContainer>

            <SubmitSection>
              <Button type="submit" variant="outlined" color={"primary"}>
                Submit
              </Button>

              {isError && (
                <div style={{ color: "red" }}>
                  <span>There has been an error, try again</span>
                </div>
              )}
            </SubmitSection>
          </Form>
        </Formik>
      )}
    </LoginContainer>
  );
};

export default LoginForm;
