import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const cookies = req.cookies;
  const accessToken = cookies.get("accessToken")?.value;
  console.log(accessToken);
  if (accessToken) {
    const { origin, basePath } = req.nextUrl;
    const registerUrl = new URL(`${basePath}/product/register`, origin);
    return NextResponse.redirect(registerUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
