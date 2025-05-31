import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { trpc } from '../lib/trpc';
import { computed } from 'vue';

export function useAuth() {
  const queryClient = useQueryClient();

  // Query for current user
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => trpc.auth.me.query(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query for auth status
  const {
    data: authStatus,
    isLoading: isAuthLoading,
    refetch: refetchAuthStatus,
  } = useQuery({
    queryKey: ['auth', 'status'],
    queryFn: () => trpc.auth.checkAuth.query(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => trpc.auth.logout.mutate(),
    onSuccess: () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: ['auth'] });
      // Redirect to home
      window.location.href = '/';
    },
  });

  // Computed values
  const isAuthenticated = computed(() => {
    return authStatus.value?.isAuthenticated ?? false;
  });

  const isLoading = computed(() => {
    return isUserLoading.value || isAuthLoading.value;
  });

  // Methods
  const login = () => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    window.location.href = `${baseUrl}/auth/google`;
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const refreshAuth = async () => {
    await Promise.all([
      refetchUser(),
      refetchAuthStatus(),
    ]);
  };

  return {
    // Data
    user,
    isAuthenticated,
    isLoading,
    userError,
    
    // Methods
    login,
    logout,
    refreshAuth,
    
    // Mutation states
    isLoggingOut: computed(() => logoutMutation.isPending.value),
  };
} 