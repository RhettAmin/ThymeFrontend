import { initializeApp } from 'firebase/app'
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseApp = initializeApp({
  // application settings
  apiKey: "api_key",
  authDomain: "<code>.firebaseapp.com",
  projectId: "<code>",
  storageBucket: "<code>.appspot.com",
  messagingSenderId: "<code>",
  appId: "<code>",
  measurementId: "<code>",
})

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('<code>'),

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