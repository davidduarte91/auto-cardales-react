import React from "react";
import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section id="por-que" className="por-que-nos-eligen">
      <h2>¿Por qué nos eligen los clientes?</h2>
      <div className="por-que-grid">
        <div className="por-que-item">
          <div className="por-que-foto">
            <Image src="/img/Por qué nos eligen/muscular-car-service-worker-repairing-vehicle.webp" alt="Confianza" width={420} height={240} />
          </div>
          <h3>Confianza</h3>
          <p className="sub">Atención personalizada y procesos transparentes.</p>
        </div>
        <div className="por-que-item">
          <div className="por-que-foto">
            <Image src="/img/Por qué nos eligen/side-view-hands-holding-car-key.webp" alt="Variedad" width={420} height={240} />
          </div>
          <h3>Variedad</h3>
          <p className="sub">Amplio stock de vehículos revisados y garantizados.</p>
        </div>
        <div className="por-que-item">
          <div className="por-que-foto">
            <Image src="/img/Por qué nos eligen/chica firmando en auto.webp" alt="Servicio" width={420} height={240} />
          </div>
          <h3>Servicio</h3>
          <p className="sub">Trámites y entrega pensados para tu comodidad.</p>
        </div>
      </div>
    </section>
  );
}
