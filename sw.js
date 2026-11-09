self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open('smart-egypt-v1').then(function(cache){
      return cache.addAll(['index.html','style.css','app.js','guard.html','city.html','edu.html','health.html','agri.html','ai.html','manifest.json']);
    })
  );
});
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(res){
      return res || fetch(e.request);
    })
  );
});