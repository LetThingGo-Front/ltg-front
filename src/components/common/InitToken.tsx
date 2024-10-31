"use client";

import setupInterceptor from "@/lib/setupInterceptor";
import { CommonProps } from "@/types/common";
import utils from "@/utils/cmmnUtil";
import React, { useEffect } from "react";

export default function InitToken({ token }: CommonProps) {
  useEffect(() => {
    setupInterceptor();
    if (token) {
      utils.setStorage("accessToken", token);
    }
  }, []);

  return null;
}
