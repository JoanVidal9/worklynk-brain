# WEB-DESIGN-001 — corrección visual blanca

- Actualizado: 2026-09-22, Codex.
- Estado: terminado, publicado en GitHub main 5b355ac.
- Ruta: C:\Users\joanv\code\worklynk\web.
- Joan rechazó a894bda por cambiar textos, dirección oscura y fondos inconsistentes.
- Regla durable: textos, palabras gancho, titulares, descripciones y CTA de 7913081 protegidos; rediseñar no autoriza reescribir.
- Resultado: originales restaurados, blanco/gris perla, tipografía de sistema estilo Apple, Liquid Glass funcional, fondo común y eslabones claros en todas las cabeceras.
- Claro por defecto; wl-theme-light-v2 guarda elecciones posteriores. Menú móvil con Escape, foco e inert.
- Pruebas: comparación de texto de 16 rutas sin diferencias originales; sólo nota ilustrativa preexistente reutilizada junto a nueva imagen. 32 comprobaciones escritorio/móvil correctas, incluidos menús y persistencia de tema.
- Diseño documentado en DESIGN.md y .impeccable/design.json. Documentación completada directamente al fallar el agente por cuota.
- Despliegue: 5b355ac confirmado en worklynk.es: HTTP 200 y nuevo CSS acbe7706dd.

- Revisión externa inicial: tres correcciones aplicadas. Revalidación final del revisor no disponible por cuota; comprobaciones funcionales completadas por Codex.

- 2026-09-22, Claude (relevo explícito de Joan): la imagen de vidrio de la portada (`hero--marca`) se pintaba como banda absoluta con corte duro por la izquierda ("descuadrada"). Se recolocó como elemento en flujo, centrado y entero (object-fit contain + multiply sobre blanco), debajo del titular; ajustadas altura y paddings del hero en escritorio y móvil. Solo cambia la portada: KERN y las demás cabeceras (`hero` normal) intactas; sin tocar textos ni el resto del diseño Apple. Verificado escritorio/móvil sin errores de consola. Publicado en main `3efd6ed`; HTTP 200 con CSS `7a3d80b4d7`.

- 2026-09-23, Claude (encargo de Joan: repaso completo y web lista en la sesión): v3 publicada en main `776994d` (+ fix de `netlify.toml`). Logo oficial vectorizado del PNG de Joan; vídeos recomprimidos en todas las cabeceras principales y fotos de cristal en el resto, sin velo; escena de scroll con el eslabón en portada; manifiesto que se ilumina; línea del proceso; cierres con el fluido. Portada sin "Webs como esta", sin cinta de palabras ni aviso de KERN repetido. `/estudio/` reescrita sin datos personales. Fuera cursor, destellos, tilt y WebGL. Titulares en Jost. Verificado en local (servidor con Range) y en producción: escritorio, móvil, claro y oscuro, sin errores de consola; vídeos con `video/mp4` y 206.
