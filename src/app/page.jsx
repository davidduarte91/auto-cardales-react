import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import VehicleGrid from "../components/VehicleGrid";
import WhyChooseUs from "../components/WhyChooseUs";
import LocationSection from "../components/LocationSection";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function Page(){
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <VehicleGrid onlyHomeSelection={true} />
        <WhyChooseUs />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
