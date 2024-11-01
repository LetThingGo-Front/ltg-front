export default function MainMap() {
  return (
    <div className="relative flex justify-center">
      <div
        className="h-mainmap-responsive mx-8 hidden w-[1840px] rounded-[30px] bg-[url('/images/map_mock.PNG')] md:mx-[40px] md:mb-[80px] md:flex md:w-[100%]"
        id="browser-main-map"
      ></div>
      <div className="h-dvh-minus-header-mobile w-full bg-[url('/images/map_mock.PNG')] md:hidden"></div>
    </div>
  );
}
