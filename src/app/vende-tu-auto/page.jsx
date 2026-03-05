"use client";

import React from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LocationSection from "../../components/LocationSection";
import styles from "./page.module.css";

export default function VendeTuAutoPage() {
  const nextUrl = typeof window !== "undefined" ? `${window.location.origin}/gracias` : "/gracias";

  const handleScrollToForm = () => {
    const formSection = document.getElementById("formulario-cotizacion");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Header />

      <main className={styles.pageWrapper}>
        <section className={styles.heroSection}>
          <div className={styles.heroTextCol}>
            <h1>¿Tenés un auto para vender?</h1>
            <h2>Nosotros te ayudamos a venderlo mejor y más rápido.</h2>
            <p>
              En Auto Cardales te ofrecemos una solución integral: tomamos tus datos,
              evaluamos tu vehículo y te acompañamos durante todo el proceso para que
              vendas con tranquilidad, respaldo y transparencia.
            </p>

            <button type="button" className={styles.ctaButton} onClick={handleScrollToForm}>
              Comenzá por aquí <i className="fa-solid fa-arrow-down"></i>
            </button>
          </div>

          <div className={styles.heroImageCol}>
            <Image
              src="/img/Promos/entrega-de-llaves.webp"
              alt="Imagen ilustrativa de vehículo"
              width={900}
              height={600}
              className={styles.heroImage}
            />
          </div>
        </section>

        <section id="formulario-cotizacion" className={styles.formSection}>
          <div className={styles.formContainer}>
            <h3>Completá tus datos y agendá una visita</h3>

            <form
              className={styles.formGrid}
              action="https://formsubmit.co/david.duarte329@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Nueva solicitud para vender auto - Auto Cardales" />
              <input type="hidden" name="_next" value={nextUrl} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <label>
                Nombre y Apellido
                <input type="text" name="nombre" required />
              </label>

              <label>
                Teléfono
                <input type="tel" name="telefono" required />
              </label>

              <label>
                Mail
                <input type="email" name="mail" required />
              </label>

              <label>
                Marca
                <input type="text" name="marca" />
              </label>

              <label>
                Modelo
                <input type="text" name="modelo" />
              </label>

              <label>
                Año
                <input type="number" name="anio" min="1900" max="2099" />
              </label>

              <label>
                Kilómetros
                <input type="number" name="kilometros" min="0" />
              </label>

              <label className={styles.fullWidth}>
                Datos adicionales que quieras comentarnos
                <textarea name="comentarios" rows={5}></textarea>
              </label>

              <div className={styles.fullWidth}>
                <button type="submit" className={styles.submitButton}>¡Enviar!</button>
              </div>
            </form>
          </div>
        </section>

        <section className={styles.whatsBanner}>
          <div className={styles.whatsInfo}>
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
            <div>
              <strong>Escribinos por WhatsApp</strong>
              <p>Lunes a Sábados de 9 a 18 hs</p>
            </div>
          </div>

          <a
            href="https://wa.me/5491156074949?text=Hola%2C%20quiero%20cotizar%20mi%20auto."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsAction}
          >
            Hacé click aquí
          </a>
        </section>

        <LocationSection />
      </main>

      <Footer />
    </>
  );
}
