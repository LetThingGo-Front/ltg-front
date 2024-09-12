import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // 쿠키에서 Access Token 가져오기
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  console.log(accessToken);
  if (!accessToken) {
    return NextResponse.json(
      {
        message: 'Access Token not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    accessToken: accessToken,
  });
}
