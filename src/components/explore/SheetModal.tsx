"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import ItemCardList from "./ItemCardList";

const INITIAL_SNAP = 1;
const MIN_Y_AXIS_RANGE = 15;
const CONTENT_VIEW_HEIGHT = 230;

export default function SheetModal() {
  const [isOpen, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_SNAP);
  const [touchClientY, setTouchClientY] = useState({ start: 0, end: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const sheetRef = useRef<SheetRef>(null);
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 900;
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
  const snapPoints = [
    windowWidth > 640 ? 0.5 : 0.75,
    CONTENT_VIEW_HEIGHT / windowHeight,
  ];

  const snapTo = (i: number) => sheetRef.current?.snapTo(i);
  const disableOnClose = () => {};
  const handlerSheetHeader = () => {
    if (currentIndex === 0) snapTo(1);
    if (currentIndex === 1) snapTo(0);
  };
  const handlerTouchStart = (e: any) => {
    if (isScrolling) return;
    setTouchClientY({ ...touchClientY, start: e.touches[0].clientY });
  };
  const handlerTouchEnd = (e: any) => {
    if (isScrolling) return;
    setTouchClientY({ ...touchClientY, end: e.changedTouches[0].clientY });
  };

  useEffect(() => {
    setOpen(true);
    const yAxisRange = touchClientY.start - touchClientY.end;
    if (yAxisRange > MIN_Y_AXIS_RANGE) snapTo(0); // 위로 올리는 제스쳐
    if (yAxisRange < -MIN_Y_AXIS_RANGE) snapTo(1); // 아래로 내리는 제스쳐
  }, [touchClientY.end]);
  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={disableOnClose}
      snapPoints={snapPoints}
      initialSnap={INITIAL_SNAP}
      onSnap={(index) => {
        setCurrentIndex(index);
      }}
      dragVelocityThreshold={100}
      // disableDrag={true}
      tweenConfig={{
        ease: "easeInOut",
        duration: 0.2,
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
        <div
          className="pointerhover:hover:bg-black/10 group h-full rounded-t-[1.875rem] bg-white/30 backdrop-blur-xl"
          onTouchStart={handlerTouchStart}
          onTouchEnd={handlerTouchEnd}
        >
          <Sheet.Header>
            <button
              className="flex h-12 w-full items-center justify-center"
              onClick={handlerSheetHeader}
            >
              <span className="pointerhover:group-hover:bg-green-400 flex h-1 w-[9.5rem] items-center rounded-full bg-white sm:w-[17.5625rem]"></span>
            </button>
          </Sheet.Header>
          <Sheet.Content disableDrag={true}>
            <ItemCardList
              setIsScrolling={setIsScrolling}
              currentIndex={currentIndex}
              windowWidth={windowWidth}
            />
          </Sheet.Content>
        </div>
      </Sheet.Container>
      {/* <Sheet.Backdrop className={clsx(currentIndex !== 0 && "hidden")} /> */}
    </Sheet>
  );
}
