# Cerebro WORKLYNK

Vault de notas en Markdown con el contexto de toda la empresa: qué es
WORKLYNK y cada uno de sus proyectos. Pensado para dos usos a la vez:

1. **Tú, en Obsidian.** Abre esta carpeta (`C:\Users\joanv\code\worklynk-brain`)
   como vault — *Open folder as vault* — y navega el grafo de enlaces como
   siempre. Los `[[enlaces dobles]]` ya están escritos en formato Obsidian.
2. **Cualquier sesión de Claude Code**, sea en el repo de la web, el de
   KERN, el del panel o donde sea. Al empezar una sesión nueva en
   cualquiera de esos repos, dile algo como: *"antes de nada, lee entera
   la carpeta C:\Users\joanv\code\worklynk-brain"* — así arranca con el
   contexto de toda la empresa sin tener que releer código desde cero.

No es una herramienta instalada ni un servicio corriendo: son archivos de
texto normales, en git, que puedes leer, editar y enlazar a mano igual que
cualquier nota.

## Notas

- [[Empresa]] — qué es WORKLYNK, posicionamiento, tono, estado del negocio
- [[Web worklynk.es]] — la web corporativa (este repo: `worklynk-web`)
- [[KERN]] — el producto insignia
- [[Refórmalo]] — el producto propio
- [[Panel WorkLynk]] — el panel de control interno (`PANEL WORKLYNK`)

## Cómo mantenerlo vivo

Esto no se actualiza solo. Cuando algo cambie de verdad en un proyecto (no
cada detalle — solo lo que le cambiaría el contexto a alguien que no ha
visto el código), pide que se actualice la nota correspondiente desde la
sesión de ese proyecto.

Cada repo sigue teniendo su propio `CLAUDE.md`/`README.md` con el detalle
técnico de trabajar en él; esto es el resumen de una capa por encima, para
no tener que leerlo todo cada vez que se abre una sesión nueva.

## Por qué esto y no "Graphify"

Buscando el nombre, resultó que "Graphify" no es una sola herramienta: hay
al menos tres proyectos sin relación con ese nombre, y una variante
(`graphifyy`, con doble "y", promocionada con cifras infladas) con toda la
pinta de intentar hacerse pasar por un paquete legítimo. Instalar algo así
significa ejecutar código de terceros en el ordenador — no vale la pena el
riesgo cuando esto (una carpeta de notas, cero instalación) resuelve lo
mismo que pedías: un sitio donde esté todo el contexto sin releer código
cada vez.
