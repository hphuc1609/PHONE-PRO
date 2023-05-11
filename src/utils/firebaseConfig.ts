import firebase from "firebase"
import withFirebaseAuth from "react-with-firebase-auth"
import "firebase/auth"

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

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const realtimeDB = firebase.database()

const firebaseAppAuth = firebaseApp.auth()
export const createComponentWithAuth = withFirebaseAuth({
  firebaseAppAuth,
})
