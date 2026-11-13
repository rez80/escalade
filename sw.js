// sw.js — permet à l'app de fonctionner sans connexion.
// La version est mise à jour automatiquement par generer_app.py.
const VERSION = "20261113-105632";
const FICHIERS = ["./", "./index.html", "./style.css", "./app.js", "./data.js", "./icone-180.png", "./aide.html"];

// Installation : copie des fichiers sur le téléphone.
// La nouvelle version attend que tu touches le bandeau « Mettre à jour ».
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)));
});
self.addEventListener("message", e => { if (e.data === "mettre-a-jour") self.skipWaiting(); });

// Nouvelle version active : suppression des anciennes copies
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(cles =>
    Promise.all(cles.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});

// Chaque demande : copie locale d'abord, internet sinon
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
