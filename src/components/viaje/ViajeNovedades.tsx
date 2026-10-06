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
   KIRA — VIAJE
   NOVEDADES · AUSTRALIA

   EXPERIENCIA:

   1. El usuario entra en Australia.
   2. Aparece suavemente el encabezado.
   3. Kira entra conduciendo desde la izquierda.
   4. Kira atraviesa la carretera sin detenerse.
   5. Cada producto aparece DESPUÉS de que Kira
      pasa por su zona.
   6. Kira continúa hasta salir por la derecha.
   7. Los productos permanecen visibles.

   La secuencia depende completamente del scroll.

   Si el usuario baja:
   → la historia avanza.

   Si el usuario sube:
   → la historia se reproduce al revés.
   ========================================================= */


/* =========================================================
   1. TIPOS
   ========================================================= */

type NovedadViaje = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  enlace: string;
};


type VariablesProducto =
  CSSProperties & {
    "--progreso-producto": number;
  };


type EstiloNovedades =
  CSSProperties & {
    "--progreso-general": number;
    "--progreso-carro": number;
    "--progreso-producto-1": number;
    "--progreso-producto-2": number;
    "--progreso-producto-3": number;
    "--progreso-contenido": number;
  };


/* =========================================================
   2. CONFIGURACIÓN GENERAL

   INICIO_ANIMACION_PANTALLA

   0.92 significa que la experiencia empieza cuando
   la parte superior de la sección se aproxima al 92 %
   de la altura visible de la pantalla.

   Esto permite que Kira todavía no haya recorrido media
   escena cuando Australia recién aparece.

   DISTANCIA_ANIMACION

   Controla cuánto scroll necesita el usuario para completar
   toda la secuencia.

   Un valor de 1.45 permite ver claramente:
   - entrada;
   - recorrido;
   - productos;
   - salida.
   ========================================================= */

const INICIO_ANIMACION_PANTALLA = 1.6;

const DISTANCIA_ANIMACION = 1.95;


/* =========================================================
   3. PRODUCTOS TEMPORALES

   Posteriormente estos datos vendrán desde PostgreSQL.

   Por ahora funcionan como datos mock para construir
   correctamente la experiencia visual.
   ========================================================= */

const novedades: NovedadViaje[] = [
  {
    id: "organizador-viaje",

    nombre:
      "Organizador de viaje",

    descripcion:
      "Más orden, menos espacio desperdiciado.",

    precio: 89,

    imagen:
      "/media/categories/viaje/productos/organizador.png",

    enlace:
      "/productos?categoria=viaje&producto=organizador-viaje",
  },

  {
    id: "adaptador-viaje",

    nombre:
      "Adaptador de viaje",

    descripcion:
      "Conecta lo esencial donde estés.",

    precio: 119,

    imagen:
      "/media/categories/viaje/productos/adaptador.png",

    enlace:
      "/productos?categoria=viaje&producto=adaptador-viaje",
  },

  {
    id: "portapasaporte",

    nombre:
      "Portapasaporte",

    descripcion:
      "Tus documentos siempre a mano.",

    precio: 69,

    imagen:
      "/media/categories/viaje/productos/portapasaporte.png",

    enlace:
      "/productos?categoria=viaje&producto=portapasaporte",
  },
];


/* =========================================================
   4. UTILIDADES
   ========================================================= */

/*
   Evita que cualquier progreso pueda ser:

   menor que 0
   o
   mayor que 1.
*/

function limitar(
  valor: number,
  minimo = 0,
  maximo = 1,
) {
  return Math.min(
    Math.max(
      valor,
      minimo,
    ),
    maximo,
  );
}


/*
   Convierte una parte del progreso general en un
   progreso independiente entre 0 y 1.

   Ejemplo:

   calcularEtapa(
     progresoGeneral,
     0.28,
     0.40
   )

   significa:

   antes de 0.28 → 0
   entre 0.28 y 0.40 → animación
   después de 0.40 → 1
*/

function calcularEtapa(
  progreso: number,
  inicio: number,
  fin: number,
) {
  if (fin <= inicio) {
    return progreso >= fin
      ? 1
      : 0;
  }

  return limitar(
    (progreso - inicio) /
      (fin - inicio),
  );
}


/* =========================================================
   5. COMPONENTE
   ========================================================= */

