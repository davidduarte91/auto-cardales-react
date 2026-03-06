"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../app/vehiculos/[slug]/page.module.css";
import { vehiculos } from "../data/vehiculos";
import { slugifyVehiculoNombre } from "../lib/vehiculos";
import { useCustomFormValidation } from "../lib/useCustomFormValidation";

export default function VehicleDetailView({ vehiculo }) {
  const nextUrl = typeof window !== "undefined" ? `${window.location.origin}/gracias` : "/gracias";
  const imagenes = vehiculo.imagenes || [];
  const totalImagenes = imagenes.length;
  const imagenBanner = "/img/Promos/image-removebg-preview.png";
  const motorDetectadoEnTitulo = (vehiculo.nombre.match(/\b\d(?:[.,]\d)?L?\b/i)?.[0] || "").replace(",", ".");
  const motor = String(vehiculo.motor || motorDetectadoEnTitulo || "").trim();
  const version = String(vehiculo.version || "").trim();
  const estadoGeneral = String(vehiculo.estadoGeneral || "Muy buen estado general").trim();
  const condicionPago = String(vehiculo.condicionPago || "Aceptamos pagos en pesos al tipo de cambio del día.").trim();
  const infoAdicional = Array.isArray(vehiculo.infoAdicional)
    ? vehiculo.infoAdicional.filter((item) => String(item || "").trim())
    : [];
  const hasPermutasEnInfoAdicional = infoAdicional.some((item) => /permut/i.test(String(item)));
  const tieneGNC = vehiculo.gnc === true || (typeof vehiculo.gnc === "string" && /gnc/i.test(vehiculo.gnc));
  const combustibleSinGNC = typeof vehiculo.combustible === "string"
    ? vehiculo.combustible.trim()
    : (typeof vehiculo.gnc === "string" && !/gnc/i.test(vehiculo.gnc) ? vehiculo.gnc.trim() : "");
  const tipoCombustible = tieneGNC ? "Nafta/GNC" : (combustibleSinGNC || "No especificado");
  const isReservado = Boolean(vehiculo.reservado);
  const sugeridos = vehiculos
    .filter((item) => item.id !== vehiculo.id)
    .sort((a, b) => Number(Boolean(a.reservado)) - Number(Boolean(b.reservado)))
    .slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchHoldingThumb, setIsTouchHoldingThumb] = useState(false);
  const [orientacionPorSrc, setOrientacionPorSrc] = useState({});
  const { errors, handleFieldInput, handleFormValidation } = useCustomFormValidation(
    {
      nombre: "Nombre",
      email: "Email",
      telefono: "Telefono",
      mensaje: "Mensaje",
    },
    {
      atLeastOneGroups: [["email", "telefono"]],
    }
  );
  const thumbRefs = useRef([]);
  const thumbTrackRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const imagenActiva = totalImagenes > 0 ? imagenes[activeIndex] : null;
  const imagenActivaEsVertical = imagenActiva ? orientacionPorSrc[imagenActiva] === true : false;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (totalImagenes <= 1 || isHovered || isTouchHoldingThumb) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalImagenes);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [totalImagenes, isHovered, isTouchHoldingThumb]);

  useEffect(() => {
    const thumbTrack = thumbTrackRef.current;
    const activeThumb = thumbRefs.current[activeIndex];
    if (!thumbTrack || !activeThumb) return;

    const targetLeft = activeThumb.offsetLeft - (thumbTrack.clientWidth - activeThumb.offsetWidth) / 2;
    thumbTrack.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    if (totalImagenes <= 1) return undefined;

    const onKeyDown = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tagName = target.tagName;
        if (target.isContentEditable || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
          return;
        }
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + totalImagenes) % totalImagenes);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % totalImagenes);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [totalImagenes]);

  const handlePrevImage = () => {
    if (totalImagenes <= 1) return;
    setActiveIndex((current) => (current - 1 + totalImagenes) % totalImagenes);
  };

  const handleNextImage = () => {
    if (totalImagenes <= 1) return;
    setActiveIndex((current) => (current + 1) % totalImagenes);
  };

  const handleMainTouchStart = (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch) return;
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleMainTouchEnd = (event) => {
    const touch = event.changedTouches?.[0];
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (!touch || startX === null || startY === null || totalImagenes <= 1) return;

    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    const minSwipe = 36;

    if (Math.abs(deltaX) < minSwipe || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX > 0) {
      handlePrevImage();
      return;
    }

    handleNextImage();
  };

  const handleShareVehiculo = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (typeof window === "undefined") return;

    const slug = slugifyVehiculoNombre(vehiculo.nombre);
    const shareUrl = `${window.location.origin}/vehiculos/${slug}`;
    const shareData = {
      title: `${vehiculo.nombre} | ${vehiculo.año} | ${vehiculo.km}`,
      text: `Mirá este vehículo: ${vehiculo.nombre} | ${vehiculo.año} | ${vehiculo.km}`,
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

  const handleMainImageReady = (src, event) => {
    const target = event.currentTarget;
    if (!target) return;

    const isVertical = target.naturalHeight > target.naturalWidth;
    setOrientacionPorSrc((prev) => {
      if (prev[src] === isVertical) return prev;
      return { ...prev, [src]: isVertical };
    });
  };

  const renderFinanciacionBanner = (extraClassName = "") => (
    <section className={`${styles.financiacionBanner} ${extraClassName}`.trim()} aria-label="Opciones de financiacion">
      <div className={styles.financiacionTextCol}>
        <h2>¿Querés financiar este vehículo?</h2>
        <p>
          Si no contás con el total del valor, te acompañamos con opciones de pago para que puedas
          llegar a tu próximo auto.
        </p>
        {isReservado ? (
          <Link href="/vehiculos-disponibles" className={styles.financiacionBtn}>
            Vehículo Reservado -&gt; Ver similares
          </Link>
        ) : (
          <a href="#contacto" className={styles.financiacionBtn}>
            Consultanos aquí
          </a>
        )}
      </div>

      <div className={styles.financiacionImageCol}>
        <Image
          src={imagenBanner}
          alt={`Financiación disponible para ${vehiculo.nombre}`}
          fill
          sizes="(max-width: 980px) 100vw, 35vw"
          className={styles.financiacionImage}
        />
      </div>
    </section>
  );

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs} role="navigation" aria-label="Navegación de rutas">
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">•</span>
        <Link href="/vehiculos-disponibles" className={styles.breadcrumbLink}>Vehículos disponibles</Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">•</span>
        <span className={styles.breadcrumbCurrent}>{vehiculo.nombre}</span>
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

          {vehiculo.reservado ? (
            <div className={styles.statusBadgeReservado}>Reservado</div>
          ) : null}

          <div className={styles.priceRow}>
            <div className={styles.price}>{vehiculo.precio}</div>
            <button
              type="button"
              className={styles.infoShareBtn}
              onClick={handleShareVehiculo}
              aria-label={`Compartir ${vehiculo.nombre}`}
              title="Compartir"
            >
              <i className="fa-solid fa-share-nodes" aria-hidden="true"></i>
            </button>
          </div>

          <dl className={styles.detailsGrid}>
            <div><dt>Marca:</dt><dd>{vehiculo.nombre.split(" ")[0] || "-"}</dd></div>
            <div><dt>Modelo:</dt><dd>{vehiculo.nombre.replace((vehiculo.nombre.split(" ")[0] || ""), "").trim() || "-"}</dd></div>
            <div><dt>Año:</dt><dd>{vehiculo.año}</dd></div>
            <div><dt>Kilometraje:</dt><dd>{vehiculo.km}</dd></div>
            <div><dt>Transmisión:</dt><dd>{vehiculo.transmision}</dd></div>
            {motor ? <div><dt>Motor:</dt><dd>{motor}</dd></div> : null}
            {version ? <div><dt>Versión:</dt><dd>{version}</dd></div> : null}
            <div><dt>Combustible:</dt><dd>{tipoCombustible}</dd></div>
            {vehiculo.reservaDesde ? <div><dt>Entrega desde:</dt><dd>{vehiculo.reservaDesde}</dd></div> : null}
          </dl>

          {isReservado ? (
            <Link href="/vehiculos-disponibles" className={styles.primaryBtn}>
              Vehículo Reservado -&gt; Ver similares <i className="fa-solid fa-arrow-right"></i>
            </Link>
          ) : (
            <a href="#contacto" className={styles.primaryBtn}>
              Quiero consultar o agendar una visita <i className="fa-solid fa-arrow-right"></i>
            </a>
          )}
        </aside>

        <section className={styles.galleryCol}>
          {imagenActiva ? (
            <>
              <div
                className={styles.galleryMainImageWrap}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={handleMainTouchStart}
                onTouchEnd={handleMainTouchEnd}
              >
                {imagenActivaEsVertical ? (
                  <Image
                    key={`bg-${vehiculo.id}-${activeIndex}`}
                    src={imagenActiva}
                    alt=""
                    fill
                    sizes="(max-width: 980px) 100vw, 65vw"
                    className={styles.galleryMainImageBg}
                    aria-hidden="true"
                    priority
                  />
                ) : null}
                <Image
                  key={`fg-${vehiculo.id}-${activeIndex}`}
                  src={imagenActiva}
                  alt={`Foto principal de ${vehiculo.nombre}`}
                  fill
                  sizes="(max-width: 980px) 100vw, 65vw"
                  className={styles.galleryMainImage}
                  style={{ objectFit: imagenActivaEsVertical ? "contain" : "cover" }}
                  onLoad={(event) => handleMainImageReady(imagenActiva, event)}
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
                <div className={styles.thumbCarousel}>
                  <button
                    type="button"
                    className={styles.thumbNavButton}
                    onClick={handlePrevImage}
                    aria-label="Desplazar miniaturas hacia la izquierda"
                    disabled={totalImagenes <= 1}
                  >
                    <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
                  </button>

                  <div ref={thumbTrackRef} className={styles.thumbGrid}>
                    {imagenes.map((src, index) => (
                      <button
                        key={`${vehiculo.id}-${index}`}
                        type="button"
                        ref={(node) => {
                          thumbRefs.current[index] = node;
                        }}
                        className={`${styles.thumbButton} ${activeIndex === index ? styles.thumbActive : ""}`.trim()}
                        onClick={() => setActiveIndex(index)}
                        onTouchStart={() => {
                          setActiveIndex(index);
                          setIsTouchHoldingThumb(true);
                        }}
                        onTouchEnd={() => setIsTouchHoldingThumb(false)}
                        onTouchCancel={() => setIsTouchHoldingThumb(false)}
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

                  <button
                    type="button"
                    className={styles.thumbNavButton}
                    onClick={handleNextImage}
                    aria-label="Desplazar miniaturas hacia la derecha"
                    disabled={totalImagenes <= 1}
                  >
                    <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </button>
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

      <section className={styles.masInfoSection} aria-label="Más información del vehículo y la empresa">
        <h2>Más información</h2>

        <div className={styles.masInfoGrid}>
          <article className={styles.masInfoCard}>
            <ul>
              <li><strong>{estadoGeneral}.</strong></li>
              {infoAdicional.map((item, index) => (
                <li key={`info-adicional-${index}`}>{item}</li>
              ))}
              <li><strong>Precio:</strong> {vehiculo.precio}</li>
              {vehiculo.reservaDesde ? <li><strong>Entrega desde:</strong> {vehiculo.reservaDesde}</li> : null}
              <li><strong>Condición de pago:</strong> {condicionPago}</li>
              <li><strong>Financiación disponible:</strong> créditos prendarios bancarios sujetos a aprobación.</li>
              {!hasPermutasEnInfoAdicional ? <li><strong>Aceptamos permutas.</strong></li> : null}
            </ul>
          </article>

          <article className={styles.masInfoCard}>
            <ul>
              <li><strong>Más de 10 años en el rubro.</strong></li>
              <li><strong>Gestoría propia matriculada</strong> para una operación más ágil.</li>
              <li><strong>Compra segura y transparente</strong> en todas las operaciones.</li>
              <li><strong>Transferencia obligatoria</strong> para respaldo legal de ambas partes.</li>
              <li><strong>Local físico en Los Cardales</strong> para atención personalizada.</li>
              <li>También podés encontrarnos en nuestras redes sociales.</li>
            </ul>
          </article>
        </div>
      </section>

      {renderFinanciacionBanner()}

      <section id="ubicacion" className={styles.consultaSection}>
        <div id="contacto" className={styles.consultaFormCol}>
          <h3>
            {isReservado
              ? "Quiero consultar por vehiculos similares a este"
              : "Quiero consultar o agendar una visita por este vehiculo"}
          </h3>

          <form
            className={styles.consultaForm}
            action="https://formsubmit.co/david.duarte329@gmail.com"
            method="POST"
            noValidate
            onSubmit={handleFormValidation}
            onInput={handleFieldInput}
          >
            <input
              type="hidden"
              name="_subject"
              value={
                isReservado
                  ? `Consulta por similares de vehículo reservado: ${vehiculo.nombre}`
                  : `Consulta por vehículo: ${vehiculo.nombre}`
              }
            />
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
              <div className={styles.topInputField}>
                <input type="text" name="nombre" placeholder="Tu nombre" required aria-invalid={Boolean(errors.nombre)} />
                {errors.nombre ? <p className="field-error-msg">{errors.nombre}</p> : null}
              </div>
              <div className={styles.topInputField}>
                <input type="email" name="email" placeholder="Tu email" required aria-invalid={Boolean(errors.email)} />
                {errors.email ? <p className="field-error-msg">{errors.email}</p> : null}
              </div>
              <div className={styles.topInputField}>
                <input type="tel" name="telefono" placeholder="Tu teléfono" required aria-invalid={Boolean(errors.telefono)} />
                {errors.telefono ? <p className="field-error-msg">{errors.telefono}</p> : null}
              </div>
            </div>

            <div className={styles.textareaField}>
              <textarea
                name="mensaje"
                rows={6}
                placeholder={
                  isReservado
                    ? "Contanos que tipo de vehiculo estas buscando y te mostramos opciones similares disponibles."
                    : "Escribinos tu consulta aquí y nos pondremos en contacto lo más pronto posible."
                }
                required
                aria-invalid={Boolean(errors.mensaje)}
              ></textarea>
              {errors.mensaje ? <p className="field-error-msg">{errors.mensaje}</p> : null}
            </div>

            <div className={styles.submitWrap}>
              <button type="submit" className={styles.submitBtn}>
                <span>Enviar</span>
                <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>

        <aside className={styles.consultaInfoCol}>
          <div className={styles.consultaInfoLeft}>
            <i className="fa-solid fa-location-dot"></i>
            <h3>Dónde estamos</h3>
            <p>Sargento Cabral 357<br />Los Cardales</p>
          </div>

          <div className={styles.consultaInfoRight}>
            <div className={styles.consultaTelefono}>11 5607-4949</div>
            <div className={styles.consultaMail}>autocardales@gmail.com</div>

            <div className={styles.consultaSeguinos}>
              <span>Seguinos</span>
              <div>
                <a href="https://www.facebook.com/autocardales" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/autocardales" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              </div>
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
                  {item.reservado ? <span className={styles.sugeridoReservado}>Reservado</span> : null}
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
