'use client';

import ListItem from '@/components/ListItem';
import MainMap from '@/components/MainMap';
import React, { useEffect, useRef, useState } from 'react';

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileListPaddingX, setMobileListPaddingX] = useState('0px');
  // 브라우저 리스트 드래그 이벤트용
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
      const listItemWidth = 312; // Assuming each ListItem has a fixed width of 281px

      if (window.innerWidth < 768) {
        // md breakpoint
        const newPaddingX = (containerWidth - listItemWidth) / 2;
        setMobileListPaddingX(newPaddingX > 0 ? `${newPaddingX}px` : '0px');
      } else {
        setMobileListPaddingX('0px');
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <MainMap />
      <div
        className="absolute bottom-0 md:bottom-[48px] left-0 w-[100%] md:w-mainlist-responsive max-w-[1840px] h-[258px] overflow-hidden md:px-[44px] pt-[24px] pb-[36px] rounded-[30px] bg-white/50 hover:bg-black/10 backdrop-blur-sm shadow-[0_4px_30px_0_rgba(0, 0, 0, 0.20)] cursor-grab"
        id="browser-list-div"
        style={{ paddingLeft: mobileListPaddingX, paddingRight: mobileListPaddingX }}
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div className="w-[281px] h-[4px] mb-[28px] mx-[auto] bg-white hover:bg-green-400"></div>
        <div className="mb-[20px]">
          <span className="text-[20px] text-grey-800 md:ms-[80px]">검색 결과 </span>
          <span className="text-[20px] text-grey-500">(13)</span>
        </div>
        <div className="md:flex md:gap-[48px] md:ms-[80px]">
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
