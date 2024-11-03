import Image from "next/image";

export default function LandingModal() {
  return (
    <div className="absolute h-[calc(100%-10.625rem)] w-[calc(100%-4.0625rem)] rounded-[1.25rem] bg-white/40 px-6 backdrop-blur-lg sm:h-[calc(100%-18.75rem)] sm:min-h-[27.5rem] sm:w-full sm:max-w-[39rem] sm:px-[8.75rem] sm:py-4">
      <div className="flex flex-col gap-4 text-center">
        <div className="flex justify-center">
          <Image
            src="/images/landing.png"
            alt="langing-image"
            width={80}
            height={110}
          />
        </div>
        <div className="flex flex-col font-bold">
          <p className="text-lg">Let your things go</p>
          <p className="text-sm">묵혀두지 말고 보내주세요</p>
        </div>
        <div className="">
          <p className="text-xs">서울에서 나눔 가능한 물품</p>
          <p className="text-2xl font-bold text-stone-600">1000건</p>
        </div>
        <input
          type="text"
          placeholder="필요한 물품을 검색하세요."
          className="w-full rounded-xl bg-[#ebe9e8] px-[0.375rem] py-2 text-center text-xs text-[#8c8c8c]"
        />
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 text-xs">
        <button className="flex w-full items-center rounded-full bg-white py-1 shadow-lg">
          <Image
            src="/images/icons/Thunder.png"
            alt="thunder-icon"
            width={30}
            height={30}
          />
          <p className="ml-auto mr-5 w-full text-center">오늘 번개 나눔 보기</p>
        </button>
        <button className="flex w-full items-center rounded-full bg-white py-1 shadow-lg">
          <Image
            src="/images/icons/Location.png"
            alt="location-icon"
            width={30}
            height={30}
          />
          <p className="ml-auto mr-5 w-full text-center">내 주변 나눔 보기</p>
        </button>
        <button className="flex w-full items-center rounded-full bg-white py-1 shadow-lg">
          <Image
            src="/images/icons/Thing_Sm.png"
            alt="thing-icon"
            width={30}
            height={30}
          />
          <p className="ml-auto mr-5 w-full text-center">새 나눔 등록하기</p>
        </button>
      </div>
    </div>
  );
}
