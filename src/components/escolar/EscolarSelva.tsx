"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useState,
} from "react";

type EscolarSelvaProps = {
  children: ReactNode;
};

type VegetacionEscolar = {
  id: string;
  imagen: string;
  clasePosicion: string;
  claseCrecimiento: string;
  claseBrisa: string;
  claseComportamiento: string;
  clasesContenedor: string;
  clasesImagen?: string;
  sizes: string;
};

const vegetacion: VegetacionEscolar[] = [
  /* =========================================================
     CAPA PROFUNDA
  ========================================================= */

  {
    id: "fondo-izquierda",
    imagen: "/media/categories/escolar/decoracion/hojas.png",
    clasePosicion: "escolar-selva-fondo-izquierda",
    claseCrecimiento: "escolar-crecimiento-1",
    claseBrisa: "escolar-brisa-fondo-izquierda",
    claseComportamiento:
      "escolar-vegetacion-profunda escolar-vegetacion-portada",
    clasesContenedor: `
      -bottom-[11rem]
      -left-[13rem]
      z-[11]
      hidden
      h-[560px]
      w-[650px]
      opacity-36
      lg:block
      xl:h-[640px]
      xl:w-[740px]
    `,
    clasesImagen: `
      object-left-bottom
      brightness-[0.72]
      saturate-[0.88]
    `,
    sizes: "740px",
  },

  {
    id: "fondo-derecha",
    imagen: "/media/categories/escolar/decoracion/hojas.png",
    clasePosicion: "escolar-selva-fondo-derecha",
    claseCrecimiento: "escolar-crecimiento-2",
    claseBrisa: "escolar-brisa-fondo-derecha",
    claseComportamiento:
      "escolar-vegetacion-profunda escolar-vegetacion-portada",
    clasesContenedor: `
      -bottom-[12rem]
      -right-[14rem]
      z-[11]
      hidden
      h-[540px]
      w-[630px]
      opacity-32
      lg:block
      xl:h-[620px]
      xl:w-[720px]
    `,
    clasesImagen: `
      object-left-bottom
      brightness-[0.7]
      saturate-[0.84]
    `,
    sizes: "720px",
  },

  /* =========================================================
     PARTE SUPERIOR
  ========================================================= */

  {
    id: "superior-izquierda",
    imagen:
      "/media/categories/escolar/decoracion/hoja-palmera.png",
    clasePosicion: "escolar-selva-superior-izquierda",
    claseCrecimiento: "escolar-crecimiento-3",
    claseBrisa: "escolar-brisa-superior-izquierda",
    claseComportamiento:
      "escolar-vegetacion-portada escolar-vegetacion-sale",
    clasesContenedor: `
      -left-[7rem]
      -top-[3rem]
      z-[16]
      hidden
      h-[245px]
      w-[500px]
      opacity-64
      lg:block
    `,
    clasesImagen: `
      brightness-[0.9]
      saturate-[1.02]
    `,
    sizes: "500px",
  },

  {
    id: "superior-derecha",
    imagen: "/media/categories/escolar/decoracion/hoja2.png",
    clasePosicion: "escolar-selva-superior-derecha",
    claseCrecimiento: "escolar-crecimiento-4",
    claseBrisa: "escolar-brisa-superior-derecha",
    claseComportamiento:
      "escolar-vegetacion-portada escolar-vegetacion-sale",
    clasesContenedor: `
      -right-[7rem]
      -top-[3rem]
      z-[16]
      hidden
      h-[250px]
      w-[460px]
      opacity-58
      lg:block
    `,
    clasesImagen: `
      brightness-[0.88]
      saturate-[0.98]
    `,
    sizes: "460px",
  },

  /* =========================================================
     LATERALES ALTOS
  ========================================================= */

  {
    id: "lateral-alta-izquierda",
    imagen:
      "/media/categories/escolar/decoracion/hoja-monstera.png",
    clasePosicion: "escolar-selva-lateral-alta-izquierda",
    claseCrecimiento: "escolar-crecimiento-5",
    claseBrisa: "escolar-brisa-lateral-alta-izquierda",
    claseComportamiento:
      "escolar-vegetacion-portada escolar-vegetacion-acompanante",
    clasesContenedor: `
      -left-[7rem]
      top-[19vh]
      z-[15]
      hidden
      h-[220px]
      w-[380px]
      opacity-52
      lg:block
    `,
    clasesImagen: `
      brightness-[0.92]
      saturate-[1]
    `,
    sizes: "380px",
  },

  {
    id: "lateral-alta-derecha",
    imagen:
      "/media/categories/escolar/decoracion/hoja-palmera.png",
    clasePosicion: "escolar-selva-lateral-alta-derecha",
    claseCrecimiento: "escolar-crecimiento-6",
    claseBrisa: "escolar-brisa-lateral-alta-derecha",
    claseComportamiento:
      "escolar-vegetacion-portada escolar-vegetacion-acompanante",
    clasesContenedor: `
      -right-[7rem]
      top-[17vh]
      z-[15]
      hidden
      h-[195px]
      w-[390px]
      opacity-48
      lg:block
    `,
    clasesImagen: `
      brightness-[0.88]
      saturate-[0.96]
    `,
    sizes: "390px",
  },

  /* =========================================================
     ZONA MEDIA
  ========================================================= */

  {
    id: "media-izquierda",
    imagen: "/media/categories/escolar/decoracion/hoja2.png",
    clasePosicion: "escolar-selva-media-izquierda",
    claseCrecimiento: "escolar-crecimiento-7",
    claseBrisa: "escolar-brisa-media-izquierda",
    claseComportamiento:
      "escolar-vegetacion-acompanante",
    clasesContenedor: `
      -left-[9rem]
      top-[39vh]
      z-[14]
      hidden
      h-[220px]
      w-[410px]
      opacity-55
      lg:block
    `,
    clasesImagen: `
      brightness-[0.94]
      saturate-[1.02]
    `,
    sizes: "410px",
  },

  {
    id: "media-derecha",
    imagen:
      "/media/categories/escolar/decoracion/hoja-monstera.png",
    clasePosicion: "escolar-selva-media-derecha",
    claseCrecimiento: "escolar-crecimiento-8",
    claseBrisa: "escolar-brisa-media-derecha",
    claseComportamiento:
      "escolar-vegetacion-acompanante",
    clasesContenedor: `
      -right-[8rem]
      top-[37vh]
      z-[14]
      hidden
      h-[210px]
      w-[390px]
      opacity-54
      lg:block
    `,
    clasesImagen: `
      brightness-[0.9]
      saturate-[1]
    `,
    sizes: "390px",
  },

  /* =========================================================
     HOJAS FLOTANTES
  ========================================================= */

  {
    id: "flotante-izquierda",
    imagen: "/media/categories/escolar/decoracion/hoja.png",
    clasePosicion: "escolar-selva-flotante-izquierda",
    claseCrecimiento: "escolar-crecimiento-9",
    claseBrisa: "escolar-brisa-flotante-izquierda",
    claseComportamiento:
      "escolar-vegetacion-acompanante",
    clasesContenedor: `
      -left-[6rem]
      bottom-[28vh]
      z-[17]
      hidden
      h-[170px]
      w-[335px]
      opacity-68
      lg:block
    `,
    clasesImagen: `
      drop-shadow-[0_16px_24px_rgba(12,31,15,0.12)]
    `,
    sizes: "335px",
  },

  {
    id: "flotante-derecha",
    imagen: "/media/categories/escolar/decoracion/hoja2.png",
    clasePosicion: "escolar-selva-flotante-derecha",
    claseCrecimiento: "escolar-crecimiento-10",
    claseBrisa: "escolar-brisa-flotante-derecha",
    claseComportamiento:
      "escolar-vegetacion-acompanante",
    clasesContenedor: `
      -right-[6rem]
      bottom-[33vh]
      z-[17]
      hidden
      h-[175px]
      w-[330px]
      opacity-65
      lg:block
    `,
    clasesImagen: `
      drop-shadow-[0_16px_24px_rgba(12,31,15,0.10)]
    `,
    sizes: "330px",
  },

  /* =========================================================
     ACENTOS PEQUEÑOS
  ========================================================= */

  {
    id: "acento-izquierda",
    imagen:
      "/media/categories/escolar/decoracion/hoja-monstera.png",
    clasePosicion: "escolar-selva-acento-izquierda",
    claseCrecimiento: "escolar-crecimiento-11",
    claseBrisa: "escolar-brisa-acento-izquierda",
    claseComportamiento:
      "escolar-vegetacion-acompanante escolar-vegetacion-tardia",
    clasesContenedor: `
      -left-[3rem]
      top-[59vh]
      z-[13]
      hidden
      h-[135px]
      w-[240px]
      opacity-44
      xl:block
    `,
    clasesImagen: `
      brightness-[0.92]
      saturate-[0.98]
    `,
    sizes: "240px",
  },

  {
    id: "acento-derecha",
    imagen: "/media/categories/escolar/decoracion/hoja.png",
    clasePosicion: "escolar-selva-acento-derecha",
    claseCrecimiento: "escolar-crecimiento-12",
    claseBrisa: "escolar-brisa-acento-derecha",
    claseComportamiento:
      "escolar-vegetacion-acompanante escolar-vegetacion-tardia",
    clasesContenedor: `
      -right-[3rem]
      top-[61vh]
      z-[13]
      hidden
      h-[120px]
      w-[230px]
      opacity-42
      xl:block
    `,
    clasesImagen: `
      brightness-[0.88]
      saturate-[0.94]
    `,
    sizes: "230px",
  },

  /* =========================================================
     PRIMER PLANO
  ========================================================= */

  {
    id: "frontal-izquierda",
    imagen:
      "/media/categories/escolar/decoracion/hoja-palmera.png",
    clasePosicion: "escolar-selva-frontal-izquierda",
    claseCrecimiento: "escolar-crecimiento-13",
    claseBrisa: "escolar-brisa-frontal-izquierda",
    claseComportamiento:
      "escolar-vegetacion-frontal escolar-vegetacion-portada",
    clasesContenedor: `
      -bottom-[8rem]
      -left-[9rem]
      z-[22]
      hidden
      h-[310px]
      w-[580px]
      opacity-82
      lg:block
      xl:h-[350px]
      xl:w-[640px]
    `,
    clasesImagen: `
      drop-shadow-[0_26px_38px_rgba(0,0,0,0.15)]
    `,
    sizes: "640px",
  },

  {
    id: "frontal-derecha",
    imagen:
      "/media/categories/escolar/decoracion/hoja-monstera.png",
    clasePosicion: "escolar-selva-frontal-derecha",
    claseCrecimiento: "escolar-crecimiento-14",
    claseBrisa: "escolar-brisa-frontal-derecha",
    claseComportamiento:
      "escolar-vegetacion-frontal escolar-vegetacion-portada",
    clasesContenedor: `
      -bottom-[9rem]
      -right-[8rem]
      z-[22]
      hidden
      h-[300px]
      w-[560px]
      opacity-80
      lg:block
      xl:h-[340px]
      xl:w-[620px]
    `,
    clasesImagen: `
      drop-shadow-[0_26px_38px_rgba(0,0,0,0.14)]
    `,
    sizes: "620px",
  },

  /* =========================================================
     HOJAS CERCANAS A CÁMARA
  ========================================================= */

  {
    id: "cercana-izquierda",
    imagen: "/media/categories/escolar/decoracion/hojas.png",
    clasePosicion: "escolar-selva-cercana-izquierda",
    claseCrecimiento: "escolar-crecimiento-15",
    claseBrisa: "escolar-brisa-cercana-izquierda",
    claseComportamiento:
      "escolar-vegetacion-frontal escolar-vegetacion-profunda",
    clasesContenedor: `
      -bottom-[4rem]
      -left-[17rem]
      z-[23]
      hidden
      h-[245px]
      w-[480px]
      opacity-32
      blur-[1.5px]
      2xl:block
    `,
    clasesImagen: `
      brightness-[0.92]
      saturate-[1.08]
      drop-shadow-[0_28px_42px_rgba(0,0,0,0.10)]
    `,
    sizes: "480px",
  },

  {
    id: "cercana-derecha",
    imagen: "/media/categories/escolar/decoracion/hoja2.png",
    clasePosicion: "escolar-selva-cercana-derecha",
    claseCrecimiento: "escolar-crecimiento-16",
    claseBrisa: "escolar-brisa-cercana-derecha",
    claseComportamiento:
      "escolar-vegetacion-frontal escolar-vegetacion-profunda",
    clasesContenedor: `
      -bottom-[3rem]
      -right-[17rem]
      z-[23]
      hidden
      h-[240px]
      w-[470px]
      opacity-30
      blur-[2px]
      2xl:block
    `,
    clasesImagen: `
      brightness-[0.9]
      saturate-[1.04]
      drop-shadow-[0_28px_42px_rgba(0,0,0,0.10)]
    `,
    sizes: "470px",
  },
];

