"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Slide =
  | {
      tipo: "video";
      src: string;
      duracion: number;
    }
  | {
      tipo: "imagen";
      src: string;
      duracion: number;

      botonTexto?: string;
      botonHref?: string;

      botonClase?: string;

      botonPosicion?: string;

      imagenHref?: string;
    };

// ============================================================
// SLIDES
// ============================================================

const slides: Slide[] = [
  // ==========================================================
  // VIDEO
  // ==========================================================

  {
    tipo: "video",
    src: "/media/hero/video/video_hero.mp4",
    duracion: 10000,
  },

  // ==========================================================
  // NUEVOS PRODUCTOS
  // ==========================================================

  {
    tipo: "imagen",
    src: "/media/hero/images/nuevos-productos.webp",
    duracion: 5000,

    botonTexto: "Ver novedades",
    botonHref: "/nuevos",

    botonClase: `
      bg-[#777B5D]
      text-[#F3EEE4]
      hover:bg-[#696D50]
    `,

    botonPosicion: `
      bottom-[14%]
      left-[8%]

      sm:bottom-[15%]
      sm:left-[9%]

      md:bottom-[16%]
      md:left-[10%]

      lg:bottom-[21%]
      lg:left-[15%]
    `,
  },

  // ==========================================================
  // GIFT CARD
  // ==========================================================

  {
    tipo: "imagen",
    src: "/media/hero/images/giftcard.webp",
    duracion: 5000,

    imagenHref: "/gift-cards",
  },

  // ==========================================================
  // TECNOLOGÍA
  // ==========================================================

  {
    tipo: "imagen",
    src: "/media/hero/images/tecnologia.webp",
    duracion: 5000,

    botonTexto: "Explorar tecnología",
    botonHref: "/productos/tecnologia",

    botonClase: `
      bg-[#292A2B]
      text-[#F3EEE4]
      hover:bg-[#181919]
    `,

    botonPosicion: `
      bottom-[27%]
      left-[19%]
      -translate-x-1/2
    `,
  },
];

// ============================================================
// CONTENIDO DEL SLIDE
// ============================================================

