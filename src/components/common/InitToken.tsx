'use client';

import setupInterceptor from '@/lib/setupInterceptor';
import useLoginPopupStore from '@/store/LoginStore';
import utils from '@/utils/cmmnUtil';
import React, { useEffect } from 'react';

type Props = {
  token: string | null;
};

export default function InitToken({ token }: Props) {
  useEffect(() => {
    setupInterceptor();
    if (token) {
      utils.setStorage('accessToken', token);
    }
  }, []);

  return null;
}
