'use client';

import useUserStore from '@/store/UserStore';
import React, { useEffect } from 'react';

type Props = {
  token: string | null;
  referer: string | null;
};

const LOGIN_REFERER_LIST = ['https://nid.naver.com/'];

export default function InitToken({ token, referer }: Props) {
  const setAccessToken = useUserStore.use.setAccessToken();

  useEffect(() => {
    console.log(`token: ${token}, referer: ${referer}`);
    // access token이 있고, referer가 로그인 페이지일 경우에만 access token을 저장
    if (token && referer && LOGIN_REFERER_LIST.includes(referer)) setAccessToken(token);
  }, []);

  return null;
}
