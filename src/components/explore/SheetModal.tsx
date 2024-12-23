"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import ItemCardList from "./ItemCardList";
import debounce from "debounce";
import { useSearchParams } from "next/navigation";
import useExploreStore from "@/store/exploreStore";
import clsx from "clsx";

const INITIAL_SNAP = 2;
const CONTENT_VIEW_HEIGHT = 250; // pc 화면에서 컨텐츠 한 줄 보이는 높이
const SM_CONTENT_VIEW_HEIGHT = 195; // 모바일 화면 컨텐츠 한 줄 보이는 높이
const SHEET_HEADER_HEIGHT = 48;
const SM_SHEET_HEADER_HEIGHT = 28;

export default function SheetModal() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const isSearch = useExploreStore.use.isSearch();
  const [isOpen, setOpen] = useState(false);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(INITIAL_SNAP);
  const [isSheetActive, setIsSheetActive] = useState(false);
  const sheetRef = useRef<SheetRef>(null);
  const [windowHeight, setWindowHeight] = useState<number>(1080);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const getWindowSize = debounce(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, 500);
  const snapPoints = [
    0.7,
    0.5,
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

  useEffect(() => {
    window.addEventListener("resize", getWindowSize);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, [getWindowSize]);
  useEffect(() => {
    getWindowSize();
    setTimeout(() => {
      // setOpen(type || isSearch ? true : false);
      setOpen(true);
    }, 300);
  }, [getWindowSize, isSearch, type]);

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={() => {
        snapTo(3);
      }}
      snapPoints={snapPoints}
      initialSnap={INITIAL_SNAP}
      onSnap={(index) => {
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
        }}
      >
        <div
          className={clsx(
            "group h-full rounded-t-[1.875rem] backdrop-blur-xl pointerhover:hover:bg-black/10",
            isSheetActive ? "bg-black/10" : "bg-white/30",
          )}
          onTouchStart={() => setIsSheetActive(true)}
          onTouchEnd={() => setIsSheetActive(false)}
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
                <span className="font-bold text-grey-800">
                  {isSearch ? "검색 결과" : "총"}
                </span>
                <span className="text-gresy-500 font-semibold">(20)</span>
              </div>
            </div>
          </Sheet.Header>
          <Sheet.Content>
            <Sheet.Scroller
              style={{
                height: windowHeight * snapPoints[currentSnapPoint],
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
              }}
            >
              <ItemCardList />
            </Sheet.Scroller>
          </Sheet.Content>
        </div>
      </Sheet.Container>
      {/* <Sheet.Backdrop /> */}
    </Sheet>
  );
}
