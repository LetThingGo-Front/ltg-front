"use client";

import setupInterceptor from "@/lib/setupInterceptor";
import { CommonProps } from "@/types/common";
import utils from "@/common/utils/cmmnUtil";
import { useEffect } from "react";
import { axiosAuth } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function InitApp({ token }: CommonProps) {
  const router = useRouter();
  const deleteCookieAccessToken = async () => {
    await axiosAuth.delete("/v1/cookie/access-token");
  };

  useEffect(() => {
    setupInterceptor();
    if (token) {
      const redirectUrl = utils.getStorage("redirect");
      utils.setStorage("accessToken", token);
      deleteCookieAccessToken();
      if (redirectUrl) {
        utils.removeStorage("redirect");
        router.push(redirectUrl);
      }
    } else {
      utils.removeStorage("redirect");
    }
  }, []);

  return null;
}
