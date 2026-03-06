import { vehiculos } from "../data/vehiculos";

export function slugifyVehiculoNombre(nombre) {
  return String(nombre || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getVehiculoById(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return undefined;
  return vehiculos.find((item) => item.id === numericId);
}

export function getVehiculoBySlug(slug) {
  const normalizedSlug = slugifyVehiculoNombre(String(slug || "").trim());
  return vehiculos.find((item) => slugifyVehiculoNombre(item.nombre) === normalizedSlug);
}

export function getVehiculoVersion(vehiculo) {
  const explicitVersion = String(vehiculo?.version || "").trim();
  if (explicitVersion) return explicitVersion;

  const nombre = String(vehiculo?.nombre || "").trim();
  if (!nombre) return "";

  const tokens = nombre.split(/\s+/).filter(Boolean);
  if (tokens.length < 4) return "";

  const motorIndex = tokens.findIndex((token) => /^\d(?:[.,]\d)?L?$/i.test(token));
  if (motorIndex === -1) return "";

  // Heuristic: brand + model are usually the first 2 tokens, version lives before motor.
  const candidate = tokens.slice(2, motorIndex).join(" ").trim();
  return candidate;
}
