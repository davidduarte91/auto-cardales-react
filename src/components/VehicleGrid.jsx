"use client";
import React from "react";
import Link from "next/link";
import VehicleCard from "./VehicleCard";
import { vehiculos } from "../data/vehiculos";
import { slugifyVehiculoNombre } from "../lib/vehiculos";

export default function VehicleGrid({
  title = "Usados Seleccionados",
  sectionId = "vehiculos",
  showCta = true,
  uniformCards = false,
  gridClassName = "",
  onlyHomeSelection = false,
  showReservedBanner = false,
}) {
  const vehiculosParaMostrar = onlyHomeSelection
    ? vehiculos.filter((v) => v.mostrarEnHome)
    : vehiculos;

  return (
    <section id={sectionId} className="seccion-vehiculos">
      <h2>{title}</h2>
      <div className={`grilla-vehiculos ${gridClassName}`.trim()}>
        {vehiculosParaMostrar.map((v) => {
          const vehiculoCard = uniformCards ? { ...v, destacado: false } : v;
          return (
            <VehicleCard
              key={v.id}
              vehiculo={vehiculoCard}
              href={`/vehiculos/${slugifyVehiculoNombre(v.nombre)}`}
              showReservedBanner={showReservedBanner}
            />
          );
        })}
      </div>
      {showCta && (
        <div className="botonera-inferior">
          <Link className="btn-azul-grande" href="/vehiculos-disponibles">
            Mirá todos los usados disponibles <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      )}
    </section>
  );
}
