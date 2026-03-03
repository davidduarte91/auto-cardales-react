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
