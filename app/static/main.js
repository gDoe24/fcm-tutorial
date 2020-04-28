
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDGWA59LE7GEoohGxvGw-Pf0OoZhVkAIj8",
    authDomain: "budgetb-15f90.firebaseapp.com",
    databaseURL: "https://budgetb-15f90.firebaseio.com",
    projectId: "budgetb-15f90",
    storageBucket: "budgetb-15f90.appspot.com",
    messagingSenderId: "609365785645",
    appId: "1:609365785645:web:9e905a3a4cd69791284ca4",
    measurementId: "G-N89XW6CSMC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const messaging = firebase.messaging();
  messaging.usePublicVapidKey("BC5Kp92_WM6FNpd5SFEgK0lb24AiRlFIN6hMB-QCMliA-m1DkyLLqhIVmkk17SFSTwhMhS0p55uQnXPpuEjOhWs");
  
  messaging.requestPermission();
  messaging.getToken().then((currentToken) => {
  if (currentToken) {
    sendTokenToServer(currentToken);
    updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    updateUIForPushPermissionRequired();
    setTokenSentToServer(false);
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  showToken('Error retrieving Instance ID token. ', err);
  setTokenSentToServer(false);
});

messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    setTokenSentToServer(false);
    // Send Instance ID token to app server.
    sendTokenToServer(refreshedToken);
    // ...
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});