import axios from "axios";

const fetchCategoryList = async (useYn?: string) => {
  const { data } = await axios.get("/v1/group-codes/IT003/codes", {
    params: {
      useYn: useYn ?? "Y",
    },
  });

  return data;
};

// 카테고리가 식음료인 물품상태를 조회하려면 mngItem1 값을 'Y'로 설정
const fetchItemStatusList = async (mngItem1: string, useYn?: string) => {
  const { data } = await axios.get("/v1/group-codes/IT001/codes", {
    params: {
      useYn: useYn ?? "Y",
      mngItem1,
    },
  });

  return data;
};

const fetchDaysList = async (useYn?: string) => {
  const { data } = await axios.get("/v1/group-codes/IT002/codes", {
    params: {
      useYn: useYn ?? "Y",
    },
  });

  return data;
};

export { fetchCategoryList, fetchItemStatusList, fetchDaysList };
