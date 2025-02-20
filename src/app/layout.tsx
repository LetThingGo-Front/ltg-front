import type { Metadata, Viewport } from "next";
import "./globals.css";
import SignIn from "@/features/signin/components/Signin";
import Header from "@/common/components/Header";
import SideNav from "@/common/components/SideNav";
import localFont from "next/font/local";
import MapsProvider from "@/provider/MapsProvider";
import InitApp from "@/common/components/InitApp";
import { cookies } from "next/headers";
import ReactQueryProviders from "@/provider/ReactQueryProviders";
import splashScreens from "./splashScreens";
import InstallAppBanner from "@/common/components/InstallAppBanner";
import SearchAddressPage from "@/features/product-register/components/SearchAddressPage";

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
            <SearchAddressPage />
            {/* <InstallAppBanner /> */}
            <SignIn />
            <SideNav token={refreshToken} />
            <Header token={refreshToken} />
            <main className="mt-16 h-[calc(100%-4rem)] w-full sm:mt-[5.625rem] sm:h-[calc(100%-5.625rem)]">
              {children}
            </main>
            <InitApp token={accessToken} />
          </MapsProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
