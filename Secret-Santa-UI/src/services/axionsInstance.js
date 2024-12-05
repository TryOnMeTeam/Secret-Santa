import axios from "axios";
import { getToken } from "./authService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request queue to keep track of active requests
let requestQueue = [];

// Function to handle the spinner based on the queue
const updateSpinnerStatus = (startLoading, stopLoading) => {
  if (requestQueue.length > 0) {
    startLoading(true);
  } else {
    stopLoading(true);
  }
};

const setupInterceptors = (startLoading, stopLoading) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      // Add the request to the queue
      requestQueue.push(config);
      updateSpinnerStatus(startLoading, stopLoading);

      return config;
    },
    (error) => {
      // Remove failed request from the queue
      requestQueue.shift();
      updateSpinnerStatus(startLoading, stopLoading);

      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // Remove the resolved request from the queue
      requestQueue = requestQueue.filter(
        (req) => req !== response.config
      );
      updateSpinnerStatus(startLoading, stopLoading);

      return response;
    },
    (error) => {
      // Remove the failed request from the queue
      requestQueue = requestQueue.filter(
        (req) => req !== error.config
      );
      updateSpinnerStatus(startLoading, stopLoading);

      return Promise.reject(error);
    }
  );
};

export { setupInterceptors };
export default axiosInstance;
