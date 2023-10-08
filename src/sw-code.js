// Import the Workbox library at the top of your service worker
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js')

// Enable the Analytics module
workbox.googleAnalytics.initialize()