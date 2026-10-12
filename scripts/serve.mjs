import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const target = path.resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    let info;
    try { info = await fs.stat(target); } catch { /* Serve the static 404 below. */ }
    if (info?.isDirectory() && !pathname.endsWith('/')) { res.writeHead(308, { Location: pathname + '/' }).end(); return; }
    const file = info?.isDirectory() ? path.join(target, 'index.html') : target;
    let data;
    let status = 200;
    try { data = await fs.readFile(file); } catch { data = await fs.readFile(path.join(root, '404.html')); status = 404; }
    res.writeHead(status, { 'Content-Type': status === 404 ? types['.html'] : types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  } catch { res.writeHead(400).end('Bad request'); }
}).listen(port, '127.0.0.1', () => console.log(`SEOLIN Apps preview: http://127.0.0.1:${port}`));
