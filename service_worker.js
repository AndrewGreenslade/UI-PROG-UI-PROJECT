var cacheName = 'AndrewG-pwa';
var filesToCache = [
  './',
  './index.html',
  './controller.html',
  './css/push.css',
  './js/script.js',
  './Img/GrassTexture.jpg',
  './Img/DeathScreen.png',
  './Img/Coin.png',
  './Img/1to6.png',
  './Img/SpriteSheet.png',
  './Img/SpriteSheetNone.png',
  './Img/SpriteSheetStick.png',
  './Img/SpriteSheetSword.png',
  './Img/WinScreen.png'
];

/* Cache contents when Offline See Cache */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline, examine Cache Storage */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});