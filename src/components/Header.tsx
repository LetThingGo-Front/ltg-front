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
          className="h-[20px] mt-[2px] cursor-pointer"
          width={65}
          height={20}
        />
        <ul className="flex justify-between min-w-72 ms-10">
          <li className="hover:font-bold cursor-pointer">나눔 탐색</li>
          <li className="hover:font-bold cursor-pointer">띵즈</li>
          <li className="hover:font-bold cursor-pointer">캘린더</li>
          <li className="hover:font-bold cursor-pointer">문의</li>
        </ul>
        <button className="ms-auto py-1 px-4 rounded font-bold " style={{ backgroundColor: COLOR.BUTTON_COLOR }}>
          로그인 후 새 나눔 등록, Let things go!
        </button>
      </div>
      <div className="flex justify-between md:hidden px-10 py-8 bg-white items-center">
        <Image src="/images/icons/Hamburger.png" alt="hamberger" width={30} height={30} />
        <Image src="/images/logo_black.png" alt="logo" width={65} height={20} />
        <Image src="/images/icons/img.png" alt="profile" width={28} height={28} />
      </div>
    </>
  );
}
