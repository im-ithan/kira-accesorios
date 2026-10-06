import type { ReactNode } from "react";

import "@/styles/escolar/escolar.css";
import "@/styles/escolar/escolar-mesa.css";
import "@/styles/escolar/escolar-transformacion.css";
import "@/styles/escolar/escolar-explorador.css";
import "@/styles/escolar/escolar-novedades.css";

// ============================================================
// LAYOUT ESCOLAR
// ============================================================

export default function LayoutEscolar({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}