import axios from '../axios';
import useUserStore from '@/store/UserStore';

export function useRefreshToken() {
  const accessToken = useUserStore.use.accessToken();
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
        const logoutRes = await axios.post('/v1/logout', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(logoutRes.data);
        const deleteTokenRes = await axios.delete('/api/token');
        console.log(deleteTokenRes.data);
        initUserInfo();
        window.location.href = '/';
      } catch (error) {
        console.log(`logout fail: ${error}`);
      }
    }
  };

  return refreshToken;
}
