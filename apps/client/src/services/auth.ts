import { trpc } from '../lib/trpc';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  googleId?: string | null;
  createdAt: string;
}

class AuthService {
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  async login(): Promise<void> {
    window.location.href = `${this.baseUrl}/auth/google`;
  }

  async logout(): Promise<void> {
    try {
      await trpc.auth.logout.mutate();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await trpc.auth.me.query();
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async checkAuth(): Promise<boolean> {
    try {
      const result = await trpc.auth.checkAuth.query();
      return result.isAuthenticated;
    } catch (error) {
      console.error('Check auth error:', error);
      return false;
    }
  }
}

export const authService = new AuthService(); 