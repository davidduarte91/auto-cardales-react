import React from "react";
import Header from "../../components/Header";
import VehicleQuickSearch from "../../components/VehicleQuickSearch";
import VehicleGrid from "../../components/VehicleGrid";
import LocationSection from "../../components/LocationSection";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";

export default function VehiculosDisponiblesPage() {
  return (
    <>
      <Header />
      <main className="vehiculos-disponibles-main">
        <VehicleQuickSearch />
        <VehicleGrid
          title="Vehículos disponibles"
          sectionId="vehiculos-disponibles"
          showCta={false}
          uniformCards={true}
          gridClassName="grilla-cuatro-iguales"
          showReservedBanner={true}
        />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
