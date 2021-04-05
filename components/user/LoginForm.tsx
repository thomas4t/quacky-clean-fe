import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useAccount } from "../../lib/context/AccountContext";
import { AppButton } from "../common/AppButton";

interface MyFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC<{}> = () => {
  const account = useAccount();
  const initialValues: MyFormValues = { username: "", password: "" };

  const onSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    const username = values.username.trim();
    const password = values.password.trim();
    const wasSuccess = await account.login({
      username,
      password,
    });
    if (wasSuccess) {
      //TODO
      alert("Success!");
    }

    // console.log({ values, actions });
    actions.setSubmitting(false);
  };

  return (
    <>
      {account.isLogged ? (
        <div>Already signed in!</div>
      ) : (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field
                id="username"
                name="username"
                placeholder="Username, not email pls"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                placeholder="super secret"
                type="password"
              />
            </div>

            <AppButton type="submit" variant="contained">
              Submit
            </AppButton>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default LoginForm;
