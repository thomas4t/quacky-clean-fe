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
