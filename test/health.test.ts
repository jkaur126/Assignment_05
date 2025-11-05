/**
 * @fileoverview Tests the /health endpoint to confirm server availability.
 */

import request, { Response } from "supertest";
import app from "../src/app";

/**
 * Verifies that the Express app responds correctly to /health requests.
 */
describe("Health Check Endpoint", (): void => {
  it("should return 200 OK with message 'Server is healthy'", async (): Promise<void> => {
    const res: Response = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Server is healthy");
  });
});
