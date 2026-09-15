# Panel WorkLynk

Panel de control interno de [[Empresa|WORKLYNK]]. Repo local:
`C:\Users\joanv\code\PANEL WORKLYNK`. El detalle vivo está en `PRODUCT.md`,
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

## Identidad visual

Sigue el mismo criterio que [[Web worklynk.es]]: blanco y negro mandan,
magenta de marca y una luz violeta cercana solo en navegación activa, foco y
estados relevantes — nunca verde. Tema según preferencia del sistema.

## Principios del producto

- Joan mantiene el control: proponer, explicar, pedir aprobación antes de
  ejecutar cambios sensibles.
- El estado operativo se entiende de un vistazo, con trazabilidad completa.
- Distingue con honestidad un problema de configuración, un estado vacío y
  un error real — nunca datos de demostración inventados.
