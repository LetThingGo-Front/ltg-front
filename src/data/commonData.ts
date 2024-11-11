import axios from "axios";

const fetchCategoryList = async (code: string, useYn?: string) => {
  const { data } = await axios.get(`/v1/group-codes/${code}/codes`, {
    params: {
      useYn: useYn ?? "Y",
    },
  });

  return data?.data?.[code];
};

// 카테고리가 식음료인 물품상태를 조회하려면 mngItem1 값을 'Y'로 설정
const fetchItemStatusList = async (
  code: string,
  mngItem1: string,
  useYn?: string,
) => {
  const { data } = await axios.get(`/v1/group-codes/${code}/codes`, {
    params: {
      useYn: useYn ?? "Y",
      mngItem1,
    },
  });

  return data?.data?.[code];
};

const fetchDaysList = async (code: string, useYn?: string) => {
  const { data } = await axios.get(`/v1/group-codes/${code}/codes`, {
    params: {
      useYn: useYn ?? "Y",
    },
  });

  return data?.data?.[code];
};

export { fetchCategoryList, fetchItemStatusList, fetchDaysList };
