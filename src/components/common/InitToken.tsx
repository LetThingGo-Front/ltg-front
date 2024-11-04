"use client";

import setupInterceptor from "@/lib/setupInterceptor";
import { CommonProps } from "@/types/common";
import utils from "@/utils/cmmnUtil";
import { useEffect } from "react";
import { axiosAuth } from "@/lib/axios";

export default function InitToken({ token }: CommonProps) {
  const deleteCookieAccessToken = async () => {
    if (token) {
      await axiosAuth.post("/v1/cookie/access-token");
    }
  };
  useEffect(() => {
    setupInterceptor();
    utils.setStorage("accessToken", token);
    deleteCookieAccessToken();
  }, []);

  return null;
}
