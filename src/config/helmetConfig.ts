/**
 * @fileoverview Advanced Helmet configuration for secure API setup.
 */

import helmet from "helmet";
import { RequestHandler } from "express";

/**
 * Returns a configured Helmet middleware depending on environment.
 * @returns {RequestHandler} Helmet middleware.
 */
export const getHelmetConfig = (): RequestHandler => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const baseConfig = {
    hidePoweredBy: true, 
    noSniff: true, 
    frameguard: { action: "deny" }, 
    referrerPolicy: { policy: "no-referrer" }, 
  };

  if (isDevelopment) {
    // Relaxed settings for dev
    return helmet({
      ...baseConfig,
      contentSecurityPolicy: false,
      hsts: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    } as any);
  }

  // Strict production settings
  return helmet({
    ...baseConfig,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "object-src": ["'none'"],
        "script-src": ["'self'"],
        "connect-src": ["'self'"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    crossOriginResourcePolicy: { policy: "same-origin" },
  } as any);
};
