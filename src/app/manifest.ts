import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "렛띵고",
    short_name: "렛띵고",
    description:
      "Let your things go 묵혀두지 말고 보내주세요. 무료 나눔 서비스",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icons/icon_192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon_512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon_192.png",
        sizes: "192x192",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/icons/icon_512.png",
        sizes: "512x512",
        purpose: "maskable",
        type: "image/png",
      },
    ],
  };
}
