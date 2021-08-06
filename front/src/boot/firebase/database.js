import firebase from 'firebase/app'
import 'firebase/database'

let _app, _rtdb

if (!process.env.FIREBASE_API) {
  console.error('[ERROR] Firebase api key is missing. Live feature will not work.')
} else {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: process.env.FIREBASE_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
  }

  _app = firebase.initializeApp(firebaseConfig)
  _rtdb = _app.database()
}

export const app = _app
export const rtdb = _rtdb
