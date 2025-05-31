import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/src/trpc/routers';

// Create tRPC client
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_TRPC_URL,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include', // Include cookies for authentication
        });
      },
      // Add headers if needed
      // headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    }),
  ],
});

export type { AppRouter }; 