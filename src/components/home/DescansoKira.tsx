"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// ============================================================
// DESCANSO KIRA
//
// Objetivo:
// Crear una pausa visual entre Favoritos y Nuevos Productos.
//
// No funciona como banner publicitario.
// Es una pieza editorial de marca que también sirve como
// entrada sutil hacia la página de promociones.
// ============================================================

export default function DescansoKira() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // ==========================================================
  // DETECTAR CUANDO LA SECCIÓN ENTRA EN PANTALLA
  // ==========================================================

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          // Solo necesitamos reproducir la entrada una vez.
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="

  relative

  isolate

  w-full

  overflow-hidden

  bg-[#F5F4EE]

  px-4

  pt-8

  pb-16

  sm:px-6

  sm:pt-10

  sm:pb-20

  lg:px-9

  lg:pt-0

  lg:pb-[0rem]

"
    >
      {/* =====================================================
          ELEMENTOS DECORATIVOS DE FONDO
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[8%]
          top-[20%]

          h-2
          w-2

          rounded-full

          bg-[#C9CE76]/60
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-[8%]
          top-[18%]

          h-20
          w-20

          rounded-full

          border
          border-[#777B5D]/10

          sm:h-28
          sm:w-28

          lg:h-36
          lg:w-36
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          bottom-[12%]
          left-[42%]

          h-px
          w-20

          rotate-[-12deg]

          bg-[#777B5D]/15
        "
      />

      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          grid
          max-w-[1500px]

          grid-cols-1

          items-center

          gap-10

          lg:min-h-[520px]
          lg:grid-cols-12
          lg:gap-8
        "
      >
        {/* ===================================================
            TEXTO
        =================================================== */}

        <div
          className={`
            lg:col-span-6
            lg:pl-8

            transition-all
            duration-[1100ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          {/* PEQUEÑO IDENTIFICADOR */}

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.28em]

              text-[#777B5D]

              sm:text-[11px]
            "
          >
            Siempre contigo
          </p>

          {/* TÍTULO */}

          <h2
            className="
              mt-4

              max-w-[700px]

              text-[42px]
              font-semibold
              leading-[0.92]
              tracking-[-0.055em]

              text-[#151515]

              sm:text-[56px]

              lg:text-[72px]

              xl:text-[82px]
            "
          >
            Pequeñas cosas,
            <br />
            grandes momentos.
          </h2>

          {/* TEXTO */}

          <p
            className="
              mt-6

              max-w-[470px]

              text-sm
              leading-[1.7]

              text-black/55

              sm:text-base
            "
          >
            Hay algo para acompañarte en cada momento
            de tu día. Descubre nuevas ideas, oportunidades
            y experiencias dentro de Kira.
          </p>

          {/* =================================================
              ENLACE A PROMOCIONES
          ================================================= */}

          <Link
            href="/promociones"
            className="
              group

              mt-8

              inline-flex
              items-center
              gap-2

              border-b
              border-[#181818]/35

              pb-1.5

              text-sm
              font-medium

              text-[#181818]

              transition-all
              duration-500

              hover:gap-3
              hover:border-[#181818]
            "
          >
            <span>Explorar promociones</span>

            <ArrowUpRight
              className="
                h-4
                w-4

                transition-transform
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
              strokeWidth={1.7}
            />
          </Link>
        </div>

        {/* ===================================================
            KIRA
        =================================================== */}

        <div
          className="
            relative

            flex
            min-h-[340px]

            items-end
            justify-center

            lg:col-span-6
            lg:min-h-[520px]
            lg:justify-end
            lg:pr-10
          "
        >
          {/* SOMBRA */}

          <div
            aria-hidden="true"
            className={`
              absolute

              bottom-[5%]
              left-1/2

              h-8
              w-[180px]

              -translate-x-1/2

              rounded-[100%]

              bg-black/[0.07]

              blur-xl

              transition-all
              duration-[1300ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]

              lg:left-auto
              lg:right-[15%]
              lg:translate-x-0

              ${
                visible
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }
            `}
          />

          {/* =================================================
              IMAGEN KIRA

              Entra desde la derecha cuando la sección
              aparece por primera vez.
          ================================================= */}

          <div
            className={`
              relative

              h-[330px]
              w-[330px]

              transition-all
              duration-[1400ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]

              sm:h-[400px]
              sm:w-[400px]

              lg:h-[500px]
              lg:w-[500px]

              ${
                visible
                  ? "translate-x-0 rotate-0 opacity-100"
                  : "translate-x-24 rotate-[2deg] opacity-0"
              }
            `}
          >
            <Image
              src="/media/kira/kira-caminando.png"
              alt="Kira caminando con una mochila"
              fill
              priority={false}
              sizes="
                (max-width: 640px) 330px,
                (max-width: 1024px) 400px,
                500px
              "
              className="
                object-contain
                object-bottom
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}