const V='almox-v5',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
const EXT=['https://www.gstatic.com/firebasejs/','https://fonts.googleapis.com/','https://fonts.gstatic.com/'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=r.url,same=new URL(u).origin===location.origin;if(!same&&!EXT.some(p=>u.startsWith(p)))return;
 e.respondWith(fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x}).catch(()=>caches.match(r,{ignoreSearch:same}).then(x=>x||(r.mode==='navigate'?caches.match('index.html'):Response.error()))))});
