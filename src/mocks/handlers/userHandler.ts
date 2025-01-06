import { http, HttpResponse } from "msw";
import favoriteHData from "../data/user/favoriteHData.json";
import favoriteWData from "../data/user/favoriteWData.json";
import favoriteEData from "../data/user/favoriteEData.json";

export const userHandler = [
  http.get("/v1/users/favorite-places/H", async () => {
    return HttpResponse.json({ status: "success", data: favoriteHData });
  }),
  http.get("/v1/users/favorite-places/W", async () => {
    return HttpResponse.json({ status: "success", data: favoriteWData });
  }),
  http.get("/v1/users/favorite-places/E", async () => {
    return HttpResponse.json({ status: "success", data: favoriteEData });
  }),
];
