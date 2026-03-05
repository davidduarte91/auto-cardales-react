import React from "react";
import { notFound, redirect } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import VehicleDetailView from "../../../components/VehicleDetailView";
import WhatsAppButton from "../../../components/WhatsAppButton";
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

  const whatsappMessage = `Hola, me gustaría consultar por ${vehiculo.nombre} (${vehiculo.año}) - ${vehiculo.km} - ${vehiculo.precio}.`;

  return (
    <>
      <Header />
      <VehicleDetailView key={vehiculo.id} vehiculo={vehiculo} />
      <Footer />
      <WhatsAppButton message={whatsappMessage} />
    </>
  );
}
