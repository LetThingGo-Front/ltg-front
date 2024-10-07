import axios from '../axios';
import useUserStore from '@/store/UserStore';

export function useRefreshToken() {
  const initUserInfo = useUserStore.use.initUserInfo();
  const setAccessToken = useUserStore.use.setAccessToken();
  const refreshToken = async () => {
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

  return refreshToken;
}
