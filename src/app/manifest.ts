import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harsh Verma (harshverma25) Portfolio",
    short_name: "harshverma25",
    description:
      "Official portfolio of Harsh Verma (harshverma25) — Full Stack Developer specializing in scalable backend systems and modern web technologies.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/HV.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/HV.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
