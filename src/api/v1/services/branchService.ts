/**
 * Branch Service Layer
 * Provides Firestore CRUD operations for branches.
 */

import { Branch } from "../models/branchModel";
import * as repo from "../repositories/firestoreRepository";

const COLLECTION = "branches";

/**
 * Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> =>
  repo.getAll<Branch>(COLLECTION);

/**
 * Get branch by ID.
 * @param {string} id
 * @returns {Promise<Branch | null>}
 */
export const getBranchById = async (id: string): Promise<Branch | null> =>
  repo.getById<Branch>(COLLECTION, id);

/**
 * Create branch.
 * @param {Branch} data
 * @returns {Promise<Branch>}
 */
export const createBranch = async (data: Branch): Promise<Branch> =>
  repo.create<Branch>(COLLECTION, data);

/**
 * Update branch.
 * @param {string} id
 * @param {Partial<Branch>} data
 * @returns {Promise<Branch | null>}
 */
export const updateBranch = async (
  id: string,
  data: Partial<Branch>
): Promise<Branch | null> => repo.update<Branch>(COLLECTION, id, data);

/**
 * Delete branch.
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export const deleteBranch = async (id: string): Promise<boolean> =>
  repo.remove(COLLECTION, id);
