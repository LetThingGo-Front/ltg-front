import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, res: NextResponse) {
  // const { pathname, search, origin, basePath } = req.nextUrl;
  // const homeUrl = new URL(`${basePath}/`, origin);
  // return NextResponse.redirect(homeUrl);

  return NextResponse.next();
}

export const config = {
  //   matcher: ['/'],
};
