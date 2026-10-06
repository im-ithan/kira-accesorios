import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

// ============================================================
// TIPOS
// ============================================================

type ProductoNovedad = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  href: string;
  etiqueta?: string;
};

// ============================================================
// DATOS MOCK
// ============================================================

const productoPrincipal: ProductoNovedad = {
  id: 1,
  nombre: "Cuaderno creativo",
  descripcion:
    "Un nuevo formato para organizar apuntes, ideas y todo lo que quieras llevar contigo.",
  precio: 32,
  imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
  href: "/productos/cuaderno-creativo",
  etiqueta: "Recién llegado",
};

const novedades: ProductoNovedad[] = [
  {
    id: 2,
    nombre: "Resaltador pastel",
    descripcion: "Color suave para apuntes que sí dan ganas de volver a leer.",
    precio: 12,
    imagen: "/media/categories/escolar/portada/productos/resaltador.png",
    href: "/productos/resaltador-pastel",
    etiqueta: "Nuevo",
  },
  {
    id: 3,
    nombre: "Lápiz creativo",
    descripcion: "Un pequeño esencial para empezar cualquier idea.",
    precio: 10,
    imagen: "/media/categories/escolar/portada/productos/lapiz.png",
    href: "/productos/lapiz-creativo",
    etiqueta: "Nuevo",
  },
  {
    id: 4,
    nombre: "Goma divertida",
    descripcion: "Pequeña, práctica y con un diseño que destaca en el escritorio.",
    precio: 6,
    imagen: "/media/categories/escolar/portada/productos/goma.png",
    href: "/productos/goma-divertida",
  },
];

// ============================================================
// COMPONENTE
// ============================================================

export default function EscolarNovedades() {
  return (
    <section
      className="escolar-novedades"
      aria-labelledby="titulo-escolar-novedades"
    >
      <div className="escolar-novedades-contenedor">
        {/* ====================================================
            CABECERA
        ==================================================== */}

        <header className="escolar-novedades-cabecera">
          <div>
            <p className="escolar-novedades-etiqueta">
              Lo último en Kira
            </p>

            <h2
              id="titulo-escolar-novedades"
              className="escolar-novedades-titulo"
            >
              Recién llegaron.
              <span> Tal vez estabas esperando esto.</span>
            </h2>
          </div>

          <div className="escolar-novedades-cabecera-derecha">
            <p className="escolar-novedades-descripcion">
              Nuevos productos para estudiar, organizar, crear y darle
              algo distinto a tu escritorio.
            </p>

            <Link
              href="/escolar/novedades"
              className="escolar-novedades-ver-todo"
            >
              Ver todas las novedades
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        {/* ====================================================
            COMPOSICIÓN PRINCIPAL
        ==================================================== */}

        <div className="escolar-novedades-composicion">
          {/* --------------------------------------------------
              PRODUCTO PRINCIPAL
          -------------------------------------------------- */}

          <Link
            href={productoPrincipal.href}
            className="escolar-novedades-principal"
          >
            <div
              className="escolar-novedades-principal-fondo"
              aria-hidden="true"
            />

            <div className="escolar-novedades-principal-contenido">
              {productoPrincipal.etiqueta && (
                <span className="escolar-novedades-principal-etiqueta">
                  {productoPrincipal.etiqueta}
                </span>
              )}

              <h3 className="escolar-novedades-principal-nombre">
                {productoPrincipal.nombre}
              </h3>

              <p className="escolar-novedades-principal-descripcion">
                {productoPrincipal.descripcion}
              </p>

              <div className="escolar-novedades-principal-pie">
                <strong className="escolar-novedades-principal-precio">
                  Bs {productoPrincipal.precio}
                </strong>

                <span
                  className="escolar-novedades-principal-enlace"
                  aria-hidden="true"
                >
                  Ver producto
                  <span>↗</span>
                </span>
              </div>
            </div>

            <div className="escolar-novedades-principal-imagen">
              <Image
                src={productoPrincipal.imagen}
                alt={productoPrincipal.nombre}
                fill
                sizes="(max-width: 760px) 70vw, 430px"
                className="object-contain"
              />
            </div>

            <span
              className="escolar-novedades-principal-estrella escolar-novedades-principal-estrella-1"
              aria-hidden="true"
            >
              ✦
            </span>

            <span
              className="escolar-novedades-principal-estrella escolar-novedades-principal-estrella-2"
              aria-hidden="true"
            >
              ✦
            </span>
          </Link>

          {/* --------------------------------------------------
              PRODUCTOS SECUNDARIOS
          -------------------------------------------------- */}

          <div className="escolar-novedades-secundarios">
            {novedades.map((producto, indice) => (
              <Link
                key={producto.id}
                href={producto.href}
                className="escolar-novedades-producto"
                style={
                  {
                    "--indice-novedad": indice,
                    "--rotacion-novedad":
                      indice === 0
                        ? "-1.5deg"
                        : indice === 1
                          ? "1deg"
                          : "-0.5deg",
                  } as CSSProperties
                }
              >
                {producto.etiqueta && (
                  <span className="escolar-novedades-producto-etiqueta">
                    {producto.etiqueta}
                  </span>
                )}

                <div className="escolar-novedades-producto-imagen">
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    sizes="(max-width: 760px) 44vw, 240px"
                    className="object-contain"
                  />
                </div>

                <div className="escolar-novedades-producto-contenido">
                  <div>
                    <h3 className="escolar-novedades-producto-nombre">
                      {producto.nombre}
                    </h3>

                    <p className="escolar-novedades-producto-descripcion">
                      {producto.descripcion}
                    </p>
                  </div>

                  <div className="escolar-novedades-producto-pie">
                    <strong className="escolar-novedades-producto-precio">
                      Bs {producto.precio}
                    </strong>

                    <span
                      className="escolar-novedades-producto-flecha"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ====================================================
              DECORACIÓN
          ==================================================== */}

          <div
            className="escolar-novedades-decoracion"
            aria-hidden="true"
          >
            <span className="escolar-novedades-forma escolar-novedades-forma-1" />
            <span className="escolar-novedades-forma escolar-novedades-forma-2" />

            <span className="escolar-novedades-punto escolar-novedades-punto-1" />
            <span className="escolar-novedades-punto escolar-novedades-punto-2" />

            <span className="escolar-novedades-trazo escolar-novedades-trazo-1" />
            <span className="escolar-novedades-trazo escolar-novedades-trazo-2" />
          </div>
        </div>

        {/* ====================================================
            CIERRE
        ==================================================== */}

        <div className="escolar-novedades-cierre">
          <div className="escolar-novedades-cierre-linea" />

          <p>
            Y esto recién empieza.
          </p>

          <Link
            href="/escolar/productos"
            className="escolar-novedades-cierre-enlace"
          >
            Explorar todo Escolar
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}