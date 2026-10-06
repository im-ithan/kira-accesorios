import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kira | Siempre hay algo que va contigo",
    template: "%s | Kira",
  },

  description:
    "Descubre tecnología, accesorios, artículos escolares, productos de viaje y mucho más en Kira.",

  applicationName: "Kira",

  keywords: [
    "Kira",
    "Kira Bolivia",
    "tienda online",
    "tecnología",
    "accesorios",
    "artículos escolares",
    "viaje",
    "productos",
  ],

  authors: [
    {
      name: "Kira",
    },
  ],

  creator: "Kira",

  publisher: "Kira",

  icons: {
    icon: [
      {
        url: "/media/brand/favicon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/media/brand/apple-touch-icon.png",
      },
    ],
  },

  openGraph: {
    title: "Kira | Siempre hay algo que va contigo",
    description:
      "Tecnología, accesorios, artículos escolares, productos de viaje y mucho más.",
    type: "website",
    locale: "es_BO",
    siteName: "Kira",
    images: [
      {
        url: "/media/brand/og-kira.jpg",
        width: 1200,
        height: 630,
        alt: "Kira - Siempre hay algo que va contigo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kira | Siempre hay algo que va contigo",
    description:
      "Tecnología, accesorios, artículos escolares, productos de viaje y mucho más.",
    images: ["/media/brand/og-kira.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F7F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F7F3]">
        {children}
      </body>
    </html>
  );
}