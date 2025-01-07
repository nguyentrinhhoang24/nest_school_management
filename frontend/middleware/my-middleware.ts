import { useUserStore } from "@/stores/userStore";
export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    if (!userStore.token) {
      return navigateTo('/login');
    }
    // const requiredRole = to.meta.role;
    // if (requiredRole && !userStore.role.includes(requiredRole)) {
    //   return navigateTo('/unauthorized');
    // }
  });