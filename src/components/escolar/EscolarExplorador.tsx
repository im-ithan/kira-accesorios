"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

// ============================================================
// TIPOS
// ============================================================

type IdSubcategoria =
  | "cuadernos"
  | "escritura"
  | "marcadores"
  | "utiles"
  | "geometria";

type ProductoEscolar = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  href: string;
  etiqueta?: "Nuevo" | "Favorito";
};

type SubcategoriaEscolar = {
  id: IdSubcategoria;
  nombre: string;
  descripcion: string;
  kira: string;
  productos: ProductoEscolar[];
};

// ============================================================
// DATOS MOCK
// ============================================================

const subcategorias: SubcategoriaEscolar[] = [
  {
    id: "cuadernos",
    nombre: "Cuadernos",
    descripcion:
      "Para apuntes, ideas, dibujos y todo lo que quieras guardar en papel.",
    kira: "/media/categories/escolar/mascota/kira-lapiz.png",
    productos: [
      {
        id: 1,
        nombre: "Cuaderno A5",
        precio: 25,
        imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
        href: "/productos/cuaderno-a5",
        etiqueta: "Favorito",
      },
      {
        id: 2,
        nombre: "Cuaderno creativo",
        precio: 32,
        imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
        href: "/productos/cuaderno-creativo",
      },
      {
        id: 3,
        nombre: "Cuaderno escolar",
        precio: 28,
        imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
        href: "/productos/cuaderno-escolar",
      },
      {
        id: 4,
        nombre: "Cuaderno pastel",
        precio: 30,
        imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
        href: "/productos/cuaderno-pastel",
        etiqueta: "Nuevo",
      },
      {
        id: 5,
        nombre: "Cuaderno compacto",
        precio: 22,
        imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
        href: "/productos/cuaderno-compacto",
      },
      {
        id: 6,
        nombre: "Cuaderno de notas",
        precio: 26,
        imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
        href: "/productos/cuaderno-notas",
      },
      {
        id: 7,
        nombre: "Cuaderno universitario",
        precio: 35,
        imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
        href: "/productos/cuaderno-universitario",
      },
      {
        id: 8,
        nombre: "Cuaderno mini",
        precio: 18,
        imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
        href: "/productos/cuaderno-mini",
      },
    ],
  },

  {
    id: "escritura",
    nombre: "Escritura",
    descripcion:
      "Lápices, bolígrafos y pequeños esenciales para empezar cualquier idea.",
    kira: "/media/categories/escolar/mascota/kira-lapiz.png",
    productos: [
      {
        id: 9,
        nombre: "Lápiz escolar",
        precio: 8,
        imagen: "/media/categories/escolar/portada/productos/lapiz.png",
        href: "/productos/lapiz-escolar",
        etiqueta: "Favorito",
      },
      {
        id: 10,
        nombre: "Lápiz creativo",
        precio: 10,
        imagen: "/media/categories/escolar/portada/productos/lapiz.png",
        href: "/productos/lapiz-creativo",
      },
      {
        id: 11,
        nombre: "Lápiz dibujo",
        precio: 12,
        imagen: "/media/categories/escolar/portada/productos/lapiz.png",
        href: "/productos/lapiz-dibujo",
      },
      {
        id: 12,
        nombre: "Lápiz pastel",
        precio: 9,
        imagen: "/media/categories/escolar/portada/productos/lapiz.png",
        href: "/productos/lapiz-pastel",
        etiqueta: "Nuevo",
      },
      {
        id: 13,
        nombre: "Lápiz HB",
        precio: 7,
        imagen: "/media/categories/escolar/portada/productos/lapiz.png",
        href: "/productos/lapiz-hb",
      },
      {
        id: 14,
        nombre: "Lápiz diseño",
        precio: 11,
        imagen: "/media/categories/escolar/portada/productos/lapiz.png",
        href: "/productos/lapiz-diseno",
      },
      {
        id: 15,
        nombre: "Lápiz premium",
        precio: 14,
        imagen: "/media/categories/escolar/portada/productos/lapiz.png",
        href: "/productos/lapiz-premium",
      },
      {
        id: 16,
        nombre: "Lápiz mini",
        precio: 6,
        imagen: "/media/categories/escolar/portada/productos/lapiz.png",
        href: "/productos/lapiz-mini",
      },
    ],
  },

  {
    id: "marcadores",
    nombre: "Marcadores",
    descripcion:
      "Color para estudiar, organizar y hacer que tus apuntes destaquen.",
    kira: "/media/categories/escolar/mascota/kira-lapiz.png",
    productos: [
      {
        id: 17,
        nombre: "Resaltador pastel",
        precio: 12,
        imagen: "/media/categories/escolar/portada/productos/resaltador.png",
        href: "/productos/resaltador-pastel",
        etiqueta: "Favorito",
      },
      {
        id: 18,
        nombre: "Marcador pastel",
        precio: 15,
        imagen: "/media/categories/escolar/portada/productos/resaltador.png",
        href: "/productos/marcador-pastel",
      },
      {
        id: 19,
        nombre: "Resaltador escolar",
        precio: 10,
        imagen: "/media/categories/escolar/portada/productos/resaltador.png",
        href: "/productos/resaltador-escolar",
      },
      {
        id: 20,
        nombre: "Marcador suave",
        precio: 14,
        imagen: "/media/categories/escolar/portada/productos/resaltador.png",
        href: "/productos/marcador-suave",
        etiqueta: "Nuevo",
      },
      {
        id: 21,
        nombre: "Resaltador mini",
        precio: 9,
        imagen: "/media/categories/escolar/portada/productos/resaltador.png",
        href: "/productos/resaltador-mini",
      },
      {
        id: 22,
        nombre: "Marcador creativo",
        precio: 16,
        imagen: "/media/categories/escolar/portada/productos/resaltador.png",
        href: "/productos/marcador-creativo",
      },
      {
        id: 23,
        nombre: "Marcador doble punta",
        precio: 18,
        imagen: "/media/categories/escolar/portada/productos/resaltador.png",
        href: "/productos/marcador-doble-punta",
      },
      {
        id: 24,
        nombre: "Set pastel",
        precio: 28,
        imagen: "/media/categories/escolar/portada/productos/resaltador.png",
        href: "/productos/set-pastel",
      },
    ],
  },

  {
    id: "utiles",
    nombre: "Útiles",
    descripcion:
      "Los pequeños objetos que siempre terminan haciendo falta.",
    kira: "/media/categories/escolar/mascota/kira-lapiz.png",
    productos: [
      {
        id: 25,
        nombre: "Goma divertida",
        precio: 6,
        imagen: "/media/categories/escolar/portada/productos/goma.png",
        href: "/productos/goma-divertida",
        etiqueta: "Favorito",
      },
      {
        id: 26,
        nombre: "Goma escolar",
        precio: 5,
        imagen: "/media/categories/escolar/portada/productos/goma.png",
        href: "/productos/goma-escolar",
      },
      {
        id: 27,
        nombre: "Goma pastel",
        precio: 7,
        imagen: "/media/categories/escolar/portada/productos/goma.png",
        href: "/productos/goma-pastel",
      },
      {
        id: 28,
        nombre: "Goma compacta",
        precio: 6,
        imagen: "/media/categories/escolar/portada/productos/goma.png",
        href: "/productos/goma-compacta",
        etiqueta: "Nuevo",
      },
      {
        id: 29,
        nombre: "Goma creativa",
        precio: 8,
        imagen: "/media/categories/escolar/portada/productos/goma.png",
        href: "/productos/goma-creativa",
      },
      {
        id: 30,
        nombre: "Kit de útiles",
        precio: 20,
        imagen: "/media/categories/escolar/portada/productos/goma.png",
        href: "/productos/kit-utiles",
      },
      {
        id: 31,
        nombre: "Goma mini",
        precio: 5,
        imagen: "/media/categories/escolar/portada/productos/goma.png",
        href: "/productos/goma-mini",
      },
      {
        id: 32,
        nombre: "Goma diseño",
        precio: 9,
        imagen: "/media/categories/escolar/portada/productos/goma.png",
        href: "/productos/goma-diseno",
      },
    ],
  },

  {
    id: "geometria",
    nombre: "Geometría",
    descripcion:
      "Reglas y herramientas para medir, construir y convertir ideas en formas.",
    kira: "/media/categories/escolar/mascota/kira-lapiz.png",
    productos: [
      {
        id: 33,
        nombre: "Regla escolar",
        precio: 10,
        imagen: "/media/categories/escolar/portada/productos/regla.png",
        href: "/productos/regla-escolar",
        etiqueta: "Favorito",
      },
      {
        id: 34,
        nombre: "Regla transparente",
        precio: 12,
        imagen: "/media/categories/escolar/portada/productos/regla.png",
        href: "/productos/regla-transparente",
      },
      {
        id: 35,
        nombre: "Regla creativa",
        precio: 14,
        imagen: "/media/categories/escolar/portada/productos/regla.png",
        href: "/productos/regla-creativa",
      },
      {
        id: 36,
        nombre: "Regla pastel",
        precio: 13,
        imagen: "/media/categories/escolar/portada/productos/regla.png",
        href: "/productos/regla-pastel",
        etiqueta: "Nuevo",
      },
      {
        id: 37,
        nombre: "Regla compacta",
        precio: 9,
        imagen: "/media/categories/escolar/portada/productos/regla.png",
        href: "/productos/regla-compacta",
      },
      {
        id: 38,
        nombre: "Regla de estudio",
        precio: 11,
        imagen: "/media/categories/escolar/portada/productos/regla.png",
        href: "/productos/regla-estudio",
      },
      {
        id: 39,
        nombre: "Regla flexible",
        precio: 15,
        imagen: "/media/categories/escolar/portada/productos/regla.png",
        href: "/productos/regla-flexible",
      },
      {
        id: 40,
        nombre: "Regla mini",
        precio: 8,
        imagen: "/media/categories/escolar/portada/productos/regla.png",
        href: "/productos/regla-mini",
      },
    ],
  },
];

