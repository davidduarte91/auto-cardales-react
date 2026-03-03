import React from "react";

export default function WhatsAppButton(){
  const num = "5491156074949";
  const message = "Hola, me gustaría hacer una consulta sobre los autos disponibles.";
  return (
    <a
      className="whatsapp-flotante"
      href={`https://wa.me/${num}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Contactanos por WhatsApp"
      aria-label="Consultar por WhatsApp"
    >
      <i className="fab fa-whatsapp" aria-hidden="true"></i>
      <span className="sr-only">Consultar</span>
    </a>
  );
}
