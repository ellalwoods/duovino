// Network-first service worker: works offline, always picks up new versions when online.
const CACHE = 'duovino-v29';
const ASSETS = ['./', 'index.html', 'styles.css', 'data.js', 'syllabus.js', 'champagne.js', 'wines.js', 'grapes.js', 'grapes-core.js', 'grapes-med.js', 'grapes-aromatic.js', 'grapes-reds.js', 'grapes-beaten.js', 'regions-1.js', 'regions-2.js', 'regions-3.js', 'regions-4.js', 'regions-5.js', 'labels.js', 'scenes.js', 'cloud-config.js', 'app.js', 'icon.svg', 'manifest.webmanifest'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request)));
});
