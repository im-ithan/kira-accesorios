import Image from "next/image";

/* =========================================================
   KIRA — VIAJE
   Descanso visual · Colombia

   Pausa narrativa después de preparar la maleta.

   La fotografía es la protagonista.
   Kira forma parte del ambiente y el texto acompaña
   el momento sin convertir la sección en un destino
   turístico ni en un bloque comercial.
   ========================================================= */

export default function ViajeDescansoColombia() {
  return (
    <section
      className="viaje-descanso-colombia"
      aria-labelledby="viaje-descanso-colombia-titulo"
    >
      {/* ===================================================
          FOTOGRAFÍA / ESCENA
      ==================================================== */}

      <div className="viaje-descanso-colombia__escena">
        <Image
          src="/media/categories/viaje/destinos/colombia/kira-colombia.webp"
          alt=""
          fill
          sizes="100vw"
          className="viaje-descanso-colombia__imagen"
        />

        {/* =================================================
            CAPAS DE INTEGRACIÓN

            Permiten que la fotografía nazca desde la sección
            crema anterior y que el texto conserve contraste.
        ================================================== */}

        <div
          className="viaje-descanso-colombia__transicion-superior"
          aria-hidden="true"
        />

        <div
          className="viaje-descanso-colombia__sombra-texto"
          aria-hidden="true"
        />

        <div
          className="viaje-descanso-colombia__transicion-inferior"
          aria-hidden="true"
        />

        {/* =================================================
            TEXTO

            Breve a propósito. La imagen debe respirar.
        ================================================== */}

        <div className="viaje-descanso-colombia__contenido">
          <p className="viaje-descanso-colombia__antes">
            Todo listo.
          </p>

          <h2
            id="viaje-descanso-colombia-titulo"
            className="viaje-descanso-colombia__titulo"
          >
            Ahora solo queda
            <span> vivir el viaje.</span>
          </h2>

          <p className="viaje-descanso-colombia__texto">
            Lo que llevas te acompaña.
            <br />
            Lo que vives se queda contigo.
          </p>
        </div>
      </div>
    </section>
  );
}