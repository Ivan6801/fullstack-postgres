import axios from "axios";

const API_URL = axios.create({
  baseURL: "http://localhost:3001",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export { API_URL };
