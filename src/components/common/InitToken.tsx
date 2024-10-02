'use client';

import useUserStore from '@/store/UserStore';
import React, { useEffect } from 'react';

type Props = {
  token: string | null;
  referer: string | null;
};

export default function InitToken({ token, referer }: Props) {
  const setAccessToken = useUserStore.use.setAccessToken();

  useEffect(() => {
    console.log(`=================== init token referer: ${referer}`);
    if (token) setAccessToken(token);
  }, []);

  return null;
}
