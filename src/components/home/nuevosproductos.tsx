import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProductoNovedad from "@/components/productos/ProductoNovedad";

// ============================================================
// DATOS TEMPORALES
//
// Luego vendrán de PostgreSQL ordenados por:
// fecha_publicacion DESC
// ============================================================

const novedades = [
  {
    id: "nuevo-1",
    nombre: "Audífonos inalámbricos",
    descripcion:
      "Sonido claro, diseño compacto y comodidad para acompañarte durante todo el día.",
    precio: 199,
    imagenPrincipal: "/media/productos/audifonos.webp",
    imagenHover: "/media/productos/audifonos.webp",
    categoria: "Tecnología",
    fondo: "#E9ECEF",
  },
  {
    id: "nuevo-2",
    nombre: "Mochila urbana",
    descripcion:
      "Diseñada para llevar lo esencial con comodidad, organización y estilo.",
    precio: 249,
    imagenPrincipal: "/media/productos/mochila.webp",
    imagenHover: "/media/productos/mochila.webp",
    categoria: "Viaje",
    fondo: "#EEE8DD",
  },
  {
    id: "nuevo-3",
    nombre: "Kit de papelería",
    descripcion:
      "Una selección práctica y creativa para organizar tus ideas y tu día.",
    precio: 89,
    imagenPrincipal: "/media/productos/kit-papeleria.webp",
    imagenHover: "/media/productos/kit-papeleria.webp",
    categoria: "Escolar",
    fondo: "#EEEBD9",
  },
  {
    id: "nuevo-4",
    nombre: "Organizador compacto",
    descripcion:
      "Pequeños detalles que ayudan a mantener todo en su lugar.",
    precio: 119,
    imagenPrincipal: "/media/productos/organizador.webp",
    imagenHover: "/media/productos/organizador.webp",
    categoria: "Accesorios",
    fondo: "#E8E4EA",
  },
];

// ============================================================
// NUEVOS PRODUCTOS
// ============================================================

export default function NuevosProductos() {
  return (
    <section
      className="
        w-full
        bg-[#F5F4EE]

        px-4
        py-20

        sm:px-6
        sm:py-24

        lg:px-8
        lg:py-28
      "
    >
      <div className="mx-auto max-w-[1500px]">

        {/* ===================================================
            ENCABEZADO
        =================================================== */}

        <div
          className="
            mb-12
            flex
            flex-col
            gap-6

            lg:mb-16
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
              Recién llegados
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

                lg:text-[64px]
              "
            >
              Novedades
            </h2>

            <p
              className="
                mt-5
                max-w-[560px]

                text-sm
                leading-relaxed

                text-black/55

                sm:text-base
              "
            >
              Descubre lo último que acaba de llegar a Kira.
            </p>
          </div>

          <Link
            href="/nuevos"
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
            Ver todas las novedades

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

        {/* ===================================================
            STACK
        =================================================== */}

        <div
          className="
            relative
            space-y-6

            lg:space-y-0
          "
        >
          {novedades.map((producto, index) => (
            <div
              key={producto.id}
              className="
                relative

                lg:sticky
                lg:top-[110px]

                lg:pb-8
              "
              style={{
                zIndex: index + 1,
              }}
            >
              <ProductoNovedad
                producto={producto}
                indice={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}