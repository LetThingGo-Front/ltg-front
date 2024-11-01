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
  appleWebApp: {
    capable: true,
    title: "렛띵고",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/splashscreens/iPhone_16_Pro_Max_portrait.png",
        media:
          "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_16_Pro_portrait.png",
        media:
          "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
        media:
          "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
        media:
          "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
        media:
          "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
        media:
          "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_11__iPhone_XR_portrait.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
    ],
  },
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
