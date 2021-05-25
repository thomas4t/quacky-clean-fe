// Render Prop
import React from "react";
import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  FormikErrors,
  ErrorMessage,
} from "formik";
import styled from "styled-components";
import { RegistrationPayload } from "../../lib/types/user";
import { Button } from "@material-ui/core";
import vehicle from "../../images/long_vehicle3.jpg";
import UserAPI from "../../lib/api/user";

type FormValues = Omit<RegistrationPayload, "zip_code"> & {
  zip_code: string;
  passwordCheck: string;
};

const mapFormValuesToPayload = (data: FormValues): RegistrationPayload => {
  return {
    ...data,
    zip_code: Number(data.zip_code),
    house_number: String(data.house_number),
  };
};

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
`;
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 10px auto;
`;

const LongImage = styled("img")`
  //width: 50%;
`;

const RedColorDiv = styled.div`
  color: red;
`;

function RegisterForm() {
  const [submittedOkay, setSubmittedOkay] = React.useState(false);
  const [generalError, setGeneralError] = React.useState("");

  return (
    <RegistrationContainer>
      <h1>Registration</h1>

      {submittedOkay ? (
        <div>Registration successful!</div>
      ) : (
        <Formik
          initialValues={{
            login: "",
            first_name: "",
            last_name: "",
            city: "",
            house_number: "",
            email: "",
            phone: "",
            street_name: "",
            zip_code: "",
            password: "",
            passwordCheck: "",
          }}
          validate={(values) => {
            const errors: FormikErrors<FormValues> = {};
            if (values.password !== values.passwordCheck) {
              errors.passwordCheck = "Passwords dont match";
            }
            return errors;
          }}
          onSubmit={async (
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            const res = await UserAPI.register(mapFormValuesToPayload(values));
            if (res.status === 201) {
              setSubmittedOkay(true);
            } else {
              setGeneralError(res.data.message);
            }
            setSubmitting(false);
          }}
        >
          <Form>
            <InputsContainer>
              <h2>Account info</h2>
              <label htmlFor="login">Login</label>
              <Field
                id="login"
                name="login"
                placeholder="DoomSlayer1337"
                required
              />
              <label htmlFor="first_name">First Name</label>
              <Field
                id="first_name"
                name="first_name"
                placeholder="John"
                required
              />
              <label htmlFor="last_name">Last Name</label>
              <Field
                id="last_name"
                name="last_name"
                placeholder="Smith"
                required
              />
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="john.smith007@random.gg"
                type="email"
                required
              />
              {/*<ErrorMessage name="email" component="div" />*/}
              <label htmlFor="phone">Phone</label>
              <Field
                id="phone"
                name="phone"
                placeholder="694 201 337"
                type="tel"
                required
              />
              <h2>Address</h2>
              <label htmlFor="login">City</label>
              <Field id="city" name="city" placeholder="Las Vegas" required />
              <label htmlFor="street_name">Street name</label>
              <Field
                id="street_name"
                name="street_name"
                placeholder="Boulevard"
                required
              />
              <label htmlFor="house_number">Street number</label>
              <Field
                type="number"
                id="house_number"
                name="house_number"
                placeholder="55"
                required
              />
              <label htmlFor="zip_code">Zip code</label>
              <Field
                type="number"
                id="zip_code"
                name="zip_code"
                placeholder="533 04"
                required
              />

              <h2>Secret stuff </h2>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" required />

              <label htmlFor="passwordCheck">Repeat password</label>
              <Field
                type="password"
                id="passwordCheck"
                name="passwordCheck"
                required
              />
              <RedColorDiv>
                <ErrorMessage name="passwordCheck" />
              </RedColorDiv>
            </InputsContainer>

            <Button type="submit" variant="outlined" color={"primary"}>
              Submit
            </Button>

            <RedColorDiv>{generalError}</RedColorDiv>
          </Form>
        </Formik>
      )}

      <LongImage src={vehicle} alt={"long vehicle"} />
      <strong>(not stolen and IS a feature)</strong>
    </RegistrationContainer>
  );
}

export default RegisterForm;
