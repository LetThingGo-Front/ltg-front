import { http, HttpResponse } from "msw";
import itemData from "../data/item/itemData.json";

export const itemHandler = [
  http.get("/v1/items", async () => {
    const items: any = itemData;
    const responseItems = items.content.map((item: any) => {
      return {
        ...item,
        itemName: `${item.itemName + (Math.random() * 100).toFixed(0)}`,
      };
    });
    const response = { ...items, content: responseItems };
    return HttpResponse.json({ status: "success", data: response });
  }),
];
