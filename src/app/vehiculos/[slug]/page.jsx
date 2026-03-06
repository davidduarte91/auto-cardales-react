import React from "react";
import { notFound, redirect } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import VehicleDetailView from "../../../components/VehicleDetailView";
import WhatsAppButton from "../../../components/WhatsAppButton";
import { getVehiculoById, getVehiculoBySlug, slugifyVehiculoNombre } from "../../../lib/vehiculos";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://auto-cardales-react.vercel.app");

function toAbsoluteUrl(path) {
  if (!path) return `${siteUrl}/icon1.png`;
  if (String(path).startsWith("http://") || String(path).startsWith("https://")) {
    return path;
  }
  return `${siteUrl}${String(path).startsWith("/") ? "" : "/"}${path}`;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const routeParam = String(resolvedParams?.slug || "").trim();
  const numericId = Number(routeParam);
  const vehiculo = Number.isInteger(numericId)
    ? getVehiculoById(numericId)
    : getVehiculoBySlug(routeParam);

  if (!vehiculo) {
    return {
      title: "Vehículo no encontrado | Auto Cardales",
      description: "El vehículo solicitado no está disponible.",
    };
  }

  const vehiculoSlug = slugifyVehiculoNombre(vehiculo.nombre);
  const imageUrl = toAbsoluteUrl(vehiculo.imagenes?.[0]);
  const detailUrl = `${siteUrl}/vehiculos/${vehiculoSlug}`;
  const description = `${vehiculo.nombre} • ${vehiculo.año} • ${vehiculo.km} • ${vehiculo.precio}`;

  return {
    title: `${vehiculo.nombre} | Auto Cardales`,
    description,
    alternates: {
      canonical: `/vehiculos/${vehiculoSlug}`,
    },
    openGraph: {
      title: `${vehiculo.nombre} | Auto Cardales`,
      description,
      url: detailUrl,
      type: "website",
      siteName: "Auto Cardales",
      locale: "es_AR",
      images: [
        {
          url: imageUrl,
          alt: `Foto principal de ${vehiculo.nombre}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehiculo.nombre} | Auto Cardales`,
      description,
      images: [imageUrl],
    },
  };
}

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
