import Image from "next/image";
import Link from "next/link";

const RUTA_PORTADA_VIAJE = "/media/categories/viaje/portada";
const RUTA_NUBES_VIAJE = `${RUTA_PORTADA_VIAJE}/nubes`;
const RUTA_DECORACION_VIAJE = `${RUTA_PORTADA_VIAJE}/decoracion`;

export default function ViajePortada() {
  return (
    <section
      className="viaje-portada"
      aria-labelledby="viaje-portada-titulo"
    >
      {/* =====================================================
          ESCENA PRINCIPAL
      ===================================================== */}
      <div
        className="viaje-portada__escena"
        aria-hidden="true"
      >
        <Image
          src={`${RUTA_PORTADA_VIAJE}/salar-kira.webp`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="viaje-portada__imagen"
        />
      </div>

      {/* =====================================================
          NUBES — PLANO LEJANO
      ===================================================== */}
      <div
        className="viaje-portada__nubes viaje-portada__nubes--fondo"
        aria-hidden="true"
      >
        <div className="viaje-portada__nube viaje-portada__nube--lejana">
          <Image
            src={`${RUTA_NUBES_VIAJE}/nube-lejana.png`}
            alt=""
            width={2048}
            height={720}
            sizes="(max-width: 720px) 260px, 34vw"
            className="viaje-portada__nube-imagen"
          />
        </div>

        <div className="viaje-portada__nube viaje-portada__nube--pequena-fondo">
          <Image
            src={`${RUTA_NUBES_VIAJE}/nube-pequena.png`}
            alt=""
            width={1200}
            height={650}
            sizes="(max-width: 720px) 120px, 12vw"
            className="viaje-portada__nube-imagen"
          />
        </div>
      </div>

      {/* =====================================================
          CAPA DE LEGIBILIDAD
      ===================================================== */}
      <div
        className="viaje-portada__capa"
        aria-hidden="true"
      />

      {/* =====================================================
          RUTA AÉREA + AVIÓN
      ===================================================== */}
      <div
        className="viaje-portada__ruta-aerea"
        aria-hidden="true"
      >
        <svg
          className="viaje-portada__ruta-svg"
          viewBox="0 0 560 210"
          preserveAspectRatio="none"
        >
          <path
            className="viaje-portada__ruta-linea"
            d="M20 172C125 50 275 27 536 110"
          />
        </svg>

        <div className="viaje-portada__avion">
          <svg
            className="viaje-portada__avion-svg"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <g transform="rotate(90 24 24)">
              <path
                d="M42 19.5L27 13L25.3 4.2C25 2.8 23.8 2 22.5 2C21.2 2 20 2.8 19.7 4.2L18.3 13L5.7 19.5C4.4 20.2 3.7 21.4 3.7 22.8V24.7L18.2 21.6L17.5 32.1L12.1 35.9V38L22.5 35.9L32.9 38V35.9L27.5 32.1L26.8 21.6L44.3 24.7V22.8C44.3 21.4 43.6 20.2 42 19.5Z"
                fill="currentColor"
              />
            </g>
          </svg>
        </div>

        <span className="viaje-portada__ruta-punto viaje-portada__ruta-punto--inicio" />

        <span className="viaje-portada__ruta-punto viaje-portada__ruta-punto--final" />
      </div>

      {/* =====================================================
          NUBES — PLANO CERCANO
      ===================================================== */}
      <div
        className="viaje-portada__nubes viaje-portada__nubes--frente"
        aria-hidden="true"
      >
        <div className="viaje-portada__nube viaje-portada__nube--media">
          <Image
            src={`${RUTA_NUBES_VIAJE}/nube-media.png`}
            alt=""
            width={1900}
            height={760}
            sizes="(max-width: 720px) 220px, 26vw"
            className="viaje-portada__nube-imagen"
          />
        </div>

        <div className="viaje-portada__nube viaje-portada__nube--pequena">
          <Image
            src={`${RUTA_NUBES_VIAJE}/nube-pequena.png`}
            alt=""
            width={1200}
            height={650}
            sizes="(max-width: 720px) 130px, 13vw"
            className="viaje-portada__nube-imagen"
          />
        </div>
      </div>

      {/* =====================================================
          DESTELLOS DEL SALAR
      ===================================================== */}
      <div
        className="viaje-portada__reflejos"
        aria-hidden="true"
      >
        <span className="viaje-portada__reflejo viaje-portada__reflejo--uno" />
        <span className="viaje-portada__reflejo viaje-portada__reflejo--dos" />
        <span className="viaje-portada__reflejo viaje-portada__reflejo--tres" />
      </div>

      {/* =====================================================
          SELLO EDITORIAL
      ===================================================== */}
      <div
        className="viaje-portada__sello-recuerdo"
        aria-hidden="true"
      >
        <span className="viaje-portada__sello-avion">
          ✈
        </span>

        <span className="viaje-portada__sello-texto">
          Buenas historias
          <br />
          siempre continúan
        </span>

        <span className="viaje-portada__sello-lineas">
          <i />
          <i />
          <i />
        </span>
      </div>

      {/* =====================================================
          ANOTACIÓN MANUSCRITA
      ===================================================== */}
      <div
        className="viaje-portada__anotacion"
        aria-hidden="true"
      >
        <span className="viaje-portada__anotacion-texto">
          Colecciona
          <br />
          momentos
        </span>

        <span className="viaje-portada__anotacion-corazon">
          ♡
        </span>
      </div>

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ===================================================== */}
      <div className="viaje-portada__contenido">
        <div className="viaje-portada__texto">
          {/* =================================================
              ETIQUETA
          ================================================= */}
          <span className="viaje-portada__etiqueta viaje-portada__entrada viaje-portada__entrada--1">
            Viaje
          </span>

          {/* =================================================
              TÍTULO
          ================================================= */}
          <h1
            id="viaje-portada-titulo"
            className="viaje-portada__titulo viaje-portada__entrada viaje-portada__entrada--2"
          >
            Todo listo para tu próxima aventura.
          </h1>

          {/* =================================================
              DESCRIPCIÓN
          ================================================= */}
          <p className="viaje-portada__descripcion viaje-portada__entrada viaje-portada__entrada--3">
            Accesorios para organizar lo que llevas,
            aprovechar cada espacio y disfrutar más el camino.
          </p>

          {/* =================================================
              CTA PRINCIPAL

              Dejamos una sola acción para evitar dos enlaces
              que llevan exactamente a la misma sección.
          ================================================= */}
          <div className="viaje-portada__acciones viaje-portada__entrada viaje-portada__entrada--4">
            <Link
              href="#explorar-viaje"
              className="viaje-portada__boton viaje-portada__boton--principal"
              aria-label="Explorar la colección de viaje"
            >
              <span
                className="viaje-portada__boton-icono-ruta"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M8.5 15.5L10.5 10.5L15.5 8.5L13.5 13.5L8.5 15.5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span>
                Explorar la colección
              </span>

              <span
                className="viaje-portada__boton-flecha"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          PIEDRAS + RECUERDO
      ===================================================== */}
      <div
        className="viaje-portada__piedras-recuerdo"
        aria-hidden="true"
      >
        <Image
          src={`${RUTA_DECORACION_VIAJE}/piedras-recuerdo.png`}
          alt=""
          width={2048}
          height={900}
          sizes="(max-width: 720px) 82vw, (max-width: 1200px) 50vw, 46vw"
          className="viaje-portada__piedras-recuerdo-imagen"
        />
      </div>
    </section>
  );
}