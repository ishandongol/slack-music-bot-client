import { asyncFunction } from "../utils/axios";

export const getPlaylist = () =>
  asyncFunction({ method: "GET", url: "/playlist" });
