"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// ============================================================
// TIPOS
// ============================================================

type Categoria = {
  nombre: string;
  descripcion: string;
  href: string;
  video: string;
  posicion?: string;
};

// ============================================================
// CATEGORÍAS
// ============================================================

const categorias: Categoria[] = [
  {
    nombre: "Escolar",
    descripcion: "Todo para estudiar",
    href: "/escolar",
    video: "/media/categories/escolar.mp4",
    posicion: "object-center",
  },
  {
    nombre: "Viaje",
    descripcion: "Viaja con estilo",
    href: "/viaje",
    video: "/media/categories/viaje.mp4",
    posicion: "object-center",
  },
  {
    nombre: "Tecnología",
    descripcion: "Gadgets que conectan",
    href: "/tecnologia",
    video: "/media/categories/tecnologia.mp4",
    posicion: "object-center",
  },
  {
    nombre: "Accesorios",
    descripcion: "Pequeños detalles que importan",
    href: "/accesorios",
    video: "/media/categories/accesorios.mp4",
    posicion: "object-center",
  },
  {
    nombre: "Destacados",
    descripcion: "Lo que todos quieren",
    href: "/productos",
    video: "/media/categories/destacados.mp4",
    posicion: "object-center",
  },
];

// ============================================================
// VIDEO DE CATEGORÍA
// ============================================================

function VideoCategoria({
  src,
  posicion = "object-center",
  videoRef,
  videoTerminado,
}: {
  src: string;
  posicion?: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoTerminado: React.MutableRefObject<boolean>;
}) {
  // ==========================================================
  // REPRODUCIR
  // ==========================================================

  const reproducir = () => {
    const video = videoRef.current;

    if (!video) return;

    video.play().catch(() => {
      // Algunos navegadores pueden bloquear autoplay.
    });
  };

  // ==========================================================
  // CUANDO TERMINA
  // ==========================================================

  const manejarFinal = () => {
    const video = videoRef.current;

    if (!video) return;

    videoTerminado.current = true;

    video.pause();
    video.currentTime = 0;
  };

  // ==========================================================
  // AUTOPLAY AL ENTRAR EN PANTALLA
  // ==========================================================

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!videoTerminado.current) {
            reproducir();
          }
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [videoRef, videoTerminado]);

  // ==========================================================
  // VIDEO
  // ==========================================================

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="metadata"
      onEnded={manejarFinal}
      className={`
        pointer-events-none
        absolute
        inset-0

        h-full
        w-full

        object-cover
        ${posicion}

        scale-[1.01]

        transition-transform
        duration-[1400ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]

        group-hover:scale-[1.035]
      `}
    />
  );
}

// ============================================================
// CATEGORÍA
// ============================================================

