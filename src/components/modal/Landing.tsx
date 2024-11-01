import Image from "next/image";

export default function LandingModal() {
  return (
    <div className="my-12 h-full max-w-[39rem] rounded-xl bg-white/40 px-[8.8125rem] py-[3.5rem] backdrop-blur-lg sm:mx-10 sm:w-full">
      <div className="text-center">
        <div className="flex justify-center">
          <Image
            src="/images/landing.png"
            alt="langing-image"
            width={104}
            height={136}
          />{" "}
        </div>
        <div className="mt-8">
          <p className="mb-1 text-xl font-bold">Let your things go</p>
          <p className="text-[1.25rem] font-bold">묵혀두지 말고 보내주세요</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-xs">서울에서 나눔 가능한 물품</p>
        <p className="text-[2.5rem] font-bold text-stone-600">1000건</p>
      </div>
      <div className="mt-8 text-center">
        <input
          type="text"
          placeholder="필요한 물품을 검색하세요."
          className="w-[19.375rem] rounded-xl bg-[#ebe9e8] px-[0.375rem] py-[0.625rem] text-center text-sm text-[#8c8c8c]"
        />
      </div>
      <div className="flex justify-center">
        <div className="mt-8">
          <div className="text-center">
            <button className="flex w-[19.375rem] items-center rounded-full bg-white px-3 py-[0.625rem] text-sm shadow-lg">
              <Image
                src="/images/icons/Thunder.png"
                alt="thunder-icon"
                width={30}
                height={30}
              />
              <p className="ml-auto mr-5 w-full text-center">
                오늘 번개 나눔 보기
              </p>
            </button>
          </div>
          <div className="mt-4 text-center">
            <button className="flex w-[19.375rem] items-center rounded-full bg-white px-3 py-[0.625rem] text-sm shadow-lg">
              <Image
                src="/images/icons/Location.png"
                alt="location-icon"
                width={30}
                height={30}
              />
              <p className="ml-auto mr-5 w-full text-center">
                내 주변 나눔 보기
              </p>
            </button>
          </div>
          <div className="mt-4 text-center">
            <button className="flex w-[19.375rem] items-center rounded-full bg-white px-[12px] py-[10px] text-sm shadow-lg">
              <Image
                src="/images/icons/Thing_Sm.png"
                alt="thing-icon"
                width={30}
                height={30}
              />
              <p className="ml-auto mr-5 w-full text-center">
                새 나눔 등록하기
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
