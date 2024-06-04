import Image from 'next/image';

export default function LandingModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-none">
      <div className="p-7 rounded-xl backdrop-blur-lg bg-white/40" style={{ width: '500px' }}>
        <div className="text-center">
          <div className="flex justify-center">
            <Image src="/images/landing.png" alt="langing-image" width={104} height={136} />{' '}
          </div>
          <div className="mt-7">
            <p className="font-bold text-2xl mb-1">Let your things go</p>
            <p className="font-bold text-xl">묵혀두지 말고 보내주세요</p>
          </div>
        </div>
        <div className="text-center mt-7">
          <p>서울에서 나눔 가능한 물품</p>
          <p className="font-semibold text-4xl text-stone-600">1000건</p>
        </div>
        <div className="text-center mt-7">
          <input
            type="text"
            placeholder="필요한 물품을 검색하세요."
            className="w-64 px-2 py-1 bg-stone-600 text-white rounded-xl text-center"
          />
        </div>
        <div className="flex justify-center">
          <div className="mt-6">
            <div className="text-center">
              <button className="w-64 px-5 py-3 flex items-center bg-white rounded-full shadow-lg">
                <Image src="/images/icons/Thunder.png" alt="thunder-icon" width={30} height={30} />
                <p className="ml-auto text-center w-full" style={{ marginRight: '20px' }}>
                  오늘 번개 나눔 보기
                </p>
              </button>
            </div>
            <div className="text-center mt-4">
              <button className="w-64 px-5 py-3 flex items-center bg-white rounded-full shadow-lg">
                <Image src="/images/icons/Location.png" alt="location-icon" width={30} height={30} />
                <p className="ml-auto text-center w-full" style={{ marginRight: '20px' }}>
                  내 주변 나눔 보기
                </p>
              </button>
            </div>
            <div className="text-center mt-4">
              <button className="w-64 px-5 py-3 flex items-center bg-white rounded-full shadow-lg">
                <Image src="/images/icons/Thing_Sm.png" alt="thing-icon" width={30} height={30} />
                <p className="ml-auto text-center w-full" style={{ marginRight: '20px' }}>
                  새 나눔 등록하기
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center space-x-7">
          <Image src="/images/appstore.png" alt="appstore" width={107} height={32} />
          <Image src="/images/googleplay.png" alt="google-play" width={107} height={32} />
        </div>
      </div>
    </div>
  );
}
