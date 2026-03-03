"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { vehiculos } from "../data/vehiculos";
import { slugifyVehiculoNombre } from "../lib/vehiculos";

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function VehicleQuickSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const normalizedQuery = normalizeText(query);

  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];

    return vehiculos
      .filter((item) => {
        const haystack = normalizeText(`${item.nombre} ${item.año} ${item.km} ${item.transmision}`);
        return haystack.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [normalizedQuery]);

  useEffect(() => {
    if (suggestions.length === 0) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex((current) => {
      if (current >= suggestions.length) return suggestions.length - 1;
      return current;
    });
  }, [suggestions]);

  const handleKeyDown = (event) => {
    if (!normalizedQuery) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (suggestions.length === 0) return;
      setActiveIndex((current) => {
        if (current < 0) return 0;
        return (current + 1) % suggestions.length;
      });
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (suggestions.length === 0) return;
      setActiveIndex((current) => {
        if (current < 0) return suggestions.length - 1;
        return (current - 1 + suggestions.length) % suggestions.length;
      });
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0 && suggestions[activeIndex]) {
      event.preventDefault();
      const selected = suggestions[activeIndex];
      router.push(`/vehiculos/${slugifyVehiculoNombre(selected.nombre)}`);
      return;
    }

    if (event.key === "Escape") {
      setQuery("");
      setActiveIndex(-1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!normalizedQuery || suggestions.length === 0) return;

    const selected = activeIndex >= 0 && suggestions[activeIndex] ? suggestions[activeIndex] : suggestions[0];
    router.push(`/vehiculos/${slugifyVehiculoNombre(selected.nombre)}`);
  };

  return (
    <section className="buscador-disponibles" aria-label="Buscador de vehículos disponibles">
      <form className="buscador-disponibles-form" onSubmit={handleSubmit}>
        <div className="buscador-disponibles-input-wrap">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar publicaciones..."
            aria-label="Buscar vehículo"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={normalizedQuery ? true : false}
            aria-controls="buscador-disponibles-sugerencias"
            aria-activedescendant={activeIndex >= 0 ? `buscador-item-${activeIndex}` : undefined}
          />

          <div className="buscador-disponibles-actions">
            <button
              type="button"
              className={`buscador-clear-btn ${normalizedQuery ? "is-visible" : ""}`.trim()}
              onClick={() => {
                setQuery("");
                setActiveIndex(-1);
              }}
              aria-label="Borrar búsqueda"
              title="Borrar"
            >
              ×
            </button>

            <button type="submit" className="buscador-submit-btn">
              Buscar
            </button>
          </div>
        </div>
      </form>

      {normalizedQuery ? (
        <div
          id="buscador-disponibles-sugerencias"
          className="buscador-disponibles-sugerencias"
          role="listbox"
          aria-label="Sugerencias"
        >
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <Link
                key={item.id}
                id={`buscador-item-${index}`}
                href={`/vehiculos/${slugifyVehiculoNombre(item.nombre)}`}
                className={`buscador-sugerencia-item ${activeIndex === index ? "is-active" : ""}`.trim()}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <strong>{item.nombre}</strong>
                <span>{item.año} • {item.km} • {item.transmision}</span>
              </Link>
            ))
          ) : (
            <p className="buscador-sin-resultados">No encontramos coincidencias con esa búsqueda.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
