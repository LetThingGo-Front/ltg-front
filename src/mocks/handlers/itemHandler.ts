import { http, HttpResponse } from "msw";
import itemData from "../data/item/itemData.json";

export const itemHandler = [
  http.post("/v1/items", async ({ request }) => {
    const item = await request.json();
    return HttpResponse.json({ status: "success", data: item });
  }),
  http.get("/v1/items", async () => {
    return HttpResponse.json({ status: "success", data: itemData });
  }),
];
