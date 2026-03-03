import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./page.module.css";

export default function GraciasPage() {
  return (
    <>
      <Header />

      <main className={styles.wrapper}>
        <section className={styles.card}>
          <i className="fa-solid fa-circle-check"></i>
          <h1>¡Gracias por tu consulta!</h1>
          <p>
            Recibimos tus datos correctamente. Te vamos a contactar a la brevedad
            para coordinar la visita y cotización de tu vehículo.
          </p>

          <Link href="/" className={styles.backButton}>
            Volver al inicio
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
