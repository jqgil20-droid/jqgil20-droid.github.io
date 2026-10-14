// Service worker mínimo: solo existe para que Android pueda mostrar las
// notificaciones del temporizador de descanso. Sin caché offline a propósito:
// así cada visita carga siempre la última versión subida a GitHub.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then(function (list) {
    if (list.length) return list[0].focus();
    return self.clients.openWindow('./');
  }));
});
