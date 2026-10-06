"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/* =========================================================
   TIPOS
   ========================================================= */

type CategoriaViaje =
  | "organizar"
  | "comodidad"
  | "tecnologia"
  | "hidratacion"
  | "documentos";

type Categoria = {
  id: CategoriaViaje;
  nombre: string;
  descripcion: string;
};

type Subcategoria = {
  id: string;
  nombre: string;
  imagen: string;
};

type EstiloExperiencia = CSSProperties & {
  "--progreso-1": number;
  "--progreso-2": number;
  "--progreso-3": number;
  "--progreso-4": number;
  "--progreso-5": number;
  "--progreso-cierre": number;
};

/* =========================================================
   CONFIGURACIÓN DE LA EXPERIENCIA

   INICIO_ANIMACION_PANTALLA:
   Define el punto vertical de la pantalla donde comienza
   la animación.

   0.12 = 12 % de la altura de la ventana.

   DISTANCIA_ANIMACION:
   Define cuánto scroll necesita aproximadamente toda
   la secuencia para completarse.

   0.95 = aproximadamente 95 % de la altura de la ventana.

   La categoría seleccionada es independiente del progreso:
   puede cambiarse en cualquier momento.
   ========================================================= */

const INICIO_ANIMACION_PANTALLA = 0.12;

const DISTANCIA_ANIMACION = 0.95;

/* =========================================================
   CATEGORÍAS PRINCIPALES
   ========================================================= */

const categorias: Categoria[] = [
  {
    id: "organizar",
    nombre: "Organizar",
    descripcion: "Todo en su lugar",
  },
  {
    id: "comodidad",
    nombre: "Comodidad",
    descripcion: "Disfruta el camino",
  },
  {
    id: "tecnologia",
    nombre: "Tecnología",
    descripcion: "Siempre conectado",
  },
  {
    id: "hidratacion",
    nombre: "Hidratación",
    descripcion: "Para cada recorrido",
  },
  {
    id: "documentos",
    nombre: "Documentos",
    descripcion: "Lo importante, seguro",
  },
];

/* =========================================================
   SUBCATEGORÍAS TEMPORALES

   Más adelante estos datos vendrán de PostgreSQL.

   Cada elemento representa una subcategoría del catálogo,
   utilizando una imagen representativa.
   ========================================================= */

const subcategoriasPorCategoria: Record<
  CategoriaViaje,
  Subcategoria[]
> = {
  organizar: [
    {
      id: "organizadores",
      nombre: "Organizadores",
      imagen:
        "/media/categories/viaje/productos/organizador.png",
    },
    {
      id: "neceseres",
      nombre: "Neceseres",
      imagen:
        "/media/categories/viaje/productos/neceser.png",
    },
    {
      id: "bolsas-organizadoras",
      nombre: "Bolsas organizadoras",
      imagen:
        "/media/categories/viaje/productos/bolsa-organizadora.png",
    },
    {
      id: "estuches-viaje",
      nombre: "Estuches de viaje",
      imagen:
        "/media/categories/viaje/productos/estuche-viaje.png",
    },
    {
      id: "organizacion-compacta",
      nombre: "Organización compacta",
      imagen:
        "/media/categories/viaje/productos/organizador-compacto.png",
    },
  ],

  comodidad: [
    {
      id: "almohadas-viaje",
      nombre: "Almohadas de viaje",
      imagen:
        "/media/categories/viaje/productos/almohada-viaje.png",
    },
    {
      id: "antifaces",
      nombre: "Antifaces",
      imagen:
        "/media/categories/viaje/productos/antifaz.png",
    },
    {
      id: "kits-descanso",
      nombre: "Kits de descanso",
      imagen:
        "/media/categories/viaje/productos/kit-descanso.png",
    },
    {
      id: "mantas-compactas",
      nombre: "Mantas compactas",
      imagen:
        "/media/categories/viaje/productos/manta-compacta.png",
    },
    {
      id: "accesorios-comodidad",
      nombre: "Accesorios de comodidad",
      imagen:
        "/media/categories/viaje/productos/accesorio-comodidad.png",
    },
  ],

  tecnologia: [
    {
      id: "adaptadores",
      nombre: "Adaptadores de viaje",
      imagen:
        "/media/categories/viaje/productos/adaptador.png",
    },
    {
      id: "cables",
      nombre: "Cables",
      imagen:
        "/media/categories/viaje/productos/cable.png",
    },
    {
      id: "soportes",
      nombre: "Soportes para celular",
      imagen:
        "/media/categories/viaje/productos/soporte-celular.png",
    },
    {
      id: "power-banks",
      nombre: "Power banks",
      imagen:
        "/media/categories/viaje/productos/power-bank.png",
    },
    {
      id: "organizadores-cables",
      nombre: "Organizadores de cables",
      imagen:
        "/media/categories/viaje/productos/organizador-cables.png",
    },
  ],

  hidratacion: [
    {
      id: "tomatodos",
      nombre: "Tomatodos",
      imagen:
        "/media/categories/viaje/productos/tomatodo.png",
    },
    {
      id: "botellas",
      nombre: "Botellas de viaje",
      imagen:
        "/media/categories/viaje/productos/botella.png",
    },
    {
      id: "vasos-viaje",
      nombre: "Vasos de viaje",
      imagen:
        "/media/categories/viaje/productos/vaso-viaje.png",
    },
    {
      id: "botellas-compactas",
      nombre: "Botellas compactas",
      imagen:
        "/media/categories/viaje/productos/botella-compacta.png",
    },
    {
      id: "vasos-termicos",
      nombre: "Vasos térmicos",
      imagen:
        "/media/categories/viaje/productos/vaso-termico.png",
    },
  ],

  documentos: [
    {
      id: "portapasaportes",
      nombre: "Portapasaportes",
      imagen:
        "/media/categories/viaje/productos/portapasaporte.png",
    },
    {
      id: "organizadores-documentos",
      nombre: "Organizadores de documentos",
      imagen:
        "/media/categories/viaje/productos/organizador-documentos.png",
    },
    {
      id: "billeteras-viaje",
      nombre: "Billeteras de viaje",
      imagen:
        "/media/categories/viaje/productos/billetera-viaje.png",
    },
    {
      id: "tarjeteros",
      nombre: "Tarjeteros",
      imagen:
        "/media/categories/viaje/productos/tarjetero.png",
    },
    {
      id: "estuches-documentos",
      nombre: "Estuches para documentos",
      imagen:
        "/media/categories/viaje/productos/estuche-documentos.png",
    },
  ],
};

