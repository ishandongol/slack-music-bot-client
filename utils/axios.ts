import config from "../config";
import axios, { AxiosRequestConfig } from "axios";

export class AxiosError extends Error {
  private statusCode: number | string;

  private details: {
    [id: string]: any;
  };

  private axiosError: any;

  constructor(
    status: number | string,
    message: string,
    details: any,
    axiosError: any
  ) {
    super(message);
    this.statusCode = status;
    this.details = details;
    this.axiosError = axiosError;
    // only because we are extending a built in class
    Object.setPrototypeOf(this, AxiosError.prototype);
  }

  toJSON() {
    return {
      message: this.message,
      status: this.statusCode,
      details: this.details,
    };
  }
}

export const axiosInstance = axios.create({
  baseURL: config.apiUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const axiosError = new AxiosError(
        error.response.status,
        error.response.data.message,
        error.response.data,
        error.response
      );
      throw axiosError;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      const axiosError = new AxiosError(
        500,
        "No response from server",
        {},
        error.request
      );
      throw axiosError;
    } else {
      // Something happened in setting up the request that triggered an Error
      const axiosError = new AxiosError(
        500,
        error.message,
        { message: "Setting error" },
        {}
      );
      throw axiosError;
    }
  }
);

export const asyncFunction = async <T=unknown>(config: AxiosRequestConfig) => {
  const response = await axiosInstance.request<T>(config);
  return response.data;
};
