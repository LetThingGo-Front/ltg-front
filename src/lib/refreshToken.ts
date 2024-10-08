import axios from './axios';
import utils from '@/utils/cmmnUtil';

const refreshToken = async () => {
  try {
    const reissueRes = await axios.post('/v1/reissue', { withCredentials: true });
    const reissueAccessToken = reissueRes?.headers.authorization.split('Bearer ')[1];
    utils.setStorage('accessToken', reissueAccessToken);

    return reissueAccessToken;
  } catch (error) {
    try {
      await axios.post(
        '/v1/logout',
        {},
        { headers: { Authorization: `Bearer ${utils.getStorage('accessToken')}` }, withCredentials: true },
      );
      utils.removeStorageAll();
      //   window.location.href = '/';
      return null;
    } catch (error) {
      console.log(`logout fail: ${error}`);
      utils.removeStorageAll();
      //   window.location.href = '/';
    }
  }
};

export default refreshToken;