/* =========================================================
   UTILIDADES
   ========================================================= */

function limitar(
  valor: number,
  minimo = 0,
  maximo = 1,
) {
  return Math.min(
    Math.max(valor, minimo),
    maximo,
  );
}

function calcularEtapa(
  progreso: number,
  inicio: number,
  fin: number,
) {
  if (fin <= inicio) {
    return progreso >= fin ? 1 : 0;
  }

  return limitar(
    (progreso - inicio) /
      (fin - inicio),
  );
}

/* =========================================================
   COMPONENTE
   ========================================================= */

export default function ViajeExplorador() {
  const [
    categoriaActiva,
    setCategoriaActiva,
  ] = useState<CategoriaViaje>(
    "organizar",
  );

  const [
    progresoGeneral,
    setProgresoGeneral,
  ] = useState(0);

  const recorridoRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  /* =========================================================
     DATOS ACTIVOS
     ========================================================= */

  const categoriaSeleccionada =
    categorias.find(
      (categoria) =>
        categoria.id ===
        categoriaActiva,
    ) ?? categorias[0];

  const subcategoriasActivas =
    subcategoriasPorCategoria[
      categoriaActiva
    ];

  /* =========================================================
     PROGRESO CONTROLADO POR POSICIÓN EN PANTALLA

     La animación y la categoría seleccionada funcionan
     independientemente.

     Scroll:
     controla cuánto han avanzado los elementos y la maleta.

     Categoría:
     controla qué conjunto de elementos estamos mostrando.

     Por tanto, cambiar de categoría NO reinicia el progreso.

     Scroll hacia abajo:
     progreso aumenta.

     Scroll hacia arriba:
     progreso disminuye.

     Toda la experiencia continúa siendo reversible.
     ========================================================= */

  useEffect(() => {
    let frameAnimacion:
      | number
      | null = null;

    const calcularProgreso = () => {
      const recorrido =
        recorridoRef.current;

      if (!recorrido) {
        frameAnimacion = null;
        return;
      }

      const rectangulo =
        recorrido.getBoundingClientRect();

      const altoVentana =
        window.innerHeight;

      /*
        Punto vertical de activación.

        Con 0.12:
        la referencia se encuentra aproximadamente
        al 12 % de la altura de la pantalla.
      */

      const puntoActivacion =
        altoVentana *
        INICIO_ANIMACION_PANTALLA;

      /*
        Distancia física necesaria para completar
        toda la experiencia.
      */

      const distanciaAnimacion =
        Math.max(
          altoVentana *
            DISTANCIA_ANIMACION,
          1,
        );

      /*
        Antes de cruzar el punto de activación:
        el resultado será negativo y limitar()
        lo mantendrá en 0.

        Después de cruzarlo:
        el progreso comienza a aumentar.
      */

      const desplazamientoAnimacion =
        puntoActivacion -
        rectangulo.top;

      const nuevoProgreso =
        limitar(
          desplazamientoAnimacion /
            distanciaAnimacion,
        );

      setProgresoGeneral(
        (progresoAnterior) => {
          /*
            Evitamos renders innecesarios producidos
            por diferencias microscópicas.
          */

          if (
            Math.abs(
              progresoAnterior -
                nuevoProgreso,
            ) < 0.0005
          ) {
            return progresoAnterior;
          }

          return nuevoProgreso;
        },
      );

      frameAnimacion = null;
    };

    const solicitarActualizacion =
      () => {
        if (
          frameAnimacion !== null
        ) {
          return;
        }

        frameAnimacion =
          window.requestAnimationFrame(
            calcularProgreso,
          );
      };

    calcularProgreso();

    window.addEventListener(
      "scroll",
      solicitarActualizacion,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      solicitarActualizacion,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        solicitarActualizacion,
      );

      window.removeEventListener(
        "resize",
        solicitarActualizacion,
      );

      if (
        frameAnimacion !== null
      ) {
        window.cancelAnimationFrame(
          frameAnimacion,
        );
      }
    };
  }, []);

  /* =========================================================
     LÍNEA DE TIEMPO

     0.00 → 0.08
     Pausa inicial.

     0.08 → 0.32
     Subcategoría 1 entra.

     0.18 → 0.42
     Subcategoría 2 entra.

     0.28 → 0.52
     Subcategoría 3 entra.

     0.38 → 0.62
     Subcategoría 4 entra.

     0.48 → 0.72
     Subcategoría 5 entra.

     Los movimientos se solapan para que el guardado
     se sienta continuo.

     0.72 → 0.78
     Pausa con todo guardado.

     0.78 → 0.97
     La maleta se cierra.

     0.97 → 1.00
     Maleta cerrada.

     IMPORTANTE:
     esta línea de tiempo no cambia cuando el usuario
     selecciona otra categoría.
     ========================================================= */

  const progreso1 =
    calcularEtapa(
      progresoGeneral,
      0.08,
      0.32,
    );

  const progreso2 =
    calcularEtapa(
      progresoGeneral,
      0.18,
      0.42,
    );

  const progreso3 =
    calcularEtapa(
      progresoGeneral,
      0.28,
      0.52,
    );

  const progreso4 =
    calcularEtapa(
      progresoGeneral,
      0.38,
      0.62,
    );

  const progreso5 =
    calcularEtapa(
      progresoGeneral,
      0.48,
      0.72,
    );

  /*
    El cierre empieza únicamente después de que
    el último elemento terminó de guardarse.
  */

  const progresoCierre =
    calcularEtapa(
      progresoGeneral,
      0.78,
      0.97,
    );

  const progresosSubcategorias = [
    progreso1,
    progreso2,
    progreso3,
    progreso4,
    progreso5,
  ];

  /* =========================================================
     INTERACTIVIDAD

     CAMBIO IMPORTANTE:

     Las categorías principales permanecen activas durante
     TODA la experiencia.

     Esto permite cambiar entre:

     Organizar
     Comodidad
     Tecnología
     Hidratación
     Documentos

     incluso cuando los elementos ya entraron en la maleta
     o cuando la maleta ya está cerrada.

     Los enlaces individuales de las subcategorías solo
     funcionan cuando su elemento todavía está completamente
     fuera de la maleta.

     "Ver todo" permanece siempre disponible.
     ========================================================= */

  const puedeInteractuarConSubcategorias =
    progresoGeneral < 0.08;

  /* =========================================================
     VARIABLES CSS
     ========================================================= */

  const estiloExperiencia: EstiloExperiencia =
    {
      "--progreso-1":
        progreso1,

      "--progreso-2":
        progreso2,

      "--progreso-3":
        progreso3,

      "--progreso-4":
        progreso4,

      "--progreso-5":
        progreso5,

      "--progreso-cierre":
        progresoCierre,
    };

  /* =========================================================
     TEXTO DE ESTADO
     ========================================================= */

  let textoEstado =
    "Explora lo que puedes llevar";

  if (
    progresoGeneral >= 0.08 &&
    progresoGeneral < 0.48
  ) {
    textoEstado =
      "Preparando tu maleta...";
  }

  if (
    progresoGeneral >= 0.48 &&
    progresoGeneral < 0.72
  ) {
    textoEstado =
      "Guardando lo esencial...";
  }

  if (
    progresoGeneral >= 0.72 &&
    progresoGeneral < 0.78
  ) {
    textoEstado =
      "Todo está en su lugar";
  }

  if (
    progresoGeneral >= 0.78 &&
    progresoCierre < 0.96
  ) {
    textoEstado =
      "Cerrando tu maleta...";
  }

  if (
    progresoCierre >= 0.96
  ) {
    textoEstado =
      "Listo para el camino";
  }

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <section
      id="explorar-viaje"
      className="viaje-explorador"
      aria-labelledby="viaje-explorador-titulo"
    >
      {/* ===================================================
          ENCABEZADO
      ==================================================== */}

      <header className="viaje-explorador__encabezado">
        <span className="viaje-explorador__etiqueta">
          Prepara tu viaje
        </span>

        <h2
          id="viaje-explorador-titulo"
          className="viaje-explorador__titulo"
        >
          ¿Qué necesitas para tu próxima
          aventura?
        </h2>

        <p className="viaje-explorador__descripcion">
          Explora lo esencial para cada
          momento del viaje y descubre qué
          llevar contigo.
        </p>
      </header>

      {/* ===================================================
          RECORRIDO
      ==================================================== */}

      <div
        ref={recorridoRef}
        className="viaje-explorador__recorrido"
      >
        <div
          className="viaje-explorador__experiencia"
          style={estiloExperiencia}
        >
          {/* =================================================
              CATEGORÍAS

              Permanecen disponibles durante toda
              la experiencia.
          ================================================== */}

          <nav
            className="viaje-explorador__categorias"
            aria-label="Necesidades para tu viaje"
          >
            <span className="viaje-explorador__categorias-etiqueta">
              Elige lo que necesitas
            </span>

            {categorias.map(
              (
                categoria,
                indice,
              ) => {
                const estaActiva =
                  categoria.id ===
                  categoriaActiva;

                return (
                  <button
                    key={
                      categoria.id
                    }
                    type="button"
                    className={[
                      "viaje-explorador__categoria",

                      estaActiva
                        ? "viaje-explorador__categoria--activa"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={
                      estaActiva
                    }
                    onClick={() =>
                      setCategoriaActiva(
                        categoria.id,
                      )
                    }
                  >
                    <span className="viaje-explorador__categoria-numero">
                      {String(
                        indice + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span className="viaje-explorador__categoria-contenido">
                      <span className="viaje-explorador__categoria-nombre">
                        {
                          categoria.nombre
                        }
                      </span>

                      <span className="viaje-explorador__categoria-descripcion">
                        {
                          categoria.descripcion
                        }
                      </span>
                    </span>
                  </button>
                );
              },
            )}
          </nav>

          {/* =================================================
              ZONA DE LA MALETA
          ================================================== */}

          <div className="viaje-explorador__zona-maleta">
            {/* ===============================================
                MALETA
            ================================================ */}

            <div className="viaje-explorador__maleta">
              {/* =============================================
                  MALETA ABIERTA
              ============================================== */}

              <div
                className="viaje-explorador__maleta-abierta"
                style={{
                  opacity:
                    1 -
                    progresoCierre,
                }}
              >
                <Image
                  src="/media/categories/viaje/maleta/maleta-abierta.png"
                  alt="Maleta abierta preparada para organizar accesorios de viaje"
                  fill
                  sizes="(max-width: 850px) 92vw, 720px"
                  className="viaje-explorador__maleta-imagen"
                />
              </div>

              {/* =============================================
                  MALETA CERRADA
              ============================================== */}

              <div
                className="viaje-explorador__maleta-cerrada"
                style={{
                  opacity:
                    progresoCierre,
                }}
                aria-hidden={
                  progresoCierre <
                  0.5
                }
              >
                <Image
                  src="/media/categories/viaje/maleta/maleta-cerrada.png"
                  alt=""
                  fill
                  sizes="(max-width: 850px) 72vw, 540px"
                  className="viaje-explorador__maleta-imagen"
                />
              </div>
            </div>

            {/* ===============================================
                SUBCATEGORÍAS

                Al cambiar de categoría no reiniciamos
                progresoGeneral.

                Por tanto las nuevas imágenes aparecen
                directamente en la posición correspondiente
                al scroll actual.
            ================================================ */}

            <div
              key={categoriaActiva}
              className="viaje-explorador__subcategorias"
              aria-live="polite"
            >
              {subcategoriasActivas.map(
                (
                  subcategoria,
                  indice,
                ) => {
                  const progreso =
                    progresosSubcategorias[
                      indice
                    ] ?? 0;

                  const estaGuardandose =
                    progreso > 0 &&
                    progreso < 0.98;

                  const estaGuardada =
                    progreso >= 0.98;

                  /*
                    El enlace individual funciona solamente
                    cuando todavía no comenzó el movimiento.

                    Cambiar de categoría, en cambio,
                    siempre continúa permitido.
                  */

                  const esInteractiva =
                    puedeInteractuarConSubcategorias &&
                    progreso === 0;

                  return (
                    <Link
                      key={
                        subcategoria.id
                      }
                      href={`/productos?categoria=viaje&tipo=${categoriaActiva}&subcategoria=${subcategoria.id}`}
                      className={[
                        "viaje-explorador__subcategoria",

                        `viaje-explorador__subcategoria--${
                          indice + 1
                        }`,

                        estaGuardandose
                          ? "viaje-explorador__subcategoria--guardando"
                          : "",

                        estaGuardada
                          ? "viaje-explorador__subcategoria--guardada"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-label={`Ver ${subcategoria.nombre}`}
                      tabIndex={
                        esInteractiva
                          ? 0
                          : -1
                      }
                      aria-hidden={
                        !esInteractiva
                      }
                      onClick={(
                        evento,
                      ) => {
                        if (
                          !esInteractiva
                        ) {
                          evento.preventDefault();
                        }
                      }}
                    >
                      <span className="viaje-explorador__subcategoria-imagen">
                        <Image
                          src={
                            subcategoria.imagen
                          }
                          alt=""
                          fill
                          sizes="(max-width: 620px) 82px, 145px"
                        />
                      </span>

                      <span className="viaje-explorador__subcategoria-nombre">
                        {
                          subcategoria.nombre
                        }

                        <span
                          className="viaje-explorador__subcategoria-flecha"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </span>
                    </Link>
                  );
                },
              )}
            </div>

            {/* ===============================================
                INDICADOR
            ================================================ */}

            <div
              className="viaje-explorador__indicacion"
              aria-hidden="true"
            >
              <span className="viaje-explorador__indicacion-texto">
                {textoEstado}
              </span>

              <span className="viaje-explorador__indicacion-linea">
                <span
                  className="viaje-explorador__indicacion-progreso"
                  style={{
                    transform: `scaleX(${progresoGeneral})`,
                  }}
                />
              </span>
            </div>

            {/* ===============================================
                NOTA DECORATIVA
            ================================================ */}

            <span
              className="viaje-explorador__nota"
              aria-hidden="true"
            >
              Todo cabe mejor cuando sabes qué
              llevar ♡
            </span>
          </div>

          {/* =================================================
              INFORMACIÓN DE LA CATEGORÍA
          ================================================== */}

          <aside className="viaje-explorador__detalle">
            <span className="viaje-explorador__detalle-etiqueta">
              Ahora explorando
            </span>

            <h3 className="viaje-explorador__detalle-titulo">
              {
                categoriaSeleccionada.nombre
              }
            </h3>

            <p className="viaje-explorador__detalle-descripcion">
              {
                categoriaSeleccionada.descripcion
              }
              . Explora las opciones que
              pueden acompañarte en cada
              parte del viaje.
            </p>

            {/* ===============================================
                VER TODO

                Permanece disponible incluso cuando
                la animación ya comenzó.

                El enlace siempre utiliza la categoría
                actualmente seleccionada.
            ================================================ */}

            <Link
              href={`/productos?categoria=viaje&tipo=${categoriaActiva}`}
              className="viaje-explorador__enlace"
            >
              <span>
                Ver todo
              </span>

              <span
                className="viaje-explorador__enlace-flecha"
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            {/* ===============================================
                CONTADOR
            ================================================ */}

            <div
              className="viaje-explorador__contador"
              aria-hidden="true"
            >
              <span>
                {String(
                  categorias.findIndex(
                    (categoria) =>
                      categoria.id ===
                      categoriaActiva,
                  ) + 1,
                ).padStart(
                  2,
                  "0",
                )}
              </span>

              <span className="viaje-explorador__contador-linea" />

              <span>
                {String(
                  categorias.length,
                ).padStart(
                  2,
                  "0",
                )}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}