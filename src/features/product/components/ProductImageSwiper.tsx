"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/pagination";

export default function ProductImageSwiper() {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => {}}
      onSlideChange={() => {}}
    >
      <SwiperSlide>
        <Image
          src="/assets/images/sample/books.png"
          alt="책"
          width={440}
          height={474}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/images/sample/books.png"
          alt="책"
          width={440}
          height={474}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/images/sample/books.png"
          alt="책"
          width={440}
          height={474}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/images/sample/books.png"
          alt="책"
          width={440}
          height={474}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/images/sample/books.png"
          alt="책"
          width={440}
          height={474}
        />
      </SwiperSlide>
    </Swiper>
  );
}
