"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import ItemCardList from "./ItemCardList";

const SNAP_POINT = [0.8, 0.28, 0.05, 0];
const INITIAL_SNAP = 1;
const Y_AXIS_RANGE = 200;

export default function SheetModal() {
  const [isOpen, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_SNAP);
  const [touchClientY, setTouchClientY] = useState({ start: 0, end: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const sheetRef = useRef<SheetRef>(null);
  const snapTo = (i: number) => sheetRef.current?.snapTo(i);
  const disableOnClose = () => {};
  const handlerSheetHeader = () => {
    console.log(currentIndex);
    if (currentIndex === 0) snapTo(2);
    if (currentIndex === 1) snapTo(0);
    if (currentIndex === 2) snapTo(1);
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
    if (yAxisRange > 0) {
      if (currentIndex === 2) {
        if (yAxisRange > Y_AXIS_RANGE) {
          snapTo(0);
        } else {
          snapTo(1);
        }
      }
      if (currentIndex === 1) snapTo(0);
    }
    if (yAxisRange < 0) {
      if (currentIndex === 0) {
        if (Math.abs(yAxisRange) > Y_AXIS_RANGE) {
          snapTo(2);
        } else {
          snapTo(1);
        }
      }
      if (currentIndex === 1) snapTo(2);
    }
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
      disableDrag={true}
      className="sm:mx-10"
      style={{ zIndex: 10 }}
    >
      <Sheet.Container
        style={{ backgroundColor: "transparent", borderRadius: "1.875rem" }}
      >
        <div
          className="h-full rounded-t-[1.875rem] bg-white/30 backdrop-blur-[60px] hover:bg-black/10"
          onTouchStart={handlerTouchStart}
          onTouchEnd={handlerTouchEnd}
        >
          <Sheet.Header>
            <button
              className="flex h-12 w-full items-center justify-center"
              onClick={handlerSheetHeader}
            >
              <span className="flex h-1 w-[17.5625rem] items-center bg-white hover:bg-green-400"></span>
            </button>
          </Sheet.Header>
          <Sheet.Content>
            <ItemCardList setIsScrolling={setIsScrolling} />
          </Sheet.Content>
        </div>
      </Sheet.Container>
      {/* <Sheet.Backdrop/> */}
    </Sheet>
  );
}
