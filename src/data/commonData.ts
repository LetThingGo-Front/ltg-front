import axios, { axiosAuth } from "@/lib/axios";

// 카테고리 코드 IT003
const getCategoryList = async (code: string, useYn?: string) => {
  const { data } = await axiosAuth.get(`/v1/group-codes/${code}/codes`, {
    params: {
      useYn: useYn ?? "Y",
    },
  });
  return data?.data?.[code];
};

// 카테고리가 식음료인 물품상태를 조회하려면 mngItem1 값을 'Y'로 설정, 코드 IT001
const getItemStatusList = async (
  code: string,
  mngItem1: string,
  useYn?: string,
) => {
  const { data } = await axiosAuth.get(`/v1/group-codes/${code}/codes`, {
    params: {
      useYn: useYn ?? "Y",
      mngItem1,
    },
  });

  return data?.data?.[code];
};

// 요일 코드 IT002
const getDaysList = async (code: string, useYn?: string) => {
  const { data } = await axiosAuth.get(`/v1/group-codes/${code}/codes`, {
    params: {
      useYn: useYn ?? "Y",
    },
  });

  return data?.data?.[code];
};

export { getCategoryList, getItemStatusList, getDaysList };
