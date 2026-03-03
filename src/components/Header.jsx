"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Header() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastKnownScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const minDelta = 8;

    const onScroll = () => {
      if (window.innerWidth <= 768) {
        header.classList.remove("hidden");
        return;
      }

      const currentY = window.pageYOffset || document.documentElement.scrollTop;
      const delta = currentY - lastKnownScrollY;

      if (delta > minDelta && currentY > 90) {
        header.classList.add("hidden");
      } else if (delta < -minDelta || currentY <= 20) {
        header.classList.remove("hidden");
      }

      lastKnownScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className={menuOpen ? "menu-open" : ""}>
      <div className="logo">
        <Link href="/">
          <img
            src="/img/logo-cuadrado-facebook-removebg-preview.png"
            alt="Logo Auto Cardales"
            className="header-logo"
          />
        </Link>
      </div>

      <div className="header-mobile-actions">
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>

        <div className="mobile-social-links">
          <a href="https://www.facebook.com/autocardales" target="_blank" rel="noopener noreferrer" title="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/autocardales" target="_blank" rel="noopener noreferrer" title="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <nav className={menuOpen ? "mobile-open" : ""}>
        <ul>
          <li><Link href="/vehiculos-disponibles" onClick={closeMenu}><i className="fas fa-car"></i> Vehículos <br /> Disponibles</Link></li>
          <li><Link href="/vende-tu-auto" onClick={closeMenu}><i className="fas fa-tag"></i> Vendé tu <br /> auto</Link></li>
          <li><a href="#ubicacion" onClick={closeMenu}><i className="fas fa-map-marker-alt"></i> Dónde <br /> estamos</a></li>
          <li><Link href="/sobre-nosotros" onClick={closeMenu}><i className="fas fa-users"></i> Sobre <br /> nosotros</Link></li>
          <li><a href="#contacto" onClick={closeMenu}><i className="fas fa-envelope"></i> Contactanos</a></li>
        </ul>
        <div className="social-links">
          <a href="https://www.facebook.com/autocardales" target="_blank" rel="noopener noreferrer" title="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/autocardales" target="_blank" rel="noopener noreferrer" title="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </nav>
    </header>
  );
}
