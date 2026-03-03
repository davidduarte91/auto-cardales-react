import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacto-footer" className="footer-ac">
      <div className="footer-ac-contenedor">
        <div className="footer-ac-logo-col">
          <img
            src="/img/logo-cuadrado-facebook-removebg-preview.png"
            alt="Logo Auto Cardales"
            className="footer-ac-logo"
          />
        </div>

        <nav className="footer-ac-links" aria-label="Enlaces importantes">
          <ul>
            <li><a href="#vehiculos">Vehículos disponibles</a></li>
            <li><Link href="/vende-tu-auto">Vendé tu auto</Link></li>
            <li><a href="#ubicacion">Dónde estamos</a></li>
            <li><a href="#nosotros">Sobre nosotros</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>

        <div className="footer-ac-contacto">
          <div className="footer-ac-tel-grande">011 5607-4949</div>
          <div className="footer-ac-mail">
            <a href="mailto:autocardales@gmail.com">autocardales@gmail.com</a>
          </div>

          <div className="footer-ac-wpp-linea">
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
            <a
              href="https://wa.me/5491156074949?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20sobre%20los%20autos%20disponibles."
              target="_blank"
              rel="noopener noreferrer"
            >
              +54 9 11 5607-4949
            </a>
          </div>

          <div className="footer-ac-direccion">Sargento Cabral 357, Los Cardales</div>

          <div className="footer-ac-seguinos">
            <span>Seguinos</span>
            <div className="footer-ac-socials">
              <a href="https://www.facebook.com/autocardales" target="_blank" rel="noopener noreferrer" title="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/autocardales" target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-ac-qr">
          <div className="footer-ac-qr-box">Logo / QR Data Fiscal</div>
        </div>
      </div>
    </footer>
  );
}
