# Web worklynk.es

La web corporativa de [[Empresa|WORKLYNK]]. Repo local:
`C:\Users\joanv\code\worklynk-web` (GitHub: `JoanVidal9/WORKLYNK`, privado).

Sitio estático generado con un script Python propio (sin framework). El
detalle técnico completo y las convenciones de diseño/contenido están en
`CLAUDE.md` dentro de ese repo — esta nota es solo el resumen para no tener
que abrirlo.

## Cómo funciona

- `_fuente/contenido.py` tiene todo el texto; `_fuente/build.py` genera el
  HTML final. Se compila con `python3 build.py` y la salida **sí se
  versiona** en git (Netlify publica tal cual, sin paso de build).
- Desplegada en Netlify, dominio `worklynk.es` ya conectado.
- Diseño propio: tipografía Jost autoalojada, interfaz en blanco y negro con
  el magenta de marca (`#d810ce`) reservado solo al logo, el foco y la
  selección de texto. Tema oscuro por defecto.

## Contenido — páginas

Portada, [[KERN]], [[Refórmalo]], Servicios, Webs a medida, Módulos,
Ejemplos, Proceso, Casos (con el caso largo de KERN), Estudio, Contacto,
y las tres legales.

## Pendiente ahora mismo

- Datos legales completos (CIF, domicilio) — bloqueado hasta que Joan se dé
  de alta como autónomo.
- Foto y párrafo personal de Joan en `/estudio/`.
- Capturas reales de KERN (hoy son maquetas interactivas).
- Comparación real antes/después para [[Refórmalo]] (hoy es una ilustración).

## Módulos anunciados en la web (para que KERN los tenga en cuenta)

`/modulos/` promete un catálogo de funciones activables sobre una
instalación de KERN ya en marcha, sin proyecto nuevo, con precio anual
proporcional a la licencia. Catálogo público actual: Actas de reunión,
Resumen de documentos, Extracción de datos, Redacción de correspondencia,
Buscador documental. Ver [[KERN]] para el detalle completo que ya se le
pasó a esa sesión.
