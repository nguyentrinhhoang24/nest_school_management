export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return; // Bỏ qua middleware nếu đang chạy trên server-side

  const userStore = useUserStore();

  // Tải thông tin người dùng từ localStorage (chỉ chạy trên client)
  if (process.client) {
    userStore.loadToken();
  }

  // Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!userStore.token) {
    return navigateTo('/auth/login');
  }

  // Kiểm tra quyền hạn dựa trên meta
  const allowedRoles = to.meta.allowedRoles || []; // Các role được phép truy cập
  const userRoles = userStore.role; // Các role của user

  // Nếu không có quyền truy cập, chuyển hướng đến trang không có quyền
  if (allowedRoles.length > 0 && !userRoles.some((role) => allowedRoles.includes(role))) {
    return navigateTo('/unauthorized');
  }
});
