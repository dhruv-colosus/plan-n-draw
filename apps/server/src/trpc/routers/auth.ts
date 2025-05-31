import { router, publicProcedure } from '../index';
import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { clearTokenCookie } from '../../utils/jwt';

const prisma = new PrismaClient();

export const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    try {
      const { req, res } = ctx;
      const token = req.cookies['auth-token'];
      
      if (!token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        });
      }

      const { verifyToken } = await import('../../utils/jwt');
      const decoded = verifyToken(token);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          googleId: true,
          createdAt: true,
        },
      });

      if (!user) {
        clearTokenCookie(res);
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not found',
        });
      }

      return user;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid token',
      });
    }
  }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    const { res } = ctx;
    clearTokenCookie(res);
    return { message: 'Logged out successfully' };
  }),

  checkAuth: publicProcedure.query(async ({ ctx }) => {
    try {
      const { req } = ctx;
      const token = req.cookies['auth-token'];
      
      if (!token) {
        return { isAuthenticated: false };
      }

      const { verifyToken } = await import('../../utils/jwt');
      const decoded = verifyToken(token);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true },
      });

      return { isAuthenticated: !!user };
    } catch {
      return { isAuthenticated: false };
    }
  }),
}); 