# Estado actual para relevos

Conservar solo el último resumen por proyecto. El detalle de tareas vive en [Tareas/INDEX.md](Tareas/INDEX.md). Actualizar antes de cerrar o ceder trabajo.

## Panel — 2026-09-21

- Responsable de la navegación 3D: Codex, por relevo explícito de Joan el 2026-09-21. Claude sigue sin cuota hoy.
- Ruta: `C:\Users\joanv\code\worklynk\panel`.
- Ficha actual: [PANEL-3D-001](Tareas/PANEL-3D-001.md). Primera versión del Command Center como entorno global del administrador.
- Se conserva el cambio previo de Claude que quitaba la barra lateral. No se retoma otro trabajo suyo sin documentarlo.
- Navegación: siete estaciones 3D, cámara, zoom y retorno; páginas existentes en un área de trabajo sobre la escena. Portal de clientes restringido conservado.
- Validación: compilación y 23 pruebas; recorrido de las siete áreas en vista previa sin datos reales. Validación autenticada pendiente.
- Publicado en GitHub main: 0c480a4, mejora de fluidez e interfaz. Cámara y zoom animados, memoria del encuadre, sombras estáticas y dock integrado. Revisión visual ship; build y 23 pruebas OK. Joan confirmó la primera versión en Netlify; nuevo despliegue pendiente de verificar. Brain actualizado localmente.
- Publicado en GitHub main: 9f64cc2, estaciones semánticas con iconos, selector contextual del dock y red de agentes. Los siete especialistas ya tienen ejecutor de planificación acotado; la migración 011 debe aplicarse en Supabase para que la Function los anuncie como conectados. Cada petición usa una llamada del CEO y, solo si se delega, una segunda del especialista; no ejecutan acciones externas. Build, 24 pruebas y recorrido de escritorio/móvil correctos; comprobación autenticada pendiente.
- Publicado en GitHub main: 42e5845, Redes Sociales es un especialista independiente y el área Agentes comienza por Equipo, con Bandeja de decisiones y Trabajos. El CEO y los ocho especialistas tienen prompts de función y límites explícitos; Redes Sociales prepara estrategia, calendario, piezas, comunidad y métricas, sin publicar, responder ni usar cuentas sociales. La migración 012 amplía el ejecutor conectado a Redes Sociales. Build y 25 pruebas correctas; lint sin errores y cinco avisos anteriores. La validación visual autenticada y el estado real de la Function siguen pendientes.
- Publicado en GitHub main: ba19252, la consulta de agentes renueva tokens próximos a caducar y diferencia el rechazo de la Function de una sesión local expirada. Si persiste el 401, verificar que `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` de Netlify pertenecen al mismo proyecto que `VITE_SUPABASE_URL`; el SQL no causa ese rechazo.
- Publicado en GitHub main: d3fb739, Equipo muestra un Consejo de dirección: si no hay ninguna lectura anterior, prepara una única propuesta con los proyectos activos y la guarda como trabajo revisable. Las lecturas posteriores se piden manualmente, por lo que no consume llamadas en cada visita. El área Agentes usa superficies translúcidas con blur; la prueba autenticada visual sigue pendiente.
- Publicado en GitHub main: b044a4f, Agentes muestra una pantalla de acceso mientras verifica la Function y no dibuja la consola hasta recibir estado. Si falla, enseña un estado limpio con reintento y deja el diagnóstico técnico plegado. La consulta de estado corta a los 12 segundos; el cristal usa capas blancas, brillo interior y líneas de luz visibles sobre el dock.
- Proyectos ya permite editar nombre, cliente, descripción, estado, presupuesto y fechas; cada tarjeta admite cambio de estado inmediato y acceso al editor. El shell administrativo adopta una interfaz espacial azul-negra con foco hielo, lanzador vertical en escritorio y horizontal con pista de continuidad en móvil, conservando la escena 3D. Validado con build, 25 pruebas, lint sin errores y capturas de escritorio/móvil/editor mediante una ruta DEV de datos locales marcados como muestra. Revisión Impeccable final: `ship`.
- Siguiente paso: comprobar en Netlify la edición y el cambio de estado con una sesión administradora real. En paralelo siguen pendientes aplicar 011/012 en Supabase y construir la biblioteca persistente de entregas por trabajo; no se debe presentar como disponible.

## Web worklynk.es — 2026-09-22

- Responsable: Codex por petición directa de Joan. Ruta: `C:\Users\joanv\code\worklynk\web`.
- Ficha: [WEB-DESIGN-001](Tareas/WEB-DESIGN-001.md).
- Publicado en GitHub `main`: `a894bda`, rediseño completo inspirado en la claridad editorial de Apple, con navegación Liquid Glass, tipografía Jost de caja natural, escenas de producto asimétricas y tres imágenes originales con procedencia embebida.
- La portada usa fotografía conceptual; las páginas interiores conservan el fondo WebGL. KERN se identifica como maqueta con datos de ejemplo y Refórmalo como visualización conceptual.
- Validación: generación de 16 páginas, 32 recorridos en Chrome (escritorio y móvil), cero desbordamientos, errores de página, imágenes fallidas o rutas con `h1` incorrecto; cero referencias estáticas ausentes. Revisión visual final: `ship`, sin regresiones en los seis cambios revisados.
- Despliegue verificado en `https://worklynk.es/`: respuesta HTTP 200 y el nuevo hero ya servido. Pendiente únicamente sustituir las escenas conceptuales por material real cuando exista.

## Coordinación — 2026-09-21

- Responsable: Codex; preparación documental local terminada.
- Ficha: [COORD-001](Tareas/COORD-001.md).
- Brain organizado sin mover repositorios ni notas existentes. Lectura selectiva y actualización al cierre obligatorias.
- Pendientes: validar lectura en Claude, publicar documentación cuando corresponda e implementar el coordinador si se desea activación automática.
- Sin coordinador activo: escribir aquí no despierta agentes ni actualiza otras sesiones automáticamente.

## KERN — 2026-09-21

- Joan confirma repositorio y despliegue propios en Netlify.
- Sin tarea de implementación asignada en esta conversación.
