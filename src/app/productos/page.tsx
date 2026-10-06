"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductTabs from "@/components/productos/ProductTabs";

import { productosMock } from "@/mock/productos";

const categorias = [
  "Todos",
  "Tecnología",
  "Escolar",
  "Viaje",
  "Accesorios",
];

export default function ProductosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const productosFiltrados = useMemo(() => {
    if (categoriaActiva === "Todos") {
      return productosMock;
    }

    return productosMock.filter(
      (producto) => producto.categoria === categoriaActiva,
    );
  }, [categoriaActiva]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F7F3]">
        {/* =====================================================
            CABECERA
        ===================================================== */}

        <section
          className="
            px-5
            pb-10
            pt-32
            sm:px-8
            sm:pb-12
            lg:px-12
            lg:pb-14
            lg:pt-36
          "
        >
          <div className="mx-auto max-w-[1450px]">
            <p
              className="
                mb-4
                text-xs
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#777B5D]
              "
            >
              Catálogo Kira
            </p>

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
              <h1
                className="
                  max-w-[760px]
                  text-[42px]
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-[#181818]
                  sm:text-[56px]
                  lg:text-[72px]
                "
              >
                Encuentra algo
                <br />
                que vaya contigo.
              </h1>

              <p
                className="
                  max-w-[390px]
                  text-sm
                  leading-7
                  text-black/45
                  sm:text-[15px]
                "
              >
                Explora productos de tecnología, estudio, viaje y accesorios
                seleccionados para acompañarte en distintos momentos.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            PESTAÑAS
        ===================================================== */}

        <section className="px-5 pb-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1450px]">
            <div
              className="
                flex
                flex-col
                gap-5
                border-y
                border-black/[0.07]
                py-5
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <ProductTabs
                categorias={categorias}
                categoriaActiva={categoriaActiva}
                onChange={setCategoriaActiva}
              />

              <p className="shrink-0 text-sm text-black/40">
                {productosFiltrados.length}{" "}
                {productosFiltrados.length === 1
                  ? "producto"
                  : "productos"}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            PRODUCTOS
        ===================================================== */}

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
          <div className="mx-auto max-w-[1450px]">
            <div
              className="
                grid
                grid-cols-1
                gap-x-5
                gap-y-10
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {productosFiltrados.map((producto) => (
                <article
                  key={producto.id}
                  className="
                    group
                    animate-[fadeIn_300ms_ease-out]
                  "
                >
                  {/* IMAGEN */}

                  <div
                    className="
                      relative
                      aspect-[4/5]
                      overflow-hidden
                      rounded-[28px]
                      bg-[#ECE9DD]
                    "
                  >
                    {producto.nuevo && (
                      <span
                        className="
                          absolute
                          left-4
                          top-4
                          z-10
                          rounded-full
                          bg-[#181818]
                          px-3
                          py-1.5
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-white
                        "
                      >
                        Nuevo
                      </span>
                    )}

                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="
                        object-contain
                        p-8
                        transition-transform
                        duration-700
                        group-hover:scale-[1.04]
                      "
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        (max-width: 1280px) 33vw,
                        25vw
                      "
                    />
                  </div>

                  {/* INFORMACIÓN */}

                  <div className="px-1 pt-5">
                    <div
                      className="
                        mb-2
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <p
                        className="
                          text-[11px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-[#777B5D]
                        "
                      >
                        {producto.categoria}
                      </p>

                      <p className="text-sm font-semibold text-[#181818]">
                        Bs {producto.precio}
                      </p>
                    </div>

                    <h2
                      className="
                        text-[19px]
                        font-semibold
                        tracking-[-0.025em]
                        text-[#181818]
                      "
                    >
                      {producto.nombre}
                    </h2>

                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-sm
                        leading-6
                        text-black/45
                      "
                    >
                      {producto.descripcion}
                    </p>

                    <button
                      type="button"
                      className="
                        mt-5
                        inline-flex
                        items-center
                        rounded-full
                        border
                        border-black/10
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-[#181818]
                        transition
                        duration-300
                        hover:border-[#777B5D]
                        hover:bg-[#777B5D]
                        hover:text-white
                      "
                    >
                      Ver producto
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* POR SI NO EXISTIERAN PRODUCTOS */}

            {productosFiltrados.length === 0 && (
              <div
                className="
                  flex
                  min-h-[320px]
                  items-center
                  justify-center
                  rounded-[28px]
                  bg-[#ECE9DD]/50
                  text-center
                "
              >
                <div>
                  <p
                    className="
                      text-xl
                      font-semibold
                      tracking-[-0.03em]
                      text-[#181818]
                    "
                  >
                    No encontramos productos.
                  </p>

                  <p className="mt-2 text-sm text-black/45">
                    Prueba seleccionando otra categoría.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}