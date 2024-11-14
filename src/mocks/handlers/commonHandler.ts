import { http, HttpResponse } from "msw";
import daysData from "../data/code/daysData.json";
import statusData from "../data/code/statusData.json";
import categoryData from "../data/code/categoryData.json";
import foodStatusData from "../data/code/foodStatusData.json";

export const commonHandler = [
  http.get("/v1/group-codes/IT001/codes", ({ request }) => {
    const url = new URL(request.url);
    const mngItem1 = url.searchParams.get("mngItem1");
    return HttpResponse.json({
      status: "success",
      data: mngItem1 === "N" ? statusData : foodStatusData,
    });
  }),
  http.get("/v1/group-codes/IT002/codes", () => {
    return HttpResponse.json({
      status: "success",
      data: daysData,
    });
  }),
  http.get("/v1/group-codes/IT003/codes", ({ request }) => {
    const url = new URL(request.url);
    const mngItem1 = url.searchParams.get("mngItem1");
    return HttpResponse.json({
      status: "success",
      data: categoryData,
    });
  }),
];
