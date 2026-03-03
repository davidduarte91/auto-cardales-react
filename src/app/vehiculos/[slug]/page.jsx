import React from "react";
import { notFound, redirect } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import VehicleDetailView from "../../../components/VehicleDetailView";
import { getVehiculoById, getVehiculoBySlug, slugifyVehiculoNombre } from "../../../lib/vehiculos";

export default async function VehiculoDetallePage({ params }) {
  const resolvedParams = await params;
  const routeParam = String(resolvedParams?.slug || "").trim();
  const numericId = Number(routeParam);

  if (Number.isInteger(numericId)) {
    const vehiculoById = getVehiculoById(numericId);
    if (vehiculoById) {
      redirect(`/vehiculos/${slugifyVehiculoNombre(vehiculoById.nombre)}`);
    }
  }

  const vehiculo = getVehiculoBySlug(routeParam);

  if (!vehiculo) {
    notFound();
  }

  return (
    <>
      <Header />
      <VehicleDetailView key={vehiculo.id} vehiculo={vehiculo} />
      <Footer />
    </>
  );
}
