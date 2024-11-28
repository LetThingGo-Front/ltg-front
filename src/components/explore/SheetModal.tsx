"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import ItemCardList from "./ItemCardList";
import debounce from "debounce";
import { isMobile } from "react-device-detect";

const INITIAL_SNAP = 1;
const CONTENT_VIEW_HEIGHT = 220;

export default function SheetModal() {
  const [isOpen, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_SNAP);

  const sheetRef = useRef<SheetRef>(null);
  const itemListRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const getWindowWidth = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 500);
  const windowHeight =
    typeof window !== "undefined" ? window.innerHeight : CONTENT_VIEW_HEIGHT;
  const snapPoints = [
    windowWidth > 640 ? 0.5 : 0.7,
    CONTENT_VIEW_HEIGHT / windowHeight,
  ];
  const snapTo = (i: number) => sheetRef.current?.snapTo(i);
  const handleSheetHeader = () => {
    if (currentIndex === 0) snapTo(1);
    if (currentIndex === 1) snapTo(0);
  };

  useEffect(() => {
    setOpen(true);
    window.addEventListener("resize", getWindowWidth);
    return () => {
      window.removeEventListener("resize", getWindowWidth);
    };
  }, [getWindowWidth]);

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
        setCurrentIndex(index);
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
            <div className="flex h-12 cursor-grab items-center justify-center">
              <button
                className="pointerhover:group-hover:bg-green-400 flex h-1 w-[9.5rem] items-center rounded-full bg-white sm:w-[17.5625rem]"
                onClick={handleSheetHeader}
              ></button>
            </div>
          </Sheet.Header>
          <Sheet.Scroller
            style={{
              height: windowHeight * snapPoints[currentIndex],
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
      </Sheet.Container>
      {/* <Sheet.Backdrop className={clsx(currentIndex === 1 && "hidden")} /> */}
    </Sheet>
  );
}
