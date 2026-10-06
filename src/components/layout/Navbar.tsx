"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Search,
  ShoppingBag,
  UserRound,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import LoginModal from "@/components/auth/LoginModal";

// ============================================================
// CATEGORÍAS
// ============================================================

const categorias = [
  {
    nombre: "Escolar",
    descripcion: "Todo para estudiar",
    href: "/escolar",
    imagen: "/media/categories/navbar/escolar.png",
  },
  {
    nombre: "Viaje",
    descripcion: "Viaja con estilo",
    href: "/viaje",
    imagen: "/media/categories/navbar/viaje.png",
  },
  {
    nombre: "Tecnología",
    descripcion: "Gadgets y tecnología",
    href: "/tecnologia",
    imagen: "/media/categories/navbar/tecnologia.png",
  },
  {
    nombre: "Accesorios",
    descripcion: "Pequeños detalles",
    href: "/accesorios",
    imagen: "/media/categories/navbar/accesorios.png",
  },
  {
    nombre: "Destacados",
    descripcion: "Lo que todos quieren",
    href: "/destacados",
    imagen: "/media/categories/navbar/destacados.png",
  },
];

// ============================================================
// NAVBAR
// ============================================================

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [categoriasOpen, setCategoriasOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategoriasOpen, setMobileCategoriasOpen] =
    useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginAbierto, setLoginAbierto] = useState(false);

  // Referencia del botón "Categorías"
  const categoriasRef = useRef<HTMLDivElement | null>(null);

  // Referencia del mega menú
  const menuCategoriasRef = useRef<HTMLDivElement | null>(null);

  // ==========================================================
  // RUTAS ACTIVAS
  // ==========================================================

  const categoriasActiva = categorias.some(
    (categoria) =>
      pathname === categoria.href ||
      pathname.startsWith(`${categoria.href}/`),
  );

  const novedadesActiva = pathname.startsWith("/nuevos");
  const giftCardsActiva = pathname.startsWith("/gift-cards");
  const nosotrosActiva = pathname.startsWith("/nosotros");
  const inicioActivo = pathname === "/";

  // ==========================================================
  // DETECTAR SCROLL
  // ==========================================================

  useEffect(() => {
    const manejarScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    manejarScroll();

    window.addEventListener("scroll", manejarScroll);

    return () => {
      window.removeEventListener("scroll", manejarScroll);
    };
  }, []);

  // ==========================================================
  // CERRAR MENÚ AL CAMBIAR A DESKTOP
  // ==========================================================

  useEffect(() => {
    const manejarResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileCategoriasOpen(false);
      }
    };

    window.addEventListener("resize", manejarResize);

    return () => {
      window.removeEventListener("resize", manejarResize);
    };
  }, []);

  // ==========================================================
  // CERRAR MENÚ AL CAMBIAR DE RUTA
  // ==========================================================

  useEffect(() => {
    setCategoriasOpen(false);
    setMobileOpen(false);
    setMobileCategoriasOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // ==========================================================
  // CLICK FUERA DEL MENÚ CATEGORÍAS
  // ==========================================================

  useEffect(() => {
    if (!categoriasOpen) return;

    const manejarClickFuera = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickEnBoton =
        categoriasRef.current?.contains(target) ?? false;

      const clickEnMenu =
        menuCategoriasRef.current?.contains(target) ?? false;

      if (!clickEnBoton && !clickEnMenu) {
        setCategoriasOpen(false);
      }
    };

    document.addEventListener("mousedown", manejarClickFuera);

    return () => {
      document.removeEventListener(
        "mousedown",
        manejarClickFuera,
      );
    };
  }, [categoriasOpen]);

  // ==========================================================
  // CERRAR MENÚ MÓVIL
  // ==========================================================

  const cerrarMobile = () => {
    setMobileOpen(false);
    setMobileCategoriasOpen(false);
  };

  // ==========================================================
  // CERRAR MEGA MENÚ
  // ==========================================================

  const cerrarCategorias = () => {
    setCategoriasOpen(false);
  };

  // ==========================================================
  // ABRIR LOGIN
  // ==========================================================

  const abrirLogin = () => {
    setCategoriasOpen(false);
    setMobileOpen(false);
    setMobileCategoriasOpen(false);
    setSearchOpen(false);
    setLoginAbierto(true);
  };

  // ==========================================================
  // TOGGLE CATEGORÍAS
  // ==========================================================

  const toggleCategorias = () => {
    setCategoriasOpen((actual) => !actual);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <header
        className="
          fixed
          left-0
          top-0
          z-[100]
          w-full
          px-3
          pt-3
          sm:px-4
          lg:px-6
        "
      >
        {/* =====================================================
            NAVBAR PRINCIPAL
        ===================================================== */}

        <nav
          className={`
            relative
            mx-auto
            flex
            h-[68px]
            w-full
            items-center
            justify-between
            rounded-[22px]
            px-5
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            sm:h-[72px]
            sm:px-7
            lg:h-[76px]
            lg:px-10

            ${
              scrolled
                ? `
                    border
                    border-black/[0.05]
                    bg-[#F8F7F3]/90
                    shadow-[0_10px_40px_rgba(0,0,0,0.07)]
                    backdrop-blur-xl
                  `
                : `
                    border
                    border-transparent
                    bg-transparent
                    shadow-none
                  `
            }
          `}
        >
          {/* ===================================================
              LOGO
          =================================================== */}

          <Link
            href="/"
            onClick={cerrarMobile}
            aria-label="Kira - Inicio"
            className="
              group
              relative
              z-[120]
              flex
              select-none
              items-center
            "
          >
            <span
              className={`
                text-[30px]
                font-bold
                leading-none
                tracking-[-0.07em]
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-[1.02]
                sm:text-[32px]
                lg:text-[35px]

                ${
                  inicioActivo
                    ? "text-[#777B5D]"
                    : "text-[#181818]"
                }
              `}
            >
              kira
            </span>

            <span
              className="
                ml-1
                mt-[-17px]
                text-[7px]
                font-semibold
                tracking-normal
                text-[#777B5D]
              "
            >
              ®
            </span>
          </Link>

          {/* ===================================================
              NAVEGACIÓN DESKTOP
          =================================================== */}

          <div
            className="
              hidden
              items-center
              gap-7
              lg:flex
              xl:gap-10
            "
          >
            {/* =================================================
                CATEGORÍAS
            ================================================= */}

            <div ref={categoriasRef} className="relative">
              <button
                type="button"
                onClick={toggleCategorias}
                aria-expanded={categoriasOpen}
                aria-controls="menu-categorias"
                className={`
                  group
                  flex
                  items-center
                  gap-1.5
                  py-3
                  text-[15px]
                  font-semibold
                  tracking-[-0.01em]
                  transition-colors
                  duration-500

                  ${
                    categoriasOpen || categoriasActiva
                      ? "text-[#777B5D]"
                      : "text-[#181818] hover:text-[#777B5D]"
                  }
                `}
              >
                Categorías

                <ChevronDown
                  className={`
                    h-4
                    w-4
                    transition-transform
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    ${
                      categoriasOpen
                        ? "rotate-180"
                        : "rotate-0"
                    }
                  `}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* =================================================
                NOVEDADES
            ================================================= */}

            <Link
              href="/nuevos"
              className={`
                text-[15px]
                font-semibold
                tracking-[-0.01em]
                transition-colors
                duration-500

                ${
                  novedadesActiva
                    ? "text-[#777B5D]"
                    : "text-[#181818] hover:text-[#777B5D]"
                }
              `}
            >
              Novedades
            </Link>

            {/* =================================================
                GIFT CARDS
            ================================================= */}

            <Link
              href="/gift-cards"
              className={`
                text-[15px]
                font-semibold
                tracking-[-0.01em]
                transition-colors
                duration-500

                ${
                  giftCardsActiva
                    ? "text-[#777B5D]"
                    : "text-[#181818] hover:text-[#777B5D]"
                }
              `}
            >
              Gift Cards
            </Link>

            {/* =================================================
                NOSOTROS
            ================================================= */}

            <Link
              href="/nosotros"
              className={`
                text-[15px]
                font-semibold
                tracking-[-0.01em]
                transition-colors
                duration-500

                ${
                  nosotrosActiva
                    ? "text-[#777B5D]"
                    : "text-[#181818] hover:text-[#777B5D]"
                }
              `}
            >
              Nosotros
            </Link>
          </div>

          {/* ===================================================
              ACCIONES
          =================================================== */}

          <div
            className="
              flex
              items-center
              gap-1.5
              sm:gap-2
            "
          >
            {/* =================================================
                BUSCADOR DESKTOP
            ================================================= */}

            <div
              className={`
                hidden
                h-11
                items-center
                overflow-hidden
                rounded-full
                border
                border-black/[0.06]
                bg-white/75
                backdrop-blur-md
                transition-all
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                lg:flex

                ${searchOpen ? "w-64" : "w-11"}
              `}
            >
              <button
                type="button"
                onClick={() =>
                  setSearchOpen((actual) => !actual)
                }
                aria-label="Buscar"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  text-[#181818]
                  transition-colors
                  duration-500
                  hover:text-[#777B5D]
                "
              >
                <Search
                  className="h-5 w-5"
                  strokeWidth={2}
                />
              </button>

              <input
                type="search"
                placeholder="Buscar productos..."
                className={`
                  h-11
                  min-w-0
                  flex-1
                  bg-transparent
                  pr-4
                  text-sm
                  text-[#181818]
                  outline-none
                  placeholder:text-black/40
                  transition-opacity
                  duration-500

                  ${
                    searchOpen
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }
                `}
              />
            </div>

            {/* =================================================
                USUARIO DESKTOP
            ================================================= */}

            <button
              type="button"
              onClick={abrirLogin}
              aria-label="Iniciar sesión"
              className="
                hidden
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white/75
                text-[#181818]
                backdrop-blur-md
                transition-all
                duration-500
                hover:bg-white
                hover:text-[#777B5D]
                hover:shadow-sm
                lg:flex
              "
            >
              <UserRound
                className="h-[19px] w-[19px]"
                strokeWidth={1.8}
              />
            </button>

            {/* =================================================
                CARRITO
            ================================================= */}

            <Link
              href="/carrito"
              aria-label="Carrito"
              className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white/75
                text-[#181818]
                backdrop-blur-md
                transition-all
                duration-500
                hover:bg-white
                hover:text-[#777B5D]
                hover:shadow-sm
              "
            >
              <ShoppingBag
                className="h-[19px] w-[19px]"
                strokeWidth={1.8}
              />

              <span
                className="
                  absolute
                  right-0.5
                  top-0.5
                  flex
                  h-[17px]
                  min-w-[17px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#777B5D]
                  px-1
                  text-[9px]
                  font-bold
                  text-white
                "
              >
                0
              </span>
            </Link>

            {/* =================================================
                MENÚ MÓVIL
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen((actual) => !actual)
              }
              aria-label={
                mobileOpen ? "Cerrar menú" : "Abrir menú"
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white/75
                text-[#181818]
                backdrop-blur-md
                transition-all
                duration-500
                hover:bg-white
                lg:hidden
              "
            >
              {mobileOpen ? (
                <X
                  className="h-5 w-5"
                  strokeWidth={2}
                />
              ) : (
                <Menu
                  className="h-5 w-5"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
        </nav>

        {/* =====================================================
            MEGA MENÚ DESKTOP
        ===================================================== */}

        <div
          ref={menuCategoriasRef}
          id="menu-categorias"
          className={`
            mx-auto
            w-full
            overflow-hidden
            transition-all
            duration-[850ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              categoriasOpen
                ? `
                    mt-2
                    max-h-[300px]
                    translate-y-0
                    opacity-100
                  `
                : `
                    pointer-events-none
                    mt-0
                    max-h-0
                    -translate-y-2
                    opacity-0
                  `
            }
          `}
        >
          <div
            className={`
              overflow-hidden
              rounded-[24px]
              border
              border-black/[0.04]
              bg-white
              px-3
              py-3
              shadow-[0_18px_60px_rgba(0,0,0,0.08)]
              transition-transform
              duration-[900ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              sm:px-5
              sm:py-4
              lg:px-6
              lg:py-4
              xl:px-8

              ${
                categoriasOpen
                  ? "origin-top scale-y-100"
                  : "origin-top scale-y-[0.97]"
              }
            `}
          >
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                lg:grid-cols-5
              "
            >
              {categorias.map((categoria, index) => {
                const categoriaActiva =
                  pathname === categoria.href ||
                  pathname.startsWith(
                    `${categoria.href}/`,
                  );

                return (
                  <Link
                    key={categoria.nombre}
                    href={categoria.href}
                    onClick={cerrarCategorias}
                    aria-label={`Ir a ${categoria.nombre}`}
                    className={`
                      group
                      relative
                      flex
                      min-h-[145px]
                      flex-col
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-[20px]
                      transition-all
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      ${
                        categoriaActiva
                          ? "bg-[#F1EFE7]"
                          : "hover:bg-[#F1EFE7]"
                      }
                    `}
                    style={{
                      transitionDelay: categoriasOpen
                        ? `${index * 45}ms`
                        : "0ms",
                    }}
                  >
                    <div
                      className="
                        relative
                        flex
                        h-[76px]
                        w-full
                        items-center
                        justify-center
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:scale-[1.04]
                      "
                    >
                      <img
                        src={categoria.imagen}
                        alt=""
                        draggable={false}
                        className="
                          h-full
                          w-[100px]
                          object-contain
                          transition-transform
                          duration-700
                          ease-[cubic-bezier(0.22,1,0.36,1)]
                          group-hover:scale-110
                        "
                      />
                    </div>

                    <span
                      className={`
                        mt-2
                        text-center
                        text-[15px]
                        font-semibold
                        tracking-[-0.02em]
                        transition-colors
                        duration-500

                        ${
                          categoriaActiva
                            ? "text-[#777B5D]"
                            : "text-[#181818] group-hover:text-[#777B5D]"
                        }
                      `}
                    >
                      {categoria.nombre}
                    </span>

                    <span
                      className="
                        mt-0.5
                        text-center
                        text-[11px]
                        text-black/40
                      "
                    >
                      {categoria.descripcion}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================================
            MENÚ MÓVIL
        ===================================================== */}

        <div
          className={`
            mx-auto
            mt-2
            w-full
            overflow-hidden
            rounded-[24px]
            border
            border-black/[0.05]
            bg-[#F8F7F3]/95
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            backdrop-blur-xl
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            lg:hidden

            ${
              mobileOpen
                ? `
                    max-h-[calc(100vh-100px)]
                    translate-y-0
                    opacity-100
                  `
                : `
                    pointer-events-none
                    max-h-0
                    -translate-y-3
                    opacity-0
                  `
            }
          `}
        >
          <div
            className="
              max-h-[calc(100vh-120px)]
              overflow-y-auto
              p-5
            "
          >
            {/* =================================================
                BUSCADOR MÓVIL
            ================================================= */}

            <div
              className="
                mb-5
                flex
                h-12
                items-center
                gap-3
                rounded-full
                bg-white
                px-4
                ring-1
                ring-black/[0.05]
              "
            >
              <Search className="h-5 w-5 text-black/50" />

              <input
                type="search"
                placeholder="Buscar productos..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  text-sm
                  outline-none
                  placeholder:text-black/40
                "
              />
            </div>

            {/* =================================================
                ENLACES
            ================================================= */}

            <div className="space-y-1">
              <Link
                href="/"
                onClick={cerrarMobile}
                className={`
                  flex
                  items-center
                  rounded-xl
                  px-3
                  py-3.5
                  text-base
                  font-semibold
                  transition-colors
                  duration-300

                  ${
                    inicioActivo
                      ? "bg-white text-[#777B5D]"
                      : "text-[#181818] hover:bg-white"
                  }
                `}
              >
                Inicio
              </Link>

              {/* CATEGORÍAS */}

              <button
                type="button"
                onClick={() =>
                  setMobileCategoriasOpen(
                    (actual) => !actual,
                  )
                }
                aria-expanded={mobileCategoriasOpen}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-3.5
                  text-base
                  font-semibold
                  transition-colors
                  duration-300

                  ${
                    categoriasActiva
                      ? "bg-white text-[#777B5D]"
                      : "text-[#181818] hover:bg-white"
                  }
                `}
              >
                Categorías

                <ChevronDown
                  className={`
                    h-5
                    w-5
                    transition-transform
                    duration-500

                    ${
                      mobileCategoriasOpen
                        ? "rotate-180"
                        : "rotate-0"
                    }
                  `}
                  strokeWidth={2}
                />
              </button>

              {/* =================================================
                  CATEGORÍAS MOBILE
              ================================================= */}

              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    mobileCategoriasOpen
                      ? "max-h-[700px] opacity-100"
                      : "max-h-0 opacity-0"
                  }
                `}
              >
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-1
                    px-1
                    pb-2
                    pt-1
                  "
                >
                  {categorias.map((categoria) => {
                    const categoriaActiva =
                      pathname === categoria.href ||
                      pathname.startsWith(
                        `${categoria.href}/`,
                      );

                    return (
                      <Link
                        key={categoria.nombre}
                        href={categoria.href}
                        onClick={cerrarMobile}
                        aria-label={`Ir a ${categoria.nombre}`}
                        className={`
                          group
                          flex
                          flex-col
                          items-center
                          justify-center
                          rounded-[18px]
                          px-2
                          py-4
                          transition-all
                          duration-500

                          ${
                            categoriaActiva
                              ? "bg-white"
                              : "hover:bg-white"
                          }
                        `}
                      >
                        <div
                          className="
                            flex
                            h-20
                            w-full
                            items-center
                            justify-center
                          "
                        >
                          <img
                            src={categoria.imagen}
                            alt=""
                            draggable={false}
                            className="
                              h-full
                              w-full
                              object-contain
                              transition-transform
                              duration-700
                              group-hover:scale-105
                            "
                          />
                        </div>

                        <span
                          className={`
                            mt-2
                            text-center
                            text-sm
                            font-semibold

                            ${
                              categoriaActiva
                                ? "text-[#777B5D]"
                                : "text-[#181818]"
                            }
                          `}
                        >
                          {categoria.nombre}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* =================================================
                  NOVEDADES
              ================================================= */}

              <Link
                href="/nuevos"
                onClick={cerrarMobile}
                className={`
                  flex
                  items-center
                  rounded-xl
                  px-3
                  py-3.5
                  text-base
                  font-semibold
                  transition-colors
                  duration-300

                  ${
                    novedadesActiva
                      ? "bg-white text-[#777B5D]"
                      : "text-[#181818] hover:bg-white"
                  }
                `}
              >
                Novedades
              </Link>

              {/* =================================================
                  GIFT CARDS
              ================================================= */}

              <Link
                href="/gift-cards"
                onClick={cerrarMobile}
                className={`
                  flex
                  items-center
                  rounded-xl
                  px-3
                  py-3.5
                  text-base
                  font-semibold
                  transition-colors
                  duration-300

                  ${
                    giftCardsActiva
                      ? "bg-white text-[#777B5D]"
                      : "text-[#181818] hover:bg-white"
                  }
                `}
              >
                Gift Cards
              </Link>

              {/* =================================================
                  NOSOTROS
              ================================================= */}

              <Link
                href="/nosotros"
                onClick={cerrarMobile}
                className={`
                  flex
                  items-center
                  rounded-xl
                  px-3
                  py-3.5
                  text-base
                  font-semibold
                  transition-colors
                  duration-300

                  ${
                    nosotrosActiva
                      ? "bg-white text-[#777B5D]"
                      : "text-[#181818] hover:bg-white"
                  }
                `}
              >
                Nosotros
              </Link>
            </div>

            {/* =================================================
                CUENTA MÓVIL
            ================================================= */}

            <button
              type="button"
              onClick={abrirLogin}
              className="
                mt-5
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                bg-white
                px-4
                py-4
                text-left
                text-sm
                font-semibold
                text-[#181818]
                transition-all
                duration-300
                hover:bg-[#ECE9DD]
              "
            >
              <UserRound
                className="h-5 w-5"
                strokeWidth={1.8}
              />

              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          LOGIN MODAL
      ===================================================== */}

      <LoginModal
        abierto={loginAbierto}
        onCerrar={() => setLoginAbierto(false)}
      />
    </>
  );
}