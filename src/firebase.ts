<<<<<<< HEAD
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
=======
import { getAI, GoogleAIBackend, getGenerativeModel } from 'firebase/ai';
import { initializeApp } from 'firebase/app';
>>>>>>> 08d7572693babf498e162ccd5af0c4aa2b56096a

<<<<<<< HEAD
const firebaseConfig = {
  apiKey: "AIzaSyCmho05whQKuzqH-9XI-13tBak-ZdiXy0Q",
  authDomain: "flame-in-freefall-rolex.firebaseapp.com",
  projectId: "flame-in-freefall-rolex",
  storageBucket: "flame-in-freefall-rolex.firebasestorage.app",
  messagingSenderId: "312916728560",
  appId: "1:312916728560:web:e6efb7eb26a0cd0a0d8035",
  measurementId: "G-VZBGQ09278"
};

const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Using a current fast Gemini model for instant aerospace Q&A
export const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });
=======
const firebaseConfig = {
  apiKey: 'AIzaSyCmho05whQKuzqH-9XI-13tBak-ZdiXy0Q',
  authDomain: 'flame-in-freefall-rolex.firebaseapp.com',
  projectId: 'flame-in-freefall-rolex',
  storageBucket: 'flame-in-freefall-rolex.firebasestorage.app',
  messagingSenderId: '312916728560',
  appId: '1:312916728560:web:e6efb7eb26a0cd0a0d8035',
};

const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: new GoogleAIBackend() });

export const model = getGenerativeModel(ai, { model: 'gemini-2.5-flash' });

>>>>>>> 08d7572693babf498e162ccd5af0c4aa2b56096a