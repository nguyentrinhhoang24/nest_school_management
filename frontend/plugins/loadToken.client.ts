import { useUserStore } from '@/stores/userStore';

export default defineNuxtPlugin(() => {
  const userStore = useUserStore();
  userStore.loadToken(); // Khôi phục token từ localStorage
});
