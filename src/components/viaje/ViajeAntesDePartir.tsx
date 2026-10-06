import Link from "next/link";

/* =========================================================
   KIRA — VIAJE
   ANTES DE PARTIR

   CIERRE FINAL DE LA EXPERIENCIA VIAJE

   RECORRIDO:

   1. Portada
      Inspiración.

   2. Explorador + maleta
      Preparación.

   3. Colombia
      Inicio de la experiencia.

   4. Australia
      Novedades y recorrido.

   5. Antes de partir
      Cierre comercial y narrativo de la categoría.

   La ventana del avión funciona como recurso visual
   para proyectar al usuario dentro de la experiencia.

   Kira continúa siendo una tienda de productos y
   accesorios; no se presentan destinos ni servicios
   turísticos.

   Después de esta sección comienza el Footer.
   ========================================================= */


/* =========================================================
   COMPONENTE
   ========================================================= */

export default function ViajeAntesDePartir() {
  return (
    <section
      className="viaje-antes-de-partir"
      aria-labelledby="viaje-antes-de-partir-titulo"
    >
      {/* ===================================================
          TRANSICIÓN DESDE AUSTRALIA
      ==================================================== */}

      <div
        className="viaje-antes-de-partir__transicion"
        aria-hidden="true"
      />


      {/* ===================================================
          CONTENIDO PRINCIPAL

          Izquierda:
          mensaje + CTA.

          Derecha:
          ventana de avión con video.
      ==================================================== */}

      <div className="viaje-antes-de-partir__inicio">
        <div className="viaje-antes-de-partir__inicio-contenido">

          {/* ===============================================
              COLUMNA DE TEXTO
          ================================================ */}

          <div className="viaje-antes-de-partir__texto">

            {/* =============================================
                ETIQUETA
            ============================================== */}

            <p className="viaje-antes-de-partir__etiqueta">
              Antes de partir
            </p>


            {/* =============================================
                TÍTULO
            ============================================== */}

            <h2
              id="viaje-antes-de-partir-titulo"
              className="viaje-antes-de-partir__titulo"
            >
              Que no te falte
              <span> lo importante.</span>
            </h2>


            {/* =============================================
                DESCRIPCIÓN
            ============================================== */}

            <p className="viaje-antes-de-partir__descripcion">
              Cada viaje empieza mucho antes de llegar
              al destino. Prepara lo esencial y deja
              más espacio para disfrutar lo que viene.
            </p>


            {/* =============================================
                CONCEPTOS

                Son parte del mensaje visual.
                No funcionan como navegación.
            ============================================== */}

            <div
              className="viaje-antes-de-partir__conceptos"
              aria-label="Preparación para el viaje"
            >
              <span>Organiza</span>

              <i aria-hidden="true" />

              <span>Protege</span>

              <i aria-hidden="true" />

              <span>Disfruta</span>
            </div>


            {/* =============================================
                CTA FINAL

                Esta es la acción comercial con la que
                termina la categoría Viaje.
            ============================================== */}

            <div className="viaje-antes-de-partir__accion">
              <Link
                href="/productos?categoria=viaje"
                className="viaje-antes-de-partir__boton"
                aria-label="Explorar todos los productos de viaje"
              >
                <span>
                  Explorar productos de viaje
                </span>

                <span
                  className="viaje-antes-de-partir__boton-flecha"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>

          </div>


          {/* ===============================================
              VENTANA DE AVIÓN

              El video:
              - no tiene audio;
              - se reproduce automáticamente;
              - se repite;
              - funciona inline en móvil.

              Archivo:

              public/
              media/
              categories/
              viaje/
              cierre/
              vista-avion.mp4
          ================================================ */}

          <div
            className="viaje-antes-de-partir__ventana-area"
            aria-hidden="true"
          >

            {/* =============================================
                SOMBRA EXTERIOR
            ============================================== */}

            <div className="viaje-antes-de-partir__ventana-sombra" />


            {/* =============================================
                MARCO EXTERIOR
            ============================================== */}

            <div className="viaje-antes-de-partir__ventana-marco">

              {/* ===========================================
                  MARCO INTERIOR
              ============================================ */}

              <div className="viaje-antes-de-partir__ventana-interior">

                {/* =========================================
                    VIDEO
                ========================================== */}

                <video
                  className="viaje-antes-de-partir__video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source
                    src="/media/categories/viaje/cierre/vista-avion.mp4"
                    type="video/mp4"
                  />
                </video>


                {/* =========================================
                    LUZ SOBRE LA VENTANA
                ========================================== */}

                <div className="viaje-antes-de-partir__ventana-luz" />


                {/* =========================================
                    REFLEJO DEL VIDRIO
                ========================================== */}

                <div className="viaje-antes-de-partir__ventana-reflejo" />

              </div>

            </div>


            {/* =============================================
                FRASE EDITORIAL
            ============================================== */}

            <p className="viaje-antes-de-partir__ventana-frase">
              El camino también es parte de la historia.
            </p>

          </div>

        </div>
      </div>


      {/* ===================================================
          DECORACIÓN GENERAL

          Elementos muy sutiles para evitar que el fondo
          quede completamente plano.

          No deben competir con el título ni con el video.
      ==================================================== */}

      <div
        className="viaje-antes-de-partir__decoracion"
        aria-hidden="true"
      >
        <span className="viaje-antes-de-partir__decoracion-punto viaje-antes-de-partir__decoracion-punto--1" />

        <span className="viaje-antes-de-partir__decoracion-punto viaje-antes-de-partir__decoracion-punto--2" />

        <span className="viaje-antes-de-partir__decoracion-punto viaje-antes-de-partir__decoracion-punto--3" />
      </div>

    </section>
  );
}