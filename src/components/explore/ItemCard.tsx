import React from "react";
import Image from "next/image";

export default function ItemCard() {
  return (
    <div className="group/card h-[7rem] w-[19.5rem] cursor-pointer rounded-[1.25rem] bg-black/[16%] active:bg-black/40 pointerhover:hover:bg-black/40">
      <div className="flex h-[5.75rem] p-[0.625rem]">
        <div className="mr-3 h-[92px] w-[92px]">
          <Image
            src="/assets/images/sample/books.png"
            alt="Thumbnail"
            width={92}
            height={92}
            className="rounded-[0.625rem]"
          />
        </div>
        <div className="">
          <div className="flex">
            <p className="h-[2.5rem] w-[10.25rem] text-sm font-bold group-active/card:text-white pointerhover:group-hover/card:text-white">
              세상에서 가장 쉬운 코딩책
            </p>
            <Image
              src="/images/empty_star.png"
              alt="empty_star"
              width={13}
              height={13}
              className="m-[0.2894rem] h-[0.8125rem] w-[0.8125rem]"
            />
          </div>
          <div className="mb-[0.625rem] flex">
            <div className="mr-[0.25rem] flex items-center justify-center rounded-[0.5rem] bg-white/70 pl-[0.125rem] pr-2 group-active/card:bg-green-400 pointerhover:group-hover/card:bg-green-400">
              <Image
                src="/assets/images/button/thunder.svg"
                alt="thunder"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span className="text-xxs font-semibold text-grey-900">
                오늘 번개 가능
              </span>
            </div>
            <div className="flex rounded-[0.5rem] bg-black/30 p-[0.25rem] px-[0.5rem] text-xxs font-semibold text-white backdrop-blur-[20px] group-active/card:bg-white/70 group-active/card:text-grey-700 pointerhover:group-hover/card:bg-white/70 pointerhover:group-hover/card:text-grey-700">
              일정 제안 받음
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative flex gap-[0.0625rem] text-xxs text-grey-700">
              <Image
                src="/assets/images/marker/location_marked.svg"
                alt="pin"
                width={16}
                height={16}
                className="group-active/card:opacity-0 pointerhover:group-hover/card:opacity-0"
              />
              <Image
                src="/assets/images/marker/location_marked_white.svg"
                alt="white pin"
                width={16}
                height={16}
                className="absolute inset-0 opacity-0 group-active/card:opacity-100 pointerhover:group-hover/card:opacity-100"
              />
              <p className="text-xxs font-bold text-grey-800 group-active/card:text-white pointerhover:group-hover/card:text-white">
                역삼동
              </p>
            </div>
            <div className="text-xxs text-grey-800 group-active/card:text-white pointerhover:group-hover/card:text-white">
              오늘 등록됨
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
