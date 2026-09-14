import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
const root=path.resolve('out');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon'};
http.createServer(async(req,res)=>{
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end('Method not supported by local preview');return}
 try{const url=new URL(req.url,'http://localhost');const decoded=decodeURIComponent(url.pathname);let file=path.resolve(root,'.'+decoded);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}let stat;try{stat=await fs.stat(file)}catch{}if(stat?.isDirectory())file=path.join(file,'index.html');let body;try{body=await fs.readFile(file)}catch{res.statusCode=404;file=path.join(root,'404.html');body=await fs.readFile(file)}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('X-Content-Type-Options','nosniff');res.end(req.method==='HEAD'?undefined:body)}catch{res.writeHead(400);res.end('Bad request')}
}).listen(3000,'127.0.0.1',()=>console.log('Portfolio preview: http://127.0.0.1:3000'));
