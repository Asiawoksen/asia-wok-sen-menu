importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAIiExRBbJS9_J6e1g4EfHx47BKx-JdiY4",
  authDomain: "asia-wok-sen.firebaseapp.com",
  databaseURL: "https://asia-wok-sen-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "asia-wok-sen",
  storageBucket: "asia-wok-sen.firebasestorage.app",
  messagingSenderId: "124295310032",
  appId: "1:124295310032:web:65ddb30ff8a93d2aaaccd5"
});

const messaging = firebase.messaging();

// Hiển thị thông báo khi app đang chạy nền
messaging.onBackgroundMessage(function(payload) {
  const data = payload.data || {};
  self.registration.showNotification(data.title || '🍳 Neue Bestellung!', {
    body: data.body || 'Eine neue Bestellung ist eingegangen!',
    icon: '/asia-wok-sen-menu/icon.png',
    badge: '/asia-wok-sen-menu/icon.png',
    tag: 'new-order-' + Date.now(),
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200],
    actions: [
      { action: 'open', title: '🍳 Küche öffnen' }
    ]
  });
});

// Khi bấm vào thông báo
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://asiawoksen.github.io/asia-wok-sen-menu/kueche.html')
  );
});
