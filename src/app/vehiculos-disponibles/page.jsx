import React from "react";
import Header from "../../components/Header";
import VehicleGrid from "../../components/VehicleGrid";
import LocationSection from "../../components/LocationSection";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";

export default function VehiculosDisponiblesPage() {
  return (
    <>
      <Header />
      <main>
        <VehicleGrid
          title="Vehículos disponibles"
          sectionId="vehiculos-disponibles"
          showCta={false}
          uniformCards={true}
          gridClassName="grilla-cuatro-iguales"
        />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
