"use client";

interface ProductTabsProps {
  categorias: string[];
  categoriaActiva: string;
  onChange: (categoria: string) => void;
}

export default function ProductTabs({
  categorias,
  categoriaActiva,
  onChange,
}: ProductTabsProps) {
  return (
    <div
      className="
        flex
        w-full
        gap-2
        overflow-x-auto
        pb-2
        scrollbar-hide
      "
    >
      {categorias.map((categoria) => {
        const activa = categoriaActiva === categoria;

        return (
          <button
            key={categoria}
            type="button"
            onClick={() => onChange(categoria)}
            className={`
              shrink-0
              rounded-full
              border
              px-5
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-300

              ${
                activa
                  ? "border-[#777B5D] bg-[#777B5D] text-white shadow-sm"
                  : "border-black/10 bg-white text-[#181818] hover:border-[#777B5D]/50 hover:bg-[#ECE9DD]"
              }
            `}
          >
            {categoria}
          </button>
        );
      })}
    </div>
  );
}