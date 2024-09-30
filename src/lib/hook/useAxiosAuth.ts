import { useEffect } from 'react';
import { axiosAuth } from '@/lib/axios';
import { useRefreshToken } from './useRefreshToken';
import useUserStore from '@/store/UserStore';

const useAxiosAuth = () => {
  const accessToken = useUserStore.use.accessToken();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      config => {
        const updatedConfig = { ...config };
        if (!updatedConfig.headers.Authorization) {
          updatedConfig.headers.Authorization = `Bearer ${accessToken}`;
        }
        return updatedConfig;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      response => response,
      async error => {
        console.log(`useAxiosAuth error`);
        console.log(error);
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const reissueAccessToken = await refreshToken();
          console.log(`reissueAccessToken: ${reissueAccessToken}`);
          prevRequest.headers.Authorization = `Bearer ${reissueAccessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
