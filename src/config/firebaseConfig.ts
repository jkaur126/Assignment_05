/**
 * @fileoverview Firebase configuration using environment variables.
 * Falls back to mock mode if credentials are missing.
 */

import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

// Read Firebase credentials from environment variables
const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

let db: Firestore;
let auth: Auth;

try {
  // Check if all required environment variables are present
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error("Missing Firebase environment variables");
  }

  // Create service account object (convert escaped \n to real newlines)
  const serviceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };

  // Initialize Firebase app only once
  const app: App =
    getApps().length === 0
      ? initializeApp({ credential: cert(serviceAccount) })
      : getApps()[0];

  // Initialize Firestore and Auth
  db = getFirestore(app);
  auth = getAuth(app);

  console.log("Firebase initialized successfully from .env");
} catch (error: any) {
  console.warn(" Firebase not initialized. Running in mock mode.", error.message);
  // Provide mock objects so the app can still run without crashing
  db = {} as Firestore;
  auth = {} as Auth;
}

// Export Firestore and Auth for use in services
export { db, auth };
