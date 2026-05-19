import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtqiRnwC4q6ujXLrHpzzBcofCAs9qeUBY",
  authDomain: "gym-project-7eb9b.firebaseapp.com",
  projectId: "gym-project-7eb9b",
  storageBucket: "gym-project-7eb9b.firebasestorage.app",
  messagingSenderId: "918238493396",
  appId: "1:918238493396:web:817b67e48484110f7d9941",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default auth;
