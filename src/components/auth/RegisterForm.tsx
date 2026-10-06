"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

interface ErroresRegistro {
  nombre?: string;
  apellido?: string;
  correo?: string;
  contrasena?: string;
  confirmarContrasena?: string;
  terminos?: string;
}

export default function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] =
    useState("");

  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const [mostrarContrasena, setMostrarContrasena] =
    useState(false);

  const [
    mostrarConfirmarContrasena,
    setMostrarConfirmarContrasena,
  ] = useState(false);

  const [errores, setErrores] =
    useState<ErroresRegistro>({});

  const [registroExitoso, setRegistroExitoso] =
    useState(false);

  // ==========================================================
  // VALIDAR CORREO
  // ==========================================================

  const correoValido = (valor: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  };

  // ==========================================================
  // VALIDAR FORMULARIO
  // ==========================================================

  const validarFormulario = () => {
    const nuevosErrores: ErroresRegistro = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "Ingresa tu nombre.";
    }

    if (!apellido.trim()) {
      nuevosErrores.apellido = "Ingresa tu apellido.";
    }

    if (!correo.trim()) {
      nuevosErrores.correo =
        "Ingresa tu correo electrónico.";
    } else if (!correoValido(correo)) {
      nuevosErrores.correo =
        "Ingresa un correo electrónico válido.";
    }

    if (!contrasena) {
      nuevosErrores.contrasena =
        "Ingresa una contraseña.";
    } else if (contrasena.length < 8) {
      nuevosErrores.contrasena =
        "La contraseña debe tener al menos 8 caracteres.";
    }

    if (!confirmarContrasena) {
      nuevosErrores.confirmarContrasena =
        "Confirma tu contraseña.";
    } else if (
      contrasena !== confirmarContrasena
    ) {
      nuevosErrores.confirmarContrasena =
        "Las contraseñas no coinciden.";
    }

    if (!aceptaTerminos) {
      nuevosErrores.terminos =
        "Debes aceptar los términos y condiciones.";
    }

    return nuevosErrores;
  };

  // ==========================================================
  // ENVIAR FORMULARIO
  // ==========================================================

  const manejarSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setRegistroExitoso(false);

    const nuevosErrores = validarFormulario();

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // ========================================================
    // SIMULACIÓN DE REGISTRO
    // ========================================================

    setRegistroExitoso(true);

    console.log("Usuario simulado creado:", {
      nombre,
      apellido,
      correo,
    });
  };

  return (
    <div className="w-full">
      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <div className="mb-8">
        <p
          className="
            mb-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-[#777B5D]
          "
        >
          Crea tu cuenta
        </p>

        <h1
          className="
            text-[34px]
            font-semibold
            leading-[1]
            tracking-[-0.05em]
            text-[#181818]
            sm:text-[38px]
          "
        >
          Bienvenido a Kira.
        </h1>

        <p
          className="
            mt-4
            max-w-[420px]
            text-sm
            leading-6
            text-black/45
          "
        >
          Crea tu cuenta para guardar favoritos,
          revisar tus compras y disfrutar de una
          experiencia más personal.
        </p>
      </div>

      {/* =====================================================
          FORMULARIO
      ===================================================== */}

      <form
        onSubmit={manejarSubmit}
        noValidate
        className="space-y-5"
      >
        {/* ===================================================
            NOMBRE + APELLIDO
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
          "
        >
          {/* NOMBRE */}

          <div>
            <label
              htmlFor="nombre"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-[#181818]
              "
            >
              Nombre
            </label>

            <input
              id="nombre"
              name="nombre"
              type="text"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);

                if (errores.nombre) {
                  setErrores((actual) => ({
                    ...actual,
                    nombre: undefined,
                  }));
                }
              }}
              placeholder="Tu nombre"
              aria-invalid={Boolean(errores.nombre)}
              aria-describedby={
                errores.nombre
                  ? "error-nombre"
                  : undefined
              }
              className={`
                h-12
                w-full
                rounded-[14px]
                border
                bg-white
                px-4
                text-sm
                text-[#181818]
                outline-none
                transition-all
                duration-300
                placeholder:text-black/30

                ${
                  errores.nombre
                    ? `
                        border-red-400
                        ring-4
                        ring-red-50
                      `
                    : `
                        border-black/[0.08]
                        focus:border-[#777B5D]
                        focus:ring-4
                        focus:ring-[#777B5D]/10
                      `
                }
              `}
            />

            {errores.nombre && (
              <p
                id="error-nombre"
                className="
                  mt-1.5
                  text-xs
                  font-medium
                  text-red-500
                "
              >
                {errores.nombre}
              </p>
            )}
          </div>

          {/* APELLIDO */}

          <div>
            <label
              htmlFor="apellido"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-[#181818]
              "
            >
              Apellido
            </label>

            <input
              id="apellido"
              name="apellido"
              type="text"
              value={apellido}
              onChange={(event) => {
                setApellido(event.target.value);

                if (errores.apellido) {
                  setErrores((actual) => ({
                    ...actual,
                    apellido: undefined,
                  }));
                }
              }}
              placeholder="Tu apellido"
              aria-invalid={Boolean(
                errores.apellido,
              )}
              className={`
                h-12
                w-full
                rounded-[14px]
                border
                bg-white
                px-4
                text-sm
                text-[#181818]
                outline-none
                transition-all
                duration-300
                placeholder:text-black/30

                ${
                  errores.apellido
                    ? `
                        border-red-400
                        ring-4
                        ring-red-50
                      `
                    : `
                        border-black/[0.08]
                        focus:border-[#777B5D]
                        focus:ring-4
                        focus:ring-[#777B5D]/10
                      `
                }
              `}
            />

            {errores.apellido && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errores.apellido}
              </p>
            )}
          </div>
        </div>

        {/* ===================================================
            CORREO
        =================================================== */}

        <div>
          <label
            htmlFor="correo"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[#181818]
            "
          >
            Correo electrónico
          </label>

          <input
            id="correo"
            name="correo"
            type="email"
            value={correo}
            onChange={(event) => {
              setCorreo(event.target.value);

              if (errores.correo) {
                setErrores((actual) => ({
                  ...actual,
                  correo: undefined,
                }));
              }
            }}
            placeholder="nombre@correo.com"
            aria-invalid={Boolean(errores.correo)}
            className={`
              h-12
              w-full
              rounded-[14px]
              border
              bg-white
              px-4
              text-sm
              text-[#181818]
              outline-none
              transition-all
              duration-300
              placeholder:text-black/30

              ${
                errores.correo
                  ? `
                      border-red-400
                      ring-4
                      ring-red-50
                    `
                  : `
                      border-black/[0.08]
                      focus:border-[#777B5D]
                      focus:ring-4
                      focus:ring-[#777B5D]/10
                    `
              }
            `}
          />

          {errores.correo && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errores.correo}
            </p>
          )}
        </div>

        {/* ===================================================
            CONTRASEÑA
        =================================================== */}

        <div>
          <label
            htmlFor="contrasena"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[#181818]
            "
          >
            Contraseña
          </label>

          <div className="relative">
            <input
              id="contrasena"
              name="contrasena"
              type={
                mostrarContrasena
                  ? "text"
                  : "password"
              }
              value={contrasena}
              onChange={(event) => {
                setContrasena(
                  event.target.value,
                );

                if (errores.contrasena) {
                  setErrores((actual) => ({
                    ...actual,
                    contrasena: undefined,
                  }));
                }
              }}
              placeholder="Mínimo 8 caracteres"
              aria-invalid={Boolean(
                errores.contrasena,
              )}
              className={`
                h-12
                w-full
                rounded-[14px]
                border
                bg-white
                px-4
                pr-12
                text-sm
                text-[#181818]
                outline-none
                transition-all
                duration-300
                placeholder:text-black/30

                ${
                  errores.contrasena
                    ? `
                        border-red-400
                        ring-4
                        ring-red-50
                      `
                    : `
                        border-black/[0.08]
                        focus:border-[#777B5D]
                        focus:ring-4
                        focus:ring-[#777B5D]/10
                      `
                }
              `}
            />

            <button
              type="button"
              onClick={() =>
                setMostrarContrasena(
                  (actual) => !actual,
                )
              }
              aria-label={
                mostrarContrasena
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
              className="
                absolute
                right-3
                top-1/2
                flex
                h-8
                w-8
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                text-black/35
                transition-colors
                hover:text-[#777B5D]
              "
            >
              {mostrarContrasena ? (
                <EyeOff
                  className="h-[18px] w-[18px]"
                  strokeWidth={1.8}
                />
              ) : (
                <Eye
                  className="h-[18px] w-[18px]"
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>

          {errores.contrasena && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errores.contrasena}
            </p>
          )}
        </div>

        {/* ===================================================
            CONFIRMAR CONTRASEÑA
        =================================================== */}

        <div>
          <label
            htmlFor="confirmarContrasena"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[#181818]
            "
          >
            Confirmar contraseña
          </label>

          <div className="relative">
            <input
              id="confirmarContrasena"
              name="confirmarContrasena"
              type={
                mostrarConfirmarContrasena
                  ? "text"
                  : "password"
              }
              value={confirmarContrasena}
              onChange={(event) => {
                setConfirmarContrasena(
                  event.target.value,
                );

                if (
                  errores.confirmarContrasena
                ) {
                  setErrores((actual) => ({
                    ...actual,
                    confirmarContrasena:
                      undefined,
                  }));
                }
              }}
              placeholder="Repite tu contraseña"
              aria-invalid={Boolean(
                errores.confirmarContrasena,
              )}
              className={`
                h-12
                w-full
                rounded-[14px]
                border
                bg-white
                px-4
                pr-12
                text-sm
                text-[#181818]
                outline-none
                transition-all
                duration-300
                placeholder:text-black/30

                ${
                  errores.confirmarContrasena
                    ? `
                        border-red-400
                        ring-4
                        ring-red-50
                      `
                    : `
                        border-black/[0.08]
                        focus:border-[#777B5D]
                        focus:ring-4
                        focus:ring-[#777B5D]/10
                      `
                }
              `}
            />

            <button
              type="button"
              onClick={() =>
                setMostrarConfirmarContrasena(
                  (actual) => !actual,
                )
              }
              aria-label={
                mostrarConfirmarContrasena
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
              className="
                absolute
                right-3
                top-1/2
                flex
                h-8
                w-8
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                text-black/35
                transition-colors
                hover:text-[#777B5D]
              "
            >
              {mostrarConfirmarContrasena ? (
                <EyeOff
                  className="h-[18px] w-[18px]"
                  strokeWidth={1.8}
                />
              ) : (
                <Eye
                  className="h-[18px] w-[18px]"
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>

          {errores.confirmarContrasena && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errores.confirmarContrasena}
            </p>
          )}
        </div>

        {/* ===================================================
            TÉRMINOS
        =================================================== */}

        <div>
          <label
            className="
              flex
              cursor-pointer
              items-start
              gap-3
            "
          >
            <input
              type="checkbox"
              checked={aceptaTerminos}
              onChange={(event) => {
                setAceptaTerminos(
                  event.target.checked,
                );

                if (errores.terminos) {
                  setErrores((actual) => ({
                    ...actual,
                    terminos: undefined,
                  }));
                }
              }}
              className="
                mt-0.5
                h-4
                w-4
                accent-[#777B5D]
              "
            />

            <span
              className="
                text-xs
                leading-5
                text-black/50
              "
            >
              Acepto los{" "}
              <Link
                href="/terminos"
                className="
                  font-medium
                  text-[#777B5D]
                  hover:underline
                "
              >
                términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link
                href="/privacidad"
                className="
                  font-medium
                  text-[#777B5D]
                  hover:underline
                "
              >
                política de privacidad
              </Link>
              .
            </span>
          </label>

          {errores.terminos && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errores.terminos}
            </p>
          )}
        </div>

        {/* ===================================================
            REGISTRO EXITOSO
        =================================================== */}

        {registroExitoso && (
          <div
            className="
              flex
              items-start
              gap-3
              rounded-[16px]
              border
              border-[#777B5D]/20
              bg-[#777B5D]/10
              p-4
            "
          >
            <CheckCircle2
              className="
                mt-0.5
                h-5
                w-5
                shrink-0
                text-[#777B5D]
              "
              strokeWidth={2}
            />

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-[#181818]
                "
              >
                Cuenta creada correctamente
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-black/50
                "
              >
                Esta es una simulación para el
                prototipo frontend de Kira.
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            BOTÓN
        =================================================== */}

        <button
          type="submit"
          className="
            flex
            h-12
            w-full
            items-center
            justify-center
            rounded-[14px]
            bg-[#777B5D]
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#686c51]
            hover:shadow-md
            active:translate-y-0
          "
        >
          Crear cuenta
        </button>
      </form>

      {/* =====================================================
          LOGIN
      ===================================================== */}

      <p
        className="
          mt-7
          text-center
          text-sm
          text-black/45
        "
      >
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="
            font-semibold
            text-[#777B5D]
            transition-opacity
            hover:opacity-60
          "
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}