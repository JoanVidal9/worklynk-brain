# Bases

Puntos de partida para cada producto de [[Empresa|WORKLYNK]], en `C:\Users\joanv\code\worklynk\bases` (repositorio git local desde 2026-09-25; falta el repositorio privado en GitHub, que tiene que crear Joan). Cada encargo se empieza copiando la base y adaptando solo lo del cliente. Por eso los precios cerrados de la tarifa del [[Panel WorkLynk|panel]] son viables.

- `kern/`: alta de un cliente de [[KERN]]. Incluye el paso a paso, la ficha de lo que hay que pedir, `esquema.sql` y `verificar-esquema.sql`. El esquema está reconstruido a partir del código: hay que comprobarlo contra ECOIMSA. `multicliente.md` lista lo que aún está fijo para ECOIMSA en el código de KERN (URL y clave de Supabase, contexto de empresa y empresas por defecto).
- `web/`: landing y web corporativa estáticas. `sitio.py` lleva los datos, `build.py` genera la web (textos legales, SEO, formulario de Netlify, sitemap) y no publica mientras quede algún hueco `[ASÍ]`.
- `medida/`: React, Vite, Supabase y Tailwind con acceso por roles, RLS, menú y una pantalla de ejemplo. Es también la parte con datos del catálogo, las reservas y el portal.

Reglas: sin datos de ningún cliente en las bases, y lo que se mejore en un proyecto y sirva para otros vuelve a la base.
