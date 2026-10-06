import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const folder = path.join(
  process.cwd(),
  "public",
  "media",
  "hero",
  "images",
);

const supportedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".avif",
  ".tiff",
];

async function optimizeImages() {
  try {
    const files = await fs.readdir(folder);

    const images = files.filter((file) =>
      supportedExtensions.includes(
        path.extname(file).toLowerCase(),
      ),
    );

    if (images.length === 0) {
      console.log("No hay imágenes para optimizar.");
      return;
    }

    console.log(`Encontradas ${images.length} imagen(es).\n`);

    for (const file of images) {
      const inputPath = path.join(folder, file);
      const originalName = path.parse(file).name;

      const outputPath = path.join(
        folder,
        `${originalName}.webp`,
      );

      try {
        await sharp(inputPath)
          .resize({
            width: 1920,
            height: 1080,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({
            quality: 82,
          })
          .toFile(outputPath);

        const outputStats = await fs.stat(outputPath);

        if (outputStats.size === 0) {
          throw new Error("El archivo WebP está vacío.");
        }

        await fs.unlink(inputPath);

        console.log(
          `✓ ${file} → ${originalName}.webp`,
        );
      } catch (error) {
        console.error(`✗ Error procesando ${file}`);
        console.error(error.message);
      }
    }

    console.log("\nOptimización terminada.");
  } catch (error) {
    console.error("No se pudo procesar la carpeta:");
    console.error(error.message);

    process.exit(1);
  }
}

optimizeImages();