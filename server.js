// node server.js para que funcionen las history api
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html',
    '.js'  : 'application/javascript',
    '.css' : 'text/css',
    '.png' : 'image/png',
    '.jpg' : 'image/jpeg',
    '.ico' : 'image/x-icon',
    '.svg' : 'image/svg+xml',
    '.json': 'application/json',
};

http.createServer((req, res) => {
    let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext  = path.extname(filePath);
        const mime = MIME[ext] || 'text/plain';
        res.writeHead(200, { 'Content-Type': mime });
        fs.createReadStream(filePath).pipe(res);
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(ROOT, 'index.html')).pipe(res);

}).listen(PORT, () => {
    console.log(`\n✅ Servidor corriendo en http://localhost:${PORT}\n`);
});