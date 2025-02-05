import axios from "./axios";
import utils from "@/common/utils/cmmnUtil";

const refreshToken = async () => {
  try {
    const reissueRes = await axios.post("/v1/reissue", {
      withCredentials: true,
    });
    const reissueAccessToken =
      reissueRes?.headers.authorization.split("Bearer ")[1];
    utils.setStorage("accessToken", reissueAccessToken);

    return reissueAccessToken;
  } catch (error) {
    utils.removeStorageAll();
    window.location.href = "/";
  }
};

export default refreshToken;
