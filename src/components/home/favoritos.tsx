"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import TarjetaProducto from "@/components/productos/TarjetaProducto";

// ============================================================
// DATOS TEMPORALES
//
// Después vendrán de PostgreSQL.
//
// Prioridad:
// 1. destacado manual
// 2. más vistos
// ============================================================

const productosFavoritos = [
  {
    id: "1",
    nombre: "Producto destacado",
    precio: 199,
    imagenPrincipal: "/media/productos/cargador-ugreen.webp",
    imagenHover: "/media/productos/cargador-ugreen.webp",
    categoria: "Tecnología",
    etiqueta: "Selección Kira",
  },
  {
    id: "2",
    nombre: "Producto popular",
    precio: 149,
    imagenPrincipal: "/media/productos/mesa.webp",
    imagenHover: "/media/productos/mesa.webp",
    categoria: "Escolar",
    etiqueta: "Popular",
  },
  {
    id: "3",
    nombre: "Favorito de Kira",
    precio: 89,
    imagenPrincipal: "/media/productos/ventilador.webp",
    imagenHover: "/media/productos/ventilador.webp",
    categoria: "Viaje",
    etiqueta: "Favorito",
  },
  {
    id: "4",
    nombre: "Producto recomendado",
    precio: 129,
    imagenPrincipal: "/media/productos/organizadorropa.webp",
    imagenHover: "/media/productos/organizadorropa.webp",
    categoria: "Accesorios",
    etiqueta: "Popular",
  },
  {
    id: "5",
    nombre: "Producto especial",
    precio: 179,
    imagenPrincipal: "/media/productos/acuarela.webp",
    imagenHover: "/media/productos/acuarela.webp",
    categoria: "Tecnología",
    etiqueta: "Destacado",
  },
  {
    id: "6",
    nombre: "Otro favorito",
    precio: 109,
    imagenPrincipal: "/media/productos/powerbank.jpeg",
    imagenHover: "/media/productos/powerbank.jpeg",
    categoria: "Viaje",
    etiqueta: "Popular",
  },
];

// ============================================================
// GRUPO DE PRODUCTOS
// ============================================================

function GrupoProductos({
  oculto = false,
}: {
  oculto?: boolean;
}) {
  return (
    <div
      aria-hidden={oculto ? "true" : undefined}
      className="
        flex
        shrink-0

        gap-4
        pr-4

        lg:gap-5
        lg:pr-5
      "
    >
      {productosFavoritos.map((producto) => (
        <div
          key={producto.id}
          className="
            h-[420px]
            w-[74vw]
            max-w-[290px]
            shrink-0

            sm:h-[430px]
            sm:w-[280px]

            md:h-[440px]
            md:w-[290px]

            lg:h-[450px]
            lg:w-[300px]

            xl:h-[460px]
            xl:w-[305px]
          "
        >
          <TarjetaProducto producto={producto} />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// FAVORITOS
// ============================================================

export default function Favoritos() {
  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#F5F4EE]

        py-16

        sm:py-20

        lg:py-24
      "
    >
      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <div
        className="
          mx-auto
          mb-8
          max-w-[1500px]

          px-4

          sm:mb-10
          sm:px-6

          lg:mb-12
          lg:px-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]

                text-[#777B5D]

                sm:text-[11px]
              "
            >
              Selección Kira
            </p>

            <h2
              className="
                mt-3

                text-4xl
                font-semibold
                leading-[0.95]
                tracking-[-0.055em]

                text-[#151515]

                sm:text-5xl

                lg:text-[58px]
              "
            >
              Los favoritos de Kira
            </h2>

            <p
              className="
                mt-4
                max-w-[620px]

                text-sm
                leading-relaxed

                text-black/55

                sm:text-base
              "
            >
              Seleccionados por Kira y por lo que más
              está llamando la atención.
            </p>
          </div>

          <Link
            href="/productos"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2

              text-sm
              font-medium

              text-[#181818]

              transition-colors
              duration-300

              hover:text-[#777B5D]
            "
          >
            Ver todos

            <ArrowRight
              className="
                h-4
                w-4

                transition-transform
                duration-300

                group-hover:translate-x-1
              "
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>

      {/* =====================================================
          CARRUSEL INFINITO
      ===================================================== */}

      <div
        className="
          relative
          w-full
          overflow-hidden
        "
      >
        {/* ===================================================
            DIFUMINADO IZQUIERDO
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20

            w-8

            bg-gradient-to-r
            from-[#F5F4EE]
            to-transparent

            sm:w-12

            lg:w-16
          "
        />

        {/* ===================================================
            DIFUMINADO DERECHO
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20

            w-8

            bg-gradient-to-l
            from-[#F5F4EE]
            to-transparent

            sm:w-12

            lg:w-16
          "
        />

        {/* ===================================================
            PISTA ANIMADA
        =================================================== */}

        <div
          className="
            carrusel-favoritos
            flex
            w-max
          "
        >
          <GrupoProductos />

          <GrupoProductos oculto />
        </div>
      </div>

      {/* =====================================================
          INDICADOR
      ===================================================== */}

      <div
        className="
          mx-auto
          mt-6
          flex
          max-w-[1500px]
          items-center
          gap-3

          px-4

          sm:px-6

          lg:px-8
        "
      >
        <span
          className="
            h-px
            w-10
            bg-[#777B5D]
          "
        />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]

            text-[#777B5D]
          "
        >
          Descubre nuestros favoritos
        </span>
      </div>
    </section>
  );
}