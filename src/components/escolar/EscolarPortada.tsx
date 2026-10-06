"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function EscolarPortada() {
  const seccionRef = useRef<HTMLElement | null>(null);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    let frame = 0;

    const actualizarScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        if (!seccionRef.current) return;

        const rect = seccionRef.current.getBoundingClientRect();

        const nuevoProgreso = Math.min(
          Math.max(-rect.top / Math.max(rect.height, 1), 0),
          1,
        );

        setProgreso(nuevoProgreso);
      });
    };

    actualizarScroll();

    window.addEventListener("scroll", actualizarScroll, {
      passive: true,
    });

    window.addEventListener("resize", actualizarScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", actualizarScroll);
      window.removeEventListener("resize", actualizarScroll);
    };
  }, []);

  const escalaKoala = 1 - progreso * 0.08;
  const movimientoKoala = progreso * 22;
  const rotacionKoala = progreso;

  const opacidadDecoracion = Math.max(
    1 - progreso * 1.5,
    0,
  );

  const opacidadSelvaPortada = Math.max(
    1 - progreso * 1.55,
    0,
  );

  return (
    <section
      ref={seccionRef}
      aria-labelledby="titulo-escolar"
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#496A43]
      "
    >
      {/* =====================================================
          FONDO
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          -z-20
          bg-[linear-gradient(120deg,#36543A_0%,#496A43_52%,#64815A_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          -left-40
          top-10
          -z-10
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#C9D8B8]/15
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          -right-40
          top-20
          -z-10
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#E8C95B]/10
          blur-[110px]
        "
      />

      {/* =====================================================
          VEGETACIÓN DE LA PORTADA
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          hidden
          overflow-hidden
          lg:block
        "
        style={{
          opacity: opacidadSelvaPortada,
        }}
      >
        {/* ===================================================
            MASA INFERIOR IZQUIERDA

            hojas.png solamente se utiliza como vegetación
            de esquina.
        =================================================== */}

        <div
          className="
            escolar-portada-masa-hojas
            escolar-portada-masa-hojas-izquierda
            absolute
            -bottom-[175px]
            -left-[125px]
            h-[570px]
            w-[600px]
            xl:-bottom-[205px]
            xl:-left-[150px]
            xl:h-[680px]
            xl:w-[720px]
          "
          style={{
            transform: `
              translate3d(
                ${progreso * -105}px,
                ${progreso * 75}px,
                0
              )
              scale(${1 - progreso * 0.07})
            `,
          }}
        >
          <Image
            src="/media/categories/escolar/decoracion/hojas.png"
            alt=""
            fill
            priority
            className="
              object-contain
              object-left-bottom
              brightness-[0.76]
              saturate-[0.94]
              drop-shadow-[0_24px_38px_rgba(18,38,20,0.17)]
            "
            sizes="720px"
          />
        </div>

        {/* ===================================================
            MASA INFERIOR DERECHA
        =================================================== */}

        <div
          className="
            escolar-portada-masa-hojas
            escolar-portada-masa-hojas-derecha
            absolute
            -bottom-[175px]
            -right-[125px]
            h-[570px]
            w-[600px]
            xl:-bottom-[205px]
            xl:-right-[150px]
            xl:h-[680px]
            xl:w-[720px]
          "
          style={{
            transform: `
              translate3d(
                ${progreso * 105}px,
                ${progreso * 75}px,
                0
              )
              scaleX(-1)
              scale(${1 - progreso * 0.07})
            `,
          }}
        >
          <Image
            src="/media/categories/escolar/decoracion/hojas.png"
            alt=""
            fill
            priority
            className="
              object-contain
              object-left-bottom
              brightness-[0.74]
              saturate-[0.91]
              drop-shadow-[0_24px_38px_rgba(18,38,20,0.15)]
            "
            sizes="720px"
          />
        </div>

        {/* ===================================================
            PALMERA SUPERIOR IZQUIERDA
        =================================================== */}

        <div
          className="
            escolar-portada-hoja
            escolar-portada-hoja-palmera-izquierda
            absolute
            -left-[70px]
            -top-[35px]
            h-[250px]
            w-[430px]
            xl:h-[290px]
            xl:w-[500px]
          "
          style={{
            transform: `
              translate3d(
                ${progreso * -90}px,
                ${progreso * -35}px,
                0
              )
              rotate(${-10 - progreso * 8}deg)
              scale(${1 - progreso * 0.06})
            `,
          }}
        >
          <Image
            src="/media/categories/escolar/decoracion/hoja-palmera.png"
            alt=""
            fill
            className="
              object-contain
              object-left-top
              brightness-[0.82]
              saturate-[0.95]
              drop-shadow-[0_18px_30px_rgba(18,38,20,0.13)]
            "
            sizes="500px"
          />
        </div>

        {/* ===================================================
            PALMERA SUPERIOR DERECHA
        =================================================== */}

        <div
          className="
            escolar-portada-hoja
            escolar-portada-hoja-palmera-derecha
            absolute
            -right-[70px]
            -top-[35px]
            h-[250px]
            w-[430px]
            xl:h-[290px]
            xl:w-[500px]
          "
          style={{
            transform: `
              translate3d(
                ${progreso * 90}px,
                ${progreso * -35}px,
                0
              )
              scaleX(-1)
              rotate(${-10 + progreso * 8}deg)
              scale(${1 - progreso * 0.06})
            `,
          }}
        >
          <Image
            src="/media/categories/escolar/decoracion/hoja-palmera.png"
            alt=""
            fill
            className="
              object-contain
              object-left-top
              brightness-[0.8]
              saturate-[0.93]
              drop-shadow-[0_18px_30px_rgba(18,38,20,0.13)]
            "
            sizes="500px"
          />
        </div>

        {/* ===================================================
            MONSTERA LATERAL IZQUIERDA
        =================================================== */}

        <div
          className="
            escolar-portada-hoja
            escolar-portada-monstera-izquierda
            absolute
            -left-[135px]
            top-[28%]
            h-[290px]
            w-[340px]
            xl:h-[330px]
            xl:w-[390px]
          "
          style={{
            transform: `
              translate3d(
                ${progreso * -75}px,
                ${progreso * 20}px,
                0
              )
              rotate(${12 + progreso * 7}deg)
              scale(${0.96 - progreso * 0.05})
            `,
          }}
        >
          <Image
            src="/media/categories/escolar/decoracion/hoja-monstera.png"
            alt=""
            fill
            className="
              object-contain
              brightness-[0.8]
              saturate-[0.96]
              drop-shadow-[0_20px_30px_rgba(18,38,20,0.14)]
            "
            sizes="390px"
          />
        </div>

        {/* ===================================================
            MONSTERA LATERAL DERECHA
        =================================================== */}

        <div
          className="
            escolar-portada-hoja
            escolar-portada-monstera-derecha
            absolute
            -right-[135px]
            top-[31%]
            h-[290px]
            w-[340px]
            xl:h-[330px]
            xl:w-[390px]
          "
          style={{
            transform: `
              translate3d(
                ${progreso * 75}px,
                ${progreso * 20}px,
                0
              )
              scaleX(-1)
              rotate(${12 - progreso * 7}deg)
              scale(${0.96 - progreso * 0.05})
            `,
          }}
        >
          <Image
            src="/media/categories/escolar/decoracion/hoja-monstera.png"
            alt=""
            fill
            className="
              object-contain
              brightness-[0.78]
              saturate-[0.94]
              drop-shadow-[0_20px_30px_rgba(18,38,20,0.14)]
            "
            sizes="390px"
          />
        </div>

        {/* ===================================================
            HOJA SECUNDARIA IZQUIERDA
        =================================================== */}

        <div
          className="
            escolar-portada-hoja
            escolar-portada-hoja-secundaria-izquierda
            absolute
            -left-[55px]
            bottom-[22%]
            h-[190px]
            w-[250px]
            opacity-80
          "
          style={{
            transform: `
              translate3d(
                ${progreso * -55}px,
                ${progreso * 35}px,
                0
              )
              rotate(${-18 - progreso * 6}deg)
              scale(${0.92 - progreso * 0.04})
            `,
          }}
        >
          <Image
            src="/media/categories/escolar/decoracion/hoja.png"
            alt=""
            fill
            className="
              object-contain
              brightness-[0.84]
              saturate-[0.96]
            "
            sizes="250px"
          />
        </div>

        {/* ===================================================
            HOJA SECUNDARIA DERECHA
        =================================================== */}

        <div
          className="
            escolar-portada-hoja
            escolar-portada-hoja-secundaria-derecha
            absolute
            -right-[50px]
            bottom-[19%]
            h-[210px]
            w-[270px]
            opacity-75
          "
          style={{
            transform: `
              translate3d(
                ${progreso * 60}px,
                ${progreso * 38}px,
                0
              )
              scaleX(-1)
              rotate(${-13 + progreso * 6}deg)
              scale(${0.94 - progreso * 0.04})
            `,
          }}
        >
          <Image
            src="/media/categories/escolar/decoracion/hoja2.png"
            alt=""
            fill
            className="
              object-contain
              brightness-[0.82]
              saturate-[0.94]
            "
            sizes="270px"
          />
        </div>
      </div>

      {/* =====================================================
          AVIÓN DE PAPEL
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          escolar-avion-con-rastro
          pointer-events-none
          absolute
          left-0
          top-[15%]
          z-20
          hidden
          h-[150px]
          w-[310px]
          lg:block
        "
      >
        <svg
          viewBox="0 0 320 150"
          className="
            escolar-rastro-avion
            absolute
            left-[-225px]
            top-[1px]
            h-[135px]
            w-[280px]
            overflow-visible
          "
          fill="none"
        >
          <path
            className="escolar-rastro-linea"
            d="
              M8 122
              C42 117 65 100 84 79
              C107 52 126 32 158 23
              C187 14 215 19 244 27
              C261 31 278 34 300 35
            "
            stroke="#F4EEDC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 10"
          />
        </svg>

        <div className="escolar-avion">
          <svg
            viewBox="0 0 110 70"
            className="
              h-[58px]
              w-[92px]
              drop-shadow-[0_10px_14px_rgba(0,0,0,0.15)]
            "
            fill="none"
          >
            <path
              d="M5 8L104 3L60 65L47 36L5 8Z"
              fill="#F8F5E9"
            />

            <path
              d="M47 36L104 3L59 47L60 65L47 36Z"
              fill="#DED9CB"
            />

            <path
              d="M47 36L104 3L39 29"
              stroke="#C9C3B6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* =====================================================
          ESTRELLAS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          escolar-estrella
          escolar-estrella-1
          absolute
          left-[43%]
          top-[25%]
          z-10
          hidden
          text-2xl
          text-[#E8C95B]/80
          lg:block
        "
      >
        ✦
      </div>

      <div
        aria-hidden="true"
        className="
          escolar-estrella
          escolar-estrella-2
          absolute
          right-[8%]
          top-[37%]
          z-10
          hidden
          text-xl
          text-[#F4E4B2]/70
          lg:block
        "
      >
        ✦
      </div>

      <div
        aria-hidden="true"
        className="
          escolar-estrella
          escolar-estrella-3
          absolute
          bottom-[19%]
          left-[47%]
          z-10
          hidden
          text-lg
          text-[#DDE6D3]/70
          lg:block
        "
      >
        ✦
      </div>

      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[1440px]
          grid-cols-1
          px-5
          pb-16
          pt-32
          sm:px-8
          sm:pt-36
          lg:min-h-[720px]
          lg:grid-cols-[0.92fr_1.08fr]
          lg:items-center
          lg:gap-10
          lg:px-12
          lg:pb-16
          lg:pt-28
          xl:px-16
        "
      >
        {/* TEXTO */}

        <div
          className="
            relative
            z-30
            mx-auto
            w-full
            max-w-[660px]
            lg:mx-0
          "
        >
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-white/15
              bg-white/10
              px-4
              py-2
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-[#E3ECD9]
              backdrop-blur-md
            "
          >
            Kira Escolar
          </span>

          <h1
            id="titulo-escolar"
            className="
              mt-6
              max-w-[650px]
              text-[48px]
              font-semibold
              leading-[0.92]
              tracking-[-0.055em]
              text-[#F8F5E9]
              sm:text-[64px]
              lg:text-[72px]
              xl:text-[82px]
            "
          >
            Pequeños objetos.

            <span
              className="
                mt-1
                block
                text-[#DCE8C8]
              "
            >
              Grandes ideas.
            </span>
          </h1>

          <p
            className="
              mt-7
              max-w-[520px]
              text-base
              leading-7
              text-white/70
              sm:text-lg
            "
          >
            Todo lo que necesitas para estudiar, crear, organizar y
            acompañar tus ideas todos los días.
          </p>

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-3
            "
          >
            <Link
              href="#explorar-escolar"
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                rounded-full
                bg-[#F8F5E9]
                px-6
                text-sm
                font-semibold
                text-[#263327]
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-white
              "
            >
              Explorar Escolar
            </Link>

            <Link
              href="/productos"
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                bg-white/5
                px-6
                text-sm
                font-medium
                text-white
                backdrop-blur-md
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-white/10
              "
            >
              Ver productos
            </Link>
          </div>

          <div
            aria-label="Estudia, crea, organiza y descubre"
            className="
              mt-10
              flex
              flex-wrap
              gap-x-6
              gap-y-2
              text-[13px]
              font-medium
              text-white/45
            "
          >
            <span>Estudia</span>
            <span aria-hidden="true" className="text-[#C9D8B8]">
              •
            </span>

            <span>Crea</span>
            <span aria-hidden="true" className="text-[#C9D8B8]">
              •
            </span>

            <span>Organiza</span>
            <span aria-hidden="true" className="text-[#C9D8B8]">
              •
            </span>

            <span>Descubre</span>
          </div>
        </div>

        {/* =====================================================
            UNIVERSO VISUAL
        ===================================================== */}

        <div
          className="
            relative
            mt-10
            flex
            min-h-[430px]
            w-full
            items-center
            justify-center
            sm:min-h-[500px]
            lg:mt-0
            lg:min-h-[600px]
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              h-[350px]
              w-[350px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#C9D8B8]/10
              blur-[100px]
              sm:h-[450px]
              sm:w-[450px]
            "
          />

          {/* IDEAS QUE DESPEGAN */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[7%]
              top-[47%]
              z-40
              hidden
              -rotate-6
              text-[#F4E4B2]/80
              xl:block
            "
            style={{
              opacity: opacidadDecoracion,
            }}
          >
            <p
              className="
                escolar-texto-manuscrito
                text-[19px]
                leading-[1.05]
              "
            >
              Ideas
              <br />
              que
              <br />
              despegan
            </p>

            <svg
              viewBox="0 0 80 45"
              className="
                ml-2
                mt-1
                h-10
                w-16
              "
              fill="none"
            >
              <path
                d="M4 8C18 28 40 34 65 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M55 17L66 18L61 28"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* FOQUITO */}

          <div
            aria-hidden="true"
            className="
              escolar-foquito
              pointer-events-none
              absolute
              right-[0%]
              top-[18%]
              z-40
              hidden
              h-14
              w-14
              items-center
              justify-center
              text-[#F4E4B2]/85
              xl:flex
            "
            style={{
              opacity: opacidadDecoracion,
            }}
          >
            <svg
              viewBox="0 0 64 64"
              className="h-full w-full"
              fill="none"
            >
              <path
                d="M23 41C23 36 16 32 16 23C16 14.7 22.7 8 31 8C39.3 8 46 14.7 46 23C46 32 39 36 39 41"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />

              <path
                d="M24 45H38"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />

              <path
                d="M26 50H36"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />

              <path
                d="M31 14V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M12 23H7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M55 23H50"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M17 10L13 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M45 10L49 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M27 26L31 22L35 26"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* =====================================================
              ÓRBITA EXTERIOR
          ===================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              z-30
              hidden
              h-[570px]
              w-[570px]
              -translate-x-1/2
              -translate-y-1/2
              lg:block
              xl:h-[640px]
              xl:w-[640px]
            "
          >
            <div className="escolar-orbita-base escolar-orbita-cuaderno">
              <div className="escolar-orbita-compensacion escolar-compensacion-cuaderno">
                <div
                  className="
                    relative
                    h-[180px]
                    w-[180px]
                    xl:h-[210px]
                    xl:w-[210px]
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/cuaderno.png"
                    alt="Cuaderno escolar"
                    fill
                    className="
                      object-contain
                      drop-shadow-[0_20px_26px_rgba(0,0,0,0.18)]
                    "
                    sizes="210px"
                  />
                </div>
              </div>
            </div>

            <div className="escolar-orbita-base escolar-orbita-resaltador">
              <div className="escolar-orbita-compensacion escolar-compensacion-resaltador">
                <div
                  className="
                    relative
                    h-[130px]
                    w-[85px]
                    xl:h-[150px]
                    xl:w-[100px]
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/resaltador.png"
                    alt="Resaltador escolar"
                    fill
                    className="
                      object-contain
                      drop-shadow-[0_18px_22px_rgba(0,0,0,0.18)]
                    "
                    sizes="100px"
                  />
                </div>
              </div>
            </div>

            <div className="escolar-orbita-base escolar-orbita-goma">
              <div className="escolar-orbita-compensacion escolar-compensacion-goma">
                <div
                  className="
                    relative
                    h-[95px]
                    w-[125px]
                    xl:h-[110px]
                    xl:w-[145px]
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/goma.png"
                    alt="Goma de borrar"
                    fill
                    className="
                      object-contain
                      drop-shadow-[0_16px_22px_rgba(0,0,0,0.16)]
                    "
                    sizes="145px"
                  />
                </div>
              </div>
            </div>

            <div className="escolar-orbita-base escolar-orbita-regla">
              <div className="escolar-orbita-compensacion escolar-compensacion-regla">
                <div
                  className="
                    relative
                    h-[60px]
                    w-[185px]
                    xl:h-[70px]
                    xl:w-[215px]
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/regla.png"
                    alt="Regla escolar"
                    fill
                    className="
                      object-contain
                      drop-shadow-[0_15px_20px_rgba(0,0,0,0.16)]
                    "
                    sizes="215px"
                  />
                </div>
              </div>
            </div>

            <div className="escolar-orbita-base escolar-orbita-lapiz">
              <div className="escolar-orbita-compensacion escolar-compensacion-lapiz">
                <div
                  className="
                    relative
                    h-[145px]
                    w-[58px]
                    xl:h-[165px]
                    xl:w-[68px]
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/lapiz.png"
                    alt="Lápiz escolar"
                    fill
                    className="
                      object-contain
                      opacity-80
                      drop-shadow-[0_14px_18px_rgba(0,0,0,0.14)]
                    "
                    sizes="68px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              ÓRBITA INTERIOR
          ===================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              z-10
              hidden
              h-[430px]
              w-[430px]
              -translate-x-1/2
              -translate-y-1/2
              lg:block
              xl:h-[480px]
              xl:w-[480px]
            "
          >
            <div className="escolar-orbita-base escolar-orbita-cuaderno-2">
              <div className="escolar-orbita-compensacion escolar-compensacion-cuaderno-2">
                <div
                  className="
                    relative
                    h-[100px]
                    w-[100px]
                    opacity-55
                    xl:h-[120px]
                    xl:w-[120px]
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/cuaderno.png"
                    alt=""
                    fill
                    className="
                      object-contain
                      drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)]
                    "
                    sizes="120px"
                  />
                </div>
              </div>
            </div>

            <div className="escolar-orbita-base escolar-orbita-resaltador-2">
              <div className="escolar-orbita-compensacion escolar-compensacion-resaltador-2">
                <div
                  className="
                    relative
                    h-[85px]
                    w-[55px]
                    opacity-55
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/resaltador.png"
                    alt=""
                    fill
                    className="
                      object-contain
                      drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)]
                    "
                    sizes="55px"
                  />
                </div>
              </div>
            </div>

            <div className="escolar-orbita-base escolar-orbita-goma-2">
              <div className="escolar-orbita-compensacion escolar-compensacion-goma-2">
                <div
                  className="
                    relative
                    h-[65px]
                    w-[90px]
                    opacity-55
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/goma.png"
                    alt=""
                    fill
                    className="
                      object-contain
                      drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)]
                    "
                    sizes="90px"
                  />
                </div>
              </div>
            </div>

            <div className="escolar-orbita-base escolar-orbita-regla-2">
              <div className="escolar-orbita-compensacion escolar-compensacion-regla-2">
                <div
                  className="
                    relative
                    h-[42px]
                    w-[135px]
                    opacity-50
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/regla.png"
                    alt=""
                    fill
                    className="
                      object-contain
                      drop-shadow-[0_10px_16px_rgba(0,0,0,0.10)]
                    "
                    sizes="135px"
                  />
                </div>
              </div>
            </div>

            <div className="escolar-orbita-base escolar-orbita-lapiz-2">
              <div className="escolar-orbita-compensacion escolar-compensacion-lapiz-2">
                <div
                  className="
                    relative
                    h-[100px]
                    w-[40px]
                    opacity-45
                  "
                >
                  <Image
                    src="/media/categories/escolar/portada/productos/lapiz.png"
                    alt=""
                    fill
                    className="
                      object-contain
                      drop-shadow-[0_10px_16px_rgba(0,0,0,0.10)]
                    "
                    sizes="40px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              KIRA
          ===================================================== */}

          <div
            className="
              relative
              z-20
              h-[390px]
              w-[390px]
              sm:h-[470px]
              sm:w-[470px]
              lg:h-[540px]
              lg:w-[540px]
              xl:h-[580px]
              xl:w-[580px]
            "
            style={{
              transform: `
                translate3d(0, ${movimientoKoala}px, 0)
                scale(${escalaKoala})
                rotate(${rotacionKoala}deg)
              `,
              willChange: "transform",
            }}
          >
            <Image
              src="/media/categories/escolar/mascota/kira-lapiz.png"
              alt="Kira, la mascota de Kira, sosteniendo un lápiz"
              fill
              priority
              className="
                object-contain
                drop-shadow-[0_30px_35px_rgba(0,0,0,0.20)]
              "
              sizes="
                (max-width:640px) 390px,
                (max-width:1024px) 470px,
                580px
              "
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          INDICADOR DE SCROLL
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          escolar-indicador-scroll
          pointer-events-none
          absolute
          bottom-14
          left-1/2
          z-30
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-1
          text-white/45
          lg:flex
        "
      >
        <div
          className="
            flex
            h-8
            w-5
            justify-center
            rounded-full
            border
            border-white/40
            pt-1.5
          "
        >
          <span
            className="
              escolar-punto-scroll
              block
              h-1
              w-1
              rounded-full
              bg-white/70
            "
          />
        </div>

        <svg
          viewBox="0 0 20 12"
          className="h-3 w-4"
          fill="none"
        >
          <path
            d="M3 3L10 9L17 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* =====================================================
          TRANSICIÓN INFERIOR
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-[-1px]
          left-0
          z-40
          h-10
          w-full
          bg-[#F4F0DF]
          [clip-path:polygon(0_60%,10%_45%,20%_58%,31%_44%,43%_60%,54%_43%,67%_58%,79%_45%,90%_60%,100%_48%,100%_100%,0_100%)]
          sm:h-14
        "
      />
    </section>
  );
}