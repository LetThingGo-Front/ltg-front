import { http, HttpResponse } from "msw";

export const itemHandler = [
  http.post("/v1/items", async ({ request }) => {
    const item = await request.json();
    return HttpResponse.json({ status: "success", data: item });
  }),
];
