# Guía rápida: carga de fotos por vehículo

Esta guía sirve para cargar autos nuevos siempre con el mismo criterio visual y sin perder tiempo.

## 1) Preparar fotos base

- Guardá una copia original (JPG) sin editar.
- Elegí entre 3 y 6 fotos por auto (mínimo 1 para publicar).
- Priorizá estas tomas: frente, frente-costado, lateral, interior, tablero.

## 2) Exportar para web (Photopea)

### Formato recomendado

- Tipo: `WebP`
- Calidad: `80` (rango sugerido: 75–85)

### Tamaños

- Galería (cards + detalle): `1600 x 1200` (relación 4:3)
- Hero (opcional): `1920 x 1080` (relación 16:9)

## 3) Nombres de archivo (convención)

Dentro de la carpeta del vehículo en `public/img/...`:

- `01-frente.webp`
- `02-frente-costado.webp`
- `03-lateral.webp`
- `04-interior.webp`
- `05-tablero.webp`
- `hero.webp` (solo si la vas a usar para hero)

## 4) Estructura de carpetas

Ejemplo:

- `public/img/Toyota Hilux 4X4 Automática - 2007/01-frente.webp`
- `public/img/Toyota Hilux 4X4 Automática - 2007/02-frente-costado.webp`

## 5) Actualizar datos del vehículo

Editar en `src/data/vehiculos.js` el array `imagenes` del auto:

```js
imagenes: [
  "/img/Toyota Hilux 4X4 Automática - 2007/01-frente.webp",
  "/img/Toyota Hilux 4X4 Automática - 2007/02-frente-costado.webp",
  "/img/Toyota Hilux 4X4 Automática - 2007/03-lateral.webp"
]
```

## 6) Checklist de publicación

- [ ] Las fotos se ven en card y en detalle.
- [ ] La primera imagen del array es la portada correcta.
- [ ] Las miniaturas cambian la imagen principal.
- [ ] El autoplay recorre todas las fotos.
- [ ] No hay nombres con errores de ruta.

## 7) Validación automática

Podés validar todas las rutas de imágenes con:

```bash
npm run check:imagenes
```

Si falta algún archivo en `public/img`, el comando te lo lista y termina con error para que lo corrijas antes de publicar.

Además, si un vehículo tiene menos de 3 fotos, muestra una advertencia para que puedas completarlo luego (sin frenar el comando).

## Tips importantes

- Si una foto vertical queda mal en card, usala como secundaria y no como portada.
- Evitá acentos/espacios raros en archivos (en carpeta ya existente podés mantener el nombre actual).
- Mantené siempre la misma proporción para que todas las cards se vean consistentes.
