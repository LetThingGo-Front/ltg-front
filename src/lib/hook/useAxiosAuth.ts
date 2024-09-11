import { useEffect } from 'react';
import { axiosAuth } from '@/lib/axios';
import { useRefreshToken } from './useRefreshToken';
import useUserStore from '@/store/UserStore';

const useAxiosAuth = () => {
  const { userInfo } = useUserStore();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      config => {
        const updatedConfig = { ...config };
        if (!updatedConfig.headers.Authorization) {
          updatedConfig.headers.Authorization = `Bearer ${userInfo.accessToken}`;
        }
        return updatedConfig;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      response => response,
      error => {
        const prevRequest = error.config;
        if (error.response.data.header.resultCode === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const accessToken = refreshToken();
          prevRequest.headers.Authorization = `Bearer ${accessToken}`;
          console.log(prevRequest);
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
