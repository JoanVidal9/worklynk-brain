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
