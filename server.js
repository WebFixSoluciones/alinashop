// server.js - Punto de entrada de inicio para cPanel (CloudLinux / Phusion Passenger Node.js App)
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT, 10) || 3000;

// Verificar si existe la carpeta pública de subidas locales
const uploadsDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Inicializar Next.js
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error en la solicitud:", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    })
      .once("error", (err) => {
        console.error("Error al iniciar el servidor HTTP:", err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Servidor Alina Shop ejecutándose en el puerto ${port} (Modo: ${dev ? "Desarrollo" : "Producción"})`);
      });
  })
  .catch((err) => {
    console.error("Error al preparar la aplicación Next.js:", err);
    process.exit(1);
  });
