const CACHE_NAME="stronger-v1";
const FILES=["./","./index.html","./style.css","./app.js","./manifest.json","./icon.svg"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(names=>Promise.all(names.map(name=>name!==CACHE_NAME?caches.delete(name):null))));self.clients.claim()});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)))});
