import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const handler = async (request: NextRequest) => {
  if (request.method === 'DELETE') {
    cookies().delete('accessToken');
    return NextResponse.json({ status: 'success', data: {} });
  } else {
    // 쿠키 확인 테스트 용도
    cookies().set(
      'accessToken',
      'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MzQsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3Mjc0MDAxNDYsImV4cCI6MTcyNzQwMDIwNn0.N0yCTzxGuzP8RUMBnFsGyRfot_tEMN6jRQXzDksEJFk',
    );
    return NextResponse.json({ status: 'success', data: {} });
  }
};

export { handler as POST, handler as DELETE };
