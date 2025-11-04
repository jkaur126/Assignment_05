/**
 * Generic Firestore repository with reusable CRUD operations.
 */

import { db } from "../../../config/firebaseConfig";

/**
 * Get all documents in a collection.
 * @template T
 * @param {string} collectionName Firestore collection name.
 * @returns {Promise<T[]>} All documents as typed objects.
 */
export const getAll = async <T>(collectionName: string): Promise<T[]> => {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
};

/**
 * Get a document by its ID.
 * @template T
 * @param {string} collectionName
 * @param {string} id
 * @returns {Promise<T | null>} Document or null if not found.
 */
export const getById = async <T>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  const doc = await db.collection(collectionName).doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as T) : null;
};

/**
 * Create a new document.
 * @template T
 * @param {string} collectionName
 * @param {T} data Data to insert.
 * @returns {Promise<T & { id: string }>} Created document with ID.
 */
export const create = async <T>(
  collectionName: string,
  data: T
): Promise<T & { id: string }> => {
  const docRef = await db.collection(collectionName).add(data as any);
  return { id: docRef.id, ...data };
};

/**
 * Update an existing document.
 * @template T
 * @param {string} collectionName
 * @param {string} id
 * @param {Partial<T>} data Updated fields.
 * @returns {Promise<T | null>} Updated document or null.
 */
export const update = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<T | null> => {
  const ref = db.collection(collectionName).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return null;
  await ref.update(data);
  const updated = await ref.get();
  return { id, ...updated.data() } as T;
};

/**
 * Delete a document from Firestore.
 * @param {string} collectionName
 * @param {string} id
 * @returns {Promise<boolean>} True if deleted, false otherwise.
 */
export const remove = async (
  collectionName: string,
  id: string
): Promise<boolean> => {
  const ref = db.collection(collectionName).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return false;
  await ref.delete();
  return true;
};

