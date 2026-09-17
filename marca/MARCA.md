# Marca WORKLYNK

Kit de marca: logo, colores, tipografías y material visual. Esta carpeta es
la **fuente de verdad** de la identidad. Lo que se ve en la web
([[Web worklynk.es]]) se genera desde su repo, pero los originales y la
referencia viven aquí.

## Logo

Dos eslabones entrelazados (la metáfora de "enlazar" sistemas) con un
conector en medio. Estándar definitivo:

- **Forma en blanco** con **relieve de línea negra** (para que lea sobre
  cualquier fondo, claro u oscuro).
- **Conector verde** de marca en medio.
- Cada eslabón se dibuja en dos trazos: negro (más ancho) debajo, blanco
  encima; el negro que asoma es el relieve.

Archivos en `logo/`:

- `logo-marca.svg` — la marca sola, fondo transparente. Uso general.
- `favicon.svg` — la marca sobre baldosa oscura redondeada (favicon del sitio).
- `icono-app-180.png` — icono de app (apple-touch-icon, 180×180).

El logotipo completo es la marca + la palabra **WORK**LYNK en Jost (WORK en
peso 400 y color atenuado, LYNK en 700 blanco). En la web se compone en
`_fuente/build.py` (constantes `MARCA` / `_ESLABONES`).

## Color

Verde de **estatus activo** (el verde de "en línea/activo"), ni magenta
gaming ni neón lima. Solo se usa en el conector del logo, el anillo de foco
y la selección de texto — el resto de la interfaz es blanco y negro.

| Rol            | Oscuro    | Claro     |
|----------------|-----------|-----------|
| Verde de marca | `#29dc6e` | `#12a455` |
| Fondo          | `#08080a` | `#ffffff` |
| Texto          | `#edeef5` | `#14161f` |

(Antes fue magenta `#d810ce` y luego neón lima `#2bff66`; ambos descartados.)

## Tipografía

- **Jost** — toda la interfaz (autoalojada en el repo web, WOFF2).
- **Geist Mono** — solo *dentro* de las maquetas de producto.

## Social

`social/og-worklynk.png` — imagen 1200×630 que se ve al compartir el enlace
(Open Graph). Logo + "Software a medida" + tuteo. Se regenera con Pillow
(script en el historial del repo web) si cambia el mensaje o el color.

## conceptos-3d/

Exploraciones de hero 3D que se probaron y **no** se adoptaron, guardadas por
si sirven de referencia:

- `worklynk-bronce.html` — plantilla cinematográfica (estilo Laocoön) con
  cubos de cristal. Descartada.
- `worklynk-nucleo.html` — hero con un render real y parallax 3D. Descartada.
- `worklynk-ascend.html` — estructura de landing (estilo Ascend) + fondo de
  fluido de Flowstate. Descartada.
- `hero3d.js` — **este sí está vivo**: el motor de fluido en WebGL puro que
  hace el fondo animado del hero en la web actual. Copia de referencia.

## renders-referencia/

Los 6 renders de GetLayers (cubos de cristal, nodos enlazados, paneles con
UI) que se usaron para explorar dirección visual. Son imágenes generadas por
IA, no assets finales.
