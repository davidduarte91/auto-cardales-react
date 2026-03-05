"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function VehicleCard({ vehiculo, href, showReservedBanner = false }) {
  const router = useRouter();
  const tieneVariasImagenes = vehiculo.imagenes && vehiculo.imagenes.length > 1;
  const [orientacionPorSrc, setOrientacionPorSrc] = useState({});

  const handleImageReady = (src, event) => {
    const target = event.currentTarget;
    if (!target) return;

    const isVertical = target.naturalHeight > target.naturalWidth;
    setOrientacionPorSrc((prev) => {
      if (prev[src] === isVertical) return prev;
      return { ...prev, [src]: isVertical };
    });
  };

  const handleCardNavigate = (event) => {
    if (!href) return;

    const interactiveTarget = event.target.closest(
      '.swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .card-share-btn'
    );

    if (interactiveTarget) return;

    router.push(href);
  };

  const handleShare = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!href || typeof window === 'undefined') return;

    const shareUrl = `${window.location.origin}${href}`;
    const shareTitle = `${vehiculo.nombre} | ${vehiculo.año} | ${vehiculo.km}`;
    const shareData = {
      title: shareTitle,
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
      // No action needed when user cancels share dialog.
    }
  };

  return (
    <article
      className={`card ${vehiculo.destacado ? 'card-grande' : ''}`}
      role={href ? 'link' : undefined}
      tabIndex={href ? 0 : undefined}
      onClick={handleCardNavigate}
      onKeyDown={(event) => {
        if (!href) return;
        if (event.target.closest('.card-share-btn')) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          router.push(href);
        }
      }}
      style={href ? { cursor: 'pointer' } : undefined}
    >
      <div className={`foto-contenedor ${vehiculo.destacado ? 'mySwiper' : ''}`}>
        {vehiculo.imagenes?.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            loop={tieneVariasImagenes}
            effect={vehiculo.destacado ? 'fade' : 'slide'}
            autoplay={vehiculo.destacado ? { delay: 3500, disableOnInteraction: false } : false}
            navigation={vehiculo.destacado}
            pagination={vehiculo.destacado ? { clickable: true } : false}
          >
            {vehiculo.imagenes.map((src, i) => (
              <SwiperSlide key={i}>
                {(() => {
                  const isVertical = orientacionPorSrc[src] === true;
                  return (
                <div className="foto-stage">
                  {isVertical ? (
                    <Image src={src} alt="" fill sizes="(max-width: 980px) 100vw, 33vw" className="foto-bg" aria-hidden="true" />
                  ) : null}
                  <Image
                    src={src}
                    alt={`${vehiculo.nombre} ${i + 1}`}
                    fill
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className={isVertical ? "foto-fg" : "foto-cover"}
                    onLoad={(event) => handleImageReady(src, event)}
                  />
                </div>
                  );
                })()}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          (() => {
            const fallbackSrc = "/img/logo-cuadrado-facebook.jpg";
            const isVertical = orientacionPorSrc[fallbackSrc] === true;

            return (
              <div className="foto-stage">
                {isVertical ? (
                  <Image src={fallbackSrc} alt="" fill sizes="(max-width: 980px) 100vw, 33vw" className="foto-bg" aria-hidden="true" />
                ) : null}
                <Image
                  src={fallbackSrc}
                  alt={vehiculo.nombre}
                  fill
                  sizes="(max-width: 980px) 100vw, 33vw"
                  className={isVertical ? "foto-fg" : "foto-cover"}
                  onLoad={(event) => handleImageReady(fallbackSrc, event)}
                />
              </div>
            );
          })()
        )}
        {showReservedBanner && vehiculo.reservado ? (
          <span className="etiqueta-reservado">Reservado</span>
        ) : null}
        {vehiculo.etiquetaPrecio ? <span className="etiqueta-precio">{vehiculo.etiquetaPrecio}</span> : null}
        {vehiculo.gnc ? (
          <span className="etiqueta-gnc">
            {typeof vehiculo.gnc === "string" ? vehiculo.gnc : "GNC"}
          </span>
        ) : null}
      </div>
      <div className="info-auto">
        <h3>{vehiculo.nombre}</h3>
        <div className="precio-share-row">
          <div className="precio-destacado">{vehiculo.precio}</div>
          <button
            type="button"
            className="card-share-btn"
            onClick={handleShare}
            aria-label={`Compartir ${vehiculo.nombre}`}
            title="Compartir"
          >
            <i className="fa-solid fa-share-nodes" aria-hidden="true"></i>
          </button>
        </div>
        {vehiculo.reservaDesde ? <div className="reserva-desde">Reservá desde {vehiculo.reservaDesde}</div> : null}
        <div className="detalles">
          <span>{vehiculo.año}</span>
          <span>{vehiculo.km}</span>
          <span>{vehiculo.transmision}</span>
        </div>
      </div>
    </article>
  );
}
