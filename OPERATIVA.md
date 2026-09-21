# Operativa compartida

## Responsabilidades

- Joan define objetivos y prioridades. Un responsable por tarea decide la ejecución técnica dentro de ese alcance.
- Preferir al agente que ya tenga el contexto vigente. Un segundo agente interviene cuando una revisión o una parte independiente aporte valor.
- Antes de editar, comprobar el estado de Git y la asignación actual. No alterar trabajo ajeno ni reclamar una tarea ocupada sin relevo explícito.
- Para concurrencia, usar ramas y worktrees independientes. La asignación escrita es coordinación humana, no un bloqueo automático contra carreras.
- Un único responsable integra y publica una entrega. Comprobar remoto y pruebas; nunca forzar cambios ajenos. Registrar por separado commit, PR y resultado real de Netlify.

## Dónde guardar cada cosa

- START-HERE.md: rutas y reglas de entrada, estable y breve.
- Notas de proyecto existentes: hechos duraderos, arquitectura general y decisiones vigentes.
- Tareas/INDEX.md: lista corta de trabajo activo con enlace, responsable y estado.
- Tareas/<ID>.md: objetivo, alcance, evidencia y siguiente paso de una tarea.
- Tareas/Archivo/: fichas terminadas cuando ya no sean necesarias en el índice activo.
- Handoffs.md: último resumen por proyecto, reemplazando el anterior en lugar de acumular conversaciones.
- marca/: recursos existentes de identidad visual.

## Ciclo de una tarea

1. Consultar la lectura mínima de START-HERE y las instrucciones del repositorio.
2. Crear ficha desde Tareas/PLANTILLA.md si hay trabajo de implementación o coordinación; para una consulta breve basta actualizar un hecho duradero si cambió.
3. Registrar responsable, estado y archivos asignados antes de editar. Leer de nuevo la ficha antes de asumir un relevo.
4. Ejecutar el trabajo y verificarlo con comprobaciones proporcionales al cambio.
5. Antes de cerrar o pausar, actualizar ficha e índice, el resumen de Handoffs y las notas que hayan quedado desactualizadas. Registrar fecha y evidencia; distinguir confirmado, comunicado por Joan y pendiente de verificar.
6. Si se publica código, registrar el commit/PR real. La publicación del Brain se realiza aparte y se informa por separado; no equivale a desplegar una aplicación.

## Contexto y consumo

Usar chats nuevos por tarea con ID y ruta del Brain. No recuperar historiales completos por defecto. Mantener relevos de unas 10 líneas y fichas breves; enlazar código y pruebas en lugar de copiarlos. Consultar fuentes concretas cuando la memoria no baste: un resumen no sustituye la verificación del código.

No guardar secretos, datos privados de clientes, transcripciones ni volcados de terminal. No registrar una consulta sin novedades como si hubiera cambiado el proyecto.

## Alcance actual

Las instrucciones globales locales apuntan a este Brain. Su cumplimiento requiere una sesión activa y permisos de acceso; no conceden permisos de escritura por sí mismas. Obsidian presenta los archivos, no ejecuta a los agentes. El coordinador de activación automática sigue pendiente. La sesión suspendida de Claude debe recibir expresamente la ruta de START-HERE al reanudarse si no ha cargado las instrucciones nuevas.
