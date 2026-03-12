import { initializeApp } from 'firebase/app'
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseApp = initializeApp({
  // application settings
  apiKey: "AIzaSyDmpLPfrkRjskDp4P2fSbLvMUrHjEq9DWA",
  authDomain: "primeval-stack-408400.firebaseapp.com",
  projectId: "primeval-stack-408400",
  storageBucket: "primeval-stack-408400.appspot.com",
  messagingSenderId: "462093202517",
  appId: "1:462093202517:web:17d506ecb43e7e59a7d0dc",
  measurementId: "G-YEEV13GE43",
})

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6LfFnp8qAAAAACvDsqNKT0wQJdH4JcuizCcle6fo'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

const auth = [process.env.EXPO_PUBLIC_AUTH_USER, process.env.EXPO_PUBLIC_AUTH_PASS]

// here we can export reusable database references
const thymeStorage = getStorage(firebaseApp);
const thymeAuth = getAuth(firebaseApp);

const ThymeFirebaseConn = {
  auth, thymeStorage, thymeAuth, appCheck
}

export default ThymeFirebaseConn