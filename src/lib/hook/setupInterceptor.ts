import axios, { axiosAuth } from '@/lib/axios';
import useUserStore from '@/store/UserStore';
import { getIsRefreshing, setIsRefreshing, addRefreshSubscriber, onRefreshed } from '../tokenService';

const refreshToken = async () => {
  const initUserInfo = useUserStore.use.initUserInfo();
  const setAccessToken = useUserStore.use.setAccessToken();
  console.log(initUserInfo);
  console.log(setAccessToken);
  try {
    const reissueRes = await axios.post('/v1/reissue', { withCredentials: true });
    const reissueAccessToken = reissueRes?.headers.authorization.split('Bearer ')[1];
    setAccessToken(reissueAccessToken);

    return reissueAccessToken;
  } catch (error) {
    try {
      // 로그아웃이 되어야 refresh token cookie가 삭제됨. 현재는 로그아웃도 access token 만료 시 에러 발생.
      initUserInfo();
      window.location.href = '/';
    } catch (error) {
      console.log(`logout fail: ${error}`);
    }
  }
};

const setupInterceptor = () => {
  const accessToken = useUserStore.use.accessToken();
  console.log(`setupInterceptor accessToken: ${accessToken}`);
  axiosAuth.interceptors.request.use(
    config => {
      const updatedConfig = { ...config };
      if (!updatedConfig.headers.Authorization) {
        console.log(`updatedConfig.headers.Authorization: ${accessToken}`);
        updatedConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      return updatedConfig;
    },
    error => Promise.reject(error),
  );

  axiosAuth.interceptors.response.use(
    response => response,
    async error => {
      console.log(`useAxiosAuth error`);
      console.log(error);
      const prevRequest = error.config;
      console.log(`===================== getIsRefreshing`);
      console.log(getIsRefreshing());
      if (error.response.status === 401 && !prevRequest.sent) {
        if (getIsRefreshing()) {
          // 토큰 재발급 중일 때 대기 상태로 전환
          return new Promise(resolve => {
            addRefreshSubscriber((newAccessToken: any) => {
              prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              resolve(axiosAuth(prevRequest));
            });
          });
        }

        prevRequest.sent = true;
        setIsRefreshing(true);

        try {
          const reissueAccessToken = await refreshToken();

          // 대기 중인 모든 요청 처리
          onRefreshed(reissueAccessToken);
          setIsRefreshing(false);

          prevRequest.headers.Authorization = `Bearer ${reissueAccessToken}`;
          return axiosAuth(prevRequest);
        } catch (error) {
          setIsRefreshing(false);
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
};

export default setupInterceptor;
