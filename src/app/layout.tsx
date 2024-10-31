import type { Metadata, Viewport } from "next";
import "./globals.css";
import SignIn from "@/components/signin/Signin";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import localFont from "next/font/local";
import MapsProvider from "@/provider/MapsProvider";
import InitToken from "@/components/common/InitToken";
import { cookies } from "next/headers";
import ReactQueryProviders from "@/provider/ReactQueryProviders";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "렛띵고",
  description: "Let your things go 묵혀두지 말고 보내주세요. 무료 나눔 서비스",
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/192.png' },
    { rel: 'icon', url: '/icons/192.png' },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};
const clientId = process.env.NAVER_MAPS_CLIENT_ID!;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const accessToken = cookieStore?.get("accessToken")?.value;
  const refreshToken = cookieStore?.get("refreshToken")?.value;

  return (
    <html lang="en">
      <body className={pretendard.className}>
        <ReactQueryProviders>
          <MapsProvider clientId={clientId}>
            <SignIn />
            <Header token={refreshToken} />
            <main className="">{children}</main>
            <SideNav token={refreshToken} />
            <InitToken token={accessToken} />
          </MapsProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
