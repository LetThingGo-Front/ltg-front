import MainMap from '@/components/MainMap';
import LandingModal from '@/components/modal/Landing';
import { cookies } from 'next/headers';

export default function Home() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken');
  console.log(refreshToken);
  return (
    <>
      <div>토큰: {refreshToken?.value || 'No Token'}</div>
      <MainMap />
      <LandingModal />
    </>
  );
}
