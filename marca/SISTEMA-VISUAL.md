# Sistema visual WORKLYNK

Estilo aprobado por Joan el 2026-09-23 en worklynk.es («limpio y profesional, para toda la empresa»). Base de código lista para copiar: [sistema/worklynk-base.css](sistema/worklynk-base.css). Paleta y logo: [MARCA.md](MARCA.md).

## Principios

- **Solo claro.** Fondo gris perla `#f5f5f7`, superficies blancas, tinta `#1d1d1f`. Sin modo oscuro (Joan lo descartó: el cristal y los vídeos no funcionan sobre negro).
- **Un solo color: lima `#7dff3c`**, y solo con significado: *activo, hecho, en marcha*. Punto de estado, checks, fases aprobadas, barras y líneas de progreso, botón al pasar el ratón. Nunca decorativo: los números de lista van en pastilla **negra**. Texto en lima solo en destacados muy grandes con un leve halo.
- **Tipografía:** Jost en titulares (misma geometría que el logo), fuente del sistema en el texto. Sin monoespaciada.
- **Botones:** negros en pastilla; al pasar se vuelven lima con texto blanco. Los secundarios, blancos con borde que pasa a lima. Sin auras ni neones.
- **Menos es más:** una idea por bloque, frases cortas, nada de notitas al pie ni etiquetas de relleno.
- **Movimiento:** una sola dirección (de abajo arriba), suave (`cubic-bezier(.16,1,.3,1)`), respeta `prefers-reduced-motion`. Sin cursores, destellos ni 3D.

## Web y herramientas de trabajo

| | Web / marketing | Aplicaciones (KERN, panel…) |
| --- | --- | --- |
| Cristal esmerilado | Menús, tarjetas, maquetas | No (Joan: «no pinta nada»). Tarjetas blancas con borde fino |
| Vídeos de cristal de fondo | Sí, a un lado y fundidos | No |
| Lima | Estado, checks, progreso | Igual: estados, aprobado, progreso |
| Densidad | Aire generoso | Compacta y legible; cero ruido visual |

## Excepciones

- **Refórmalo** mantiene su estilo propio (producto para particulares, más hogareño). Decisión de Joan del 2026-09-23.
- El **logo** conserva sus degradados oficiales.
