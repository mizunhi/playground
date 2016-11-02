var CACHE_NAME = 'gimb-cache-v3';
var assetBaseUrl = 'http://localhost:8001';
var urlsToCache = [
  assetBaseUrl+'/assets/content-tools.min.js',
  assetBaseUrl+'/assets/content-tools.min.css'
];

parent.window.addEventListener('install', function(event) {
  // Perform install steps
  console.log('install sw');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

parent.window.addEventListener('fetch', function(event) {
  console.log('fetch event fired');
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      console.log('rispondo con '+((typeof cachedResponse != 'undefined')?'cache':'nocache'));
      console.log(caches);
      console.log(event);
      return cachedResponse || fetch(event.request);
    })
  );
});

