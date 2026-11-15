import { getAI, GoogleAIBackend, getGenerativeModel } from 'firebase/ai';
import { initializeApp } from 'firebase/app';

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

export const model = getGenerativeModel(ai, { model: 'gemini-3.1-flash-lite' });
