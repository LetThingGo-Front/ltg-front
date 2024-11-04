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
    setupInterceptor();
    if (token) {
      utils.setStorage("accessToken", token);
      deleteCookieAccessToken();
    }
  }, []);

  return null;
}
