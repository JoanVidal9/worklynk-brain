# Panel WorkLynk

Panel de control interno de [[Empresa|WORKLYNK]]. Repo local:
`C:\Users\joanv\code\worklynk\panel`. El detalle vivo está en `PRODUCT.md`,
`DESIGN.md` y `README.md` de ese repo — esta nota es el resumen.

## Qué es

Accesos directos a las webs/herramientas de la empresa, ficha de clientes,
proyectos y facturación (con generación de PDF). Incluye un **portal de
acceso para clientes**: cada cliente solo ve sus propios proyectos y
facturas, nunca los de otro.

Además, un flujo de **agentes coordinado por un CEO/orquestador**: Joan
define el objetivo, revisa la propuesta y conserva la aprobación final antes
de que se ejecute cualquier cambio sensible. Operaciones e Ingeniería pueden
preparar propuestas trazables; Ingeniería planifica trabajo técnico pero
**todavía no modifica repositorios ni despliega** por sí sola.

## Stack

React + Vite + TypeScript + Tailwind CSS + React Router + Supabase (auth y
datos) + Netlify (hosting y Functions para el flujo de agentes, que usa la
API de OpenAI).

## Roles

- **Administrador** (Joan): clientes, proyectos, tareas, facturas, actividad
  y peticiones al equipo de agentes.
- **Cliente**: portal restringido, solo sus proyectos y facturas vinculados
  (aplicado con políticas RLS de Supabase, no solo en la interfaz).

## Navegación espacial — 2026-09-21

Joan pide que el Command Center sea el entorno global de administración, sin menús convencionales. Primera versión: escena WebGL permanente, siete estaciones (Resumen, Clientes, Proyectos, Facturas, Agentes, Tareas y Actividad), órbita y zoom, desplazamiento de cámara al seleccionar un área y retorno a la vista general. Los datos y formularios existentes se abren en un área legible sobre la escena; todavía no son objetos editables dentro del espacio 3D.

Implementación en `src/components/SpatialLayout.tsx`, `src/three/command-center/SpatialCanvas.tsx`, `destinations.ts` y `src/spatial.css`. La vista de desarrollo `/preview/command-center` no consulta datos de empresa ni activa agentes. El portal de clientes conserva el shell restringido anterior. La iteración 0c480a4 conserva el encuadre de exploración al regresar, suaviza cámara y zoom, mejora materiales y sombras y ancla el dock al borde derecho para dejar visible la estación. La siguiente iteración sustituye las formas genéricas por modelos e iconos semánticos y añade en el dock un selector contextual de las siete áreas.

La pantalla Agentes empieza por **Equipo** y separa la lectura de los integrantes, la Bandeja de decisiones y los Trabajos. Muestra una red de nueve roles y consulta la Function para distinguir conexiones reales, servicio apagado y configuración sin confirmar. Desde `9f64cc2`, Operaciones, Ingeniería, Finanzas, Comercial, Marketing, Investigación y Soporte tienen ejecutores de planificación acotados. Desde `42e5845`, Redes Sociales es independiente: convierte estrategia en calendario, piezas, comunidad y métricas por canal, pero no publica, responde ni accede a cuentas sociales. Las migraciones `202609220011_specialist_executors.sql` y `202609220012_social_agent.sql` son necesarias para anunciar todos los ejecutores en producción. Todos siguen bajo aprobación explícita y no ejecutan acciones externas. No se deben mostrar como activos hasta que esa comprobación real confirme la Function. La biblioteca persistente de imágenes, documentos y otros artefactos por trabajo sigue pendiente.

Si Agentes devuelve “sin confirmar” junto con “La Function no ha reconocido esta sesión”, el problema está antes de consultar capacidades: `ba19252` renueva el token próximo a caducar y explica que `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` de Netlify deben ser del mismo proyecto que `VITE_SUPABASE_URL`. La migración SQL no corrige una discrepancia de credenciales.

Desde `d3fb739`, Equipo incorpora un **Consejo de dirección**. La primera vez que el área está activa y no existe una lectura previa, envía una única petición acotada al CEO con los proyectos activos para dejar iniciativas verificables; la propuesta queda en Trabajos y requiere la misma revisión antes de crear tareas. Las actualizaciones posteriores requieren el botón explícito. No es todavía un scheduler autónomo: no analiza sin abrir el panel ni dispone de métricas de clientes, facturación o campañas que no estén en el contexto autorizado. La superficie de Agentes utiliza cristal translúcido, blur y contrastes de la Consola de Mando.

Desde `b044a4f`, la consola de Agentes no se expone antes de verificar la Function: usa una pantalla de conexión y un estado de error separado con reintento y diagnóstico desplegable. El GET de estado vence a los 12 segundos, mientras que peticiones que pueden usar el modelo conservan 55 segundos. El cristal se refuerza con capas blancas semitransparentes, reflejos interiores, desenfoque y líneas de luz; no se puede confirmar visualmente sin sesión autenticada en el despliegue.

## Identidad visual

El entorno de administración conserva la escena 3D del Command Center y usa una interfaz espacial azul-negra: cristal frío para el volumen principal, foco hielo, señal violeta secundaria y un lanzador contextual con las siete áreas. En escritorio el lanzador es vertical; en móvil es horizontal y muestra que hay más destinos. Las superficies de datos permanecen más sólidas para sostener la lectura. El portal cliente conserva su sistema anterior de blanco/negro y magenta. No usar verde. Consultar DESIGN.md y el brief espacial del repo para el alcance exacto.

## Proyectos editables — 2026-09-22

La pantalla Proyectos admite edición completa de registros existentes y cambio de estado directo desde cada tarjeta. El editor cubre cliente, nombre, descripción, estado, presupuesto, inicio y entrega; las actualizaciones usan las políticas RLS existentes (`projects: admin all`) y las vistas de cliente siguen siendo de solo lectura. Existe una ruta sólo de desarrollo con datos locales rotulados como muestra para revisar tarjetas, estados y diálogo sin usar una sesión ni información real; no entra en producción.

## Principios del producto

- Joan mantiene el control: proponer, explicar, pedir aprobación antes de
  ejecutar cambios sensibles.
- El estado operativo se entiende de un vistazo, con trazabilidad completa.
- Distingue con honestidad un problema de configuración, un estado vacío y
  un error real — nunca datos de demostración inventados.
