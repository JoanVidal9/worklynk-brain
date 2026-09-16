# Cerebro WORKLYNK

Vault de notas en Markdown con el contexto de toda la empresa: qué es
WORKLYNK y cada uno de sus proyectos. Pensado para dos usos a la vez:

1. **Tú, en Obsidian.** Abre esta carpeta (`C:\Users\joanv\code\worklynk\brain`)
   como vault — *Open folder as vault* — y navega el grafo como siempre. Los
   enlaces entre notas ya están escritos con la doble corchete de Obsidian.
2. **Cualquier sesión de Claude Code**, sea en el repo de la web, el de
   KERN, el del panel o donde sea. Al empezar una sesión nueva en
   cualquiera de esos repos, dile algo como: *"antes de nada, lee entera
   la carpeta C:\Users\joanv\code\worklynk\brain"* — así arranca con el
   contexto de toda la empresa sin tener que releer código desde cero.
   Esto es lo que de verdad reduce cuánto gasto: notas cortas y curadas en
   vez de que cada sesión nueva tenga que explorar el código para
   reconstruir el contexto.

No es una herramienta instalada ni un servicio corriendo: son archivos de
texto normales, en git, que puedes leer, editar y enlazar a mano igual que
cualquier nota.

## Notas

- [[Empresa]] — qué es WORKLYNK, posicionamiento, tono, estado del negocio
- [[Web worklynk.es]] — la web corporativa (`C:\Users\joanv\code\worklynk\web`)
- [[KERN]] — el producto insignia (`C:\Users\joanv\code\worklynk\kern`)
- [[Refórmalo]] — el producto propio
- [[Panel WorkLynk]] — el panel de control interno (`C:\Users\joanv\code\worklynk\panel`)

## Dónde vive todo

Todo el código de la empresa cuelga de `C:\Users\joanv\code\worklynk\`:
`web`, `brain` (este vault), `kern` y `panel`, cada uno su propio repo git
con su remoto en GitHub (salvo este vault, que es privado). Hay un acceso
directo por proyecto en el escritorio (`WORKLYNK - Web`, `WORKLYNK - Brain`,
`WORKLYNK - KERN`, `WORKLYNK - Panel`).

## Cómo mantenerlo vivo

Esto no se actualiza solo. Cuando algo cambie de verdad en un proyecto (no
cada detalle — solo lo que le cambiaría el contexto a alguien que no ha
visto el código), pide que se actualice la nota correspondiente desde la
sesión de ese proyecto.

Cada repo sigue teniendo su propio `CLAUDE.md`/`README.md` con el detalle
técnico de trabajar en él; esto es el resumen de una capa por encima, para
no tener que leerlo todo cada vez que se abre una sesión nueva.

## Por qué esto y no un "claude-mem" o similar

Existen varios plugins de terceros (`claude-mem` y clones parecidos) que
prometen memoria automática entre sesiones de Claude Code. Se descartan
por dos motivos: (1) el ecosistema está lleno de forks con nombres casi
idénticos y trazabilidad dudosa — el mismo patrón que ya se vio con
"Graphify" — y (2) el propio Claude Code ya trae un sistema de memoria
nativo (archivos en `~/.claude/.../memory/`) que hace lo mismo gratis y sin
instalar nada; además herramientas como `claude-mem` suelen gastar
llamadas extra a la API para comprimir el contexto, lo contrario de
"gastar lo menos posible". Este vault + la memoria nativa + un
`CLAUDE.md` conciso por repo ya cubre el objetivo.

## Por qué esto y no "Graphify"

Buscando el nombre, resultó que "Graphify" no es una sola herramienta: hay
al menos tres proyectos sin relación con ese nombre, y una variante
(`graphifyy`, con doble "y", promocionada con cifras infladas) con toda la
pinta de intentar hacerse pasar por un paquete legítimo. Instalar algo así
significa ejecutar código de terceros en el ordenador — no vale la pena el
riesgo cuando esto (una carpeta de notas, cero instalación) resuelve lo
mismo que pedías: un sitio donde esté todo el contexto sin releer código
cada vez.
