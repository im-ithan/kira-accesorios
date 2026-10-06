import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INPUT_DIR = path.join(
  process.cwd(),
  "public",
  "media",
  "productos"
);

const supportedExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".avif",
  ".tiff",
  ".tif",
]);

async function optimizeImages() {
  const files = await fs.readdir(INPUT_DIR);

  const images = files.filter((file) =>
    supportedExtensions.has(path.extname(file).toLowerCase())
  );

  console.log(`Encontradas ${images.length} imagen(es).\n`);

  for (const file of images) {
    const inputPath = path.join(INPUT_DIR, file);

    const name = path.parse(file).name;
    const outputFile = `${name}.webp`;
    const outputPath = path.join(INPUT_DIR, outputFile);

    await sharp(inputPath)
      .rotate()
      .webp({
        quality: 82,
        effort: 6,
      })
      .toFile(outputPath);

    console.log(`✓ ${file} → ${outputFile}`);
  }

  console.log("\nOptimización terminada.");
}

optimizeImages().catch((error) => {
  console.error("Error optimizando imágenes:");
  console.error(error);
  process.exit(1);
});