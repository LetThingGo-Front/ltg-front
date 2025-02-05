import React, { useMemo } from "react";
import Image from "next/image";
import { ItemListResponse } from "./ExploreSheet";
import { useRouter } from "next/navigation";

type Props = {
  item?: ItemListResponse;
};

export default function ItemCard({ item }: Props) {
  const router = useRouter();
  const isToday = (dateString: string) => {
    if (!dateString) return false;
    const inputDate = new Date(dateString);
    const now = new Date();

    // 현재 날짜 정보
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );

    // 입력 날짜가 오늘 범위 안에 있는지 확인
    return inputDate >= todayStart && inputDate < todayEnd;
  };

  const goItemDetailPage = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div
      className="group/card h-[7rem] w-[19.5rem] cursor-pointer rounded-[1.25rem] bg-black/[16%] active:bg-black/40 pointerhover:hover:bg-black/40"
      onClick={() => goItemDetailPage(item?.itemId ?? 0)}
    >
      <div className="flex h-[5.75rem] p-[0.625rem]">
        <Image
          src={item?.itemThumbnailUrl ?? ""}
          alt="Thumbnail"
          width={92}
          height={92}
          className="mr-3 h-[92px] w-[92px] rounded-[0.625rem]"
        />
        <div className="">
          <div className="flex">
            <p className="h-[2.5rem] w-[10.25rem] text-sm font-bold group-active/card:text-white pointerhover:group-hover/card:text-white">
              {item?.itemName}
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
            {item?.isLightningAvailableToday && (
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
            )}

            <div className="flex rounded-[0.5rem] bg-black/30 p-[0.25rem] px-[0.5rem] text-xxs font-semibold text-white backdrop-blur-[20px] group-active/card:bg-white/70 group-active/card:text-grey-700 pointerhover:group-hover/card:bg-white/70 pointerhover:group-hover/card:text-grey-700">
              {item?.isScheduleSuggestible
                ? "일정 제안 받음"
                : item?.availableDayList}
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
                {item?.dongList}
              </p>
            </div>
            <div className="text-xxs text-grey-800 group-active/card:text-white pointerhover:group-hover/card:text-white">
              {isToday(item?.itemCreatedDateTime ?? "") && "오늘 등록됨"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
