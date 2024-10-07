'use client';

import setupInterceptor from '@/lib/hook/setupInterceptor';
import useUserStore from '@/store/UserStore';
import React, { useEffect } from 'react';

type Props = {
  token: string | null;
};

export default function InitToken({ token }: Props) {
  const setAccessToken = useUserStore.use.setAccessToken();
  setupInterceptor();

  useEffect(() => {
    if (token) setAccessToken(token);
  }, []);

  return null;
}
