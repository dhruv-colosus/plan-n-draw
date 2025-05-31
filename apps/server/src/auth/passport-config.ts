import { config } from 'dotenv';
config();

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Debug: Log available user fields
console.log('Prisma User model fields:', Object.getOwnPropertyNames(prisma.user));
console.log("User model keys:", Object.keys(prisma.user));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google profile ID:', profile.id);
        
        // Check if user already exists by googleId
        let user = await prisma.user.findFirst({
          where: { googleId: profile.id },
        });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with same email
        const emailValue = profile.emails?.[0]?.value;
        if (emailValue) {
          user = await prisma.user.findUnique({
            where: { email: emailValue },
          });

          if (user) {
            // Link Google account to existing user
            user = await prisma.user.update({
              where: { id: user.id },
              data: { googleId: profile.id },
            });
            return done(null, user);
          }
        }

        // Create new user
        user = await prisma.user.create({
          data: {
            googleId: profile.id,
            email: emailValue || '',
            name: profile.displayName || '',
            avatar: profile.photos?.[0]?.value,
          },
        });

        return done(null, user);
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error as Error);
      }
    }
  )
);

export default passport; 