import { asyncFunction } from "../utils/axios";

export const getPlaylist = <T>(params: { startDate?: number; endDate?: number }) =>
  asyncFunction<T>({ method: "GET", url: "/playlist", params });


export const getSongs = <T>(params: { page?: number; size?: number }) =>
asyncFunction<T>({ method: "GET", url: "/songs", params });
