'use client';

import useUserStore from '@/store/UserStore';
import axios from 'axios';
import React, { useEffect } from 'react';

type Props = {
  token: string | null;
};

export default function InitToken({ token }: Props) {
  const setAccessToken = useUserStore.use.setAccessToken();
  const accessToken = useUserStore.use.accessToken();

  const deleteAccessTokenCookie = async () => {
    try {
      await axios.delete('/api/token');
    } catch (error) {
      console.log(`delete accessToken Cookie fail: ${error}`);
    }
  };
  useEffect(() => {
    console.log(localStorage.getItem('user-store'));
    console.log(`storage accessToken : ${accessToken}`);
    if (token) {
      console.log(`쿠키 토큰 있음`);
      setAccessToken(token);
      deleteAccessTokenCookie();
    }
  }, []);

  return null;
}
