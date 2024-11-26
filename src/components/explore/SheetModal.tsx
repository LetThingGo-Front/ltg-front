"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import ItemCardList from "./ItemCardList";
import { isMobile } from "react-device-detect";

const SNAP_POINT = [0.7, 0.28];
const INITIAL_SNAP = 1;
const MIN_Y_AXIS_RANGE = 15;

export default function SheetModal() {
  const [isOpen, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_SNAP);
  const [touchClientY, setTouchClientY] = useState({ start: 0, end: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const sheetRef = useRef<SheetRef>(null);
  const snapTo = (i: number) => sheetRef.current?.snapTo(i);
  const disableOnClose = () => {};
  const handlerSheetHeader = () => {
    if (currentIndex === 0) snapTo(1);
    if (currentIndex === 1) snapTo(0);
  };
  const handlerTouchStart = (e: any) => {
    if (isScrolling) return;
    e.preventDefault();
    setTouchClientY({ ...touchClientY, start: e.touches[0].clientY });
  };
  const handlerTouchEnd = (e: any) => {
    if (isScrolling) return;
    e.preventDefault();
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
      snapPoints={SNAP_POINT}
      initialSnap={INITIAL_SNAP}
      onSnap={(index) => {
        setCurrentIndex(index);
      }}
      dragVelocityThreshold={100}
      disableDrag={!isMobile}
      tweenConfig={{
        ease: "easeInOut",
        duration: 0.1,
      }}
      className="sm:mx-10"
      style={{ zIndex: 10 }}
    >
      <Sheet.Container
        style={{
          backgroundColor: "transparent",
          borderRadius: "1.875rem",
        }}
      >
        <div
          className="h-full rounded-t-[1.875rem] bg-black/10 backdrop-blur-[60px] hover:bg-black/10 sm:bg-white/30"
          onTouchStart={handlerTouchStart}
          onTouchEnd={handlerTouchEnd}
        >
          <Sheet.Header>
            <button
              className="flex h-12 w-full items-center justify-center"
              onClick={handlerSheetHeader}
            >
              <span className="flex h-1 w-[17.5625rem] items-center bg-white"></span>
            </button>
          </Sheet.Header>
          <Sheet.Content disableDrag={true}>
            <ItemCardList
              setIsScrolling={setIsScrolling}
              currentIndex={currentIndex}
            />
          </Sheet.Content>
        </div>
      </Sheet.Container>
      {/* <Sheet.Backdrop/> */}
    </Sheet>
  );
}
