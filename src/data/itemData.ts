import axios, { axiosAuth } from "@/lib/axios";
import { ItemSearchRequestPagination } from "@/types/item";

// 나눔 물품 목록 조회
const getItemList = async (params: ItemSearchRequestPagination | string) => {
  const { data } = await axiosAuth.get(`/v1/items`, {
    params,
  });
  return data?.data;
};

export { getItemList };
