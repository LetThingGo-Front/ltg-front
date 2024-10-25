import type { Metadata, Viewport } from "next";
import "./globals.css";
import SignIn from "@/components/signin/Signin";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import localFont from "next/font/local";
import MapsProvider from "@/provider/MapsProvider";
import InitToken from "@/components/common/InitToken";
import { cookies } from "next/headers";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "렛띵고",
  description: "Let your things go 묵혀두지 말고 보내주세요. 무료 나눔 서비스",
};

export const viewport: Viewport = {
  width: "device-width", // 문자열로 설정
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};
const clientId = process.env.NAVER_MAPS_CLIENT_ID!;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const accessToken = cookieStore?.get("accessToken")?.value ?? null;
  const refreshToken = cookieStore?.get("refreshToken")?.value ?? null;

  return (
    <html lang="en">
      <MapsProvider clientId={clientId}>
        <body className={pretendard.className}>
          <SignIn />
          <Header token={refreshToken} />
          <main className="">{children}</main>
          <SideNav />
          <InitToken token={accessToken} />
        </body>
      </MapsProvider>
    </html>
  );
}
