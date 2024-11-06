import type { Metadata, Viewport } from "next";
import "./globals.css";
import SignIn from "@/components/signin/Signin";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import localFont from "next/font/local";
import MapsProvider from "@/provider/MapsProvider";
import InitApp from "@/components/common/InitApp";
import { cookies } from "next/headers";
import ReactQueryProviders from "@/provider/ReactQueryProviders";
import splashScreens from "./splashScreens";

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
    startupImage: splashScreens,
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
            <SideNav token={refreshToken} />
            <Header token={refreshToken} />
            <main className="mt-16 h-[calc(100%-4rem)] w-full overscroll-none sm:mt-[5.625rem] sm:h-[calc(100%-5.625rem)]">
              {children}
            </main>
            <InitApp token={accessToken} />
          </MapsProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
