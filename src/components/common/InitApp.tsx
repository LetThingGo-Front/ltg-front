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
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", () => {
        document.body.style.position = "fixed"; // 스크롤 막기
        document.body.style.top = `-${window.scrollY}px`; // 현재 스크롤 위치 고정
      });

      window.visualViewport.addEventListener("scroll", () => {
        // 키보드에 의해 발생하는 자동 스크롤 방지
        document.body.style.top = `-${window.scrollY}px`;
      });
    }

    // 키보드가 닫히면 스크롤 원상복구
    window.addEventListener("blur", () => {
      if (document.body.style.position === "fixed") {
        const scrollPosition = Math.abs(parseInt(document.body.style.top, 10));
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollPosition); // 원래 위치로 복구
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
