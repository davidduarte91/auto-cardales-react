import React from "react";

export default function LocationSection(){
  return (
    <section id="ubicacion" className="seccion-ubicacion">
      <div className="ubicacion-contenedor">
        <div className="ubicacion-info">
          <h2>Dónde estamos</h2>
          <p className="direccion">Sargento Cabral 357<br />Los Cardales</p>
        </div>
        <div className="ubicacion-mapa">
          <iframe
            src="https://www.google.com/maps?q=Sargento+Cabral+357+Los+Cardales&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div id="contacto" className="mini-contacto-wrap">
        <h3>Contactanos</h3>
        <div className="mini-contacto-grid">
          <form
            className="mini-contacto-form"
            action="https://formsubmit.co/david.duarte329@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value="Nueva consulta desde sección Contactanos" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="nombre" placeholder="Tu nombre" required />
            <input type="email" name="email" placeholder="Tu email" required />
            <textarea
              name="mensaje"
              rows={3}
              placeholder="Contanos qué vehículo te interesa o querés vender y te ayudamos por acá"
              required
            ></textarea>
            <button type="submit">Enviar consulta</button>
          </form>

          <aside className="mini-contacto-side">
            <p><strong>Contacto:</strong> <a href="mailto:autocardales@gmail.com">autocardales@gmail.com</a></p>
            <p className="mini-contacto-tel"><a href="tel:+5491156074949"><strong>011 5607-4949</strong></a></p>
            <div className="mini-contacto-seguinos">
              <span>Seguinos</span>
              <div className="socials">
                <a href="https://www.facebook.com/autocardales" target="_blank" rel="noopener noreferrer" title="Facebook"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/autocardales" target="_blank" rel="noopener noreferrer" title="Instagram"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
