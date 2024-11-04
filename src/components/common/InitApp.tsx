"use client";

import setupInterceptor from "@/lib/setupInterceptor";
import { CommonProps } from "@/types/common";
import utils from "@/utils/cmmnUtil";
import { useEffect } from "react";
import { axiosAuth } from "@/lib/axios";

export default function InitApp({ token }: CommonProps) {
  const deleteCookieAccessToken = async () => {
    await axiosAuth.delete("/v1/cookie/access-token");
  };
  useEffect(() => {
    // 초기 뷰포트 높이 저장
    let initialViewportHeight = window.innerHeight;

    // resize 이벤트 리스너 추가
    window.addEventListener("resize", () => {
      const currentViewportHeight = window.innerHeight;

      // 키보드가 올라왔을 때
      if (currentViewportHeight < initialViewportHeight) {
        //키보드가 올라온 상태. 뷰포트 높이
        document.body.style.height = `${currentViewportHeight}px`;
      } else {
        // 키보드가 내려간 상태. 뷰포트 높이
        document.body.style.height = "";
      }
    });
    setupInterceptor();
    if (token) {
      utils.setStorage("accessToken", token);
      deleteCookieAccessToken();
    }
  }, []);

  return null;
}
