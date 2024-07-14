export default function MainMap() {
  return (
    <div className="flex justify-center mt-10 relative">
      <div
        className="hidden md:flex w-[1840px] h-mainmap-responsive md:w-[100%] md:mx-[40px] md:mb-[80px] bg-[url('/images/map_mock.PNG')] rounded-[30px] mx-8"
        id="browser-main-map"
      ></div>
      <div className="md:hidden w-full h-dvh-minus-header-mobile bg-[url('/images/map_mock.PNG')]"></div>
    </div>
  );
}
