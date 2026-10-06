import ViajePortada from "@/components/viaje/ViajePortada";
import ViajeExplorador from "@/components/viaje/ViajeExplorador";
import ViajeDescansoColombia from "@/components/viaje/ViajeDescansoColombia";
import ViajeNovedades from "@/components/viaje/ViajeNovedades";
import ViajeAntesDePartir from "@/components/viaje/ViajeAntesDePartir";

import Footer from "@/components/layout/Footer";

/* =========================================================
   KIRA — VIAJE
   Página principal de la categoría Viaje

   RECORRIDO:

   1. PORTADA
      Presenta la categoría Viaje y proyecta al usuario
      hacia su próxima aventura.

      Es el primer contacto con el universo visual de
      la categoría y establece el tono de la experiencia.


   2. EXPLORADOR + MALETA
      El usuario descubre diferentes necesidades de viaje,
      explora subcategorías y prepara visualmente su maleta.

      La interacción conecta la exploración del catálogo
      con la idea de preparar todo antes de partir.


   3. DESCANSO COLOMBIA
      Pausa narrativa después de preparar el equipaje.

      La fotografía representa el momento en el que
      comienza la experiencia del viaje.

      Colombia funciona únicamente como escenario visual,
      no como destino comercial.

      Esta sección reduce temporalmente la carga comercial
      para dar continuidad a la historia.


   4. NOVEDADES · AUSTRALIA
      Regreso progresivo al ecommerce.

      Kira atraviesa la carretera mientras aparecen
      productos recién llegados.

      El vehículo funciona como elemento revelador:

      Kira pasa
         ↓
      aparece el producto
         ↓
      Kira continúa el recorrido

      Australia funciona únicamente como escenario visual
      y como momento especial dentro de la identidad de
      Kira debido a la relación natural entre el koala
      y Australia.


   5. ANTES DE PARTIR
      Cierre comercial y narrativo de la categoría Viaje.

      Después de la intensidad visual de Australia,
      la página vuelve a una composición más tranquila.

      Una ventana de avión coloca al usuario visualmente
      dentro de la experiencia del viaje y funciona como
      cierre del recorrido narrativo.

      El mensaje recuerda la importancia de preparar
      lo esencial antes de partir mediante tres conceptos:

      Organiza
         ↓
      Protege
         ↓
      Disfruta

      La acción principal dirige al catálogo completo
      de productos de Viaje.


   6. FOOTER
      Cierre estructural de la página y acceso a la
      navegación secundaria de Kira.


   RECORRIDO NARRATIVO:

   Inspirar
      ↓
   Descubrir qué llevar
      ↓
   Preparar la maleta
      ↓
   Vivir el viaje
      ↓
   Descubrir novedades
      ↓
   Prepararse antes de partir
      ↓
   Explorar el catálogo completo
      ↓
   Footer
   ========================================================= */

export default function ViajePage() {
  return (
    <main className="viaje-contenido">

      {/* ===================================================
          1. PORTADA
          Inspiración inicial
      ==================================================== */}

      <ViajePortada />


      {/* ===================================================
          2. EXPLORADOR + MALETA
          Descubrimiento y preparación
      ==================================================== */}

      <ViajeExplorador />


      {/* ===================================================
          3. DESCANSO · COLOMBIA
          Pausa narrativa
      ==================================================== */}

      <ViajeDescansoColombia />


      {/* ===================================================
          4. NOVEDADES · AUSTRALIA
          Productos + experiencia interactiva
      ==================================================== */}

      <ViajeNovedades />


      {/* ===================================================
          5. ANTES DE PARTIR
          Ventana de avión + CTA final
      ==================================================== */}

      <ViajeAntesDePartir />


      {/* ===================================================
          6. FOOTER
          Cierre de la página
      ==================================================== */}

      <Footer />

    </main>
  );
}