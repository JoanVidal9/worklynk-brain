# Marca WORKLYNK

Kit de marca: logo, colores, tipografías y material visual. Esta carpeta es
la **fuente de verdad** de la identidad. Lo que se ve en la web
([[Web worklynk.es]]) se genera desde su repo, pero los originales y la
referencia viven aquí.

## Logo (oficial desde 2026-09-23)

Dos eslabones de cadena entrelazados en diagonal, dibujados como contorno
oscuro, con una barra verde que los une (el "enlace"), y el logotipo
**worklynk** en minúscula con la **y** en verde. Es el logo que eligió Joan
(`logo/worklynk-logo-original.png`), vectorizado sin redibujarlo.

Archivos en `logo/`:

- `worklynk-logo-original.png` — el original de Joan (2752×1376). Referencia.
- `worklynk-logo.svg` — símbolo + logotipo, trazo oscuro. Uso general sobre claro.
- `worklynk-simbolo.svg` / `worklynk-simbolo-blanco.svg` — solo el símbolo, para claro u oscuro.
- `favicon.svg` — símbolo blanco sobre baldosa oscura redondeada.
- `icono-app-180.png` — icono de app (apple-touch-icon, 180×180).
- `anterior/` — el logo de dos rombos con relieve blanco que se usó hasta el 22-09. Retirado.

En la web el logo vive en `_fuente/logo.py` (rutas generadas); el trazo toma
el color de texto de cada tema y los verdes son degradados fijos.

## Color

Verde de **estatus activo**: desde el 2026-09-23 un único lima neón `#7dff3c` para todos los detalles de la web (Joan: "hay demasiados tonos verdes"). Sobre claro nunca como color de texto. En la interfaz
solo marca foco, estado y acentos puntuales (p. ej. "el enlace"); el resto es
blanco, gris perla y tinta.

| Rol                   | Claro     | Oscuro    |
|-----------------------|-----------|-----------|
| Verde de interfaz (único) | `#7dff3c` lima de estado activo | igual |
| Conector del logo     | `#c4ff4a → #22c43a` (degradado) | igual |
| "y" del logotipo      | `#7fae22 → #8fc21f` (degradado) | igual |
| Fondo                 | `#f5f5f7` | `#171719` |
| Texto                 | `#1d1d1f` | `#f5f5f7` |

(Antes fue magenta `#d810ce` y luego neón lima `#2bff66`; ambos descartados.)

## Tipografía

- **Jost** — titulares de la web (misma geometría que el logotipo). Autoalojada.
- **Fuente del sistema** — texto de lectura (SF en Apple, Segoe en Windows).
- **Geist Mono** — solo *dentro* de las maquetas de producto.

## Material visual

Cristal transparente sobre blanco: eslabones de vidrio con un matiz verde en
la unión. Originales de Joan en `Downloads\FONDOS WORKLYNK` (no se suben aquí
por peso); en la web van recomprimidos:

- Fluido verde recorriendo la cadena → portada y cierres de página.
- Eslabón que gira → escena de scroll de la portada y /servicios/ (sin la
  cortinilla de zsky.ai del final del original).
- Dos planos macro de cadena → /proceso/ y /estudio/.
- Fotos fijas de cristal → resto de cabeceras.

Todo es material generado o conceptual: nunca se presenta como foto de un
proyecto real.

## Social

`social/og-worklynk.png` — imagen 1200×630 al compartir el enlace: logo,
"Software a medida" en Jost, la frase de la portada y el cristal. Se genera
rasterizando HTML con Edge en modo headless.

## conceptos-3d/

Exploraciones de hero 3D que **no** se adoptaron, guardadas como referencia:
`worklynk-bronce.html`, `worklynk-nucleo.html`, `worklynk-ascend.html` y
`hero3d.js` (el motor de fluido WebGL, retirado de la web el 2026-09-23:
estaba oculto y se seguía cargando en todas las páginas).

## renders-referencia/

Los 6 renders de GetLayers que se usaron para explorar dirección visual.
Imágenes generadas por IA, no assets finales.
