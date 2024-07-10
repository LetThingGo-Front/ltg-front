import Header from '@/components/Header';
import MainMap from '@/components/MainMap';
import LandingModal from '@/components/modal/Landing';
import SideNav from '@/components/SideNav';

export default function Home() {
  return (
    <>
      <Header />
      <MainMap />
      <LandingModal />
      {/* <SideNav /> */}
    </>
  );
}
