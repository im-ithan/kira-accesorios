"use client";

import { Heart, ShoppingBag } from "lucide-react";

// ============================================================
// TIPOS
// ============================================================

type Producto = {
  id: string;
  nombre: string;
  precio: number;

  imagenPrincipal: string;
  imagenHover?: string;

  categoria?: string;
  etiqueta?: string;
};

type TarjetaProductoProps = {
  producto: Producto;
};

// ============================================================
// TARJETA PRODUCTO
// ============================================================

export default function TarjetaProducto({
  producto,
}: TarjetaProductoProps) {
  return (
    <article
      className="
        group
        relative

        flex
        h-full
        w-full
        flex-col

        overflow-hidden
        rounded-[26px]

        bg-white

        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        hover:-translate-y-[2px]
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]
      "
    >
      {/* =====================================================
          ZONA VISUAL
      ===================================================== */}

      <div
        className="
          relative

          h-[260px]
          w-full
          shrink-0

          overflow-hidden

          bg-[#ECEAE2]

          sm:h-[270px]

          lg:h-[280px]
        "
      >
        {/* ===================================================
            IMAGEN PRINCIPAL
        =================================================== */}

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

            p-7

            opacity-100

            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            group-hover:scale-[1.035]
            group-hover:opacity-0

            sm:p-8
          "
        />

        {/* ===================================================
            IMAGEN HOVER
        =================================================== */}

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

              p-7

              scale-[1.025]
              opacity-0

              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]

              group-hover:scale-100
              group-hover:opacity-100

              sm:p-8
            "
          />
        )}

        {/* ===================================================
            ETIQUETA
        =================================================== */}

        {producto.etiqueta && (
          <span
            className="
              absolute
              left-4
              top-4
              z-10

              rounded-full

              bg-white/92

              px-3
              py-1.5

              text-[8px]
              font-semibold
              uppercase
              tracking-[0.16em]

              text-[#181818]

              backdrop-blur-md
            "
          >
            {producto.etiqueta}
          </span>
        )}

        {/* ===================================================
            FAVORITO
        =================================================== */}

        <button
          type="button"
          aria-label={`Agregar ${producto.nombre} a favoritos`}
          className="
            absolute
            right-4
            top-4
            z-10

            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-full

            bg-white/92

            text-[#181818]

            backdrop-blur-md

            transition-all
            duration-300

            hover:scale-105
            hover:text-[#777B5D]
          "
        >
          <Heart
            className="h-[17px] w-[17px]"
            strokeWidth={1.7}
          />
        </button>
      </div>

      {/* =====================================================
          INFORMACIÓN
      ===================================================== */}

      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col

          px-5
          pb-5
          pt-4

          sm:px-5
          sm:pb-5
          sm:pt-4
        "
      >
        {/* ===================================================
            CATEGORÍA
        =================================================== */}

        {producto.categoria && (
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]

              text-[#777B5D]
            "
          >
            {producto.categoria}
          </p>
        )}

        {/* ===================================================
            NOMBRE
        =================================================== */}

        <h3
          className="
            mt-2

            line-clamp-2

            text-[17px]
            font-semibold
            leading-[1.15]
            tracking-[-0.03em]

            text-[#181818]

            sm:text-lg
          "
        >
          {producto.nombre}
        </h3>

        {/* ===================================================
            PRECIO + CARRITO
        =================================================== */}

        <div
          className="
            mt-auto

            flex
            items-center
            justify-between
            gap-3

            pt-4
          "
        >
          <span
            className="
              whitespace-nowrap

              text-base
              font-semibold

              text-[#181818]

              sm:text-lg
            "
          >
            Bs {producto.precio}
          </span>

          <button
            type="button"
            aria-label={`Agregar ${producto.nombre} al carrito`}
            className="
              flex
              h-9
              items-center
              justify-center
              gap-2

              rounded-full

              bg-[#181818]

              px-3.5

              text-[11px]
              font-medium

              text-white

              transition-all
              duration-300

              hover:scale-[1.02]
              hover:bg-[#777B5D]

              active:scale-[0.98]
            "
          >
            <ShoppingBag
              className="h-3.5 w-3.5"
              strokeWidth={1.7}
            />

            <span className="hidden sm:inline">
              Añadir
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}