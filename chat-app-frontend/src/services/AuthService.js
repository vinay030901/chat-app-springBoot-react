import { httpClient } from "../config/AxiosHelper";

export const loginApi = async (loginRequest) => {
  console.log("loginApi", loginRequest);
  const response = await httpClient.post(`/api/v1/users/login`, loginRequest);
  console.log("got response: ", response.data);
  return response;
};

export const registerApi = async (registerRequest) => {
  console.log("registerApi", registerRequest);
  const response = await httpClient.post(
    `/api/v1/users/register`,
    registerRequest
  );
  console.log("got response: ", response.data);
};
