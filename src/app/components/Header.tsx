import Image from 'next/image';

export default function Header() {
  const COLOR = {
    BUTTON_COLOR: '#E1F452', // Green-400
  };
  return (
    <div className="flex px-10 py-8 bg-white">
      <Image src="/images/logo_black.png" alt="logo" width={65} height={21} />
      {/* <img src={require('../image/logo_black.png')} alt="letthinggo-logo" /> */}
      <ul className="flex justify-between min-w-72 ms-10">
        <li>나눔 탐색</li>
        <li>띵즈</li>
        <li>캘린더</li>
        <li>문의</li>
      </ul>
      <button className="ms-auto py-1 px-4 rounded font-bold " style={{ backgroundColor: COLOR.BUTTON_COLOR }}>
        로그인 후 새 나눔 등록, Let things go!
      </button>
    </div>
  );
}
