import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    },
  },
});

const onFulfilled = (res: AxiosResponse) => {
  // res.data = parseDatesInObject(res.data);
  return res;
};

const onRejected = async (err: any) => {
  const status = err.response?.status;

  switch (status) {
    case 402: {
      const { type, message } = err.response.data.error;
      console.log(type, message);
      break;
    }
    default: {
      if (status < 400) break;
      else if (status >= 500) {
        console.log(
          "An unknown error has occurred during the request." +
            "Try to refresh the page. If the issue persists, please contact us."
        );
        break;
      }

      try {
        const { type, message } = err.response.data.error;
        console.log(message);
        if (message === type) break;
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  return Promise.reject(err);
};

const cleanSearchParams = (req: InternalAxiosRequestConfig<any>) => {
  const { url } = req;
  if (url == null) return req;

  const search = url.split("?")[1];
  if (search == null) return req;

  const params = new URLSearchParams(search);

  for (const [key, val] of params.entries()) {
    if (val == null || val === "undefined" || val === "null")
      params.delete(key);
  }

  const result = params.toString();
  req.url = url.split("?")[0] + (result !== "" ? `?${result}` : "");

  return req;
};

export const API = axios.create({
  baseURL: "https://thirai-api.vercel.app/",
});
API.interceptors.request.use(cleanSearchParams);
API.interceptors.response.use(onFulfilled, onRejected);
