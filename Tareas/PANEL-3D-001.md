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
- Agentes: la pantalla incorpora una red visible de ocho roles y refleja el resultado real de `agent-operations`. El servidor actual expone únicamente Operaciones e Ingeniería como ejecutores; CEO coordina cuando el servicio está activo y los otros cinco roles quedan pendientes. No hay datos de estado simulados.
- Pendiente al cierre: construir y desplegar ejecutores especializados para los cinco roles restantes si Joan quiere que los ocho procesen peticiones; validar el estado real desde una sesión de administrador una vez se publique.
