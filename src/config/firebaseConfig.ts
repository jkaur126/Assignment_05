
/**
 * Firebase Admin SDK configuration.
 * Initializes Firestore connection.
 */

import admin from "firebase-admin";
import path from "path";

// Path to service account JSON (keep ignored in .gitignore)
const serviceAccountPath = path.join(__dirname, "../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath)
});

/** Firestore database instance */
export const db = admin.firestore();
