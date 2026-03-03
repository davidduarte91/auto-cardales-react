"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const heroImages = [
    "/img/VW Gol Trend 1.6  Año 2019/frente-hero.webp",
    "/img/Peugeot Partner 1.4 - 2015/frente-hero.webp",
    "/img/Toyota Hilux 4X4 Automática - 2007/frente-hero.webp"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % heroImages.length), 3500);
    return () => clearInterval(t);
  }, [heroImages.length]);

  const handleComprar = () => {
    const seccion = document.getElementById("vehiculos");
    if (seccion) {
      seccion.scrollIntoView({ behavior: "smooth" });
      return;
    }
    alert("Sección de vehículos disponibles próximamente");
  };

  const handleVender = () => {
    window.location.href = "/vende-tu-auto";
  };

  const handleConsultar = () => {
    const whatsappNumber = "5491156074949";
    const message = "Hola, me gustaría hacer una consulta sobre los autos disponibles.";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="hero">
      <div className="hero-image-container">
        {heroImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Auto ${i + 1}`}
            fill
            sizes="100vw"
            priority={i === 0}
            className={`hero-image ${i === index ? "active" : ""}`}
          />
        ))}
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Compra y Venta<br />Consignación<br />Permutas y Gestoría</h1>
        <div className="hero-buttons">
          <button className="hero-btn comprar-btn" onClick={handleComprar}>
            <i className="fas fa-shopping-cart"></i> Comprar
          </button>
          <button className="hero-btn vender-btn" onClick={handleVender}>
            <i className="fas fa-car"></i> Vender
          </button>
          <button className="hero-btn consultar-btn" onClick={handleConsultar}>
            <i className="fab fa-whatsapp"></i> Consultar
          </button>
        </div>
      </div>
    </section>
  );
}
