"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ============================================================
// TRANSFORMACIÓN DE KIRA
// ============================================================

export default function EscolarTransformacionKira() {
  const seccionRef = useRef<HTMLElement>(null);

  const [progreso, setProgreso] = useState(0);

  // ==========================================================
  // PROGRESO DE SCROLL DENTRO DE LA ESCENA
  // ==========================================================

  useEffect(() => {
    const actualizarProgreso = () => {
      if (!seccionRef.current) return;

      const rect = seccionRef.current.getBoundingClientRect();

      const alturaRecorrido =
        rect.height - window.innerHeight;

      if (alturaRecorrido <= 0) {
        setProgreso(0);
        return;
      }

      const nuevoProgreso =
        Math.min(
          Math.max(-rect.top / alturaRecorrido, 0),
          1,
        );

      setProgreso(nuevoProgreso);
    };

    actualizarProgreso();

    window.addEventListener(
      "scroll",
      actualizarProgreso,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      actualizarProgreso,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        actualizarProgreso,
      );

      window.removeEventListener(
        "resize",
        actualizarProgreso,
      );
    };
  }, []);

  // ==========================================================
  // TRANSFORMACIONES
  // ==========================================================

  const opacidadKiraNormal =
    Math.max(1 - progreso * 2.2, 0);

  const opacidadKiraLlavero =
    Math.min(
      Math.max((progreso - 0.28) * 2.3, 0),
      1,
    );

  const escalaNormal =
    1 - progreso * 0.32;

  const escalaLlavero =
    0.72 + progreso * 0.18;

  const movimientoVertical =
    progreso * 145;

  const movimientoHorizontal =
    progreso * -55;

  const rotacionNormal =
    progreso * -5;

  const rotacionLlavero =
    5 - progreso * 5;

  return (
    <section
      ref={seccionRef}
      className="escolar-transformacion"
      aria-labelledby="titulo-transformacion-kira"
    >
      {/* ======================================================
          ESCENA FIJA
      ====================================================== */}

      <div className="escolar-transformacion-fija">

        {/* ====================================================
            AMBIENTE
        ==================================================== */}

        <div
          className="escolar-transformacion-ambiente"
          aria-hidden="true"
        />

        {/* ====================================================
            TEXTO
        ==================================================== */}

        <div className="escolar-transformacion-contenido">
          <p className="escolar-transformacion-etiqueta">
            Una idea que continúa
          </p>

          <h2
            id="titulo-transformacion-kira"
            className="escolar-transformacion-titulo"
          >
            Las ideas también
            <span>te acompañan.</span>
          </h2>

          <p className="escolar-transformacion-descripcion">
            Pequeños detalles que puedes llevar contigo.
          </p>
        </div>

        {/* ====================================================
            KIRA
        ==================================================== */}

        <div className="escolar-transformacion-kira">
          {/* ================================================
              KIRA NORMAL / AVIÓN
          ================================================ */}

          <div
            className="escolar-transformacion-kira-normal"
            style={{
              opacity: opacidadKiraNormal,

              transform: `
                translate3d(
                  ${movimientoHorizontal}px,
                  ${movimientoVertical}px,
                  0
                )
                scale(${escalaNormal})
                rotate(${rotacionNormal}deg)
              `,
            }}
            aria-hidden="true"
          >
            <Image
              src="/media/categories/escolar/mascota/kira-avion.png"
              alt=""
              fill
              sizes="420px"
              className="object-contain"
            />
          </div>

          {/* ================================================
              KIRA LLAVERO
          ================================================ */}

          <div
            className="escolar-transformacion-kira-llavero"
            style={{
              opacity: opacidadKiraLlavero,

              transform: `
                translate3d(
                  ${movimientoHorizontal * 0.25}px,
                  ${movimientoVertical * 0.15}px,
                  0
                )
                scale(${escalaLlavero})
                rotate(${rotacionLlavero}deg)
              `,
            }}
            aria-hidden="true"
          >
            <Image
              src="/media/categories/escolar/mascota/kira-llavero.png"
              alt=""
              fill
              sizes="340px"
              className="object-contain"
            />
          </div>
        </div>

        {/* ====================================================
            DECORACIÓN
        ==================================================== */}

        <div
          className="escolar-transformacion-decoracion"
          aria-hidden="true"
        >
          <span className="escolar-transformacion-estrella escolar-transformacion-estrella-1">
            ✦
          </span>

          <span className="escolar-transformacion-estrella escolar-transformacion-estrella-2">
            ✦
          </span>

          <span className="escolar-transformacion-punto escolar-transformacion-punto-1" />

          <span className="escolar-transformacion-punto escolar-transformacion-punto-2" />

          <span className="escolar-transformacion-trazo escolar-transformacion-trazo-1" />

          <span className="escolar-transformacion-trazo escolar-transformacion-trazo-2" />
        </div>

        {/* ====================================================
            INDICADOR
        ==================================================== */}

        <div
          className="escolar-transformacion-indicador"
          aria-hidden="true"
        >
          <span className="escolar-transformacion-indicador-linea" />

          <span className="escolar-transformacion-indicador-texto">
            sigue explorando
          </span>
        </div>

      </div>
    </section>
  );
}