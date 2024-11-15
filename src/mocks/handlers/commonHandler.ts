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
  http.get("/v1/group-codes/IT003/codes", () => {
    return HttpResponse.json({
      status: "success",
      data: categoryData,
    });
  }),
  http.get("/v1/error", () => {
    const randomValue = Math.random();
    if (randomValue < 0.33) {
      return HttpResponse.json(
        { code: 401, message: "유저 정보가 유효하지 않아요", data: null },
        { status: 401 },
      );
    }
    if (randomValue < 0.66) {
      return HttpResponse.json(
        { code: 404, message: "해당 내용을 찾을 수가 없어요.", data: null },
        { status: 404 },
      );
    }
    return HttpResponse.error();
  }),
];
