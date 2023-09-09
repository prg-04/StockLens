import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAY0-o47Ak1rgfuoItZoZgKFMm-99Wm_sg',
  authDomain: 'stocklens-71ede.firebaseapp.com',
  projectId: 'stocklens-71ede',
  storageBucket: 'stocklens-71ede.appspot.com',
  messagingSenderId: '974094680882',
  appId: '1:974094680882:web:7ff2cc04147f817a430d2b',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
