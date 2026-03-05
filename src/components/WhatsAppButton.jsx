import React from "react";

export default function WhatsAppButton({ message }){
  const num = "5491156074949";
  const defaultMessage = "Hola, me gustaría hacer una consulta sobre los autos disponibles.";
  const whatsappMessage = String(message || defaultMessage);
  return (
    <a
      className="whatsapp-flotante"
      href={`https://wa.me/${num}?text=${encodeURIComponent(whatsappMessage)}`}
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
