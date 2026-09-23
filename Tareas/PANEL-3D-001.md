# PANEL-3D-001 — Command Center como espacio global

- Actualizado: 2026-09-21, Codex.
- Autorización: Joan pide trabajar hoy con Codex y mejorar la estructura 3D existente hasta una primera versión visual global sin menús.
- Repositorio: C:\Users\joanv\code\worklynk\panel, rama main.
- Alcance: shell de administración, escena WebGL, rutas de vista previa y suscripción de actividad; conservar páginas de negocio, autenticación y permisos.
- Estado: primera versión implementada, revisada y publicada en GitHub; pendiente feedback de Joan.
- Cambio previo preservado: Claude había eliminado la barra lateral de Layout.tsx.
- Resultado: núcleo Worklynk y siete estaciones, órbita, zoom, reset, cámara al abrir un área, retorno y trabajo en un dock legible. Renderizado bajo demanda; soporte de movimiento reducido y alternativa si falla WebGL.
- Datos: vista previa explícitamente sin datos de empresa; las páginas reales siguen protegidas. No representa agentes trabajando ni métricas inventadas.
- Verificación: build correcto, 23 pruebas existentes correctas, navegación de siete rutas de preview y capturas 1280×720 / 390×844. Formularios autenticados aún no validados visualmente.
- Límite: primera versión espacial; las tablas y formularios conservan su interacción convencional dentro de la escena. No se ha implementado el coordinador Codex/Claude.
- Evidencia visual local: carpeta panel-review de la entrega en .codex/visualizations/2026/09/21/01a0c32c-d360-7862-9d70-c6e5418b8194.
- Commit: 70fe93cefd2099b3c14013704d68945320bf0735 publicado en main. Despliegue Netlify no verificado. Revisión visual final: ship para los cuatro ajustes señalados; formularios autenticados fuera de esa revisión.
- Siguiente paso: mostrar la vista previa a Joan y registrar su feedback concreto en esta ficha.


## Iteración de fluidez e interfaz
- Joan confirma la primera versión en Netlify y autoriza mejorar cámara, profundidad e integración.
- Responsable: Codex. Iteración terminada y publicada en main: 0c480a46124396ccaaf8c87032c9f5535977185e. Archivos: SpatialCanvas.tsx, SpatialLayout.tsx, spatial.css, DESIGN.md y sidecar.

- Resultado: cámara620ms/retorno500ms con desaceleración, zoom240ms, memoria del encuadre, foco de retorno robusto; acero más legible y sombras de contacto calculadas una vez; estación visible junto al dock anclado a la derecha.
- Validación: build final OK;23 pruebas OK;lint sin errores (5 avisos previos);desktop1280x720/móvil390x844;consola sin errores;retorno medido con deriva inferior a0.01px;revisión visual ship. Sin medición FPS ni prueba autenticada.
- Netlify: Joan confirmó la primera versión; el nuevo despliegue de 0c480a4 todavía no está verificado.

## Iteración semántica y red de agentes
- Joan pide una interfaz con más vida y sentido visual, estaciones inequívocas, mejor paso entre herramientas y una lectura honesta de todos los agentes.
- Cambio publicado en `393b5542e6b4d9e81d00cb094690415e1426be9a`: siete estaciones con geometría e icono propios; selector contextual en el dock para ir entre Resumen, Clientes, Proyectos, Facturas, Agentes, Tareas y Actividad; comprobado en vista previa de escritorio y móvil.
- Agentes: la pantalla incorpora una red visible de ocho roles y refleja el resultado real de `agent-operations`. El commit `9f64cc2816d39eba6c2887c492628a482c14654e` incorpora ejecutores de planificación para los siete especialistas y conserva el recorrido CEO → responsable, máximo dos llamadas y aprobación antes de crear tareas. No hay estados simulados ni acciones externas.
- Pendiente al cierre: aplicar `202609220011_specialist_executors.sql` en Supabase y validar el estado real desde una sesión de administrador una vez Netlify despliegue. Sin esa migración la Function seguirá informando únicamente de Operaciones e Ingeniería.

