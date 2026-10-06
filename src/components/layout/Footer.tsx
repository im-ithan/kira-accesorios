import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Tags,
  CircleHelp,
  Heart,
} from "lucide-react";

// ============================================================
// FOOTER
// ============================================================

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        w-full
        overflow-hidden

        bg-[#EEECE4]
        text-[#181818]
      "
    >
      {/* =====================================================
          MENSAJE DE CIERRE
      ===================================================== */}

      <div
        className="
          border-b
          border-black/[0.08]

          px-4
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            grid-cols-1
            gap-8

            lg:grid-cols-12
            lg:items-end
          "
        >
          {/* =================================================
              TÍTULO
          ================================================= */}

          <div className="lg:col-span-6">
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

            <h2
              className="
                mt-4
                max-w-[760px]

                text-4xl
                font-semibold
                leading-[0.95]
                tracking-[-0.055em]

                text-[#181818]

                sm:text-5xl

                lg:text-[64px]
              "
            >
              Kira te acompaña
              <br />
              en cada momento.
            </h2>
          </div>

          {/* =================================================
              TEXTO SECUNDARIO
          ================================================= */}

          <div
            className="
              lg:col-span-4
              lg:col-start-8
            "
          >
            <div
              className="
                max-w-[460px]

                border-l
                border-[#777B5D]/25

                pl-6
              "
            >
              <p
                className="
                  text-sm
                  leading-[1.8]

                  text-black/55

                  sm:text-base
                "
              >
                Productos para acompañarte en tu día a día,
                descubrir nuevas ideas y encontrar algo que vaya
                contigo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ===================================================== */}

      <div
        className="
          relative

          px-4
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
      >
        <div
          className="
            relative
            z-10

            mx-auto
            grid
            max-w-[1500px]

            grid-cols-1
            gap-10

            sm:grid-cols-2

            lg:grid-cols-12
            lg:gap-8
          "
        >
          {/* =================================================
              MARCA
          ================================================= */}

          <div
            className="
              sm:col-span-2
              lg:col-span-3
            "
          >
            <Link
              href="/"
              aria-label="Kira - Inicio"
              className="
                inline-flex
                items-start
              "
            >
              <span
                className="
                  text-[42px]
                  font-bold
                  leading-none
                  tracking-[-0.07em]

                  text-[#181818]
                "
              >
                kira
              </span>

              <span
                className="
                  ml-1
                  mt-[-1px]

                  text-[7px]
                  font-semibold

                  text-[#777B5D]
                "
              >
                ®
              </span>
            </Link>

            <p
              className="
                mt-5
                max-w-[300px]

                text-sm
                leading-[1.7]

                text-black/55
              "
            >
              Descubre productos útiles, bonitos y pensados
              para hacer tu día un poco más fácil.
            </p>

            {/* =================================================
                CONTACTO
            ================================================= */}

            <div
              className="
                mt-7
                flex
                flex-col
                gap-3
              "
            >
              <a
                href="mailto:contacto@kira.com"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-3

                  text-sm
                  text-black/55

                  transition-colors
                  duration-300

                  hover:text-[#181818]
                "
              >
                <Mail
                  className="
                    h-4
                    w-4
                    shrink-0

                    text-[#777B5D]
                  "
                  strokeWidth={1.6}
                />

                <span>contacto@kira.com</span>
              </a>

              <a
                href="tel:+59100000000"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-3

                  text-sm
                  text-black/55

                  transition-colors
                  duration-300

                  hover:text-[#181818]
                "
              >
                <Phone
                  className="
                    h-4
                    w-4
                    shrink-0

                    text-[#777B5D]
                  "
                  strokeWidth={1.6}
                />

                <span>+591 000 00000</span>
              </a>

              <div
                className="
                  flex
                  items-center
                  gap-3

                  text-sm
                  text-black/55
                "
              >
                <MapPin
                  className="
                    h-4
                    w-4
                    shrink-0

                    text-[#777B5D]
                  "
                  strokeWidth={1.6}
                />

                <span>La Paz, Bolivia</span>
              </div>
            </div>
          </div>

          {/* =================================================
              COMPRAR
          ================================================= */}

          <div className="lg:col-span-2">
            <FooterTitle icon={ShoppingBag}>
              Comprar
            </FooterTitle>

            <nav
              className="
                mt-5
                flex
                flex-col
                gap-3
              "
            >
              <FooterLink href="/productos">
                Todos los productos
              </FooterLink>

              <FooterLink href="/nuevos">
                Novedades
              </FooterLink>

              <FooterLink href="/promociones">
                Promociones
              </FooterLink>

              <FooterLink href="/gift-cards">
                Gift Cards
              </FooterLink>
            </nav>
          </div>

          {/* =================================================
              CATEGORÍAS
          ================================================= */}

          <div className="lg:col-span-2">
            <FooterTitle icon={Tags}>
              Categorías
            </FooterTitle>

            <nav
              className="
                mt-5
                flex
                flex-col
                gap-3
              "
            >
              <FooterLink href="/tecnologia">
                Tecnología
              </FooterLink>

              <FooterLink href="/escolar">
                Escolar
              </FooterLink>

              <FooterLink href="/viaje">
                Viaje
              </FooterLink>

              <FooterLink href="/accesorios">
                Accesorios
              </FooterLink>

              <FooterLink href="/hogar">
                Hogar
              </FooterLink>
            </nav>
          </div>

          {/* =================================================
              AYUDA
          ================================================= */}

          <div className="lg:col-span-2">
            <FooterTitle icon={CircleHelp}>
              Ayuda
            </FooterTitle>

            <nav
              className="
                mt-5
                flex
                flex-col
                gap-3
              "
            >
              <FooterLink href="/contacto">
                Contacto
              </FooterLink>

              <FooterLink href="/envios">
                Envíos
              </FooterLink>

              <FooterLink href="/pagos">
                Pagos
              </FooterLink>

              <FooterLink href="/preguntas-frecuentes">
                Preguntas frecuentes
              </FooterLink>

              <FooterLink href="/cambios-y-devoluciones">
                Cambios y devoluciones
              </FooterLink>
            </nav>
          </div>

          {/* =================================================
              REDES + KIRA
          ================================================= */}

          <div
            className="
              relative

              min-h-[280px]

              sm:col-span-2

              lg:col-span-3
              lg:min-h-[320px]
            "
          >
            <div className="relative z-20">
              <FooterTitle icon={Heart}>
                Síguenos
              </FooterTitle>

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-3
                "
              >
                <SocialLink href="#">
                  Instagram
                </SocialLink>

                <SocialLink href="#">
                  Facebook
                </SocialLink>

                <SocialLink href="#">
                  TikTok
                </SocialLink>
              </div>
            </div>

            {/* =================================================
                MASCOTA
            ================================================= */}

            <div
              className="
                pointer-events-none

                absolute
                bottom-[-82px]
                right-[-60px]

                z-10

                h-[270px]
                w-[270px]

                sm:h-[310px]
                sm:w-[310px]

                lg:h-[350px]
                lg:w-[350px]
              "
            >
              <Image
                src="/media/kira/kira-adios.png"
                alt="Kira despidiéndose"
                fill
                sizes="
                  (max-width: 640px) 270px,
                  (max-width: 1024px) 310px,
                  350px
                "
                className="
                  object-contain
                  object-bottom
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          LEGAL
      ===================================================== */}

      <div
        className="
          relative
          z-30

          border-t
          border-black/[0.08]

          bg-[#EEECE4]

          px-4
          py-6

          sm:px-6

          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]

            flex-col
            gap-4

            text-xs
            text-black/45

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {currentYear} Kira. Todos los derechos reservados.
          </p>

          <div
            className="
              flex
              flex-wrap
              gap-x-5
              gap-y-2
            "
          >
            <FooterLegal href="/privacidad">
              Privacidad
            </FooterLegal>

            <FooterLegal href="/terminos">
              Términos
            </FooterLegal>

            <FooterLegal href="/cookies">
              Cookies
            </FooterLegal>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// TÍTULO DE COLUMNA
// ============================================================

function FooterTitle({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5
      "
    >
      {Icon && (
        <Icon
          className="
            h-[15px]
            w-[15px]

            text-[#777B5D]
          "
          strokeWidth={1.5}
        />
      )}

      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.22em]

          text-[#777B5D]
        "
      >
        {children}
      </p>
    </div>
  );
}

// ============================================================
// ENLACE INTERNO
// ============================================================

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        w-fit

        text-sm
        text-black/55

        transition-all
        duration-300

        hover:translate-x-[2px]
        hover:text-[#181818]
      "
    >
      {children}
    </Link>
  );
}

// ============================================================
// RED SOCIAL
// ============================================================

function SocialLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="
        group
        flex
        w-fit
        items-center
        gap-2

        text-sm
        text-black/55

        transition-colors
        duration-300

        hover:text-[#181818]
      "
    >
      <span>{children}</span>

      <ArrowUpRight
        className="
          h-3.5
          w-3.5

          transition-transform
          duration-300

          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
        "
        strokeWidth={1.6}
      />
    </a>
  );
}

// ============================================================
// LEGAL
// ============================================================

function FooterLegal({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        transition-colors
        duration-300

        hover:text-[#181818]
      "
    >
      {children}
    </Link>
  );
}