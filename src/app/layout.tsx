import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import AmbientBackground from "../components/AmbientBackground";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { contact } from "../data/contact";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = "https://harshverma25.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Harsh Verma (@harshverma25) | Full Stack Developer",
    template: "%s | Harsh Verma (harshverma25)",
  },
  description:
    "Official portfolio of Harsh Verma (harshverma25), a Full Stack Developer specializing in scalable backend systems, distributed architectures, and modern web applications.",
  keywords: [
    "harshverma25",
    "harshverma-25",
    "harshverma",
    "Harsh Verma",
    "harshverma25.vercel.app",
    "harshverma25 vercel",
    "Harsh Verma portfolio",
    "Harsh Verma developer",
    "Harsh Verma Full Stack",
    "harshverma25 github",
    "Full Stack Developer",
    "Software Engineer India",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
  ],
  authors: [{ name: "Harsh Verma", url: siteUrl }],
  creator: "Harsh Verma (@harshverma25)",
  publisher: "Harsh Verma",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    title: "Harsh Verma (@harshverma25) | Full Stack Developer",
    description:
      "Explore the portfolio of Harsh Verma (harshverma25) — Full Stack Developer building scalable distributed architectures and modern web apps.",
    siteName: "Harsh Verma (harshverma25) Portfolio",
    images: [
      {
        url: "/HV.png",
        width: 1200,
        height: 630,
        alt: "Harsh Verma (harshverma25) - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Verma (@harshverma25) | Full Stack Developer",
    description:
      "Portfolio of Harsh Verma (harshverma25), a Full Stack Developer specializing in scalable backend systems and modern web technologies.",
    creator: "@_harshverma08",
    site: "@_harshverma08",
    images: ["/HV.png"],
  },
  icons: {
    icon: [
      { url: "/HV.png", sizes: "any" },
      { url: "/HV.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/HV.png",
    shortcut: "/HV.png",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Portfolio",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Harsh Verma",
      alternateName: [
        "harshverma25",
        "harshverma-25",
        "harshverma",
        "harshverma616",
        "_harshverma08",
      ],
      url: siteUrl,
      image: `${siteUrl}/avatar.png`,
      jobTitle: "Full Stack Developer",
      description:
        "Full Stack Developer specializing in scalable backend systems, distributed architectures, and modern web applications.",
      sameAs: [
        contact.socials.github.url,
        contact.socials.linkedin.url,
        contact.socials.twitter.url,
      ],
      knowsAbout: [
        "Full Stack Development",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Distributed Systems",
        "System Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Harsh Verma (harshverma25) Portfolio",
      alternateName: ["harshverma25", "harshverma-25", "harshverma25.vercel.app"],
      description:
        "Official portfolio of Harsh Verma (harshverma25) — Full Stack Developer.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Harsh Verma (harshverma25) - Full Stack Developer",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#080808] text-[#f4f4f5]"
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        <AmbientBackground />
        <ScrollProgress />
        <Navbar />
        {children}
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#18181b",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
