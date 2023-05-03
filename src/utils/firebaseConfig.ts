import firebase from "firebase"

export const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: "https://doanweb-26f13-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MESUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const realtimeDB = firebase.database()
