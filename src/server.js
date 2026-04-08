/**
 * server.js — Servidor SPA para History API
 * Regla: si el archivo existe → servirlo. Si no → servir index.html.
 * Así pushState funciona con refresh en cualquier ruta.
 *
 * Uso: node server.js
 *      Abrir: http://localhost:3000
 */
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js'  : 'application/javascript; charset=utf-8',
    '.css' : 'text/css; charset=utf-8',
    '.png' : 'image/png',
    '.jpg' : 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico' : 'image/x-icon',
    '.svg' : 'image/svg+xml',
    '.json': 'application/json',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
};

http.createServer((req, res) => {

    // 1. Separar pathname del query string (?foo=bar)
    //    req.url puede ser "/about?x=1" — solo nos interesa "/about"
    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const pathname  = decodeURIComponent(parsedUrl.pathname);

    // 2. Construir ruta al archivo real
    const filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname);

    // 3. Si el archivo existe y es un fichero real → servirlo
    try {
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            const ext  = path.extname(filePath).toLowerCase();
            const mime = MIME[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': mime });
            fs.createReadStream(filePath).pipe(res);
            return;
        }
    } catch (_) {
        // El archivo no existe → caer al fallback SPA
    }

    // 4. Cualquier otra ruta → index.html (History API se encarga del resto)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(path.join(ROOT, 'index.html')).pipe(res);

}).listen(PORT, () => {
    console.log(`\n✅ Servidor SPA corriendo en http://localhost:${PORT}`);
    console.log(`   Refresca en cualquier ruta — History API funciona ✓\n`);
});