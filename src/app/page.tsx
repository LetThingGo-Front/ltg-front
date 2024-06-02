import Image from 'next/image';
import Header from './components/Header';
import MainMap from './components/MainMap';
import LandingModal from './components/modal/Landing';

export default function Home() {
  return (
    <>
      <Header />
      <MainMap />
      <LandingModal />
    </>
  );
}
