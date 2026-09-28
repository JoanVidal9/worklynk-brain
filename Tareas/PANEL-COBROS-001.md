# PANEL-COBROS-001 — licencias, renovaciones e instalaciones de KERN en el panel

- Actualizado: 2026-09-28, Claude (ficha creada para Codex por encargo de Joan).
- Proyecto y ruta: Panel, `C:\Users\joanv\code\worklynk\panel` (Vite + React + TypeScript, Supabase, Netlify).
- Responsable: **Codex**. Claude no toca el repositorio del panel mientras esta ficha esté en curso.
- Estado: pendiente.

## Objetivo

Preparar el panel para vender KERN a varios clientes sin perder de vista el dinero ni las instalaciones.

1. **Cuotas recurrentes.** Licencias anuales o mensuales de KERN, mantenimientos de webs y módulos. Por cliente: producto, importe, periodicidad, fecha de inicio, próxima renovación, permanencia (si hay) y estado (activa, en aviso, cancelada).
2. **Avisos de renovación.** En el resumen: lo que renueva en los próximos 30 días y lo que ya venció sin factura. Desde el aviso, un botón crea la factura en borrador con los datos de la cuota. Se usa el flujo de facturas actual, no uno nuevo.
3. **Ficha de instalación de KERN por cliente.** Solo datos operativos, **nunca claves ni contraseñas**:
   - nombre del proyecto de Supabase y región;
   - sitio y dominio de Netlify;
   - nombre del proyecto de OpenAI y límite de gasto mensual;
   - plan;
   - fecha de alta;
   - número de usuarios;
   - notas.
4. **Cobros pendientes.** Una vista que junte las facturas enviadas sin cobrar y las vencidas, con los días de retraso. Los estados `paid`, `overdue` y `paid_at` ya existen: aprovecharlos.

## Terminado cuando

- Hay una migración nueva y numerada tras `202609240020_client_notes.sql`, con RLS igual que el resto: el administrador lo ve todo y el cliente nada de esto.
- Las pantallas siguen el sistema visual actual del panel (claro, lima solo para estado activo) y los textos van en español con tuteo.
- `npm run build` y las pruebas existentes pasan. Se añaden pruebas para el cálculo de la próxima renovación.
- La migración **no se aplica a producción** sin que Joan lo diga. Se le deja escrito cómo aplicarla.

## Límites

- Solo el repositorio `panel`. No tocar:
  - `kern`, `kern-base`, `web` ni `bases` (son de Claude);
  - la pantalla de acceso (Claude quitó el registro el 2026-09-28, en 056d477).
- La migración 015 (fiscal) sigue pendiente de aplicar según `Handoffs.md`. Revisar su estado antes de numerar la nueva y avisar a Joan si bloquea.
- Nada de secretos en el código, en la base de datos del panel ni en Brain.
- Al cerrar: actualizar esta ficha, `INDEX.md` y una entrada en `Handoffs.md`.
