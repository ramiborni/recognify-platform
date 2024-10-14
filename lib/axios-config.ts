import axios from "axios";
import axiosRetry from "axios-retry";

import { env } from "@/env.mjs";

export const axiosConfig = (accessToken: string) => {
  // Set the base URL and headers for all requests
  axios.defaults.baseURL = env.NEXT_PUBLIC_APP_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  // Set a timeout of 2 minutes (120,000 milliseconds)
  axios.defaults.timeout = 120000;

  // Configure axios-retry to retry up to 10 times
  axiosRetry(axios, {
    retries: 10, // Number of retry attempts
    retryDelay: (retryCount) => {
      // You can also implement a backoff strategy here
      return retryCount * 1000; // Time between retries increases with the retry count
    },
    // This function determines if a retry should be made
    // Here it's configured to retry on network errors or 5xx errors on an idempotent request
    retryCondition: (error) => {
      return (
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error?.response?.status === 429
      );
    },
  });
};
