import { httpClient } from "../config/AxiosHelper";

export const getAllBots = async () => {
  console.log("get all bots");
  const response = await httpClient.get(`/api/v1/bots/getAllBots`);
  console.log("got response: ", response.data);
  console.log("got response type: ", typeof response.data);
  console.log("first value is " + response.data[0].name);
  console.log(Object.values(response.data));

  return response.data;
};

export const chatWithBot = async (botChatRequest) => {
  console.log("chat with bot");
  const response = await httpClient.post(`/api/v1/bots/chat`, botChatRequest);
  console.log("got response: ", response.data);
  return response.data;
};
export const loadMessages = async (botId, userId) => {
  console.log("load messages");
  const response = await httpClient.get(
    `/api/v1/bots/loadMessages?botId=${botId}&userId=${userId}`
  );
  console.log("got response: ", response.data);
  return response.data;
};
