import Image from "next/image";
import Link from "next/link";

// ============================================================
// SUBCATEGORÍAS DE LA MESA
// ============================================================

const subcategorias = [
  {
    id: "cuadernos",
    nombre: "Cuadernos y libretas",
    descripcion: "Para apuntes, ideas y proyectos.",
    href: "/escolar/cuadernos",
    imagen: "/media/categories/escolar/portada/productos/cuaderno.png",
    clase: "escolar-mesa-objeto-cuaderno",
  },
  {
    id: "escritura",
    nombre: "Escritura",
    descripcion: "Lápices, bolígrafos y más.",
    href: "/escolar/escritura",
    imagen: "/media/categories/escolar/portada/productos/lapiz.png",
    clase: "escolar-mesa-objeto-lapiz",
  },
  {
    id: "marcadores",
    nombre: "Marcadores",
    descripcion: "Color para destacar tus ideas.",
    href: "/escolar/marcadores",
    imagen: "/media/categories/escolar/portada/productos/resaltador.png",
    clase: "escolar-mesa-objeto-resaltador",
  },
  {
    id: "utiles",
    nombre: "Útiles",
    descripcion: "Esenciales para todos los días.",
    href: "/escolar/utiles",
    imagen: "/media/categories/escolar/portada/productos/goma.png",
    clase: "escolar-mesa-objeto-goma",
  },
  {
    id: "geometria",
    nombre: "Geometría",
    descripcion: "Mide, traza y construye.",
    href: "/escolar/geometria",
    imagen: "/media/categories/escolar/portada/productos/regla.png",
    clase: "escolar-mesa-objeto-regla",
  },
];

// ============================================================
// COMPONENTE
// ============================================================

