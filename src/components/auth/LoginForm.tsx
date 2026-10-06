"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function LoginForm() {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <div className="w-full max-w-[480px]">
      {/* =====================================================
          CABECERA
      ===================================================== */}

      <div className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#777B5D]">
          Bienvenido de nuevo
        </p>

        <h1 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#181818] sm:text-5xl">
          Inicia sesión
        </h1>

        <p className="mt-4 max-w-[420px] text-base leading-7 text-black/50">
          Entra a tu cuenta para continuar descubriendo todo lo que Kira tiene
          para ti.
        </p>
      </div>

      {/* =====================================================
          FORMULARIO
      ===================================================== */}

      <form className="space-y-6">
        {/* ===================================================
            CORREO
        =================================================== */}

        <div>
          <label
            htmlFor="email"
            className="mb-2.5 block text-sm font-semibold text-[#181818]"
          >
            Correo electrónico
          </label>

          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35"
              strokeWidth={1.8}
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              required
              className="
                block
                h-14
                w-full
                rounded-2xl
                border
                border-black/10
                bg-[#F8F7F3]
                pl-14
                pr-5
                text-base
                text-[#181818]
                outline-none
                transition-all
                duration-300
                placeholder:text-black/30
                hover:border-black/20
                focus:border-[#777B5D]
                focus:bg-white
                focus:ring-4
                focus:ring-[#777B5D]/10
              "
            />
          </div>
        </div>

        {/* ===================================================
            CONTRASEÑA
        =================================================== */}

        <div>
          <div className="mb-2.5 flex items-center justify-between gap-4">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#181818]"
            >
              Contraseña
            </label>

            <Link
              href="/recuperar-contrasena"
              className="text-sm font-medium text-[#777B5D] transition hover:opacity-70"
            >
              ¿La olvidaste?
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35"
              strokeWidth={1.8}
            />

            <input
              id="password"
              name="password"
              type={mostrarPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Tu contraseña"
              required
              className="
                block
                h-14
                w-full
                rounded-2xl
                border
                border-black/10
                bg-[#F8F7F3]
                pl-14
                pr-14
                text-base
                text-[#181818]
                outline-none
                transition-all
                duration-300
                placeholder:text-black/30
                hover:border-black/20
                focus:border-[#777B5D]
                focus:bg-white
                focus:ring-4
                focus:ring-[#777B5D]/10
              "
            />

            <button
              type="button"
              onClick={() => setMostrarPassword((actual) => !actual)}
              aria-label={
                mostrarPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
              className="
                absolute
                right-4
                top-1/2
                flex
                h-9
                w-9
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                text-black/35
                transition
                hover:bg-black/5
                hover:text-black/70
              "
            >
              {mostrarPassword ? (
                <EyeOff className="h-5 w-5" strokeWidth={1.8} />
              ) : (
                <Eye className="h-5 w-5" strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>

        {/* ===================================================
            BOTÓN
        =================================================== */}

        <button
          type="submit"
          className="
            group
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-2.5
            rounded-full
            bg-[#777B5D]
            px-6
            text-base
            font-semibold
            text-white
            shadow-[0_12px_30px_rgba(119,123,93,0.20)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#696D50]
            hover:shadow-[0_16px_35px_rgba(119,123,93,0.26)]
            active:translate-y-0
          "
        >
          Iniciar sesión

          <ArrowRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </button>
      </form>

      {/* =====================================================
          CREAR CUENTA
      ===================================================== */}

      <div className="mt-9 border-t border-black/10 pt-7">
        <p className="text-center text-sm text-black/50">
          ¿Primera vez en Kira?{" "}
          <Link
            href="/registro"
            className="font-semibold text-[#777B5D] transition hover:opacity-70"
          >
            Crear una cuenta
          </Link>
        </p>
      </div>

      {/* =====================================================
          TÉRMINOS
      ===================================================== */}

      <p className="mt-8 text-center text-xs leading-5 text-black/35">
        Al continuar aceptas los términos y las políticas de privacidad de Kira.
      </p>
    </div>
  );
}