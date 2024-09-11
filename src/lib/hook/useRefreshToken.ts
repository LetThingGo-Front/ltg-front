import axios from '../axios';
import useUserStore from '@/store/UserStore';

export function useRefreshToken() {
  const { userInfo, setUserInfo, clearUserInfo } = useUserStore();
  const refreshToken = async () => {
    const res = await axios
      .post('/v1/reissue', {
        withCredentials: true,
      })
      .catch(error => {
        // 로그아웃 처리하고 홈화면으로 보내야하나?
        console.log(`useRefreshToken: ${error}`);
        axios.post('/v1/logout');
        clearUserInfo();
      });
    if (res?.status) {
      setUserInfo({ ...userInfo, accessToken: res?.headers.authorization.split('Bearer ')[1] });
    }

    return res?.headers.authorization.split('Bearer ')[1];
  };

  return refreshToken;
}
