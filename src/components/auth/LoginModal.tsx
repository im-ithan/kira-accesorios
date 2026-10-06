"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";

import LoginForm from "@/components/auth/LoginForm";

interface LoginModalProps {
  abierto: boolean;
  onCerrar: () => void;
}

export default function LoginModal({
  abierto,
  onCerrar,
}: LoginModalProps) {
  useEffect(() => {
    if (!abierto) return;

    const manejarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCerrar();
      }
    };

    document.addEventListener("keydown", manejarTecla);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", manejarTecla);
      document.body.style.overflow = "";
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/35
        p-4
        backdrop-blur-md
        sm:p-6
      "
      onMouseDown={onCerrar}
    >
      {/* MODAL */}

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Iniciar sesión"
        onMouseDown={(event) => event.stopPropagation()}
        className="
          relative
          max-h-[calc(100vh-32px)]
          w-full
          max-w-[1050px]
          overflow-y-auto
          overflow-x-hidden
          rounded-[30px]
          bg-[#F8F7F3]
          shadow-[0_30px_100px_rgba(0,0,0,0.25)]
          sm:max-h-[calc(100vh-48px)]
          lg:grid
          lg:grid-cols-[0.8fr_1.2fr]
          lg:overflow-hidden
        "
      >
        {/* ================================================
            ZONA VISUAL
        ================================================ */}

        <section
          className="
            relative
            hidden
            min-h-[650px]
            overflow-hidden
            bg-[#ECE9DD]
            lg:flex
            lg:flex-col
            lg:justify-between
            lg:p-10
          "
        >
          {/* DECORACIÓN */}

          <div
            className="
              pointer-events-none
              absolute
              -left-32
              -top-28
              h-[320px]
              w-[320px]
              rounded-full
              bg-[#C9CE76]/40
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              -right-40
              h-[440px]
              w-[440px]
              rounded-full
              bg-[#777B5D]/10
            "
          />

          {/* LOGO */}

          <Link
            href="/"
            onClick={onCerrar}
            className="
              relative
              z-20
              inline-flex
              w-fit
              text-[26px]
              font-semibold
              tracking-[-0.04em]
              text-[#181818]
              transition
              hover:opacity-60
            "
          >
            Kira
          </Link>

          {/* TEXTO */}

          <div className="relative z-20">
            <p
              className="
                mb-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#777B5D]
              "
            >
              Tu espacio en Kira
            </p>

            <h2
              className="
                text-[38px]
                font-semibold
                leading-[0.98]
                tracking-[-0.05em]
                text-[#181818]
              "
            >
              Todo lo que
              <br />
              te gusta,
              <br />
              más cerca.
            </h2>

            <p
              className="
                mt-5
                max-w-[290px]
                text-sm
                leading-6
                text-black/45
              "
            >
              Guarda tus favoritos, revisa tus compras y disfruta de una
              experiencia más personal.
            </p>
          </div>

          <p
            className="
              relative
              z-20
              max-w-[260px]
              text-[11px]
              leading-5
              text-black/35
            "
          >
            Tecnología, escolar, viaje, accesorios y mucho más.
          </p>
        </section>

        {/* ================================================
            LOGIN
        ================================================ */}

        <section
          className="
            relative
            flex
            min-h-[650px]
            items-center
            justify-center
            overflow-hidden
            px-6
            py-16
            sm:px-10
            lg:px-14
            lg:py-10
          "
        >
          {/* CERRAR */}

          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="
              absolute
              right-5
              top-5
              z-40
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-black/[0.07]
              bg-white/70
              text-black/45
              backdrop-blur-md
              transition-all
              duration-300
              hover:bg-white
              hover:text-[#181818]
              hover:shadow-sm
            "
          >
            <X className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>

          {/* KIRA */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-125px]
              top-1/2
              z-10
              hidden
              h-[330px]
              w-[330px]
              -translate-y-1/2
              xl:block
            "
          >
            <Image
              src="/media/kira/auth/kira-login.png"
              alt=""
              fill
              className="object-contain"
              sizes="330px"
            />
          </div>

          {/* FORM */}

          <div className="relative z-20 w-full max-w-[440px]">
            {/* LOGO MÓVIL */}

            <div className="mb-10 flex items-center justify-between lg:hidden">
              <Link
                href="/"
                onClick={onCerrar}
                className="
                  text-2xl
                  font-semibold
                  tracking-[-0.04em]
                  text-[#181818]
                "
              >
                Kira
              </Link>
            </div>

            <LoginForm />
          </div>
        </section>
      </div>
    </div>
  );
}