export default function ViajeNovedades() {
  const seccionRef =
    useRef<HTMLElement | null>(
      null,
    );


  const [
    progresoGeneral,
    setProgresoGeneral,
  ] = useState(0);


  /* =========================================================
     6. CONTROL DEL SCROLL

     No existe temporizador.

     Todo depende de la posición real de la sección
     respecto a la ventana.

     Esto permite que:

     ↓ scroll
     avance.

     ↑ scroll
     retroceda.

     requestAnimationFrame evita ejecutar cálculos
     innecesarios demasiadas veces por segundo.
     ========================================================= */

  useEffect(() => {
    let frameAnimacion:
      | number
      | null = null;


    const calcularProgreso = () => {
      const seccion =
        seccionRef.current;


      if (!seccion) {
        frameAnimacion = null;

        return;
      }


      const rectangulo =
        seccion.getBoundingClientRect();


      const altoVentana =
        window.innerHeight;


      const puntoActivacion =
        altoVentana *
        INICIO_ANIMACION_PANTALLA;


      const distanciaAnimacion =
        Math.max(
          altoVentana *
            DISTANCIA_ANIMACION,

          1,
        );


      const desplazamiento =
        puntoActivacion -
        rectangulo.top;


      const nuevoProgreso =
        limitar(
          desplazamiento /
            distanciaAnimacion,
        );


      setProgresoGeneral(
        (
          progresoAnterior,
        ) => {
          /*
             Evitamos renderizados cuando la diferencia
             visual es prácticamente imperceptible.
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


    /*
       Calculamos una vez al montar el componente.

       Así funciona correctamente incluso si el usuario
       recarga la página estando a mitad del scroll.
    */

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
     7. LÍNEA DE TIEMPO

     ---------------------------------------------------------
     0.00
     ---------------------------------------------------------

     Aparece Australia.

     Todavía no hay productos.


     ---------------------------------------------------------
     0.04 → 0.20
     ---------------------------------------------------------

     Aparece suavemente el encabezado:

     "Recién llegados"


     ---------------------------------------------------------
     0.08 → 0.82
     ---------------------------------------------------------

     Kira atraviesa TODA la carretera.

     No se detiene.


     ---------------------------------------------------------
     0.28 → 0.40
     ---------------------------------------------------------

     Kira ya pasó por la primera zona.

     Aparece PRODUCTO 1.


     ---------------------------------------------------------
     0.43 → 0.55
     ---------------------------------------------------------

     Kira continúa avanzando.

     Aparece PRODUCTO 2.


     ---------------------------------------------------------
     0.58 → 0.70
     ---------------------------------------------------------

     Kira pasa por la última zona.

     Aparece PRODUCTO 3.


     ---------------------------------------------------------
     0.70 → 0.82
     ---------------------------------------------------------

     Los tres productos ya están visibles.

     Kira continúa hacia la derecha.


     ---------------------------------------------------------
     0.82 → 1.00
     ---------------------------------------------------------

     Kira ya salió.

     Permanecen:

     - Australia
     - encabezado
     - producto 1
     - producto 2
     - producto 3

     De esta forma el vehículo funciona como un
     "revelador" visual de las novedades.
     ========================================================= */


  /* ---------------------------------------------------------
     ENCABEZADO
     --------------------------------------------------------- */

  const progresoContenido =
    calcularEtapa(
      progresoGeneral,
      0.04,
      0.20,
    );


  /* ---------------------------------------------------------
     CARRO

     Un único movimiento continuo.

     No existe pausa artificial.
     --------------------------------------------------------- */

  const progresoCarro =
    calcularEtapa(
      progresoGeneral,
      0.08,
      0.82,
    );


  /* ---------------------------------------------------------
     PRODUCTO 1

     Aparece después de que Kira pasa por su zona.
     --------------------------------------------------------- */

  const progresoProducto1 =
    calcularEtapa(
      progresoGeneral,
      0.28,
      0.40,
    );


  /* ---------------------------------------------------------
     PRODUCTO 2
     --------------------------------------------------------- */

  const progresoProducto2 =
    calcularEtapa(
      progresoGeneral,
      0.43,
      0.55,
    );


  /* ---------------------------------------------------------
     PRODUCTO 3
     --------------------------------------------------------- */

  const progresoProducto3 =
    calcularEtapa(
      progresoGeneral,
      0.58,
      0.70,
    );


  /* =========================================================
     8. VARIABLES CSS

     React calcula el estado.

     CSS se encarga exclusivamente de representarlo.

     Esto mantiene separadas:

     lógica
     ↓
     presentación
     ========================================================= */

  const estiloNovedades:
    EstiloNovedades = {
      "--progreso-general":
        progresoGeneral,

      "--progreso-carro":
        progresoCarro,

      "--progreso-producto-1":
        progresoProducto1,

      "--progreso-producto-2":
        progresoProducto2,

      "--progreso-producto-3":
        progresoProducto3,

      "--progreso-contenido":
        progresoContenido,
    };


  const progresosProductos = [
    progresoProducto1,
    progresoProducto2,
    progresoProducto3,
  ];


  /* =========================================================
     9. RENDER
     ========================================================= */

  return (
    <section
      ref={seccionRef}
      className="viaje-novedades"
      aria-labelledby="viaje-novedades-titulo"
      style={estiloNovedades}
    >

      {/* ===================================================
          ESCENA AUSTRALIA
      ==================================================== */}

      <div className="viaje-novedades__escena">

        {/* ===============================================
            PAISAJE

            Es decorativo porque el contenido semántico
            de la sección está en el encabezado y los
            productos.
        ================================================ */}

        <Image
          src="/media/categories/viaje/novedades/australia.webp"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="viaje-novedades__paisaje"
        />


        {/* ===============================================
            CAPA AMBIENTAL
        ================================================ */}

        <div
          className="viaje-novedades__ambiente"
          aria-hidden="true"
        />


        {/* ===============================================
            ENCABEZADO

            Australia no se vende como destino.

            Simplemente funciona como escenario visual
            de la experiencia de Kira.
        ================================================ */}

        <header className="viaje-novedades__encabezado">
          <span className="viaje-novedades__etiqueta">
            Recién llegados
          </span>


          <h2
            id="viaje-novedades-titulo"
            className="viaje-novedades__titulo"
          >
            Nuevos compañeros

            <span>
              {" "}
              para tu próxima aventura.
            </span>
          </h2>


          <p className="viaje-novedades__descripcion">
            Descubre lo nuevo que puede
            acompañarte en el camino.
            
          </p>
        </header>


        {/* ===============================================
            PRODUCTOS

            La aparición de cada producto está
            sincronizada con la posición de Kira.

            El producto no aparece delante del carro.

            Kira pasa primero.

            Después aparece la novedad.
        ================================================ */}

        <div className="viaje-novedades__productos">
          {novedades.map(
            (
              producto,
              indice,
            ) => {
              const progreso =
                progresosProductos[
                  indice
                ] ?? 0;


              const estiloProducto:
                VariablesProducto = {
                  "--progreso-producto":
                    progreso,
                };


              return (
                <article
                  key={
                    producto.id
                  }
                  className={[
                    "viaje-novedades__producto",

                    `viaje-novedades__producto--${
                      indice + 1
                    }`,
                  ].join(" ")}
                  style={
                    estiloProducto
                  }
                >
                  <Link
                    href={
                      producto.enlace
                    }
                    className="viaje-novedades__producto-enlace"
                    aria-label={`Ver ${producto.nombre}`}
                  >
                    {/* ===================================
                        VISUAL
                    ==================================== */}

                    <div className="viaje-novedades__producto-visual">
                      <Image
                        src={
                          producto.imagen
                        }
                        alt={
                          producto.nombre
                        }
                        fill
                        sizes="(max-width: 620px) 34vw, (max-width: 850px) 27vw, 245px"
                        className="viaje-novedades__producto-imagen"
                      />
                    </div>


                    {/* ===================================
                        INFORMACIÓN
                    ==================================== */}

                    <div className="viaje-novedades__producto-informacion">
                      <h3 className="viaje-novedades__producto-nombre">
                        {
                          producto.nombre
                        }
                      </h3>


                      <p className="viaje-novedades__producto-descripcion">
                        {
                          producto.descripcion
                        }
                      </p>


                      <span className="viaje-novedades__producto-precio">
                        Bs{" "}
                        {
                          producto.precio
                        }
                      </span>
                    </div>
                  </Link>
                </article>
              );
            },
          )}
        </div>


        {/* ===============================================
            CARRO DE KIRA

            El carro tiene un z-index superior al de
            los productos.

            Por eso visualmente ocurre:

            carro
              ↓
            pasa por delante
              ↓
            producto aparece detrás

            Esto ayuda a crear la ilusión de que Kira
            está revelando las novedades.
        ================================================ */}

        <div
          className="viaje-novedades__carro"
          aria-hidden="true"
        >
          <Image
            src="/media/categories/viaje/novedades/kira-carro.png"
            alt=""
            fill
            sizes="(max-width: 620px) 78vw, (max-width: 850px) 64vw, 700px"
            className="viaje-novedades__carro-imagen"
          />
        </div>


        {/* ===============================================
            INDICADOR DE RECORRIDO
        ================================================ */}

        <div
          className="viaje-novedades__indicador"
          aria-hidden="true"
        >
          <span>
            Sigue explorando
          </span>


          <span className="viaje-novedades__indicador-linea">
            <span className="viaje-novedades__indicador-progreso" />
          </span>
        </div>


        {/* ===============================================
            TRANSICIÓN AUSTRALIA → CREMA
        ================================================ */}

        <div
          className="viaje-novedades__transicion-inferior"
          aria-hidden="true"
        />
      </div>


      {/* ===================================================
          CIERRE COMERCIAL

          Después de la experiencia dejamos una salida
          convencional y clara hacia el catálogo.

          De esta forma la interacción especial no
          perjudica la navegación del ecommerce.
      ==================================================== */}

      <div className="viaje-novedades__cierre">
        <p className="viaje-novedades__cierre-texto">
          Lo nuevo ya está listo para acompañarte.
        </p>


        <Link
          href="/productos?categoria=viaje&orden=nuevos"
          className="viaje-novedades__ver-todas"
        >
          <span>
            Ver todas las novedades
          </span>


          <span
            className="viaje-novedades__ver-todas-flecha"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}