## Equipo y Redes Sociales
- Joan pide organizar el área de agentes como equipo de empresa, registrar el trabajo y preparar un agente de redes independiente con responsabilidades precisas.
- Publicado en `42e5845c423ff13c3cffb2de8faca4088de39003`: el área abre en Equipo, con accesos a Bandeja de decisiones y Trabajos. La red muestra nueve roles, incluido Redes Sociales con icono propio.
- Prompts: CEO/Orquestador asigna un único responsable y explica el criterio. Cada especialista tiene misión, resultado y límites específicos. Redes Sociales transforma estrategia de marketing en calendario editorial, formatos nativos, ideas, copys, comunidad y métricas; no publica, responde, activa anuncios ni accede a cuentas sin una integración y aprobación explícitas.
- Persistencia: `202609220012_social_agent.sql` amplía las funciones SQL para que Redes Sociales pueda recibir una segunda llamada de planificación y aprobar sus tareas. Aplicar 011 y 012 en ese orden; hasta entonces la pantalla no debe interpretarse como conexión real en producción.
- Validación: `npm run build` y 25 pruebas correctas; lint sin errores, con cinco avisos previos fuera de este cambio. Detector de interfaz sin bloqueos, con avisos de tokens ya existentes. No se comprobó la página autenticada ni se aplicó SQL remoto.
- Próximo trabajo: diseñar e implementar espacios de trabajo persistentes y su biblioteca de entregas (imágenes, documentos y artefactos por petición). No afirmar que ese archivo existe hasta contar con migración, RLS, UI y prueba autenticada.

## Corrección de autenticación de agentes
- Joan reporta que la red queda “sin confirmar” y recibe repetidamente el mensaje de sesión caducada pese a volver a iniciar sesión.
- Publicado en `ba19252a9bcf3a2c36fc971b2a13e4aa4a7ba9d0`: el cliente renueva una sesión próxima a expirar antes de llamar a la Function; el servidor detecta una API key inválida como configuración de servidor; el frontend diferencia una sesión local expirada del rechazo de un token por la Function.
- Validación: build y 25 pruebas correctas. Aún no hay acceso autenticado al despliegue ni a los secretos de Netlify para confirmar el origen remoto.
- Si persiste después del deploy, revisar en Netlify que `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` son del mismo proyecto Supabase que `VITE_SUPABASE_URL`; una configuración cruzada hace que toda sesión sea rechazada y deja todos los agentes sin confirmar.

## Consejo de dirección y cristal
- Joan confirma que los agentes ya conectan, pero solicita propuestas del equipo y no sólo un formulario de petición; además pide una interfaz glassmorphism.
- Publicado en `d3fb739b4d268be11e53250162ac4a63234f3c7a`: al abrir Equipo, si no existe ningún trabajo cuyo origen sea Consejo, se lanza una única lectura acotada con los proyectos activos. Su resumen y responsable aparecen en Consejo de dirección; la propuesta completa se abre desde Trabajos y sigue requiriendo aprobación antes de crear tareas. Las lecturas siguientes requieren “Actualizar lectura”, evitando gasto en cada visita.
- Diseño: panel raíz, Consejo, red de agentes, lista de integrantes y área de trabajo pasan a cristal translúcido con desenfoque, bordes sutiles y sombras suaves compatibles con el dock espacial. Redes Sociales queda bien rotulado también en estados y trabajos.
- Validación: build y 25 pruebas correctas; lint sin errores, con cinco avisos preexistentes fuera del área Agentes. Detector de diseño sin bloqueos; avisos sólo de tokens de radio/color ya presentes. Pendiente prueba autenticada y la definición de objetivos/indicadores persistentes para que el Consejo pueda evaluar metas como cinco clientes mensuales.

## Acceso verificado y cristal reforzado
- Joan pide no mostrar el error técnico dentro de la consola y exige una pantalla de carga previa; aporta una referencia concreta de cristal con transparencia, brillo interior y líneas de luz.
- Publicado en `b044a4f7f6ec754037c97904f3cb16907342d8ab`: mientras el GET de estado verifica Function y sesión se muestra una pantalla aislada; si falla, se presenta un estado de conexión con reintento y el detalle técnico plegado. Ese GET usa un timeout de 12 segundos; las peticiones al modelo mantienen 55 segundos.
- Estilo: superficies de Agentes con `rgba` blanco, blur de 18–20px, borde semitransparente, sombras suaves, reflejo interior y líneas de luz superior/lateral. La consola no aparece hasta que el estado sea válido.
- Validación: build y 25 pruebas correctas; lint sin errores con los cinco avisos existentes fuera de Agentes. La comprobación visual autenticada sigue pendiente.

