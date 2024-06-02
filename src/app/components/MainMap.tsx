import Image from 'next/image';

export default function MainMap() {
  return (
    <div className="flex justify-center mt-10">
      <Image
        src="/images/map_mock.PNG"
        alt="map-view-mockup"
        layout="responsive"
        width={1840}
        height={840}
        className="rounded-3xl object-contain mx-8"
      />
    </div>
  );
}
