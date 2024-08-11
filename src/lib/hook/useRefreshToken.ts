import { useSession, signOut } from 'next-auth/react';
import axios from '../axios';
import utils from '@/utils/cmmnUtil';

export function useRefreshToken() {
  const { data: session, update } = useSession();
  const user = JSON.parse(utils.getStorage('user'));

  const refreshToken = async () => {
    const res = await axios
      .post('/api/v1/common/renewal', {
        refreshToken: utils.getStorage('refreshToken'), // 쿠키 저장일 경우 변경 필요
        userId: user.id,
      })
      .catch(error => {
        console.log(`useRefreshToken: ${error}`);
        signOut();
      });
    if (res?.status && session) {
      update({ ...session, accessToken: res?.headers.authorization.split('Bearer ')[1] });
    }

    return res?.headers.authorization.split('Bearer ')[1];
  };

  return refreshToken;
}
