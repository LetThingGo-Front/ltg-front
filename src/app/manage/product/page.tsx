'use client';

import ListItem from '@/components/ListItem';
import MainMap from '@/components/MainMap';
import React, { useEffect, useRef, useState } from 'react';

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileListPaddingX, setMobileListPaddingX] = useState('0px');

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
      const listItemWidth = 312; // ListItem의 너비

      if (window.innerWidth < 768) {
        // md breakpoint
        const newPaddingX = (containerWidth - listItemWidth) / 2;
        setMobileListPaddingX(newPaddingX > 0 ? `${newPaddingX}px` : '0px');
      } else {
        setMobileListPaddingX('0px');
      }
      console.log(mobileListPaddingX);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <MainMap />
      <div
        className="absolute bottom-0 md:bottom-[48px] left-0 w-[100%] md:w-mainlist-responsive max-w-[1840px] h-[258px] overflow-hidden md:mx-[40px] md:px-[44px] pt-[24px] pb-[36px] rounded-[30px] bg-white/50 hover:bg-black/10 backdrop-blur-sm shadow-[0_4px_30px_0_rgba(0, 0, 0, 0.20)] cursor-grab"
        id="browser-list-div"
        style={{ paddingLeft: mobileListPaddingX, paddingRight: mobileListPaddingX }}
        ref={containerRef}
      >
        <div className="w-[281px] h-[4px] mb-[28px] mx-[auto] bg-white hover:bg-green-400"></div>
        <div>
          <span className="text-[20px] text-grey-800 md:ms-[44px]">검색 결과 </span>
          <span className="text-[20px] text-grey-500">(13)</span>
        </div>
        <div className="h-[140px] mt-[20px] mb-[36px] overflow-x-auto cursor-grab">
          <div
            className="md:grid gap-[48px] md:ms-[44px] mb-[40px]"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(312px, 1fr))` }}
          >
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
          </div>
        </div>
      </div>
    </>
  );
}
