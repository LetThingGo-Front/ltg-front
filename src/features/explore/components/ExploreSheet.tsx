"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import ItemCardList from "./ItemCardList";
import debounce from "debounce";
import { useSearchParams } from "next/navigation";
import useExploreStore from "@/store/exploreStore";
import clsx from "clsx";
import { ItemSearchRequestPagination } from "@/types/item";
import { getItemList } from "@/data/itemData";

const INITIAL_SNAP = 2;
const CONTENT_VIEW_HEIGHT = 250; // pc 화면에서 컨텐츠 한 줄 보이는 높이
const SM_CONTENT_VIEW_HEIGHT = 195; // 모바일 화면 컨텐츠 한 줄 보이는 높이
const SHEET_HEADER_HEIGHT = 48;
const SM_SHEET_HEADER_HEIGHT = 28;

export type ItemListResponse = {
  itemId: number;
  itemName: string;
  dongList: string;
  availableDayList: string;
  itemThumbnailUrl: string;
  itemCreatedDateTime: string;
  itemUpdatedDateTime: string;
  isLightningAvailableToday: boolean;
  isScheduleSuggestible: boolean;
};

export default function ExploreSheet() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const isSearch = useExploreStore.use.isSearch();
  const [isOpen, setOpen] = useState(false);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(INITIAL_SNAP);
  const [isSheetActive, setIsSheetActive] = useState(false);
  const sheetRef = useRef<SheetRef>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState<number>(1080);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [itemRequest, setItemRequest] = useState<ItemSearchRequestPagination>({
    dong: "",
    categoryCode: "",
    itemStatus: "",
    dayOfWeek: "",
    page: 0,
    size: 20,
  });
  const [itemList, setItemList] = useState<ItemListResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const headerHeight = useMemo(() => {
    if (typeof window !== "undefined") {
      const rootStyle = getComputedStyle(document.documentElement);
      const safeHeight =
        parseFloat(rootStyle.getPropertyValue("--safe-area-inset-top")) || 0;
      return windowWidth > 640 ? 238 : 141 + safeHeight;
    }
    return 238;
  }, [windowWidth]);
  const snapPoints = [
    (windowHeight - headerHeight) / windowHeight,
    0.4,
    windowWidth > 640
      ? CONTENT_VIEW_HEIGHT / windowHeight
      : SM_CONTENT_VIEW_HEIGHT / windowHeight,
    windowWidth > 640
      ? SHEET_HEADER_HEIGHT / windowHeight
      : SM_SHEET_HEADER_HEIGHT / windowHeight,
  ];
  const snapTo = (i: number) => sheetRef.current?.snapTo(i);
  const handleSheetHeader = () => {
    snapTo(currentSnapPoint === 0 ? 3 : currentSnapPoint - 1);
  };

  const calculateSheetMarginBottom = () => {
    if (windowHeight > 910) {
      return "5.125rem";
    } else {
      return 0;
    }
  };

  const getItemListHandler = async () => {
    try {
      if (hasMore && itemList.length > 0) {
        setItemRequest((prev) => ({ ...prev, page: (prev.page ?? 0) + 1 }));
      }
      const data = await getItemList(itemRequest);
      setTotalCount(data?.totalElements);
      if (data.content.length > 0) {
        setItemList((prev) => [...prev, ...data.content]);
        if (scrollRef.current) {
          const { scrollTop, clientHeight } = scrollRef.current;
          scrollRef.current.scrollTop = scrollTop - clientHeight;
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(` getItemListHandler error: ${error}`);
    }
  };

  const paginationScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
        getItemListHandler();
      }
    }
  };

  const getInitialItemList = async () => {
    try {
      const data = await getItemList(itemRequest);
      if (data.content.length > 0) {
        setItemList(data.content);
        setTotalCount(data?.totalElements);
        setItemRequest((prev) => ({ ...prev, page: 1 }));
      } else {
        setHasMore(false);
      }
      setTimeout(() => {
        setOpen(true);
      }, 500);
    } catch (error) {
      console.log(` getInitialItemList error: ${error}`);
    }
  };

  const handleInfiniteScroll = () => {
    if (hasMore) {
      paginationScroll();
    }
  };

  const getInfiniteScroll = debounce(handleInfiniteScroll, 500);

  useEffect(() => {
    const getWindowSize = debounce(() => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }, 500);

    window.addEventListener("resize", getWindowSize);
    getWindowSize();
    return () => {
      window.removeEventListener("resize", getWindowSize);
      if (getWindowSize.clear) getWindowSize.clear();
    };
  }, []);

  useEffect(() => {
    getInitialItemList();
  }, []);

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={() => {
        snapTo(3);
      }}
      snapPoints={snapPoints}
      initialSnap={INITIAL_SNAP}
      onSnap={(index: number) => {
        setCurrentSnapPoint(index);
      }}
      // disableDrag={true}
      dragVelocityThreshold={50} // 50px/s 이상 속도로 드래그 시 닫힘
      dragCloseThreshold={0.1} // 화면에서 10% 이상 벗어나면 자동으로 닫힘
      className="sm:mx-10 sm:rounded-b-[1.875rem]"
      style={{
        zIndex: 10,
        marginBottom: calculateSheetMarginBottom(),
      }}
    >
      <Sheet.Container
        style={{
          backgroundColor: "transparent",
          borderRadius: "1.875rem",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px -4px 30px",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          className={clsx(
            "group h-full rounded-t-[1.875rem] pointerhover:hover:bg-black/10",
            isSheetActive ? "bg-black/10" : "bg-white/30",
          )}
        >
          <Sheet.Header className="cursor-grab">
            <div className="mb-1 flex h-7 w-full items-center justify-center sm:mb-3 sm:h-12">
              <button
                className={clsx(
                  "flex h-1 w-[9.5rem] items-center rounded-full sm:w-[17.5625rem] pointerhover:group-hover:bg-green-400",
                  isSheetActive ? "bg-green-400" : "bg-white",
                )}
                onClick={handleSheetHeader}
              ></button>
            </div>
            <div className="mb-2 flex justify-center sm:mb-5 sm:ml-6 sm:text-xl">
              <div className="flex w-[19.5rem] justify-start sm:w-full">
                <span className="font-bold text-grey-800">검색 결과</span>
                <span className="text-gresy-500 font-semibold">
                  ({totalCount})
                </span>
              </div>
            </div>
          </Sheet.Header>
          <Sheet.Content className="relative">
            <Sheet.Scroller
              ref={scrollRef}
              style={{
                height: windowHeight * snapPoints[currentSnapPoint] - 80,
                WebkitOverflowScrolling: "touch",
                overflow: "auto",
              }}
              onScroll={getInfiniteScroll}
            >
              <ItemCardList itemSearchList={itemList} />
            </Sheet.Scroller>
          </Sheet.Content>
        </div>
      </Sheet.Container>
      {/* <Sheet.Backdrop /> */}
    </Sheet>
  );
}
