import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegistroPage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F8F7F3]
        px-4
        py-4
        sm:px-6
        sm:py-6
        lg:px-8
        lg:py-8
      "
    >
      {/* =====================================================
          FONDO DECORATIVO
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#C9CE76]/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-32
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#777B5D]/15
          blur-3xl
        "
      />

      {/* =====================================================
          CONTENEDOR PRINCIPAL
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          min-h-[calc(100vh-32px)]
          max-w-[1450px]
          overflow-hidden
          rounded-[32px]
          border
          border-black/[0.05]
          bg-white/90
          shadow-[0_24px_90px_rgba(0,0,0,0.08)]
          backdrop-blur-xl
          sm:min-h-[calc(100vh-48px)]
          lg:min-h-[calc(100vh-64px)]
          lg:grid-cols-[0.95fr_1.05fr]
        "
      >
        {/* =================================================
            ZONA VISUAL IZQUIERDA
        ================================================= */}

        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-[#ECE9DD]
            lg:flex
            lg:flex-col
            lg:justify-between
            lg:px-12
            lg:py-10
            xl:px-14
            xl:py-12
          "
        >
          {/* DECORACIÓN SUPERIOR */}

          <div
            className="
              pointer-events-none
              absolute
              -left-32
              -top-24
              h-[360px]
              w-[360px]
              rounded-full
              bg-[#C9CE76]/40
            "
          />

          {/* DECORACIÓN INFERIOR */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-44
              -right-40
              h-[520px]
              w-[520px]
              rounded-full
              bg-[#777B5D]/10
            "
          />

          {/* LOGO */}

          <div className="relative z-20">
            <Link
              href="/"
              className="
                inline-flex
                items-center
                text-[28px]
                font-semibold
                tracking-[-0.04em]
                text-[#181818]
                transition
                duration-300
                hover:opacity-70
              "
            >
              Kira
            </Link>
          </div>

          {/* TEXTO PRINCIPAL */}

          <div className="relative z-20 max-w-[520px]">
            <p
              className="
                mb-5
                text-xs
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#777B5D]
              "
            >
              Bienvenido a Kira
            </p>

            <h2
              className="
                text-[46px]
                font-semibold
                leading-[0.98]
                tracking-[-0.05em]
                text-[#181818]
                xl:text-[58px]
              "
            >
              Tu cuenta,
              <br />
              tu espacio,
              <br />
              tu Kira.
            </h2>

            <p
              className="
                mt-7
                max-w-[390px]
                text-[15px]
                leading-7
                text-black/50
              "
            >
              Crea tu cuenta para guardar favoritos, revisar tus compras y
              disfrutar una experiencia cada vez más personal.
            </p>
          </div>

          {/* TEXTO INFERIOR */}

          <div className="relative z-20">
            <p
              className="
                max-w-[320px]
                text-xs
                leading-5
                text-black/40
              "
            >
              Tecnología, escolar, viaje, accesorios y mucho más para
              acompañarte en cada momento.
            </p>
          </div>
        </section>

        {/* =================================================
            ZONA REGISTRO
        ================================================= */}

        <section
          className="
            relative
            flex
            min-h-[860px]
            items-center
            justify-center
            overflow-hidden
            px-5
            py-10
            sm:px-10
            sm:py-12
            lg:min-h-0
            lg:px-12
            lg:py-10
            xl:px-16
          "
        >
          {/* =================================================
              KIRA REGISTRO
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-132px]
              top-1/2
              z-10
              hidden
              h-[370px]
              w-[370px]
              -translate-y-1/2
              lg:block
              xl:right-[-118px]
              xl:h-[420px]
              xl:w-[420px]
            "
          >
            <Image
              src="/media/kira/auth/kira-register.png"
              alt=""
              fill
              priority
              className="object-contain"
              sizes="420px"
            />
          </div>

          {/* =================================================
              CONTENIDO
          ================================================= */}

          <div
            className="
              relative
              z-20
              w-full
              max-w-[540px]
            "
          >
            {/* LOGO / VOLVER MÓVIL */}

            <div
              className="
                mb-10
                flex
                items-center
                justify-between
                lg:hidden
              "
            >
              <Link
                href="/"
                className="
                  text-2xl
                  font-semibold
                  tracking-[-0.03em]
                  text-[#181818]
                "
              >
                Kira
              </Link>

              <Link
                href="/"
                className="
                  text-xs
                  font-medium
                  text-black/45
                  transition
                  hover:text-black/70
                "
              >
                Volver a la tienda
              </Link>
            </div>

            <RegisterForm />
          </div>
        </section>
      </div>
    </main>
  );
}