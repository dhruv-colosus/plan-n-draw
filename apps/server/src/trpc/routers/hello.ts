import { z } from 'zod';
import { router, publicProcedure } from '../index';

export const helloRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        message: `Hello ${input.name || 'World'}!`,
        timestamp: new Date().toISOString(),
      };
    }),
  
  getGreeting: publicProcedure
    .query(() => {
      return {
        message: 'Hello from tRPC bruh!',
        timestamp: new Date().toISOString(),
      };
    }),
}); 