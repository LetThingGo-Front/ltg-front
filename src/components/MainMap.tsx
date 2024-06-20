import Image from 'next/image';

export default function MainMap() {
  return (
    <div className="flex justify-center mt-10">
      <div className=" w-[1840px] h-[840px] md:w-[100%] md:mx-[20px] bg-[url('/images/map_mock.PNG')] rounded-3xl mx-8"></div>
    </div>
  );
}
