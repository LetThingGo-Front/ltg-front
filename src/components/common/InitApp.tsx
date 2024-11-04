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
    window.addEventListener("focusin", () => {
      // 키보드 열림 시 처리
      document.body.style.height = "100dvh"; // 동적 조정
    });

    window.addEventListener("focusout", () => {
      // 키보드 닫힘 시 원래 상태로 복구
      document.body.style.height = "100vh"; // 원래 값으로 복구
    });
    setupInterceptor();
    if (token) {
      utils.setStorage("accessToken", token);
      deleteCookieAccessToken();
    }
  }, []);

  return null;
}
