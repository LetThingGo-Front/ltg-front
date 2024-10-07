import axios, { axiosAuth } from '@/lib/axios';
import useUserStore from '@/store/UserStore';

let isRefreshing = false; // 재발급 진행 중 여부
let refreshSubscribers: any = []; // 재발급 완료 후 대기 중인 요청 목록

// 새로운 토큰이 발급되면 대기 중인 요청에 적용
const onRefreshed = (newAccessToken: any) => {
  refreshSubscribers.forEach((callback: any) => callback(newAccessToken));
  refreshSubscribers = [];
};

// 재발급 중인 요청 대기 목록에 추가
const addRefreshSubscriber = (callback: any) => {
  refreshSubscribers.push(callback);
};

const refreshToken = async () => {
  console.log(`refreshToken call!!`);
  const initUserInfo = useUserStore.use.initUserInfo();
  const setAccessToken = useUserStore.use.setAccessToken();
  try {
    const reissueRes = await axios.post('/v1/reissue', { withCredentials: true });
    const reissueAccessToken = reissueRes?.headers.authorization.split('Bearer ')[1];
    console.log(`reissueAccessToken: ${reissueAccessToken}`);
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
      console.log(isRefreshing);
      if (error.response.status === 401 && !prevRequest.sent) {
        if (isRefreshing) {
          // 토큰 재발급 중일 때 대기 상태로 전환
          console.log(`토큰 재발급 중일 때 대기 상태로 전환`);
          return new Promise(resolve => {
            addRefreshSubscriber((newAccessToken: any) => {
              prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              resolve(axiosAuth(prevRequest));
            });
          });
        }

        prevRequest.sent = true;
        isRefreshing = true;
        console.log(`setIsRefreshing after value: ${isRefreshing}`);

        try {
          const reissueAccessToken = await refreshToken();

          // 대기 중인 모든 요청 처리
          onRefreshed(reissueAccessToken);
          isRefreshing = false;

          prevRequest.headers.Authorization = `Bearer ${reissueAccessToken}`;
          return axiosAuth(prevRequest);
        } catch (error) {
          isRefreshing = false;
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
};

export default setupInterceptor;
