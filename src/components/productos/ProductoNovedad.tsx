"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProductoNovedadData = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenPrincipal: string;
  imagenHover?: string;
  categoria: string;
  fondo: string;
};

type ProductoNovedadProps = {
  producto: ProductoNovedadData;
  indice: number;
};

export default function ProductoNovedad({
  producto,
  indice,
}: ProductoNovedadProps) {
  const numero = String(indice + 1).padStart(2, "0");

  return (
    <article
      className="
        group
        relative
        grid
        min-h-[520px]
        overflow-hidden
        rounded-[32px]
        px-6
        py-8

        sm:px-8
        sm:py-10

        lg:grid-cols-12
        lg:px-12
        lg:py-12
      "
      style={{
        background: producto.fondo,
      }}
    >
      {/* =====================================================
          TEXTO
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          justify-between

          lg:col-span-6
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-3

              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]

              text-black/45
            "
          >
            <span>{numero}</span>

            <span className="h-px w-8 bg-black/20" />

            <span>Nuevo</span>
          </div>

          <p
            className="
              mt-7

              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]

              text-[#777B5D]
            "
          >
            {producto.categoria}
          </p>

          <h3
            className="
              mt-3
              max-w-[560px]

              text-4xl
              font-semibold
              leading-[0.95]
              tracking-[-0.055em]

              text-[#181818]

              sm:text-5xl

              lg:text-[58px]
            "
          >
            {producto.nombre}
          </h3>

          <p
            className="
              mt-5
              max-w-[470px]

              text-sm
              leading-[1.7]

              text-black/55

              sm:text-base
            "
          >
            {producto.descripcion}
          </p>
        </div>

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-6

            lg:mt-10
          "
        >
          <span
            className="
              text-xl
              font-semibold
              text-[#181818]

              sm:text-2xl
            "
          >
            Bs {producto.precio}
          </span>

          <Link
            href={`/productos/${producto.id}`}
            className="
              group/link
              inline-flex
              items-center
              gap-2

              border-b
              border-black/30

              pb-1.5

              text-sm
              font-medium

              text-[#181818]

              transition-all
              duration-300

              hover:gap-3
              hover:border-black
            "
          >
            Ver producto

            <ArrowUpRight
              className="
                h-4
                w-4

                transition-transform
                duration-300

                group-hover/link:translate-x-0.5
                group-hover/link:-translate-y-0.5
              "
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>

      {/* =====================================================
          PRODUCTO
      ===================================================== */}

      <div
        className="
          relative
          mt-10
          min-h-[280px]

          lg:col-span-6
          lg:mt-0
          lg:min-h-0
        "
      >
        {/* Imagen principal */}

        <img
          src={producto.imagenPrincipal}
          alt={producto.nombre}
          draggable={false}
          className="
            absolute
            inset-0

            h-full
            w-full

            object-contain

            p-4

            opacity-100

            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            group-hover:scale-[1.035]
            group-hover:opacity-0

            sm:p-6
          "
        />

        {/* Imagen hover */}

        {producto.imagenHover && (
          <img
            src={producto.imagenHover}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="
              absolute
              inset-0

              h-full
              w-full

              object-contain

              p-4

              scale-[1.025]
              opacity-0

              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]

              group-hover:scale-100
              group-hover:opacity-100

              sm:p-6
            "
          />
        )}
      </div>
    </article>
  );
}