function SlideContenido({
  slide,
  videoRef,
  bienvenidaKey,
}: {
  slide: Slide;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  bienvenidaKey?: number;
}) {
  // ==========================================================
  // CONTENIDO VISUAL
  // ==========================================================

  const contenido =
    slide.tipo === "video" ? (
      <video
        ref={videoRef}
        src={slide.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="
          absolute
          inset-0

          h-full
          w-full

          object-cover
          object-center
        "
      />
    ) : (
      <img
        src={slide.src}
        alt=""
        draggable={false}
        className="
          absolute
          inset-0

          h-full
          w-full

          object-cover
          object-center
        "
      />
    );

  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
      "
    >
      {/* =====================================================
          ANIMACIÓN DE BIENVENIDA
          SOLO EN EL VIDEO
      ===================================================== */}

      {slide.tipo === "video" && (
        <div
          className="
            pointer-events-none

            absolute
            inset-0
            z-20

            flex
            items-center
            justify-center
          "
        >
          <div
            key={`bienvenida-${bienvenidaKey}`}
            className="
              animate-bienvenida-kira

              whitespace-nowrap

              text-center
              text-3xl
              font-medium
              uppercase
              tracking-[0.12em]

              text-white

              drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]

              sm:text-4xl

              md:text-5xl

              lg:text-6xl

              xl:text-7xl
            "
          >
            Bienvenido a Kira
          </div>
        </div>
      )}

      {/* =====================================================
          IMAGEN / VIDEO
      ===================================================== */}

      {slide.tipo === "imagen" && slide.imagenHref ? (
        <a
          href={slide.imagenHref}
          aria-label="Ver Gift Cards"
          className="
            absolute
            inset-0
            block

            h-full
            w-full
          "
        >
          {contenido}
        </a>
      ) : (
        contenido
      )}

      {/* =====================================================
          BOTÓN
      ===================================================== */}

      {slide.tipo === "imagen" &&
        slide.botonTexto &&
        slide.botonHref && (
          <div
            className={`
              absolute
              z-20

              ${
                slide.botonPosicion ??
                "bottom-[8%] left-1/2 -translate-x-1/2"
              }
            `}
          >
            <a
              href={slide.botonHref}
              className={`
                inline-flex
                min-h-11
                items-center
                justify-center

                rounded-full

                px-6
                py-3

                text-sm
                font-medium
                tracking-wide

                shadow-md

                transition-all
                duration-300

                hover:scale-[1.03]

                active:scale-[0.98]

                sm:min-h-12
                sm:px-7
                sm:py-3.5

                md:min-h-12
                md:px-8
                md:py-3.5
                md:text-base

                lg:min-h-14
                lg:px-13
                lg:py-5
                lg:text-lg

                ${slide.botonClase ?? ""}
              `}
            >
              {slide.botonTexto}
            </a>
          </div>
        )}
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

export default function Hero() {
  const [slideActual, setSlideActual] = useState(0);

  // Contador para reiniciar la animación de bienvenida.
  const [bienvenidaKey, setBienvenidaKey] = useState(0);

  // Referencia al video.
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const slide = slides[slideActual];

  // ==========================================================
  // REINICIAR VIDEO AL VOLVER AL SLIDE 0
  // ==========================================================

  useEffect(() => {
    if (slideActual !== 0) return;

    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;

    const reproducirVideo = async () => {
      try {
        await video.play();
      } catch {
        // Algunos navegadores pueden bloquear play()
        // en determinadas circunstancias.
      }
    };

    reproducirVideo();
  }, [slideActual]);

  // ==========================================================
  // CAMBIO AUTOMÁTICO
  // ==========================================================

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSlideActual((actual) => {
        const siguiente =
          (actual + 1) % slides.length;

        if (siguiente === 0) {
          setBienvenidaKey(
            (key) => key + 1
          );
        }

        return siguiente;
      });
    }, slide.duracion);

    return () => {
      window.clearTimeout(timer);
    };
  }, [slideActual, slide.duracion]);

  // ==========================================================
  // CAMBIO MANUAL
  // ==========================================================

  const cambiarSlide = (index: number) => {
    if (index === slideActual) return;

    if (index === 0) {
      setBienvenidaKey(
        (key) => key + 1
      );
    }

    setSlideActual(index);
  };

  // ==========================================================
  // SLIDE ANTERIOR
  // ==========================================================

  const slideAnterior = () => {
    setSlideActual((actual) => {
      const anterior =
        actual === 0
          ? slides.length - 1
          : actual - 1;

      if (anterior === 0) {
        setBienvenidaKey(
          (key) => key + 1
        );
      }

      return anterior;
    });
  };

  // ==========================================================
  // SLIDE SIGUIENTE
  // ==========================================================

  const slideSiguiente = () => {
    setSlideActual((actual) => {
      const siguiente =
        (actual + 1) % slides.length;

      if (siguiente === 0) {
        setBienvenidaKey(
          (key) => key + 1
        );
      }

      return siguiente;
    });
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        bg-black
      "
    >
      {/* =====================================================
          CONTENEDOR FULL SCREEN
      ===================================================== */}

      <div
        className="
          relative

          h-[100svh]
          min-h-[620px]

          w-full

          overflow-hidden

          sm:min-h-[700px]

          lg:h-[100vh]
          lg:min-h-[760px]
      "
      >
        {/* =================================================
            CARRUSEL HORIZONTAL
        ================================================= */}

        <div
          className="
            flex
            h-full
            w-full

            transition-transform
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          style={{
            transform:
              `translateX(-${slideActual * 100}%)`,
          }}
        >
          {slides.map((slideItem, index) => (
            <div
              key={index}
              className="
                relative

                h-full
                w-full
                min-w-full
                shrink-0
              "
            >
              <SlideContenido
                slide={slideItem}
                videoRef={
                  index === 0
                    ? videoRef
                    : undefined
                }
                bienvenidaKey={
                  index === 0
                    ? bienvenidaKey
                    : undefined
                }
              />
            </div>
          ))}
        </div>

        {/* =================================================
            FLECHA IZQUIERDA
            SOLO MÓVIL
        ================================================= */}

        <button
          type="button"
          onClick={slideAnterior}
          aria-label="Slide anterior"
          className="
            absolute
            left-3
            top-1/2
            z-40

            flex
            h-10
            w-10

            -translate-y-1/2

            items-center
            justify-center

            rounded-full

            bg-black/25

            text-white

            shadow-md
            backdrop-blur-sm

            transition-all
            duration-200

            active:scale-90

            sm:left-4
            sm:h-11
            sm:w-11

            md:hidden
          "
        >
          <ChevronLeft
            className="
              h-5
              w-5

              sm:h-6
              sm:w-6
            "
            strokeWidth={2}
          />
        </button>

        {/* =================================================
            FLECHA DERECHA
            SOLO MÓVIL
        ================================================= */}

        <button
          type="button"
          onClick={slideSiguiente}
          aria-label="Slide siguiente"
          className="
            absolute
            right-3
            top-1/2
            z-40

            flex
            h-10
            w-10

            -translate-y-1/2

            items-center
            justify-center

            rounded-full

            bg-black/25

            text-white

            shadow-md
            backdrop-blur-sm

            transition-all
            duration-200

            active:scale-90

            sm:right-4
            sm:h-11
            sm:w-11

            md:hidden
          "
        >
          <ChevronRight
            className="
              h-5
              w-5

              sm:h-6
              sm:w-6
            "
            strokeWidth={2}
          />
        </button>

        {/* =================================================
            INDICADORES
        ================================================= */}

        <div
          className="
            absolute
            bottom-4
            left-1/2
            z-40

            flex

            -translate-x-1/2

            items-center
            gap-1.5

            sm:bottom-5
            sm:gap-2

            md:bottom-6
          "
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                cambiarSlide(index)
              }
              aria-label={`Ir al slide ${index + 1}`}
              aria-current={
                index === slideActual
                  ? "true"
                  : undefined
              }
              className={`
                transition-all
                duration-500

                ${
                  index === slideActual
                    ? `
                      h-1.5
                      w-5

                      rounded-full

                      bg-white

                      sm:h-2
                      sm:w-7
                    `
                    : `
                      h-1.5
                      w-1.5

                      rounded-full

                      bg-white/50

                      sm:h-2
                      sm:w-2
                    `
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}