import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
