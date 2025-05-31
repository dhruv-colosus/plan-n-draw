import express from 'express';
import passport from '../auth/passport-config';
import { User } from "@prisma/client";
import { generateToken, setTokenCookie, clearTokenCookie } from '../utils/jwt';

const router = express.Router();
// const prisma = new PrismaClient();

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: process.env.CLIENT_URL + '/login?error=auth_failed',
    session: false
  }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect(process.env.CLIENT_URL + '/login?error=auth_failed');
      }

      const user = req.user as User;
      
      // Generate JWT token
      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      // Set token as HTTP-only cookie
      setTokenCookie(res, token);

      // Redirect to frontend callback
      res.redirect(process.env.CLIENT_URL + '/auth/callback');
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect(process.env.CLIENT_URL + '/login?error=auth_failed');
    }
  }
);

// // Get current user
// router.get('/me', async (req, res) => {
//   try {
//     const token = req.cookies['auth-token'];
    
//     if (!token) {
//       return res.status(401).json({ error: 'Not authenticated' });
//     }

//     const { verifyToken } = await import('../utils/jwt');
//     const decoded = verifyToken(token);
    
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.userId },
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         avatar: true,
//         googleId: true,
//         createdAt: true,
//       },
//     });

//     if (!user) {
//       clearTokenCookie(res);
//       return res.status(401).json({ error: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Get user error:', error);
//     clearTokenCookie(res);
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });

// Logout
router.post('/logout', (req, res) => {
  clearTokenCookie(res);
  res.json({ message: 'Logged out successfully' });
});

export default router; 