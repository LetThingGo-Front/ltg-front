import Image from 'next/image';

export default function Header() {
  const COLOR = {
    BUTTON_COLOR: '#E1F452', // Green-400
  };
  return (
    <>
      <div className="hidden md:flex px-10 py-8 bg-white">
        <Image
          src="/images/logo_black.png"
          alt="logo"
          className="w-[65px] h-[21px] h-[20px] mt-[2px] cursor-pointer"
          width={65}
          height={20}
        />
        <ul className="flex justify-between min-w-72 ms-10">
          <li className="text-[16px] hover:font-bold cursor-pointer">나눔 탐색</li>
          <li className="text-[16px] hover:font-bold cursor-pointer">띵즈</li>
          <li className="text-[16px] hover:font-bold cursor-pointer">캘린더</li>
          <li className="text-[16px] hover:font-bold cursor-pointer">문의</li>
        </ul>
        <div className="ms-auto flex">
          <div className="me-[30px] flex items-center justify-center">
            <Image src="/images/appstore.png" alt="appstore" width={86} height={26} className="me-[20px]" />
            <Image src="/images/googleplay.png" alt="google-play" width={86} height={26} />
          </div>
          <button
            className="w-[303px] h-[38px] py-[8px] px-[20px] rounded-[10px] font-bold text-[16px]"
            style={{ backgroundColor: COLOR.BUTTON_COLOR }}
          >
            로그인 후 새 나눔 등록, Let things go!
          </button>
        </div>
      </div>
      <div className="flex justify-between md:hidden px-10 py-8 bg-white items-center">
        <Image src="/images/icons/Hamburger.png" alt="hamberger" width={30} height={30} />
        <Image src="/images/logo_black.png" alt="logo" width={65} height={20} />
        <Image src="/images/icons/img.png" alt="profile" width={28} height={28} />
      </div>
    </>
  );
}
