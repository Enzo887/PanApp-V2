// src/types/express.d.ts
declare global {
  namespace Express {
    interface Locals {
      body?: unknown;
      params?: unknown;
      query?: unknown;
    }
  }
}

export {};