import Image from "next/image";

export default function MainMap() {
  return (
    <div className="absolute flex items-center justify-center">
      <div className="h-[100%-15rem] md:mx-10 md:mb-20 md:flex">
        <Image
          className="rounded-[1.875rem]"
          src="/images/map_mock.PNG"
          width={1400}
          height={1400}
          alt="map"
        />
      </div>
    </div>
  );
}
