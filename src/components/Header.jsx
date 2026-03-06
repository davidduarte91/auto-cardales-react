"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastKnownScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const minDelta = 8;

    const onScroll = () => {
      const currentY = window.pageYOffset || document.documentElement.scrollTop;
      const delta = currentY - lastKnownScrollY;

      if (window.innerWidth <= 1024) {
        header.classList.remove("hidden");

        if (menuOpen) {
          header.classList.remove("compact");
          lastKnownScrollY = currentY;
          return;
        }

        if (delta > minDelta && currentY > 60) {
          header.classList.add("compact");
        } else if (delta < -minDelta || currentY <= 20) {
          header.classList.remove("compact");
        }

        lastKnownScrollY = currentY;
        return;
      }

      header.classList.remove("compact");

      if (delta > minDelta && currentY > 90) {
        header.classList.add("hidden");
      } else if (delta < -minDelta || currentY <= 20) {
        header.classList.remove("hidden");
      }

      lastKnownScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }

      if (window.innerWidth > 1024) {
        const header = headerRef.current;
        if (header) {
          header.classList.remove("compact");
        }
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogoClick = (event) => {
    closeMenu();

    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <header ref={headerRef} className={menuOpen ? "menu-open" : ""}>
      <div className="logo">
        <Link href="/" onClick={handleLogoClick}>
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
          <li><Link href="/#ubicacion" onClick={closeMenu}><i className="fas fa-map-marker-alt"></i> Dónde <br /> estamos</Link></li>
          <li><Link href="/sobre-nosotros" onClick={closeMenu}><i className="fas fa-users"></i> Sobre <br /> nosotros</Link></li>
          <li><Link href="/#contacto" onClick={closeMenu}><i className="fas fa-envelope"></i> Contactanos</Link></li>
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
