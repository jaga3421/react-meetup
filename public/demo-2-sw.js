// Service Worker for demo-2 offline-first app
const CACHE_NAME = "demo-2-notes-v1";
const API_CACHE_NAME = "demo-2-api-v1";

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/demo-2",
        // Add other static assets if needed
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return (
              name.startsWith("demo-2-") && name !== CACHE_NAME && name !== API_CACHE_NAME
            );
          })
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement cache strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith("/demo-2/api/")) {
    event.respondWith(networkFirstStrategy(request));
  } else {
    // Handle other requests with cache-first strategy
    event.respondWith(cacheFirstStrategy(request));
  }
});

// Network-first strategy for API requests
async function networkFirstStrategy(request) {
  const cache = await caches.open(API_CACHE_NAME);
  
  try {
    // Try network first
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cache, return error response
    return new Response(
      JSON.stringify({ error: "Network error and no cache available" }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response("Offline - resource not cached", {
      status: 503,
    });
  }
}

