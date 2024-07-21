import Image from 'next/image';

export default function SideNav() {
  return (
    <div className="hidden fixed top-0 left-0 bg-white p-20 rounded-tr-lg h-dvh mt-10 md:hidden">
      <div className="h-3/5 pb-10">
        <li className="list-none space-y-14 text-center font-bold">
          <ul>홈</ul>
          <ul>나눔 탐색</ul>
          <ul>띵즈</ul>
          <ul>캘린더</ul>
          <ul>내 프로필</ul>
          <ul>내 계정</ul>
        </li>
      </div>
      <div className="h-2/5">
        <div>
          <button className="px-4 py-2 rounded-lg" style={{ backgroundColor: `rgb(225, 244, 82)` }}>
            소셜 미디어 로그인
          </button>
        </div>
        <div className="mt-16 space-y-6">
          <div className="flex justify-center">
            <Image src="/images/appstore.png" alt="appstore" width={104} height={30} />
          </div>
          <div className="flex justify-center">
            <Image src="/images/googleplay.png" alt="googleplay" width={104} height={30} />
          </div>
        </div>
        <div className="mt-20 flex justify-center">
          <Image src="/images/Arrow_Left.png" alt="arrow-left" width={24} height={7} />
        </div>
      </div>
    </div>
  );
}
