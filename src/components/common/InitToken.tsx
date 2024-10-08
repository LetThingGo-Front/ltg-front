'use client';

import setupInterceptor from '@/lib/setupInterceptor';
import useLoginPopupStore from '@/store/LoginStore';
import utils from '@/utils/cmmnUtil';
import React, { useEffect } from 'react';

type Props = {
  token: string | null;
};

export default function InitToken({ token }: Props) {
  const setLoginStatus = useLoginPopupStore.use.actions().setLoginStatus;
  useEffect(() => {
    setupInterceptor();
    if (token) {
      utils.setStorage('accessToken', token);
      setLoginStatus(true);
    }
  }, []);

  return null;
}
