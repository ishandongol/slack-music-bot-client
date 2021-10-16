import { asyncFunction } from "../utils/axios";

export const getPlaylist = <T>(params: { startDate?: number; endDate?: number }) =>
  asyncFunction<T>({ method: "GET", url: "/playlist", params });
