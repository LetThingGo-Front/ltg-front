import axios from '../axios';
import useUserStore from '@/store/UserStore';

export function useRefreshToken() {
  const initUserInfo = useUserStore.use.initUserInfo();
  const setAccessToken = useUserStore.use.setAccessToken();

  const refreshToken = async () => {
    try {
      const reissueRes = await axios.post('/v1/reissue', { withCredentials: true });
      console.log(reissueRes);
      console.log(reissueRes?.headers.Authorization);
      const reissueAccessToken = reissueRes?.headers.authorization.split('Bearer ')[1];
      console.log(reissueAccessToken);
      setAccessToken(reissueAccessToken);

      return reissueAccessToken;
    } catch (error) {
      try {
        await axios.delete('/api/accessToken');
        await axios.delete('/api/refreshToken');
        initUserInfo();
        window.location.href = '/';
      } catch (error) {
        console.log(`logout fail: ${error}`);
      }
    }
  };

  return refreshToken;
}