export default function EscolarMesaInteractiva() {
  return (
    <section
      id="mesa-escolar"
      aria-labelledby="titulo-mesa-escolar"
      className="escolar-mesa"
    >
      {/* =====================================================
          AMBIENTE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="escolar-mesa-luz escolar-mesa-luz-izquierda"
      />

      <div
        aria-hidden="true"
        className="escolar-mesa-luz escolar-mesa-luz-derecha"
      />

      <div
        aria-hidden="true"
        className="escolar-mesa-luz escolar-mesa-luz-central"
      />

      {/* =====================================================
          VEGETACIÓN DE ENTRADA
      ===================================================== */}

      <div
        aria-hidden="true"
        className="escolar-mesa-hoja escolar-mesa-hoja-superior-izquierda"
      >
        <Image
          src="/media/categories/escolar/decoracion/hoja-palmera.png"
          alt=""
          fill
          className="object-contain"
          sizes="420px"
        />
      </div>

      <div
        aria-hidden="true"
        className="escolar-mesa-hoja escolar-mesa-hoja-superior-derecha"
      >
        <Image
          src="/media/categories/escolar/decoracion/hoja-monstera.png"
          alt=""
          fill
          className="object-contain"
          sizes="340px"
        />
      </div>

      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <div className="escolar-mesa-contenedor">
        {/* ===================================================
            INTRODUCCIÓN
        =================================================== */}

        <header className="escolar-mesa-introduccion">
          <p className="escolar-mesa-sobretitulo">
            Explora de otra manera
          </p>

          <h2
            id="titulo-mesa-escolar"
            className="escolar-mesa-titulo"
          >
            Todo empieza
            <span> sobre una mesa.</span>
          </h2>

          <p className="escolar-mesa-texto">
            Descubre cada rincón y encuentra los pequeños objetos
            que acompañan tus ideas todos los días.
          </p>

          <div
            aria-hidden="true"
            className="escolar-mesa-pista"
          >
            <span className="escolar-mesa-pista-icono">
              ↓
            </span>

            <span>
              Explora los objetos
            </span>
          </div>
        </header>

        {/* ===================================================
            ESCENA PRINCIPAL
        =================================================== */}

        <div className="escolar-mesa-escena">
          {/* =================================================
              SOMBRA EXTERIOR
          ================================================= */}

          <div
            aria-hidden="true"
            className="escolar-mesa-sombra-exterior"
          />

          {/* =================================================
              SUPERFICIE
          ================================================= */}

          <div className="escolar-mesa-superficie">
            {/* =================================================
                TEXTURA / LUZ
            ================================================= */}

            <div
              aria-hidden="true"
              className="escolar-mesa-textura"
            />

            <div
              aria-hidden="true"
              className="escolar-mesa-luz-superficie"
            />

            <div
              aria-hidden="true"
              className="escolar-mesa-reflejo-superficie"
            />

            {/* =================================================
                PAPEL PRINCIPAL
            ================================================= */}

            <div
              aria-hidden="true"
              className="escolar-mesa-papel"
            >
              <span className="escolar-mesa-papel-linea" />
              <span className="escolar-mesa-papel-linea" />
              <span className="escolar-mesa-papel-linea" />

              <span className="escolar-mesa-papel-garabato">
                ideas
              </span>
            </div>

            {/* =================================================
                NOTAS ADHESIVAS
            ================================================= */}

            <div
              aria-hidden="true"
              className="escolar-mesa-nota escolar-mesa-nota-1"
            >
              <span>crear</span>
            </div>

            <div
              aria-hidden="true"
              className="escolar-mesa-nota escolar-mesa-nota-2"
            >
              <span>imaginar</span>
            </div>

            <div
              aria-hidden="true"
              className="escolar-mesa-nota escolar-mesa-nota-3"
            >
              <span>anotar</span>
            </div>

            {/* =================================================
                CLIPS
            ================================================= */}

            <div
              aria-hidden="true"
              className="escolar-mesa-clip escolar-mesa-clip-1"
            />

            <div
              aria-hidden="true"
              className="escolar-mesa-clip escolar-mesa-clip-2"
            />

            <div
              aria-hidden="true"
              className="escolar-mesa-clip escolar-mesa-clip-3"
            />

            {/* =================================================
                CINTAS
            ================================================= */}

            <div
              aria-hidden="true"
              className="escolar-mesa-cinta escolar-mesa-cinta-1"
            />

            <div
              aria-hidden="true"
              className="escolar-mesa-cinta escolar-mesa-cinta-2"
            />

            {/* =================================================
                GARABATOS
            ================================================= */}

            <div
              aria-hidden="true"
              className="escolar-mesa-garabato escolar-mesa-garabato-circulo"
            />

            <div
              aria-hidden="true"
              className="escolar-mesa-garabato escolar-mesa-garabato-linea"
            />

            <div
              aria-hidden="true"
              className="escolar-mesa-garabato escolar-mesa-garabato-onda"
            />

            {/* =================================================
                PRODUCTOS INTERACTIVOS
            ================================================= */}

            {subcategorias.map((subcategoria) => (
              <Link
                key={subcategoria.id}
                href={subcategoria.href}
                aria-label={`Explorar ${subcategoria.nombre}`}
                className={`
                  escolar-mesa-objeto
                  ${subcategoria.clase}
                `}
              >
                <span className="escolar-mesa-objeto-visual">
                  <Image
                    src={subcategoria.imagen}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="240px"
                  />
                </span>

                <span className="escolar-mesa-tarjeta">
                  <span className="escolar-mesa-tarjeta-nombre">
                    {subcategoria.nombre}
                  </span>

                  <span className="escolar-mesa-tarjeta-descripcion">
                    {subcategoria.descripcion}
                  </span>

                  <span className="escolar-mesa-tarjeta-enlace">
                    Ver productos
                    <span aria-hidden="true"> →</span>
                  </span>
                </span>
              </Link>
            ))}

            {/* =================================================
                KIRA TEMPORAL

                Más adelante sustituimos este bloque por:
                /media/categories/escolar/mascota/kira-mesa.png
            ================================================= */}

            <div
              aria-hidden="true"
              className="escolar-mesa-kira"
            >
              <div className="escolar-mesa-kira-temporal">
                <span className="escolar-mesa-kira-icono">
                  🐨
                </span>

                <span className="escolar-mesa-kira-texto">
                  Kira
                </span>
              </div>
            </div>

            {/* =================================================
                ESTRELLAS / ACENTOS
            ================================================= */}

            <div
              aria-hidden="true"
              className="escolar-mesa-estrella escolar-mesa-estrella-1"
            >
              ✦
            </div>

            <div
              aria-hidden="true"
              className="escolar-mesa-estrella escolar-mesa-estrella-2"
            >
              ✦
            </div>

            <div
              aria-hidden="true"
              className="escolar-mesa-estrella escolar-mesa-estrella-3"
            >
              ✦
            </div>

            <div
              aria-hidden="true"
              className="escolar-mesa-estrella escolar-mesa-estrella-4"
            >
              ✦
            </div>

            {/* =================================================
                FLECHA ILUSTRADA
            ================================================= */}

            <svg
              aria-hidden="true"
              viewBox="0 0 160 90"
              className="escolar-mesa-flecha"
              fill="none"
            >
              <path
                d="M10 70C45 18 96 17 143 43"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5 8"
              />

              <path
                d="M131 30L145 43L128 50"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* =================================================
                PEQUEÑOS PUNTOS DECORATIVOS
            ================================================= */}

            <div
              aria-hidden="true"
              className="escolar-mesa-puntos escolar-mesa-puntos-1"
            >
              <span />
              <span />
              <span />
            </div>

            <div
              aria-hidden="true"
              className="escolar-mesa-puntos escolar-mesa-puntos-2"
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          {/* =================================================
              BORDE DE LA MESA
          ================================================= */}

          <div
            aria-hidden="true"
            className="escolar-mesa-borde"
          />
        </div>

        {/* ===================================================
            TEXTO INFERIOR
        =================================================== */}

        <div className="escolar-mesa-pie">
          <p>
            Cinco formas de empezar.
            <span> Una idea puede llevarte a cualquier parte.</span>
          </p>
        </div>
      </div>

      {/* =====================================================
          VEGETACIÓN DE PRIMER PLANO
      ===================================================== */}

      <div
        aria-hidden="true"
        className="escolar-mesa-hoja escolar-mesa-hoja-inferior-izquierda"
      >
        <Image
          src="/media/categories/escolar/decoracion/hoja.png"
          alt=""
          fill
          className="object-contain"
          sizes="300px"
        />
      </div>

      <div
        aria-hidden="true"
        className="escolar-mesa-hoja escolar-mesa-hoja-inferior-derecha"
      >
        <Image
          src="/media/categories/escolar/decoracion/hoja2.png"
          alt=""
          fill
          className="object-contain"
          sizes="300px"
        />
      </div>
    </section>
  );
}