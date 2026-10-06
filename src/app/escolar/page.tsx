import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import EscolarSelva from "@/components/escolar/EscolarSelva";
import EscolarPortada from "@/components/escolar/EscolarPortada";
import EscolarExplorador from "@/components/escolar/EscolarExplorador";
import EscolarMesaInteractiva from "@/components/escolar/EscolarMesaInteractiva";
import EscolarTransformacionKira from "@/components/escolar/EscolarTransformacionKira";
import EscolarNovedades from "@/components/escolar/EscolarNovedades";

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: "Productos escolares",

  description:
    "Descubre lápices, bolígrafos, cuadernos, gomas, tajadores, organización y productos escolares para estudiar, crear y trabajar en Kira.",

  openGraph: {
    title: "Kira Escolar | Productos para estudiar, crear y organizar",
    description:
      "Descubre productos escolares, papelería, organización y pequeños esenciales para acompañar tus ideas todos los días.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kira Escolar | Productos para estudiar, crear y organizar",
    description:
      "Papelería, organización y productos escolares para estudiar, crear y trabajar.",
  },
};

// ============================================================
// PÁGINA ESCOLAR
// ============================================================

export default function PaginaEscolar() {
  return (
    <>
      {/* =====================================================
          NAVEGACIÓN PRINCIPAL
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          UNIVERSO ESCOLAR
      ===================================================== */}

      <EscolarSelva>
        <main className="min-h-screen bg-[#F4F0DF]">
          {/* =================================================
              PORTADA ESCOLAR
          ================================================= */}

          <EscolarPortada />

          {/* =================================================
              EXPLORADOR ESCOLAR
          ================================================= */}

          <EscolarExplorador />

          {/* =================================================
              MESA INTERACTIVA
          ================================================= */}

          <EscolarMesaInteractiva />

          {/* =================================================
              TRANSFORMACIÓN DE KIRA
          ================================================= */}

          <EscolarTransformacionKira />

          {/* =================================================
              NOVEDADES
          ================================================= */}

          <EscolarNovedades />
        </main>
      </EscolarSelva>

      {/* =====================================================
          PIE DE PÁGINA
      ===================================================== */}

      <Footer />
    </>
  );
}