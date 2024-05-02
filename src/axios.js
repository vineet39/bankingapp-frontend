import axios from "axios";
import { UserContext } from "./usercontext";
import { useContext } from "react";

// Create an Axios instance
const useAxios = () => {
  
const { token } = useContext(UserContext);
  
  const axiosInstance = axios.create({
    baseURL: "http://3.27.228.2/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token != null) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