function ItemCategoria({
  categoria,
  className = "",
}: {
  categoria: Categoria;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTerminado = useRef(false);

  // ==========================================================
  // REINICIAR VIDEO AL HACER HOVER
  // ==========================================================

  const manejarMouseEnter = () => {
    const video = videoRef.current;

    if (!video) return;

    // Si el video todavía está reproduciéndose,
    // no hacemos nada.
    if (!videoTerminado.current) return;

    video.currentTime = 0;
    videoTerminado.current = false;

    video.play().catch(() => {
      // Algunos navegadores pueden bloquear autoplay.
    });
  };

  return (
    <Link
      href={categoria.href}
      aria-label={`Explorar categoría ${categoria.nombre}`}
      onMouseEnter={manejarMouseEnter}
      className={`
        group
        relative
        isolate
        block

        min-h-[360px]

        overflow-hidden
        rounded-[28px]

        bg-[#D8D5C9]

        transition-transform
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]

        hover:-translate-y-[2px]

        ${className}
      `}
    >
      {/* =====================================================
          VIDEO
      ===================================================== */}

      <VideoCategoria
        src={categoria.video}
        posicion={categoria.posicion}
        videoRef={videoRef}
        videoTerminado={videoTerminado}
      />

      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-black/[0.04]

          transition-all
          duration-700

          group-hover:bg-black/[0.08]
        "
      />

      {/* =====================================================
          GRADIENTE INFERIOR
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-gradient-to-t
          from-black/75
          via-black/15
          to-transparent

          opacity-[0.92]

          transition-opacity
          duration-700

          group-hover:opacity-100
        "
      />

      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10

          flex
          flex-col
          justify-end

          p-6
          sm:p-7
          lg:p-8
        "
      >
        <div className="max-w-[420px]">
          {/* =================================================
              LÍNEA DECORATIVA
          ================================================= */}

          <div
            className="
              mb-4

              h-[2px]
              w-9

              bg-[#C9CE76]

              transition-all
              duration-500
              ease-out

              group-hover:w-14
            "
          />

          {/* =================================================
              NOMBRE
          ================================================= */}

          <h3
            className="
              text-3xl
              font-semibold
              leading-[0.95]
              tracking-[-0.045em]

              text-white

              sm:text-4xl
              lg:text-[42px]
            "
          >
            {categoria.nombre}
          </h3>

          {/* =================================================
              DESCRIPCIÓN
          ================================================= */}

          <p
            className="
              mt-3

              max-w-[320px]

              text-sm
              leading-relaxed

              text-white/80

              sm:text-base
            "
          >
            {categoria.descripcion}
          </p>

          {/* =================================================
              ENLACE VISUAL
          ================================================= */}

          <div
            className="
              mt-5

              inline-flex
              items-center
              gap-2

              border-b
              border-white/60

              pb-1

              text-sm
              font-medium

              text-white

              transition-all
              duration-500

              group-hover:gap-3
              group-hover:border-white
            "
          >
            <span>Explorar categoría</span>

            <ArrowUpRight
              className="
                h-4
                w-4

                transition-transform
                duration-500

                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
              strokeWidth={1.8}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function Categories() {
  const escolar = categorias[0];
  const viaje = categorias[1];
  const tecnologia = categorias[2];
  const accesorios = categorias[3];
  const destacados = categorias[4];

  return (
    <section
      className="
        w-full

        bg-[#F5F4EE]

        px-4
        py-20

        sm:px-6
        sm:py-24

        lg:px-8
        lg:py-28
      "
      aria-labelledby="categorias-title"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* ===================================================
            ENCABEZADO
        =================================================== */}

        <div
          className="
            mb-10

            text-center

            sm:mb-12
            lg:mb-14
          "
        >
          <p
            className="
              mb-3

              text-[10px]
              font-semibold
              uppercase
              tracking-[0.28em]

              text-[#777B5D]

              sm:text-[11px]
            "
          >
            Encuentra lo que va contigo
          </p>

          <h2
            id="categorias-title"
            className="
              text-4xl
              font-semibold
              leading-[0.95]
              tracking-[-0.055em]

              text-[#151515]

              sm:text-5xl
              lg:text-[64px]
            "
          >
            Explora nuestras categorías
          </h2>

          <p
            className="
              mx-auto
              mt-5

              max-w-[600px]

              text-sm
              leading-relaxed

              text-black/55

              sm:text-base
            "
          >
            Productos seleccionados para acompañarte en cada momento.
          </p>
        </div>

        {/* ===================================================
            GRID
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4

            md:grid-cols-12
            md:auto-rows-[190px]

            lg:gap-5
          "
        >
          {/* =================================================
              ESCOLAR
          ================================================= */}

          <ItemCategoria
            categoria={escolar}
            className="
              md:col-span-7
              md:row-span-2
              md:min-h-0
            "
          />

          {/* =================================================
              VIAJE
          ================================================= */}

          <ItemCategoria
            categoria={viaje}
            className="
              md:col-span-5
              md:row-span-2
              md:min-h-0
            "
          />

          {/* =================================================
              TECNOLOGÍA
          ================================================= */}

          <ItemCategoria
            categoria={tecnologia}
            className="
              md:col-span-5
              md:row-span-2
              md:min-h-0
            "
          />

          {/* =================================================
              ACCESORIOS
          ================================================= */}

          <ItemCategoria
            categoria={accesorios}
            className="
              md:col-span-4
              md:row-span-2
              md:min-h-0
            "
          />

          {/* =================================================
              DESTACADOS
          ================================================= */}

          <ItemCategoria
            categoria={destacados}
            className="
              md:col-span-3
              md:row-span-2
              md:min-h-0
            "
          />
        </div>
      </div>
    </section>
  );
}