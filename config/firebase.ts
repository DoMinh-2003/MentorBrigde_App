// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, GoogleAuthProvider, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBm-BrbJ5sjAKmAQ_-CI8xK96k1dcVIJmM",
  authDomain: "swd392-502ec.firebaseapp.com",
  projectId: "swd392-502ec",
  storageBucket: "swd392-502ec.appspot.com",
  messagingSenderId: "905643072609",
  appId: "1:905643072609:web:85a550a63272e4876b1e20",
  measurementId: "G-LKYKV5LJFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


// ios       81048955187-la0987ibpv8k8f4pncgdjp7kafe3150e.apps.googleusercontent.com
// android   81048955187-14b0ofc1729tipc558dk1398phed1pph.apps.googleusercontent.com
// SHA1      9A:AC:7D:05:D8:B4:19:EE:20:8D:97:32:B6:0D:8B:E0:5D:1C:5B:DD

  // "intentFilters": [
      //   {
      //     "action": "VIEW",
      //     "category": ["BROWSABLE", "DEFAULT"],
      //     "data": {
      //       "scheme": "mobile",
      //       "host": "oauth2redirect",
      //       "pathPrefix": "/google"
      //     }
      //   }
      // ]