# Cursores compartidos en tiempo real

Proyecto con Node.js + Express + Socket.IO (server) y Astro + socket.io-client (client).

## Repositorios
- Cliente: (repositorio cliente URL aquí)
- Servidor: (repositorio servidor URL aquí)

## Estructura del proyecto
- `server/` : servidor Express + Socket.IO
- `client/` : proyecto Astro UI en tiempo real

## Ejecutar servidor
1. Abrir terminal en `server/`
2. `npm install`
3. `npm start`
4. Acceder a `http://localhost:4321` para ver la confirmación

## Ejecutar cliente
1. Abrir terminal en `client/`
2. `npm install`
3. `npm run dev`
4. Acceder a `http://localhost:3000`

## Funcionamiento
- Cada cliente emite `moveCursor` con `{x, y}` cada ~45ms.
- El servidor difunde a otros clientes (`cursor-update`).
- Al conectar, envía `register` con nombre/color.
- Servidor mantiene `user-count`, `user-joined`, `user-left`.

## Requisitos implementados
- Detecta posición del cursor.
- Envía al servidor a frecuencia limitada (`setInterval` 45ms).
- Muestra cursores de todos los usuarios con color, nombre y animación suave.
- Elimina cursor con desconexión.

## Mejoras añadidas
- Nombre de usuario aleatorio (`Usuario_XXXX`).
- Color aleatorio HSL por usuario.
- Animación de movimiento suave con `transition` CSS.
- Contador de usuarios conectados.
- Colisiones detectadas por proximidad, con efecto confetti.
- Mensajes de status para eventos (join, collision).

## Problemas encontrados y soluciones
- Problem: eventos de cursor pueden saturar. Solución: envío throttled con `setInterval` + bandera `needSend`.
- Problem: desincronización en conexiones tardías. Solución: envio inicial `init` con usuarios actuales y `user-joined` para nuevos.
- Problem: errores de puertas CORS. Solución: habilitado `cors` en Socket.IO (`origin: '*'`).

## Código fuente
- Servidor: `server/index.js`, `server/package.json`
- Cliente: `client/src/pages/index.astro`, `client/package.json`, `client/astro.config.mjs`
