const CACHE = 'pet-finds-shell-v1';
const ROOT = self.registration.scope;
const ASSETS = [
  "products/0be419cc81a65dee.jpg",
  "products/1df9fe0131b32932.jpg",
  "products/23c78ab1b1d734b2.jpg",
  "products/2c86edf2f427a552.jpg",
  "products/2da44f445065a270.jpg",
  "products/3ba5fb9297183a2a.jpg",
  "products/6683f19d804f0dc5.jpg",
  "products/6c91baf58c2b035a.jpg",
  "products/73c56993faf62025.jpg",
  "products/8604ff0a16f2a5c3.jpg",
  "products/92cb9bb1a941dde4.jpg",
  "products/a06fd7b2eda92e6d.jpg",
  "products/b3426ecef324a64a.jpg",
  "products/bb47d73460391272.jpg",
  "products/c5b504e46b7f0e01.jpg",
  "products/c9186902e85b32fd.jpg",
  "products/cc04ead3a583c77a.jpg",
  "products/ee13b010927df188.jpg",
  "products/f02694fa70df26d8.jpg",
  "products/f54406754c29efcc.jpg",
  "shots/KMpgu4k5mUE-1829.jpg",
  "shots/KMpgu4k5mUE-1949.jpg",
  "shots/KMpgu4k5mUE-212.jpg",
  "shots/KMpgu4k5mUE-2260.jpg",
  "shots/KMpgu4k5mUE-2604.jpg",
  "shots/KMpgu4k5mUE-300.jpg",
  "shots/KMpgu4k5mUE-365-c0.jpg",
  "shots/KMpgu4k5mUE-365-c1.jpg",
  "shots/KMpgu4k5mUE-365-c2.jpg",
  "shots/KMpgu4k5mUE-365-c3.jpg",
  "shots/KMpgu4k5mUE-365-c4.jpg",
  "shots/OgJSAOyx1UA-1003.jpg",
  "shots/OgJSAOyx1UA-1039.jpg",
  "shots/OgJSAOyx1UA-1295.jpg",
  "shots/OgJSAOyx1UA-1756.jpg",
  "shots/OgJSAOyx1UA-1982.jpg",
  "shots/OgJSAOyx1UA-2119.jpg",
  "shots/OgJSAOyx1UA-2195.jpg",
  "shots/OgJSAOyx1UA-938.jpg",
  "shots/Rrm0c0Ds7wg-1025.jpg",
  "shots/Rrm0c0Ds7wg-1071.jpg",
  "shots/Rrm0c0Ds7wg-616.jpg",
  "shots/Rrm0c0Ds7wg-621.jpg",
  "shots/Rrm0c0Ds7wg-951.jpg",
  "shots/TrKwoRW5x48-181.jpg",
  "shots/TrKwoRW5x48-208.jpg",
  "shots/TrKwoRW5x48-287.jpg",
  "shots/TrKwoRW5x48-671.jpg",
  "shots/TrKwoRW5x48-717.jpg",
  "shots/TrKwoRW5x48-812.jpg",
  "shots/TrKwoRW5x48-852.jpg",
  "shots/VVkS3UDzpaY-824.jpg",
  "shots/hp6pc0UhXis-1008.jpg",
  "shots/hp6pc0UhXis-1382.jpg",
  "shots/hp6pc0UhXis-252-wrap.jpg",
  "shots/i2fF0flkufw-175.jpg",
  "shots/i2fF0flkufw-242.jpg",
  "shots/i2fF0flkufw-510.jpg",
  "shots/i2fF0flkufw-712.jpg",
  "shots/iLrgqIAl3DQ-1190-c0.jpg",
  "shots/iLrgqIAl3DQ-1190-c1.jpg",
  "shots/iLrgqIAl3DQ-1190-c2.jpg",
  "shots/iLrgqIAl3DQ-1190-c3.jpg",
  "shots/iLrgqIAl3DQ-1190-c4.jpg",
  "shots/iLrgqIAl3DQ-777.jpg",
  "shots/iLrgqIAl3DQ-805.jpg",
  "shots/yZLXNvsE58M-1013.jpg",
  "shots/yZLXNvsE58M-104.jpg",
  "shots/yZLXNvsE58M-1538.jpg",
  "shots/yZLXNvsE58M-1722.jpg",
  "shots/yZLXNvsE58M-550.jpg",
  "shots/ydl6TtIvbAc-362.jpg",
  "shots/zYyZ_VDmfiU-105.jpg",
  "shots/zYyZ_VDmfiU-151.jpg",
  "shots/zYyZ_VDmfiU-185.jpg",
  "shots/zYyZ_VDmfiU-65.jpg",
  "shots/zYyZ_VDmfiU-741.jpg",
  "shots/zYyZ_VDmfiU-781.jpg"
];
const EDITS = new URL('edits.json', ROOT).href;
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([ROOT, EDITS, ...ASSETS.map(path => new URL(path, ROOT).href)])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('pet-finds-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(fetch(request).then(async response => {
    if (response.ok) await caches.open(CACHE).then(cache => cache.put(request, response.clone()));
    return response;
  }).catch(async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(url.pathname.endsWith('/edits.json') ? EDITS : request);
    if (cached) return cached;
    if (request.mode === 'navigate') return cache.match(ROOT);
    return new Response('Offline copy is not available yet.', {status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }));
});
