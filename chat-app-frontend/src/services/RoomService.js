import { httpClient } from "../config/AxiosHelper";

export const createRoomApi = async (roomId) => {
  console.log("sendRoomApi", roomId);
  const response = await httpClient.post(`/api/v1/rooms/${roomId}`);
  console.log("got response: ", response.data);

  return response.data;
};

export const joinChatApi = async (roomId) => {
  const response = await httpClient.get(`api/v1/rooms/${roomId}`);
  return response.data;
};

export const getMessages = async (roomId, size = 50, page = 0) => {
  const response = await httpClient.get(
    `/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`
  );
  return response.data;
};
