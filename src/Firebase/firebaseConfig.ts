import firebase from "firebase"
import "firebase/auth"
import withFirebaseAuth from "react-with-firebase-auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MESUREMENT_ID,
}

let firebaseApp
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
}

export const firebaseAppAuth = firebaseApp.auth()

export const realtimeDB = firebase.database()
export const createComponentWithAuth = withFirebaseAuth({
  firebaseAppAuth,
})