## Menús espaciales y edición de Proyectos
- Joan informa de que los proyectos creados no podían editarse ni cambiar de estado y sustituye la petición de glassmorphism general por menús espaciales inspirados en Apple VR, integrados en el panel 3D.
- Proyectos: edición completa mediante diálogo, cambio de estado inmediato desde la tarjeta, búsqueda/filtros, feedback de guardado, errores recuperables, skeletons y controles táctiles de 44px. Los clientes conservan lectura sin controles administrativos.
- Interfaz: volumen frontal azul-negro con material translúcido jerárquico, foco hielo y señal violeta; lanzador vertical en escritorio y horizontal con indicación “Más” en móvil. La escena Three.js y sus estaciones continúan visibles alrededor.
- Accesibilidad: foco visible, movimiento reducido, transparencia reducida y contraste aumentado. La ruta DEV `/preview/command-center/projects/fixture` usa datos locales rotulados como muestra y permite comprobar tarjetas, estados y editor sin consultar Supabase; se excluye de producción.
- Verificación: `npm run build`, 25 pruebas y lint sin errores; cinco avisos anteriores fuera del cambio. Capturas 1440×1000 y 390×844, editor poblado y revisión Impeccable final `ship`. Validación con sesión administradora real pendiente tras el despliegue.

## Diagnóstico y propuesta de reestructuración (Claude, 2026-09-23)
- Joan quiere mantener el panel 3D y moverse por él en PC e iPad; los agentes son su equipo y deben ser el centro. Pide revisar el estado y reestructurarlo en lo estético.
- Diagnóstico: el 3D funciona como vestíbulo. Tiene siete estaciones del mismo peso, órbita y zoom, pero `enablePan={false}` impide desplazarse. Al entrar en un área, la cámara se bloquea y un panel plano tapa la escena. Las estaciones no enseñan estado real (pendientes, aprobaciones) y los agentes son una estación más.
- Propuesta en este orden:
  1. Sede: en el centro, Joan y el CEO; alrededor, los agentes como equipo con estado real (trabajando, espera aprobación, sin conexión). Clientes, Proyectos, Facturas y Tareas como salas alrededor.
  2. Desplazamiento real: desplazamiento con límites; en iPad, un dedo gira, dos dedos desplazan o hacen zoom y doble toque vuela; en PC, WASD o flechas.
  3. Estaciones con cifras reales de Supabase (facturas por cobrar, tareas de hoy, decisiones pendientes). Si un dato no existe, se muestra vacío y no se inventa.
  4. Al entrar en un área, un panel lateral (en iPad, una hoja inferior) que deja ver la escena, en lugar de un panel que la tapa.
- Pendiente: Joan elige por dónde empezar. Responsable por decidir (Codex tenía el relevo; Joan se lo ha pedido ahora a Claude).

## Sede 3D y colores de marca (Claude, 2026-09-23)
- Joan pasa el relevo a Claude (Codex sin uso). Rama local `sede-3d` del panel, commit 047a76c. **No subida ni publicada**: falta el OK de Joan.
- Sede: Joan y el CEO en el centro; ocho especialistas en puestos alrededor, con estado real de la Function (`teamTones` en `src/three/command-center/team.ts`); seis salas en anillo. Agentes = centro (`/agents`).
- Movimiento: desplazamiento con límite de radio 15 (clic derecho o dos dedos), WASD/flechas, Q/E para girar, doble clic o doble toque en el suelo para viajar. Las etiquetas de cada agente aparecen al acercarse.
- Colores de Worklynk: gris perla, blanco, tinta, y lima solo para lo activo. Jost autoalojada en `public/fonts`. `projects.css` y `pages/agents.css` pasados a claro.
- Validado: build, 25 pruebas y oxlint sin errores; preview en escritorio, tableta y móvil; Proyectos con datos de muestra.
- Pendiente: pasar a claro el resto de pantallas (`console.css` y `command-center.css` tienen colores fijos y bloques para modo oscuro), probar con sesión real, publicar. Siguiente fase: cifras reales en las salas y panel lateral que no tape la escena.

