import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // 쿠키에서 Access Token 가져오기
  const cookies = request.headers.get('cookie') || '';

  function getCookieValue(cookieHeader: string, cookieName: string): string | undefined {
    const cookieArray = cookieHeader.split(';').map(cookie => cookie.trim());
    const cookie = cookieArray.find(cookie => cookie.startsWith(`${cookieName}=`));
    return cookie ? cookie.split('=')[1] : undefined;
  }

  // 'accessToken' 쿠키 값을 추출
  const accessToken = getCookieValue(cookies, 'accessToken');
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
