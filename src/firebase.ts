import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

const firebaseConfig = {
  apiKey: "AIzaSyCmho05whQKuzqH-9XI-13tBak-ZdiXy0Q",
  authDomain: "flame-in-freefall-rolex.firebaseapp.com",
  projectId: "flame-in-freefall-rolex",
  storageBucket: "flame-in-freefall-rolex.firebasestorage.app",
  messagingSenderId: "312916728560",
  appId: "1:312916728560:web:9a380eef84027cdd0d8035",
  measurementId: "G-VZT27K3W9L"
};

const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: new GoogleAIBackend() });
export const model = getGenerativeModel(ai, { model: "gemini-3.8-flash" });