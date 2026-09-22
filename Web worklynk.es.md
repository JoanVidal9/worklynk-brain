# Web worklynk.es

La web corporativa de [[Empresa|WORKLYNK]]. Repo local:
`C:\Users\joanv\code\worklynk\web` (GitHub: `JoanVidal9/WORKLYNK`, privado).

Sitio estático generado con un script Python propio (sin framework). El
detalle técnico completo y las convenciones de diseño/contenido están en
`CLAUDE.md` dentro de ese repo — esta nota es solo el resumen para no tener
que abrirlo.

## Cómo funciona

- `_fuente/contenido.py` tiene todo el texto; `_fuente/build.py` genera el
  HTML final. Se compila con `python3 build.py` y la salida **sí se
  versiona** en git (Netlify publica tal cual, sin paso de build).
- Desplegada en Netlify, dominio `worklynk.es` ya conectado.
- Dirección visual «Optical Workspace»: tipografía Jost autoalojada, fondos
  carbón y blanco mineral, jerarquía editorial amplia y señal verde reservada
  a conexión, foco y estado. La navegación, menús y controles usan Liquid
  Glass; el contenido largo permanece sobre superficies sólidas. Tema oscuro
  por defecto y tema claro persistente.
- `PRODUCT.md`, `DESIGN.md` y `.impeccable/design.json` contienen la verdad de
  producto y el sistema visual. No hace falta reconstruirlo desde el chat.
- La portada usa `assets/images/worklynk-glass-links.png`; KERN y Refórmalo
  incorporan escenas conceptuales propias. Cada PNG conserva su prompt
  embebido y un `.prompt.txt` contiguo.

## Última publicación

- Commit `a894bda` en `main`, 2026-09-22.
- Rediseño Apple-inspired sin copiar una página concreta: tipografía de caja
  natural, titulares de escala variable, composiciones asimétricas, imágenes a
  gran formato y vidrio funcional.
- Generación correcta de 16 páginas; 32 comprobaciones en Chrome entre
  escritorio y móvil sin errores, desbordamientos ni imágenes rotas.
- Netlify publica directamente desde el repositorio. El dominio respondió HTTP
  200 con el nuevo hero tras el push; despliegue confirmado.

## Contenido — páginas

Portada, [[KERN]], [[Refórmalo]], Servicios, Webs a medida, Módulos,
Ejemplos, Proceso, Casos (con el caso largo de KERN), Estudio, Contacto,
y las tres legales.

## Pendiente ahora mismo

- Datos legales completos (CIF, domicilio) — bloqueado hasta que Joan se dé
  de alta como autónomo.
- Foto y párrafo personal de Joan en `/estudio/`.
- Capturas reales de KERN (hoy son maquetas interactivas).
- Comparación real antes/después para [[Refórmalo]] (hoy es una visualización
  conceptual identificada como tal).

## Módulos anunciados en la web (para que KERN los tenga en cuenta)

`/modulos/` promete un catálogo de funciones activables sobre una
instalación de KERN ya en marcha, sin proyecto nuevo, con precio anual
proporcional a la licencia. Catálogo público actual: Actas de reunión,
Resumen de documentos, Extracción de datos, Redacción de correspondencia,
Buscador documental. Ver [[KERN]] para el detalle completo que ya se le
pasó a esa sesión.
