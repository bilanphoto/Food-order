// Firebase Cloud Messaging Service Worker
// วางไฟล์นี้ที่ root ของ GitHub Pages: /Food-order/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB99OE3ts0yE0y6qqAAO6UJxBI6_Envtaw",
  authDomain: "food-order-2746e.firebaseapp.com",
  projectId: "food-order-2746e",
  storageBucket: "food-order-2746e.firebasestorage.app",
  messagingSenderId: "428851873208",
  appId: "1:428851873208:web:1a50a03e6edecc6ef5bb4d"
});

const messaging = firebase.messaging();

// รับ background notification
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '🍱 - กิน อะไร ดี -', {
    body: body || '',
    icon: icon || 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14/assets/72x72/1f371.png',
    badge: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14/assets/72x72/1f371.png',
    tag: payload.data && payload.data.tag || 'food-order',
    requireInteraction: true,
    data: payload.data || {}
  });
});

// คลิก notification → เปิดแอพ
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const appUrl = 'https://bilanphoto.github.io/Food-order/';
      for (const c of list) {
        if (c.url.includes('Food-order') && 'focus' in c) return c.focus();
      }
      return clients.openWindow(appUrl);
    })
  );
});
