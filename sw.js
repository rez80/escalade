// sw.js — permet à l'app de fonctionner sans connexion.
// La version est mise à jour automatiquement par generer_app.py.
const VERSION = "20261029-170951";
const FICHIERS = ["./", "./index.html", "./data.js"];

// Installation : on garde une copie des fichiers sur le téléphone
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)));
  self.skipWaiting();
});

// Nouvelle version : on supprime les anciennes copies
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(cles =>
    Promise.all(cles.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});

// Chaque demande : copie locale d'abord, internet sinon
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
