import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataModulePath = path.join(rootDir, "src", "data", "vehiculos.js");
const MIN_RECOMMENDED_PHOTOS = 3;

async function loadVehiculos() {
  const source = fs.readFileSync(dataModulePath, "utf8");
  const transformed = source.replace(/export\s+const\s+vehiculos\s*=\s*/, "const vehiculos = ");
  const script = new vm.Script(`${transformed}\nmodule.exports = vehiculos;`);
  const sandbox = { module: { exports: [] }, exports: {} };
  script.runInNewContext(sandbox);
  return sandbox.module.exports || [];
}

function resolvePublicPath(imagePath) {
  const normalized = String(imagePath || "").trim();
  if (!normalized.startsWith("/")) {
    return null;
  }
  return path.join(rootDir, "public", normalized.replace(/^\//, ""));
}

async function main() {
  const vehiculos = await loadVehiculos();

  if (!Array.isArray(vehiculos) || vehiculos.length === 0) {
    console.error("No se encontraron vehículos en src/data/vehiculos.js");
    process.exit(1);
  }

  const missing = [];
  const invalid = [];
  const lowPhotoCount = [];
  let totalImages = 0;

  for (const vehiculo of vehiculos) {
    const nombre = vehiculo?.nombre || `ID ${vehiculo?.id ?? "?"}`;
    const imagenes = Array.isArray(vehiculo?.imagenes) ? vehiculo.imagenes : [];

    if (imagenes.length === 0) {
      invalid.push({ nombre, reason: "No tiene array de imágenes o está vacío." });
      continue;
    }

    if (imagenes.length < MIN_RECOMMENDED_PHOTOS) {
      lowPhotoCount.push({ nombre, count: imagenes.length });
    }

    for (const imagePath of imagenes) {
      totalImages += 1;
      const absolutePath = resolvePublicPath(imagePath);

      if (!absolutePath) {
        invalid.push({ nombre, reason: `Ruta inválida: ${imagePath}` });
        continue;
      }

      if (!fs.existsSync(absolutePath)) {
        missing.push({ nombre, imagePath });
      }
    }
  }

  console.log(`Vehículos analizados: ${vehiculos.length}`);
  console.log(`Imágenes declaradas: ${totalImages}`);

  if (invalid.length > 0) {
    console.log("\nEntradas inválidas:");
    for (const item of invalid) {
      console.log(`- ${item.nombre}: ${item.reason}`);
    }
  }

  if (lowPhotoCount.length > 0) {
    console.log(`\nAdvertencia: vehículos con menos de ${MIN_RECOMMENDED_PHOTOS} fotos (recomendado):`);
    for (const item of lowPhotoCount) {
      console.log(`- ${item.nombre}: ${item.count} foto(s)`);
    }
  }

  if (missing.length > 0) {
    console.log("\nImágenes faltantes en /public:");
    for (const item of missing) {
      console.log(`- ${item.nombre}: ${item.imagePath}`);
    }
    process.exit(1);
  }

  if (invalid.length > 0) {
    process.exit(1);
  }

  console.log("\nOK: todas las rutas de imágenes existen y están bien definidas.");
}

main().catch((error) => {
  console.error("Error al validar imágenes:", error);
  process.exit(1);
});
