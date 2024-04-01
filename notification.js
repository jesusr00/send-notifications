const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://enjoty-93731-default-rtdb.firebaseio.com"
});

// Function to send FCM notification
async function sendFCMNotification(token) {
  try {
    // Payload for the FCM notification
    const payload = {
      // notification: {
      //   title: 'Test Notification',
      //   body: 'This is a test notification sent from Node.js', 
      //   image: "https://api-test.enjoty.net/media/restaurantes/barcelona/me-lo-invento-2/product_review_image/un-plato-rico-carrer-de-muntaner-33/a1d7d48ca44befba7af125980eda3689.jpg"
      // }, 
      data: {
        title: 'Test Notification',
        body: 'This is a test notification sent from Node.js with a very long message, and more text, and more text, and more text, and more text, and more text, and more text', 
        // image: "https://api-test.enjoty.net/media/restaurantes/barcelona/me-lo-invento-2/product_review_image/un-plato-rico-carrer-de-muntaner-33/a1d7d48ca44befba7af125980eda3689.jpg",
        type: 'PRIZE', 
        url: 'http://localhost:3000/es/comunidad/foodie/inicio'
      }
    };

    const response = await admin.messaging().sendToDevice(token, payload);

    console.log('FCM notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending FCM notification:', error);
  }
}

/// Token generated on FE
const deviceToken = 'f4DHmcZzNzO1Qfg28Yfqzs:APA91bEDKO_NeEQvNor4ydvWpOsQC6AeESOhj9pXidVknbE6dW22vqW1ceeWX_ANJfCmTMBXywyogHhAtsj1XQ3sIyNpUGXf_o-ndJZJXFie2JgZl4GP5FyYSzsCjHsP7AAiJodX7EuO';

/// length: number of notifications
Array.from({ length: 10 }).forEach(() => setTimeout(() => {
    console.log('Sending FCM notification...');
    sendFCMNotification(deviceToken);
}, 5))
