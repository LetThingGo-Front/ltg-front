'use client';

import ListItem from '@/components/ListItem';
import MainMap from '@/components/MainMap';
import React, { useEffect, useRef, useState } from 'react';

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileListPaddingX, setMobileListPaddingX] = useState('0px');
  const [isExpanded, setIsExpanded] = useState(false);

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
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExpandClick = () => {
    setIsExpanded(prev => !prev); // 클릭 시 높이를 토글
  };

  return (
    <>
      <MainMap />
      <div
        className="absolute bottom-0 md:bottom-[48px] left-0 w-[100%] 
        md:w-mainlist-responsive max-w-[1840px]  duration-500 overflow-auto md:mx-[40px] md:px-[44px] pt-[24px] pb-[36px] rounded-[30px] bg-white/50 hover:bg-black/10 backdrop-blur-sm shadow-[0_4px_30px_0_rgba(0, 0, 0, 0.20)]"
        id="browser-list-div"
        style={{
          paddingLeft: mobileListPaddingX,
          paddingRight: mobileListPaddingX,
          height: isExpanded ? '765px' : '258px', // 상태에 따라 높이 변경
          transition: 'height 0.5s ease',
        }}
        ref={containerRef}
      >
        <div
          className="w-[281px] h-[4px] mb-[28px] mx-[auto] bg-white hover:bg-green-400"
          onClick={handleExpandClick}
        ></div>
        <div>
          <span className="text-[20px] text-grey-800 md:ms-[44px]">검색 결과 </span>
          <span className="text-[20px] text-grey-500">(13)</span>
        </div>
        <div
          className={`h-full mt-[20px] mb-[36px] ${isExpanded ? 'overflow-y-auto' : 'overflow-x-auto'} cursor-grab`}
          style={{ maxHeight: isExpanded ? 'calc(100% - 100px)' : 'none' }} // 스크롤 가능한 영역의 최대 높이 설정
        >
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
