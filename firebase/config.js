import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlIfVZL8LpGjbqO90zL9enjL6Eg-FE7Rg",
  authDomain: "mobile-app-16469.firebaseapp.com",
  projectId: "mobile-app-16469",
  storageBucket: "mobile-app-16469.appspot.com",
  messagingSenderId: "375300952718",
  appId: "1:375300952718:web:089bfcd8a07b32b4a1efdf",
  measurementId: "G-8QR1608PQF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// import * as firebase from "firebase/app";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDlIfVZL8LpGjbqO90zL9enjL6Eg-FE7Rg",
//   authDomain: "mobile-app-16469.firebaseapp.com",
//   projectId: "mobile-app-16469",
//   storageBucket: "mobile-app-16469.appspot.com",
//   messagingSenderId: "375300952718",
//   appId: "1:375300952718:web:089bfcd8a07b32b4a1efdf",
//   measurementId: "G-8QR1608PQF",
// };

// firebase.initializeApp(firebaseConfig);
// export default firebase;
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyDlIfVZL8LpGjbqO90zL9enjL6Eg-FE7Rg",
//   authDomain: "mobile-app-16469.firebaseapp.com",
//   projectId: "mobile-app-16469",
//   storageBucket: "mobile-app-16469.appspot.com",
//   messagingSenderId: "375300952718",
//   appId: "1:375300952718:web:089bfcd8a07b32b4a1efdf",
//   measurementId: "G-8QR1608PQF",
// };

// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
