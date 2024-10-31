'use client';

import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import MainMap from '@/components/MainMap';
import React, { useRef, useState } from 'react';

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (containerRef.current) {
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <>
      <Header />
      <MainMap />
      <div
        className="absolute bottom-0 md:bottom-[48px] left-0 md:w-mainlist-responsive max-w-[1840px] h-[258px] mx-0 md:mx-[40px] overflow-hidden px-[44px] pt-[24px] pb-[36px] rounded-[30px] bg-white/50 backdrop-blur-sm shadow-[0_4px_30px_0_rgba(0, 0, 0, 0.20)] cursor-grab"
        id="browser-list-div"
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div className="w-[281px] h-[4px] mb-[28px] mx-[auto] bg-white"></div>
        <div className="mb-[20px]">
          <span className="text-[20px] text-grey-800">검색 결과 </span>
          <span className="text-[20px] text-grey-500">(13)</span>
        </div>
        <div className="flex gap-[48px]">
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </div>
      </div>
    </>
  );
}
