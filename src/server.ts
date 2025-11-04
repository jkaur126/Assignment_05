/**
 * Server entry point – loads environment variables securely.
 */
import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV})`);
});