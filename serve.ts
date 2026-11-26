// Server statis kecil untuk uji lokal app/ (Node 22, stdlib saja).
// Jalankan: node serve.ts  (lalu buka localhost:8080) atau node serve.ts --port 8090
import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { join, normalize, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "app");
const port = Number(process.argv[process.argv.indexOf("--port") + 1] || 8080);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon" };

createServer((req, res) => {
  const path = normalize(join(root, decodeURIComponent((req.url || "/").split("?")[0])));
  if (!path.startsWith(root)) { res.writeHead(403); res.end("forbidden"); return; }
  let file = path;
  try { if (statSync(file).isDirectory()) file = join(file, "index.html"); } catch { res.writeHead(404); res.end("not found"); return; }
  try { statSync(file); } catch { res.writeHead(404); res.end("not found"); return; }
  res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log("Serving app/ on port " + port));
