import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";

/* =========================================================
   ESTILOS · VIAJE

   Cada sección mantiene su propio archivo de estilos
   para evitar que viaje.css termine convirtiéndose
   en un archivo demasiado grande.

   viaje.css
   → estilos generales de la categoría y portada.

   Los demás archivos corresponden a experiencias
   específicas dentro del recorrido.
   ========================================================= */

import "@/styles/viaje/viaje.css";
import "@/styles/viaje/viaje-explorador.css";
import "@/styles/viaje/viaje-descanso-colombia.css";
import "@/styles/viaje/viaje-novedades.css";
import "@/styles/viaje/viaje-antes-de-partir.css";

/* =========================================================
   METADATA · SEO / AEO / GEO

   Viaje es una categoría comercial de Kira dedicada
   a productos y accesorios relacionados con viajes.

   Las escenas de Bolivia, Colombia, Australia y otros
   lugares forman parte únicamente de la narrativa
   visual de la experiencia.

   Kira no se presenta como:

   - agencia de viajes;
   - operador turístico;
   - plataforma de reservas;
   - vendedor de destinos.

   El contenido comercial permanece enfocado en
   productos y accesorios de viaje.
   ========================================================= */

export const metadata: Metadata = {
  title: "Accesorios de Viaje | Kira",

  description:
    "Descubre accesorios de viaje para organizar tu equipaje, viajar con mayor comodidad, mantener tus dispositivos conectados y llevar lo esencial contigo.",

  keywords: [
    "accesorios de viaje",
    "productos de viaje",
    "organizadores de viaje",
    "organización de equipaje",
    "accesorios para maleta",
    "neceseres de viaje",
    "almohadas de viaje",
    "adaptadores de viaje",
    "portapasaportes",
    "tomatodos",
    "productos de viaje Bolivia",
    "accesorios de viaje Bolivia",
    "Kira",
  ],

  openGraph: {
    title: "Accesorios de Viaje | Kira",

    description:
      "Organiza tu equipaje y descubre accesorios pensados para acompañarte antes, durante y después de cada viaje.",

    type: "website",

    locale: "es_BO",

    siteName: "Kira",
  },

  twitter: {
    card: "summary_large_image",

    title: "Accesorios de Viaje | Kira",

    description:
      "Organización, comodidad, tecnología y accesorios para llevar lo esencial en tu próxima aventura.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   TIPOS
   ========================================================= */

type ViajeLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

/* =========================================================
   LAYOUT · VIAJE

   ESTRUCTURA:

   Navbar
      ↓
   Contenido de /viaje
      ↓
   Footer global

   El Navbar se mantiene disponible durante toda la
   experiencia para permitir al usuario navegar hacia
   otras áreas de Kira sin necesidad de repetir enlaces
   de categorías dentro de cada sección.

   RECORRIDO DE /viaje:

   Portada
      ↓
   Explorador + Maleta
      ↓
   Descanso Colombia
      ↓
   Novedades Australia
      ↓
   Antes de partir
      ↓
   Footer
   ========================================================= */

export default function ViajeLayout({
  children,
}: ViajeLayoutProps) {
  return (
    <div className="viaje-pagina">
      <Navbar />

      {children}
    </div>
  );
}