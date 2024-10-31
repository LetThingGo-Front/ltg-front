import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "렛띵고",
    short_name: "렛띵고",
    description:
      "Let your things go 묵혀두지 말고 보내주세요. 무료 나눔 서비스",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/icons/48.png",
        sizes: "48x48",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/icons/72.png",
        sizes: "72x72",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/icons/92.png",
        sizes: "92x92",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/icons/144.png",
        sizes: "144x144",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/icons/192.png",
        sizes: "192x192",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/icons/256.png",
        sizes: "256x256",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/icons/512.png",
        sizes: "512x512",
        purpose: "maskable",
        type: "image/png",
      },
    ],
  };
}
