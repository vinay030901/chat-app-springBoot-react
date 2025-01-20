import { httpClient } from "../config/AxiosHelper";

export const createRoomApi = async (roomDetail) => {
  console.log("sendRoomApi", roomDetail);

  const response = await httpClient.post(`/api/v1/rooms`, roomDetail);
  console.log("got response: ", response.data);

  return response.data;
};

export const joinChatApi = async (roomId) => {
  const response = await httpClient.get(`api/v1/rooms/${roomId}`);
  return response.data;
};
