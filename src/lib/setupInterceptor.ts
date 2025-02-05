import { axiosAuth } from "@/lib/axios";
import refreshToken from "./refreshToken";
import {
  setRefreshing,
  getRefreshing,
  subscribeTokenRefresh,
  onTokenRefreshed,
} from "./tokenService";
import utils from "@/common/utils/cmmnUtil";

const setupInterceptor = () => {
  axiosAuth.interceptors.request.use(
    (config) => {
      const updatedConfig = { ...config };
      if (!updatedConfig.headers.Authorization) {
        const accessToken = utils.getStorage("accessToken");
        if (accessToken) {
          updatedConfig.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      return updatedConfig;
    },
    (error) => Promise.reject(error),
  );

  axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config;
      if (error.response?.status === 401 && !prevRequest.sent) {
        if (getRefreshing()) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newAccessToken: any) => {
              prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              resolve(axiosAuth(prevRequest));
            });
          });
        }

        prevRequest.sent = true;
        setRefreshing(true);

        try {
          const reissueAccessToken = await refreshToken();

          onTokenRefreshed(reissueAccessToken); // 대기 중인 모든 요청 처리
          setRefreshing(false);

          prevRequest.headers.Authorization = `Bearer ${reissueAccessToken}`;
          return axiosAuth(prevRequest);
        } catch (error) {
          setRefreshing(false);
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
};

export default setupInterceptor;
