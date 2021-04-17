export type LoginData = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};

export type TokenValidationPayload = {
  userId: number;
  username: string;
};

export type RegistrationPayload = {
  login: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street_name: string;
  house_number: string;
  zip_code: number;
  city: string;
};

export type RegistrationResponse = {
  // 200 or 400
  statusCode: number;
  // Error or success
  message: string;
};
