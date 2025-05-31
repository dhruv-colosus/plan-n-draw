import { useQuery } from '@tanstack/vue-query';
import { trpc } from '../lib/trpc';
import { ref, watch, computed, type Ref } from 'vue';

// Simple hook for greeting
export function useHelloGreeting() {
  return useQuery({
    queryKey: ['hello', 'getGreeting'],
    queryFn: () => trpc.hello.getGreeting.query(),
  });
}

// Simple hook for hello with name
export function useHello(name?: Ref<string> | string) {
  const nameRef = ref(typeof name === 'string' ? name : name?.value || '');
  
  if (typeof name !== 'string' && name) {
    watch(name, (newName) => {
      nameRef.value = newName || '';
      console.log('nameRef.value', nameRef.value);
    });
  }
  
  return useQuery({
    queryKey: computed(() => ['hello', 'hello', nameRef.value]),
    queryFn: () => trpc.hello.hello.query({ name: nameRef.value }),
    enabled: computed(() => nameRef.value.length > 0), // Only run query when name is not empty
  });
} 