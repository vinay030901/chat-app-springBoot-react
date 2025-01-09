import axios from "axios";

export const baseURL = "http://localhost:8080/api";
export const httpClient = axios.create({
  baseURL: baseURL, // API server URL
  //   timeout: 1000,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});
