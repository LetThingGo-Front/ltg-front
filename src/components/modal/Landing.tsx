import Image from 'next/image';

export default function LandingModal() {
  return (
    <div
      className="fixed left-1/2 transform -translate-x-1/2 md:w-[100%] md:mx-[40px] mt-[30px] b-[20px] px-[141px] pt-[56px] pb-[44px] rounded-xl backdrop-blur-lg bg-white/40 "
      style={{ top: '150px', width: '624px', height: '746px' }}
    >
      <div className="text-center">
        <div className="flex justify-center">
          <Image src="/images/landing.png" alt="langing-image" width={104} height={136} />{' '}
        </div>
        <div className="mt-[32px]">
          <p className="font-bold text-xl mb-1 text-[28px]">Let your things go</p>
          <p className="font-bold text-[20px]">묵혀두지 말고 보내주세요</p>
        </div>
      </div>
      <div className="text-center mt-[32px]">
        <p className="text-[12px]">서울에서 나눔 가능한 물품</p>
        <p className="font-bold text-[40px] text-stone-600">1000건</p>
      </div>
      <div className="text-center mt-[32px]">
        <input
          type="text"
          placeholder="필요한 물품을 검색하세요."
          className="w-[310px] px-[6px] py-[10px] bg-[#ebe9e8] text-[#8c8c8c] text-[14px] rounded-xl text-center"
        />
      </div>
      <div className="flex justify-center">
        <div className="mt-[32px]">
          <div className="text-center">
            <button className="w-[310px] px-[12px] py-[10px] flex items-center bg-white rounded-full shadow-lg text-[14px]">
              <Image src="/images/icons/Thunder.png" alt="thunder-icon" width={30} height={30} />
              <p className="ml-auto text-center w-full" style={{ marginRight: '20px' }}>
                오늘 번개 나눔 보기
              </p>
            </button>
          </div>
          <div className="text-center mt-[15px]">
            <button className="w-[310px] px-[12px] py-[10px] flex items-center bg-white rounded-full shadow-lg text-[14px]">
              <Image src="/images/icons/Location.png" alt="location-icon" width={30} height={30} />
              <p className="ml-auto text-center w-full" style={{ marginRight: '20px' }}>
                내 주변 나눔 보기
              </p>
            </button>
          </div>
          <div className="text-center mt-[15px]">
            <button className="w-[310px] px-[12px] py-[10px] flex items-center bg-white rounded-full shadow-lg text-[14px]">
              <Image src="/images/icons/Thing_Sm.png" alt="thing-icon" width={30} height={30} />
              <p className="ml-auto text-center w-full" style={{ marginRight: '20px' }}>
                새 나눔 등록하기
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
