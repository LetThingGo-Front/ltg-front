'use client';

import React from 'react';
import { NavermapsProvider } from 'react-naver-maps';

type Props = {
  clientId: string;
  children: React.ReactNode;
};

export default function MapsProvider({ clientId, children }: Props) {
  return <NavermapsProvider ncpClientId={clientId}>{children}</NavermapsProvider>;
}
