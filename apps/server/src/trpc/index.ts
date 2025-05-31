import { initTRPC } from '@trpc/server';
import type { Request, Response } from 'express';

// Create context for tRPC
export const createContext = ({ req, res }: { req: Request; res: Response }) => ({
  req,
  res,
});

export type Context = Awaited<ReturnType<typeof createContext>>;

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Export router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure; 