## Publicado en main (Claude, 2026-09-23, con OK de Joan)
- 047a76c: sede 3D, desplazamiento y colores de marca (antes rama `sede-3d`).
- 63b33b8: Resumen y bloques heredados (pulso, cobros, nixie, monoespaciada, auras magenta) en blanco, tinta y lima dentro del volumen de trabajo. Ruta DEV vacía `/preview/command-center/resumen/fixture`, sin datos.
- fccba87: salas con cifras reales (`hooks/useRoomSignals.ts`): clientes, proyectos activos, € por cobrar y vencidas, tareas abiertas y vencidas, y Actividad «En tiempo real» si Realtime conecta. Solo en la vista general; si una consulta falla, la sala no muestra nada.
- aa2674f: el área abierta ya no tapa la sede: panel lateral derecho en escritorio (máx. 840 px, 62vw) y hoja inferior en tableta y móvil; la cámara encuadra la sala en la zona visible.
- Validado: build, 25 pruebas y lint; preview en 1280, iPad 768×1024 y móvil 375.
- Pendiente: probar con sesión real (estado de agentes, cifras, Clientes, Facturas, Tareas, Actividad y Agentes en claro). `command-center.css` es de la escena antigua y no se usa. URL de Netlify del panel sin anotar en Brain.
- cd4285d: cada puesto de la sede abre `/agents?agente=<id>` con ese especialista resaltado; los conectados muestran «Encargar», que abre un trabajo con «Para <agente>: » (responsable sugerido; el CEO confirma). Agentes conectados en lima. Las demás pantallas (Clientes, Facturas, Tareas, Actividad) usan utilidades zinc que `worklynk-2026.css` ya traduce a los colores del volumen de trabajo.
- Siguiente propuesto: biblioteca de entregas por trabajo (necesita migración y RLS que Joan aplica en Supabase) y aplicar 011/012 para que los especialistas figuren conectados.
- 8a5208f: iconos de Worklynk (v4, los mismos de worklynk.es) en la pestaña, el acceso directo del iPad (apple-touch-icon y manifiesto `standalone`) y el símbolo oficial en la cabecera (`public/iconos/simbolo.svg`). Sustituye al favicon morado de Vite.
- 8b078b4: biblioteca de entregas por trabajo. Migración `202609230013_agent_deliverables.sql` (tabla `agent_deliverables` + bucket privado `entregas`, RLS de administrador propietario del trabajo; carpeta `<actor_id>/<run_id>/`). Componente `src/components/Deliverables.tsx` dentro de cada trabajo en Agentes: texto, enlace o archivo (25 MB), abrir con URL firmada de 60 s, aprobar, pedir cambios con nota, volver a «por revisar» y eliminar. Sin la migración, indica que falta aplicarla. La sede muestra «N entregas por revisar» en Dirección y equipo. Ruta DEV `/preview/command-center/agents/fixture` con muestras rotuladas.
- Pendiente: Joan aplica la 013 en Supabase (después de 011 y 012). Los agentes aún no escriben entregas por sí solos: sus ejecutores solo preparan planes y tareas; conectar su salida a la biblioteca es el siguiente paso de capacidades (toca prompts y Function).
- fa7e847 publicado en main con OK de Joan (2026-09-23): los especialistas redactan borradores bajo demanda. Edge Function `netlify/edge-functions/agent-draft.ts` (`/api/agent-draft`, streaming; la Function normal corta a 10 s). Prompt en `server/agents/drafting.ts`. Comprueba administrador, AGENTS_ENABLED, ejecutor conectado y un tope de 20 borradores en 24 h; guarda en `agent_deliverables` (necesita la 013). En la pantalla: «Pedir borrador a <agente>» y «Rehacer con mi nota». No cambia los prompts de planificación existentes. 30 pruebas OK.
- 553335d: en Agentes (vista Equipo), lista «Entregas por revisar» de todos los trabajos (12 más recientes) con acceso directo al trabajo; solo aparece si hay alguna.
