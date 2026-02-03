// Listen for Push Notifications
self.addEventListener('push', function(event) {
  let data = {};
  try {
    data = event.data.json();
  } catch(e) {
    console.error("Push Event Data Error:", e);
    data = { title: "AlinGo", body: "You have a new notification!" };
  }

  const options = {
    body: data.body || "You have a new notification!",
    icon: '/assets/LOGO.jpg',      // App logo
    badge: '/assets/LOGO.jpg',     // Small badge icon
    data: {
      url: data.url || "/"         // Redirect on click
    },
    vibrate: [200, 100, 200],      // Vibrate pattern
    actions: [
      { action: 'open', title: 'Open App' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "AlinGo", options)
  );
});

// Notification Click Event
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const clickResponsePromise = clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(windowClients => {
      // Check if app window is already open
      for (let client of windowClients) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open new window/tab
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    });

  event.waitUntil(clickResponsePromise);
});
