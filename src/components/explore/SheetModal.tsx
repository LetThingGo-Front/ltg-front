"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import ItemCardList from "./ItemCardList";
import debounce from "debounce";
import { isMobile } from "react-device-detect";

const INITIAL_SNAP = 1;
const CONTENT_VIEW_HEIGHT = 250; // pc 화면에서 컨텐츠 한 줄 보이는 높이
const SM_CONTENT_VIEW_HEIGHT = 205; // 모바일 화면 컨텐츠 한 줄 보이는 높이

export default function SheetModal() {
  const [isOpen, setOpen] = useState(false);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(INITIAL_SNAP);

  const sheetRef = useRef<SheetRef>(null);
  const itemListRef = useRef<HTMLDivElement>(null);

  const [windowHeight, setWindowHeight] = useState<number>(1080);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const getWindowSize = debounce(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, 500);
  const snapPoints = [
    windowWidth > 640 ? 0.5 : 0.7,
    windowWidth > 640
      ? CONTENT_VIEW_HEIGHT / windowHeight
      : SM_CONTENT_VIEW_HEIGHT / windowHeight,
  ];
  const snapTo = (i: number) => sheetRef.current?.snapTo(i);
  const handleSheetHeader = () => {
    if (currentSnapPoint === 0) snapTo(1);
    if (currentSnapPoint === 1) snapTo(0);
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
      setOpen(true);
    }, 500);
  }, []);

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={() => {
        snapTo(1);
      }}
      snapPoints={snapPoints}
      initialSnap={INITIAL_SNAP}
      onSnap={(index) => {
        setCurrentSnapPoint(index);
      }}
      // disableDrag={true}
      dragVelocityThreshold={50} // 50px/s 이상 속도로 드래그 시 닫힘
      dragCloseThreshold={0.05} // 화면에서 5% 이상 벗어나면 자동으로 닫힘
      tweenConfig={{
        duration: 0.1,
        ease: "easeInOut",
      }}
      className="sm:mx-10"
      style={{
        zIndex: 10,
      }}
    >
      <Sheet.Container
        style={{
          backgroundColor: "transparent",
          borderRadius: "1.875rem",
        }}
      >
        <div className="pointerhover:hover:bg-black/10 group h-full rounded-t-[1.875rem] bg-white/30 backdrop-blur-xl">
          <Sheet.Header>
            <div className="mb-1 flex h-7 cursor-grab items-center justify-center sm:mb-3 sm:h-12">
              <button
                className="pointerhover:group-hover:bg-green-400 flex h-1 w-[9.5rem] items-center rounded-full bg-white sm:w-[17.5625rem]"
                onClick={handleSheetHeader}
              ></button>
            </div>
          </Sheet.Header>
          <div className="flex flex-col">
            <div className="mb-5 flex justify-center sm:ml-6 sm:text-xl">
              <div className="flex w-[19.5rem] justify-start sm:w-full">
                <span className="font-bold text-grey-800">검색 결과</span>
                <span className="font-semibold text-grey-500">(20)</span>
              </div>
            </div>
            <Sheet.Scroller
              style={{
                height: windowHeight * snapPoints[currentSnapPoint],
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
              }}
              draggableAt="both"
            >
              <Sheet.Content disableDrag={isMobile}>
                <ItemCardList itemListRef={itemListRef} />
              </Sheet.Content>
            </Sheet.Scroller>
          </div>
        </div>
      </Sheet.Container>
      {/* <Sheet.Backdrop className={clsx(currentIndex === 1 && "hidden")} /> */}
    </Sheet>
  );
}
