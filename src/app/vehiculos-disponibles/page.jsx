import React from "react";
import Header from "../../components/Header";
import VehicleGrid from "../../components/VehicleGrid";
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
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
