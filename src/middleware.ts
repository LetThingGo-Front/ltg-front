import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();
  const accessToken = cookieStore?.get('accessToken')?.value;
  // if (!accessToken) {
  //   const { pathname, search, origin, basePath } = req.nextUrl;
  //   return NextResponse.redirect(origin);
  // }

  return NextResponse.next();
}

// 예시) 토큰이 없을 경우 토큰을 요구하는 페이지 접근 시 홈화면으로 리다이렉트(임시)
export const config = {
  // matcher: ['/product'],
};
