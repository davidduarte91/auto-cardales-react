"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../app/vehiculos/[slug]/page.module.css";
import { vehiculos } from "../data/vehiculos";
import { slugifyVehiculoNombre } from "../lib/vehiculos";

export default function VehicleDetailView({ vehiculo }) {
  const nextUrl = typeof window !== "undefined" ? `${window.location.origin}/gracias` : "/gracias";
  const imagenes = vehiculo.imagenes || [];
  const totalImagenes = imagenes.length;
  const sugeridos = vehiculos.filter((item) => item.id !== vehiculo.id).slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const imagenActiva = totalImagenes > 0 ? imagenes[activeIndex] : null;

  useEffect(() => {
    if (totalImagenes <= 1 || isHovered) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalImagenes);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [totalImagenes, isHovered]);

  const handlePrevImage = () => {
    if (totalImagenes <= 1) return;
    setActiveIndex((current) => (current - 1 + totalImagenes) % totalImagenes);
  };

  const handleNextImage = () => {
    if (totalImagenes <= 1) return;
    setActiveIndex((current) => (current + 1) % totalImagenes);
  };

  const handleShareSugerido = async (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (typeof window === "undefined") return;

    const slug = slugifyVehiculoNombre(item.nombre);
    const shareUrl = `${window.location.origin}/vehiculos/${slug}`;
    const shareData = {
      title: `${item.nombre} | ${item.año} | ${item.km}`,
      text: `Mirá este vehículo: ${item.nombre} | ${item.año} | ${item.km}`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      // Usuario canceló o el navegador bloqueó la acción.
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <span>•</span>
        <Link href="/vehiculos-disponibles">Vehículos disponibles</Link>
        <span>•</span>
        <span>{vehiculo.nombre}</span>
      </div>

      <section className={styles.layout}>
        <aside className={styles.infoCol}>
          <h1>{vehiculo.nombre}</h1>

          <div className={styles.metaLine}>
            <span>{vehiculo.año}</span>
            <span>•</span>
            <span>{vehiculo.km}</span>
            <span>•</span>
            <span>{vehiculo.transmision}</span>
          </div>

          <div className={styles.price}>{vehiculo.precio}</div>

          <dl className={styles.detailsGrid}>
            <div><dt>Marca:</dt><dd>{vehiculo.nombre.split(" ")[0] || "-"}</dd></div>
            <div><dt>Modelo:</dt><dd>{vehiculo.nombre.replace((vehiculo.nombre.split(" ")[0] || ""), "").trim() || "-"}</dd></div>
            <div><dt>Año:</dt><dd>{vehiculo.año}</dd></div>
            <div><dt>Kilometraje:</dt><dd>{vehiculo.km}</dd></div>
            <div><dt>Transmisión:</dt><dd>{vehiculo.transmision}</dd></div>
          </dl>

          <a href="#contacto" className={styles.primaryBtn}>
            Quiero consultar o agendar una visita <i className="fa-solid fa-arrow-right"></i>
          </a>
        </aside>

        <section className={styles.galleryCol}>
          {imagenActiva ? (
            <>
              <div
                className={styles.galleryMainImageWrap}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  key={`${vehiculo.id}-${activeIndex}`}
                  src={imagenActiva}
                  alt={`Foto principal de ${vehiculo.nombre}`}
                  fill
                  sizes="(max-width: 980px) 100vw, 65vw"
                  className={styles.galleryMainImage}
                  priority
                />

                {totalImagenes > 1 ? (
                  <>
                    <button
                      type="button"
                      className={`${styles.navButton} ${styles.navPrev}`}
                      onClick={handlePrevImage}
                      aria-label="Foto anterior"
                    >
                      <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      className={`${styles.navButton} ${styles.navNext}`}
                      onClick={handleNextImage}
                      aria-label="Foto siguiente"
                    >
                      <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
              </div>

              {imagenes.length > 0 ? (
                <div className={styles.thumbGrid}>
                  {imagenes.map((src, index) => (
                    <button
                      key={`${vehiculo.id}-${index}`}
                      type="button"
                      className={`${styles.thumbButton} ${activeIndex === index ? styles.thumbActive : ""}`.trim()}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Ver foto ${index + 1} de ${vehiculo.nombre}`}
                    >
                      <Image
                        src={src}
                        alt={`Miniatura ${index + 1} de ${vehiculo.nombre}`}
                        fill
                        sizes="120px"
                        className={styles.thumbImage}
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className={styles.galleryPlaceholder}>
              <i className="fa-regular fa-image" aria-hidden="true"></i>
              <h2>Sin fotos disponibles</h2>
              <p>Estamos cargando imágenes para este vehículo.</p>
            </div>
          )}
        </section>
      </section>

      <section id="ubicacion" className={styles.consultaSection}>
        <div id="contacto" className={styles.consultaFormCol}>
          <h3>¡Quiero consultar o agendar una visita por este vehículo!</h3>

          <form
            className={styles.consultaForm}
            action="https://formsubmit.co/david.duarte329@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value={`Consulta por vehículo: ${vehiculo.nombre}`} />
            <input type="hidden" name="_next" value={nextUrl} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <input type="hidden" name="vehiculo_id" value={vehiculo.id} />
            <input type="hidden" name="vehiculo_nombre" value={vehiculo.nombre} />
            <input type="hidden" name="vehiculo_precio" value={vehiculo.precio} />
            <input type="hidden" name="vehiculo_anio" value={vehiculo.año} />
            <input type="hidden" name="vehiculo_km" value={vehiculo.km} />
            <input type="hidden" name="vehiculo_transmision" value={vehiculo.transmision} />

            <div className={styles.topInputs}>
              <input type="text" name="nombre" placeholder="Tu nombre" required />
              <input type="email" name="email" placeholder="Tu email" required />
              <input type="tel" name="telefono" placeholder="Tu teléfono" required />
            </div>

            <textarea
              name="mensaje"
              rows={6}
              placeholder="Escribinos tu consulta aquí y nos pondremos en contacto lo más pronto posible."
              required
            ></textarea>

            <div className={styles.submitWrap}>
              <button type="submit" className={styles.submitBtn}>
                <span>¡Enviar!</span>
                <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>

        <aside className={styles.consultaInfoCol}>
          <i className="fa-solid fa-location-dot"></i>
          <h3>Dónde estamos</h3>
          <p>Sargento Cabral 357<br />Los Cardales</p>

          <div className={styles.consultaTelefono}>011 5607-4949</div>
          <div className={styles.consultaMail}>autocardales@gmail.com</div>

          <div className={styles.consultaSeguinos}>
            <span>Seguinos</span>
            <div>
              <a href="https://www.facebook.com/autocardales" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/autocardales" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.sugeridosSection}>
        <h2>También te puede interesar</h2>

        <div className={styles.sugeridosGrid}>
          {sugeridos.map((item) => {
            const slug = slugifyVehiculoNombre(item.nombre);
            const imageSrc = item.imagenes?.[0] || "/img/logo-cuadrado-facebook.jpg";

            return (
              <article key={item.id} className={styles.sugeridoCard}>
                <Link href={`/vehiculos/${slug}`} className={styles.sugeridoImageWrap}>
                  <Image
                    src={imageSrc}
                    alt={item.nombre}
                    fill
                    sizes="(max-width: 980px) 100vw, 25vw"
                    className={styles.sugeridoImage}
                  />
                </Link>

                <div className={styles.sugeridoBody}>
                  <h3>
                    <Link href={`/vehiculos/${slug}`}>{item.nombre}</Link>
                  </h3>
                  <div className={styles.sugeridoPrecioRow}>
                    <p className={styles.sugeridoPrecio}>{item.precio}</p>
                    <button
                      type="button"
                      className={styles.sugeridoShareBtn}
                      onClick={(event) => handleShareSugerido(event, item)}
                      aria-label={`Compartir ${item.nombre}`}
                      title="Compartir"
                    >
                      <i className="fa-solid fa-share-nodes" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className={styles.sugeridoMeta}>
                    <span>{item.año}</span>
                    <span>{item.km}</span>
                    <span>{item.transmision}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.sugeridosCtaWrap}>
          <Link href="/vehiculos-disponibles" className={styles.sugeridosCta}>
            Ver más
          </Link>
        </div>
      </section>
    </main>
  );
}
