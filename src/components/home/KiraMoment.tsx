"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ============================================================
// KIRA MOMENT
// Transición entre Categorías y Productos destacados
// ============================================================

export default function KiraMoment() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [progreso, setProgreso] = useState(0);
  const [reducirMovimiento, setReducirMovimiento] =
    useState(false);

  // ==========================================================
  // DETECTAR REDUCCIÓN DE MOVIMIENTO
  // ==========================================================

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const actualizar = () => {
      setReducirMovimiento(mediaQuery.matches);
    };

    actualizar();

    mediaQuery.addEventListener("change", actualizar);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        actualizar
      );
    };
  }, []);

  // ==========================================================
  // PROGRESO DEL SCROLL
  // ==========================================================

  useEffect(() => {
    if (reducirMovimiento) {
      setProgreso(1);
      return;
    }

    let frameId: number | null = null;

    const actualizarProgreso = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      // ======================================================
      // RECORRIDO TOTAL DEL STICKY
      // ======================================================

      const recorrido =
        section.offsetHeight - viewportHeight;

      if (recorrido <= 0) return;

      // ======================================================
      // INICIO ANTICIPADO
      //
      // 0.35 = empieza cuando la sección todavía está entrando.
      //
      // Puedes probar:
      //
      // 0.20 → empieza un poco antes
      // 0.35 → recomendado
      // 0.50 → empieza bastante antes
      // 0.65 → empieza muy pronto
      // ======================================================

      const inicioAnticipado =
        viewportHeight * 0.5;

      // ======================================================
      // DESPLAZAMIENTO
      //
      // Antes:
      // const desplazamiento = -rect.top;
      //
      // Ahora adelantamos el inicio.
      // ======================================================

      const desplazamiento =
        inicioAnticipado - rect.top;

      // ======================================================
      // PROGRESO NORMALIZADO 0 → 1
      // ======================================================

      const nuevoProgreso = Math.min(
        1,
        Math.max(
          0,
          desplazamiento /
            (recorrido + inicioAnticipado)
        )
      );

      setProgreso(nuevoProgreso);

      frameId = null;
    };

    // ========================================================
    // SCROLL OPTIMIZADO
    // ========================================================

    const manejarScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(
        actualizarProgreso
      );
    };

    actualizarProgreso();

    window.addEventListener(
      "scroll",
      manejarScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      actualizarProgreso
    );

    return () => {
      window.removeEventListener(
        "scroll",
        manejarScroll
      );

      window.removeEventListener(
        "resize",
        actualizarProgreso
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [reducirMovimiento]);

  // ==========================================================
  // MOVIMIENTO DE LA MASCOTA
  // ==========================================================

  const desplazamientoY =
    180 - progreso * 300;

  const desplazamientoX =
    progreso * -35;

  const rotacion =
    8 - progreso * 13;

  const escala =
    0.75 + progreso * 0.28;

  // ==========================================================
  // TEXTO
  // ==========================================================

  const opacidadTitulo = Math.min(
    1,
    Math.max(
      0,
      (progreso - 0.08) / 0.22
    )
  );

  const desplazamientoTitulo =
    28 - progreso * 28;

  // ==========================================================
  // SOMBRA
  // ==========================================================

  const opacidadSombra =
    0.2 + progreso * 0.4;

  const escalaSombra =
    0.8 + progreso * 0.25;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <section

  ref={sectionRef}

  className="

    relative

    h-[100vh]

    w-full

    bg-[#F5F4EE]

    sm:h-[125vh]

    lg:h-[110vh]

  "

>
      {/* =====================================================
          ESCENA STICKY
      ===================================================== */}

      <div
        className="
          sticky
          top-0

          flex
          h-screen
          w-full
          items-center

          overflow-hidden
        "
      >
        {/* ===================================================
            FONDO DECORATIVO
        =================================================== */}

        <div
          className="
            pointer-events-none

            absolute
            left-1/2
            top-1/2

            h-[380px]
            w-[380px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-[#ECE9DD]

            blur-[1px]

            sm:h-[520px]
            sm:w-[520px]

            lg:h-[680px]
            lg:w-[680px]
          "
        />

        {/* ===================================================
            TEXTO
        =================================================== */}

        <div
          className="
            relative
            z-10

            mx-auto

            grid
            w-full
            max-w-[1500px]

            grid-cols-1

            px-6

            sm:px-8

            lg:grid-cols-12
            lg:px-12
          "
        >
          <div
            className="
              flex
              flex-col
              justify-center

              text-center

              lg:col-span-6
              lg:text-left
            "
            style={
              reducirMovimiento
                ? undefined
                : {
                    opacity: opacidadTitulo,
                    transform: `translateY(${desplazamientoTitulo}px)`,
                  }
            }
          >
            {/* Eyebrow */}

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]

                text-[#777B5D]

                sm:text-xs
              "
            >
              Descubre Kira
            </p>

            {/* TÍTULO */}

            <h2
              className="
                mt-4

                text-4xl
                font-semibold
                leading-[0.95]
                tracking-[-0.055em]

                text-[#181818]

                sm:text-5xl

                md:text-6xl

                lg:max-w-[700px]
                lg:text-[72px]
              "
            >
              Siempre hay algo que va contigo.
            </h2>

            {/* TEXTO */}

            <p
              className="
                mx-auto
                mt-6
                max-w-[520px]

                text-sm
                leading-relaxed

                text-black/55

                sm:text-base

                lg:mx-0
                lg:text-lg
              "
            >
              Desde pequeños detalles hasta ese
              producto que no sabías que estabas
              buscando.
            </p>

            {/* =================================================
                INDICADOR DE SCROLL
            ================================================= */}

            <div
              className="
                mx-auto
                mt-8

                flex
                items-center
                gap-3

                lg:mx-0
              "
            >
              <span
                className="
                  h-px
                  w-10

                  bg-[#777B5D]
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]

                  text-[#777B5D]
                "
              >
                Sigue explorando
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            MASCOTA
        =================================================== */}

        <div
          className="
            pointer-events-none

            absolute

            bottom-[5%]
            right-[-8%]

            z-20

            w-[230px]

            sm:right-[2%]
            sm:w-[320px]

            md:w-[380px]

            lg:bottom-[4%]
            lg:right-[8%]
            lg:w-[440px]

            xl:right-[12%]
            xl:w-[500px]

            will-change-transform
          "
          style={
            reducirMovimiento
              ? undefined
              : {
                  transform: `
                    translate3d(
                      ${desplazamientoX}px,
                      ${desplazamientoY}px,
                      0
                    )
                    rotate(${rotacion}deg)
                    scale(${escala})
                  `,
                }
          }
        >
          <Image
            src="/media/kira/kira.png"
            alt=""
            width={1000}
            height={1000}
            priority={false}
            draggable={false}
            className="
              h-auto
              w-full

              select-none
              object-contain
            "
          />
        </div>

        {/* ===================================================
            SOMBRA DE LA MASCOTA
        =================================================== */}

        <div
          className="
            pointer-events-none

            absolute

            bottom-[9%]
            right-[3%]

            h-8
            w-[180px]

            rounded-full

            bg-black/10

            blur-xl

            sm:right-[12%]
            sm:w-[230px]

            lg:right-[15%]
            lg:w-[300px]
          "
          style={
            reducirMovimiento
              ? undefined
              : {
                  opacity: opacidadSombra,
                  transform: `scale(${escalaSombra})`,
                }
          }
        />
      </div>
    </section>
  );
}