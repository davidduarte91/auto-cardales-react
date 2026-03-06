"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function WhyChooseUs() {
  const slides = [
    {
      title: "Confianza",
      text: "Atención personalizada y procesos transparentes.",
      image: "/img/Por qué nos eligen/muscular-car-service-worker-repairing-vehicle.webp",
      alt: "Confianza"
    },
    {
      title: "Variedad",
      text: "Amplio stock de vehículos revisados y garantizados.",
      image: "/img/Por qué nos eligen/side-view-hands-holding-car-key.webp",
      alt: "Variedad"
    },
    {
      title: "Servicio",
      text: "Trámites y entrega pensados para tu comodidad.",
      image: "/img/Por qué nos eligen/chica firmando en auto.webp",
      alt: "Servicio"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4200);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <section id="por-que" className="por-que-nos-eligen">
      <h2>¿Por qué nos eligen los clientes?</h2>
      <div className="por-que-grid">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`por-que-item ${index === activeIndex ? "is-active" : ""}`}
            aria-hidden={index !== activeIndex}
          >
            <div className="por-que-foto">
              <Image src={slide.image} alt={slide.alt} width={420} height={240} />
            </div>
            <h3>{slide.title}</h3>
            <p className="sub">{slide.text}</p>
          </div>
        ))}
      </div>
      <div className="por-que-indicadores" aria-label="Indicadores del carrusel">
        {slides.map((slide, index) => (
          <button
            key={`${slide.title}-dot`}
            type="button"
            className={`por-que-dot ${index === activeIndex ? "is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Mostrar ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
}
