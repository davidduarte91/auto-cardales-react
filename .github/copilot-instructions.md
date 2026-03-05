# Instrucciones del Proyecto Auto Cardales

Estas reglas son obligatorias para cualquier cambio en este repositorio.

## Alcance

- Estas reglas aplican solo a `auto-cardales-react`.
- Ignorar cualquier carpeta o archivo de `auto-cardales-web`.

## Stack y framework

- Usar Next.js 14+ con App Router.
- Usar JavaScript puro (`.js` y `.jsx`).
- No usar TypeScript bajo ninguna circunstancia.

## Estilos

- No usar Tailwind CSS.
- No usar librerias externas de estilos.
- Tambien estan prohibidos `styled-components`, `emotion` y soluciones similares de CSS-in-JS.
- No incorporar CSS Modules de terceros ni frameworks de UI con sistema de estilos propio.
- Todo el diseno debe apoyarse en `src/app/globals.css`.
- Reciclar y mantener coherencia visual con el sitio original en HTML/CSS.

## Imagenes

- Las fotos de vehiculos deben estar en formato WebP.
- Guardar imagenes en `/public/img/[nombre-del-auto]/`.
- Usar siempre `next/image` (`<Image />`) para renderizar imagenes en la UI.
- Si no existe version WebP, se permite de forma temporal una excepcion documentada hasta contar con el archivo WebP.

## Datos de vehiculos

- Consumir informacion solo desde `src/data/vehiculos.js`.
- No inventar ni asumir datos que no existan en esa fuente.
- Mantener la estructura del array de objetos ya definida.

## Rendimiento y arquitectura

- Escribir codigo limpio, simple y modular.
- Priorizar componentes pequenos y reutilizables.
- Evitar logica pesada innecesaria para cuidar memoria RAM (equipo objetivo: 4 GB).
- Preferir soluciones de bajo costo de render y bajo acoplamiento.

## Antes de finalizar una tarea

- Verificar que no se introdujo TypeScript.
- Verificar que no se introdujo Tailwind u otra libreria de estilos.
- Verificar que las nuevas imagenes respeten formato y ruta.
- Si hubo excepcion temporal por falta de WebP, dejarla documentada en el cambio.
- Verificar que los datos vengan de `src/data/vehiculos.js`.
