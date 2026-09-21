# Cerebro WORKLYNK

Baúl compartido de Obsidian en `C:\Users\joanv\code\worklynk\brain`. Codex y Claude Code consultan los mismos archivos Markdown. Entrada: [START-HERE.md](START-HERE.md).

## Organización

La carpeta `C:\Users\joanv\code\worklynk` contiene cuatro repositorios independientes: `brain`, `panel`, `web` y `kern`. Panel, Web y KERN conservan cada uno su despliegue Netlify. Brain conserva documentación y no necesita despliegue.

- [START-HERE.md](START-HERE.md): lectura mínima y rutas.
- [OPERATIVA.md](OPERATIVA.md): reparto, consumo de contexto y actualización obligatoria al cerrar cada tarea.
- [Handoffs.md](Handoffs.md): último estado por proyecto.
- [Tareas/INDEX.md](Tareas/INDEX.md): trabajo activo y fichas.
- [[Empresa]], [[Panel WorkLynk]], [[Web worklynk.es]], [[KERN]] y [[Refórmalo]]: contexto duradero.
- [Marca](marca/MARCA.md): recursos existentes de identidad.
- AGENTS.md y CLAUDE.md: instrucciones de entrada al trabajar en este repositorio.

## Memoria al día

El agente responsable actualiza la tarea, el relevo y las notas afectadas antes de cerrar su sesión, sin esperar otra petición de Joan. No se copian conversaciones completas ni se carga todo el baúl por defecto. Las discrepancias técnicas se verifican en el repositorio correspondiente.

Esta es una disciplina de trabajo, no un servicio en segundo plano. Los cambios hechos fuera de las sesiones no se detectan solos. No existe todavía un coordinador que active automáticamente a Codex o Claude.

## Obsidian y Git

Abrir esta carpeta como baúl en Obsidian. Su configuración local `.obsidian/` está ignorada en Git. Las instrucciones globales de ambos agentes ya apuntan al índice en este ordenador; otros equipos necesitan configurar su ruta de entrada.

El remoto del Brain es `JoanVidal9/worklynk-brain`. Guardar un archivo local no equivale a publicarlo: commit y push son pasos separados. Nunca incluir credenciales, datos privados de clientes ni logs completos.
