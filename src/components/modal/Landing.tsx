import Image from "next/image";

export default function LandingModal() {
  return (
    <div
      className="b-[20px] absolute left-1/2 mt-[30px] -translate-x-1/2 transform rounded-xl bg-white/40 px-[141px] pb-[44px] pt-[56px] backdrop-blur-lg md:mx-[40px] md:w-[100%]"
      style={{ top: "150px", width: "624px", height: "746px" }}
    >
      <div className="text-center">
        <div className="flex justify-center">
          <Image
            src="/images/landing.png"
            alt="langing-image"
            width={104}
            height={136}
          />{" "}
        </div>
        <div className="mt-[32px]">
          <p className="mb-1 text-[28px] text-xl font-bold">
            Let your things go
          </p>
          <p className="text-[20px] font-bold">묵혀두지 말고 보내주세요</p>
        </div>
      </div>
      <div className="mt-[32px] text-center">
        <p className="text-[12px]">서울에서 나눔 가능한 물품</p>
        <p className="text-[40px] font-bold text-stone-600">1000건</p>
      </div>
      <div className="mt-[32px] text-center">
        <input
          type="text"
          placeholder="필요한 물품을 검색하세요."
          className="w-[310px] rounded-xl bg-[#ebe9e8] px-[6px] py-[10px] text-center text-[14px] text-[#8c8c8c]"
        />
      </div>
      <div className="flex justify-center">
        <div className="mt-[32px]">
          <div className="text-center">
            <button className="flex w-[310px] items-center rounded-full bg-white px-[12px] py-[10px] text-[14px] shadow-lg">
              <Image
                src="/images/icons/Thunder.png"
                alt="thunder-icon"
                width={30}
                height={30}
              />
              <p
                className="ml-auto w-full text-center"
                style={{ marginRight: "20px" }}
              >
                오늘 번개 나눔 보기
              </p>
            </button>
          </div>
          <div className="mt-[15px] text-center">
            <button className="flex w-[310px] items-center rounded-full bg-white px-[12px] py-[10px] text-[14px] shadow-lg">
              <Image
                src="/images/icons/Location.png"
                alt="location-icon"
                width={30}
                height={30}
              />
              <p
                className="ml-auto w-full text-center"
                style={{ marginRight: "20px" }}
              >
                내 주변 나눔 보기
              </p>
            </button>
          </div>
          <div className="mt-[15px] text-center">
            <button className="flex w-[310px] items-center rounded-full bg-white px-[12px] py-[10px] text-[14px] shadow-lg">
              <Image
                src="/images/icons/Thing_Sm.png"
                alt="thing-icon"
                width={30}
                height={30}
              />
              <p
                className="ml-auto w-full text-center"
                style={{ marginRight: "20px" }}
              >
                새 나눔 등록하기
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
