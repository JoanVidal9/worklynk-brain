# KERN

El producto insignia de [[Empresa|WORKLYNK]]. Entorno de trabajo técnico que
convierte el archivo documental de una empresa en expedientes: documentación,
cálculos y referencias, con el formato corporativo de cada cliente y validación
técnica en cada fase. Vocabulario en la web: archivo técnico, criterio,
trazabilidad; nunca «plantilla Word» ni «copiar y pegar» como reclamo.

**En producción de verdad** en una ingeniería industrial española. No es un
prototipo. (Joan retiró de la web la cifra de documentos al mes.)

> Repo en `C:\Users\joanv\code\worklynk\kern` (GitHub:
> `JoanVidal9/worklynk-engineeringos`) — ya no está vacío, tiene código real
> (`index.html`, `SUPABASE.sql`, funciones Netlify). No se ha auditado su
> contenido a fondo desde esta nota; si algo aquí choca con lo que hay en el
> repo, manda el repo.

## Las seis fases (nombres reales, ya corregidos en la maqueta de la web)

**Comprensión · Conocimiento · Datos · Plan · Ejecución · Expediente.**

Cada fase se apoya en el archivo de la empresa y se cierra cuando un técnico
la aprueba — no publica nada sin validación humana.

## Cómo se vende

- Implantación única + licencia anual. Sin precio público — se da la cifra
  en la demo, depende del volumen de documentación.
- Instalación por cliente: la documentación de uno no se mezcla con la de
  otro.
- Calibración: las primeras semanas salen con correcciones; son las que
  ajustan la redacción a cómo escribe esa empresa en concreto.

## Módulos (prometidos en `/modulos/`, KERN tiene que poder soportarlo)

Un módulo es una función **cerrada y agnóstica de sector**: entra un
archivo o un dato, sale un documento con el formato del cliente. Se activa
sobre una instalación YA en marcha — sin proyecto nuevo, sin implantación,
sin contrato aparte, sumado a la cuota anual existente.

- Precio anual proporcional al tamaño de la licencia del cliente.
- Descuento contratando 3 o más módulos a la vez.
- Se puede desactivar en la siguiente renovación si deja de ser útil.
- Los módulos nuevos se prueban primero con clientes actuales antes de
  entrar en el catálogo público.

**Catálogo público actual (5):**

1. **Actas de reunión** — de la grabación al acta redactada con la
   estructura de la empresa del cliente.
2. **Resumen de documentos** — informes largos, pliegos o normativa
   reducidos a los puntos que importan.
3. **Extracción de datos** — de un PDF o una hoja de cálculo a una tabla
   estructurada y utilizable.
4. **Redacción de correspondencia** — escritos recurrentes sobre las
   plantillas y el tono de la empresa del cliente.
5. **Buscador documental** — consulta sobre todo el archivo de la empresa,
   con la fuente de cada respuesta a la vista.

**Implicación de arquitectura**: KERN necesita poder activar/desactivar un
módulo por cliente sin un ciclo de despliegue nuevo, que cada módulo sea
independiente de configuración de sector, y que la facturación refleje el
precio proporcional a la licencia. Si esa capa no existe todavía, esta es
la especificación funcional a la que apuntar.

## Soporte

Clientes ya activos escriben a `soporte@worklynk.es` (canal directo, sin
tickets).
