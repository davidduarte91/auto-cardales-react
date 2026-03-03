import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./page.module.css";

export default function SobreNosotrosPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section id="nosotros" className={styles.section}>
          <div className={styles.textCol}>
            <h1>Sobre nosotros</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <div className={styles.highlightBox}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed
              cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            </p>
          </div>

          <aside className={styles.imageCol}>
            <div className={styles.imagePlaceholder}>
              <span>Espacio para imagen</span>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
