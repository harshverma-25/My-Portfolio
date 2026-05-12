import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import { Toaster } from "react-hot-toast";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harsh Verma | Full Stack Developer",
  description:
    "Portfolio of Harsh Verma, a Full Stack Developer specializing in scalable systems, distributed architectures, and modern web technologies.",
  keywords: ["Harsh Verma", "Full Stack Developer", "Portfolio", "Software Engineer", "India"],
  authors: [{ name: "Harsh Verma" }],
  creator: "Harsh Verma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshverma25.vercel.app",
    title: "Harsh Verma | Full Stack Developer",
    description: "Portfolio of Harsh Verma, a Full Stack Developer specializing in scalable systems and modern web technologies.",
    siteName: "Harsh Verma Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harsh Verma Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Verma | Full Stack Developer",
    description: "Portfolio of Harsh Verma, a Backend Engineer specializing in scalable systems.",
    creator: "@harshverma25",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/HV.png",
    apple: "/HV.png",
  },
  themeColor: "#09090b",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Harsh Verma",
              "url": "https://harshverma25.vercel.app",
              "jobTitle": "Full Stack Developer",
              "description": "Full Stack Developer specializing in scalable systems and modern web technologies.",
              "sameAs": [
                "https://github.com/harshverma-25",
                "https://linkedin.com/in/harshverma25",
                "https://twitter.com/harshverma25"
              ]
            })
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        <ScrollProgress />
        <Navbar />
        {children}
        <Toaster 
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        />
      </body>
    </html>
  );
}