// ============================================================
// COMPONENTE
// ============================================================

export default function EscolarExplorador() {
  const [subcategoriaActiva, setSubcategoriaActiva] =
    useState<IdSubcategoria>("cuadernos");

  const subcategoriaSeleccionada = useMemo(() => {
    return (
      subcategorias.find(
        (subcategoria) => subcategoria.id === subcategoriaActiva,
      ) ?? subcategorias[0]
    );
  }, [subcategoriaActiva]);

  // Duplicamos los productos para construir un loop visual continuo.
  // Esto es solo presentación; los productos reales siguen siendo los originales.
  const productosCarrusel = [
    ...subcategoriaSeleccionada.productos,
    ...subcategoriaSeleccionada.productos,
  ];

  return (
    <section
      className="escolar-explorador"
      aria-labelledby="titulo-escolar-explorador"
    >
      <div className="escolar-explorador-contenedor">
        {/* ====================================================
            CABECERA CORTA
        ==================================================== */}

        <header className="escolar-explorador-cabecera">
          <div>
            <p className="escolar-explorador-cabecera-etiqueta">
              Explora Escolar
            </p>

            <h2
              id="titulo-escolar-explorador"
              className="escolar-explorador-cabecera-titulo"
            >
              Encuentra lo tuyo.
            </h2>
          </div>

          <p className="escolar-explorador-cabecera-texto">
            Elige una subcategoría y descubre lo que tenemos para ti.
          </p>
        </header>

        {/* ====================================================
            SUBCATEGORÍAS
        ==================================================== */}

        <nav
          className="escolar-explorador-navegacion"
          aria-label="Subcategorías escolares"
        >
          {subcategorias.map((subcategoria) => {
            const estaActiva =
              subcategoria.id === subcategoriaActiva;

            return (
              <button
                key={subcategoria.id}
                type="button"
                className={`escolar-explorador-pestana ${
                  estaActiva
                    ? "escolar-explorador-pestana-activa"
                    : ""
                }`}
                aria-pressed={estaActiva}
                onClick={() =>
                  setSubcategoriaActiva(subcategoria.id)
                }
              >
                {subcategoria.nombre}
              </button>
            );
          })}
        </nav>

        {/* ====================================================
            ESCENA PRINCIPAL
        ==================================================== */}

        <div
          key={subcategoriaSeleccionada.id}
          className="escolar-explorador-escena"
        >
          {/* --------------------------------------------------
              INFORMACIÓN
          -------------------------------------------------- */}

          <div className="escolar-explorador-informacion">
            <p className="escolar-explorador-mini-etiqueta">
              Estás explorando
            </p>

            <h3 className="escolar-explorador-subtitulo">
              {subcategoriaSeleccionada.nombre}
            </h3>

            <p className="escolar-explorador-texto">
              {subcategoriaSeleccionada.descripcion}
            </p>

            <Link
              href={`/escolar/${subcategoriaSeleccionada.id}`}
              className="escolar-explorador-enlace"
            >
              Ver todos
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* --------------------------------------------------
              KIRA
              De momento todos usan kira-lapiz.
              Luego cambiaremos cada ruta por su imagen temática.
          -------------------------------------------------- */}

          <div
            className="escolar-explorador-kira"
            aria-hidden="true"
          >
            <div className="escolar-explorador-kira-halo" />

            <div className="escolar-explorador-kira-imagen">
              <Image
                src={subcategoriaSeleccionada.kira}
                alt=""
                fill
                sizes="(max-width: 760px) 230px, 410px"
                className="object-contain"
              />
            </div>

            <span className="escolar-explorador-kira-estrella escolar-explorador-kira-estrella-1">
              ✦
            </span>

            <span className="escolar-explorador-kira-estrella escolar-explorador-kira-estrella-2">
              ✦
            </span>
          </div>

          {/* --------------------------------------------------
              TRANSICIÓN VISUAL
          -------------------------------------------------- */}

          <div
            className="escolar-explorador-transicion"
            aria-hidden="true"
          >
            <span />
            <p>Mira algunos de nuestros favoritos</p>
            <span />
          </div>

          {/* --------------------------------------------------
              CINTA DE PRODUCTOS
          -------------------------------------------------- */}

          <div className="escolar-explorador-carrusel">
            <div className="escolar-explorador-carrusel-mascara">
              <div className="escolar-explorador-carrusel-pista">
                {productosCarrusel.map((producto, indice) => {
                  const esCopia =
                    indice >= subcategoriaSeleccionada.productos.length;

                  const indiceVisual =
                    indice % subcategoriaSeleccionada.productos.length;

                  return (
                    <Link
                      key={`${producto.id}-${indice}`}
                      href={producto.href}
                      className="escolar-explorador-producto"
                      aria-hidden={esCopia ? true : undefined}
                      tabIndex={esCopia ? -1 : undefined}
                      style={
                        {
                          "--indice-producto": indiceVisual,

                          "--rotacion-producto":
                            indiceVisual % 4 === 0
                              ? "-2deg"
                              : indiceVisual % 4 === 1
                                ? "1.5deg"
                                : indiceVisual % 4 === 2
                                  ? "-0.7deg"
                                  : "2deg",

                          "--altura-producto":
                            indiceVisual % 3 === 0
                              ? "-8px"
                              : indiceVisual % 3 === 1
                                ? "4px"
                                : "0px",
                        } as CSSProperties
                      }
                    >
                      {producto.etiqueta && (
                        <span className="escolar-explorador-producto-etiqueta">
                          {producto.etiqueta}
                        </span>
                      )}

                      <div className="escolar-explorador-producto-imagen">
                        <Image
                          src={producto.imagen}
                          alt={esCopia ? "" : producto.nombre}
                          fill
                          sizes="
                            (max-width: 520px) 42vw,
                            (max-width: 900px) 220px,
                            240px
                          "
                          className="object-contain"
                        />
                      </div>

                      <div className="escolar-explorador-producto-info">
                        <span className="escolar-explorador-producto-nombre">
                          {producto.nombre}
                        </span>

                        <strong className="escolar-explorador-producto-precio">
                          Bs {producto.precio}
                        </strong>
                      </div>

                      <span
                        className="escolar-explorador-producto-flecha"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ====================================================
              DECORACIÓN
          ==================================================== */}

          <div
            className="escolar-explorador-decoracion"
            aria-hidden="true"
          >
            <span className="escolar-explorador-forma escolar-explorador-forma-1" />
            <span className="escolar-explorador-forma escolar-explorador-forma-2" />

            <span className="escolar-explorador-punto escolar-explorador-punto-1" />
            <span className="escolar-explorador-punto escolar-explorador-punto-2" />

            <span className="escolar-explorador-trazo escolar-explorador-trazo-1" />
            <span className="escolar-explorador-trazo escolar-explorador-trazo-2" />
          </div>
        </div>
      </div>
    </section>
  );
}