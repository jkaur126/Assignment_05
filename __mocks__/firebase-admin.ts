/**
 * @fileoverview Jest mock for firebase-admin to prevent real Firestore calls in tests.
 * Provides minimal stubs for Firestore methods used in repository/service files.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

type MockFirestore = {
  collection: jest.Mock<MockFirestore, [string?]>;
  doc: jest.Mock<MockFirestore, [string?]>;
  get: jest.Mock<Promise<{ exists: boolean; data: () => any }>, []>;
  set: jest.Mock<Promise<void>, []>;
  update: jest.Mock<Promise<void>, []>;
  delete: jest.Mock<Promise<void>, []>;
  getAll: jest.Mock<Promise<any[]>, []>;
};

const firestoreMock: MockFirestore = {
  collection: jest.fn() as any,
  doc: jest.fn() as any,
  get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
  set: jest.fn(() => Promise.resolve()),
  update: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
  getAll: jest.fn(() => Promise.resolve([]))
};

// Make the recursive mocks point back to itself
(firestoreMock.collection as any).mockReturnValue(firestoreMock);
(firestoreMock.doc as any).mockReturnValue(firestoreMock);

const adminMock = {
  initializeApp: jest.fn(),
  credential: { cert: jest.fn() },
  firestore: jest.fn(() => firestoreMock)
};

export default adminMock;
