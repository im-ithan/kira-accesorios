import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import KiraMoment from "@/components/home/KiraMoment";
import FeaturedProducts from "@/components/home/favoritos";
import DescansoKira from "@/components/home/DescansoKira";
import NewProducts from "@/components/home/nuevosproductos";

export const metadata: Metadata = {
  title: "Kira | Tecnología, accesorios, viaje y más",

  description:
    "Descubre productos de tecnología, accesorios, artículos escolares, viaje y más en Kira. Encuentra novedades, productos destacados y opciones para cada momento.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Kira | Siempre hay algo que va contigo",
    description:
      "Tecnología, accesorios, artículos escolares, viaje y mucho más en Kira.",
    url: "/",
    type: "website",
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
      "Tecnología, accesorios, artículos escolares, viaje y mucho más.",
    images: ["/media/brand/og-kira.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Categories />
        <KiraMoment />
        <FeaturedProducts />
        <DescansoKira />
        <NewProducts />
      </main>

      <Footer />
    </>
  );
}