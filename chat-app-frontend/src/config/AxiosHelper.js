import axios from "axios";

export const baseURL = "http://localhost:8081";
export const httpClient = axios.create({
  baseURL: baseURL, // API server URL
  //   timeout: 1000,
  headers: {
    "Content-Type": "text/plain",
  },
});