function ElementoVegetacion({
  planta,
}: {
  planta: VegetacionEscolar;
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        escolar-selva-hojas
        ${planta.clasePosicion}
        ${planta.claseComportamiento}

        pointer-events-none
        fixed

        ${planta.clasesContenedor}
      `}
    >
      <div
        className={`
          escolar-crecimiento
          ${planta.claseCrecimiento}
        `}
      >
        <div
          className={`
            escolar-brisa
            ${planta.claseBrisa}
          `}
        >
          <Image
            src={planta.imagen}
            alt=""
            fill
            className={`
              object-contain
              ${planta.clasesImagen ?? ""}
            `}
            sizes={planta.sizes}
          />
        </div>
      </div>
    </div>
  );
}

export default function EscolarSelva({
  children,
}: EscolarSelvaProps) {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    let frame = 0;

    const actualizarScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const alturaDocumento =
          document.documentElement.scrollHeight -
          window.innerHeight;

        if (alturaDocumento <= 0) {
          setProgreso(0);
          return;
        }

        const nuevoProgreso = Math.min(
          Math.max(
            window.scrollY / alturaDocumento,
            0,
          ),
          1,
        );

        setProgreso(nuevoProgreso);
      });
    };

    actualizarScroll();

    window.addEventListener(
      "scroll",
      actualizarScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      actualizarScroll,
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        actualizarScroll,
      );

      window.removeEventListener(
        "resize",
        actualizarScroll,
      );
    };
  }, []);

  const estiloSelva = {
    "--progreso-selva": progreso,
  } as CSSProperties;

  return (
    <div
      className="
        escolar-selva
        relative
        isolate
        min-h-screen
        overflow-clip
      "
      style={estiloSelva}
    >
      {/* =====================================================
          ATMÓSFERA GENERAL
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          -z-30
          bg-[#F4F0DF]
        "
      />

      {/* =====================================================
          LUCES AMBIENTALES
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          escolar-luz-selva
          escolar-luz-selva-1

          pointer-events-none
          fixed

          -left-[20vw]
          top-[5vh]

          -z-20

          hidden

          h-[48vw]
          w-[48vw]

          rounded-full

          bg-[#7FA36E]/10

          blur-[130px]

          lg:block
        "
      />

      <div
        aria-hidden="true"
        className="
          escolar-luz-selva
          escolar-luz-selva-2

          pointer-events-none
          fixed

          -right-[18vw]
          top-[40vh]

          -z-20

          hidden

          h-[46vw]
          w-[46vw]

          rounded-full

          bg-[#D8C96B]/10

          blur-[140px]

          lg:block
        "
      />

      {/* =====================================================
          VEGETACIÓN

          IMPORTANTE:
          usamos "contents".

          Antes todas las hojas estaban dentro de un contenedor
          con z-index 0. Eso impedía que los z-index individuales
          de las plantas superaran al contenido de la portada.

          Ahora cada planta participa directamente en el
          stacking context principal de EscolarSelva.
      ===================================================== */}

      <div
        aria-hidden="true"
        className="contents"
      >
        {vegetacion.map((planta) => (
          <ElementoVegetacion
            key={planta.id}
            planta={planta}
          />
        ))}
      </div>

      {/* =====================================================
          CONTENIDO REAL
      ===================================================== */}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}