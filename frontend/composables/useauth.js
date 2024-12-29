export function useAuth() {
    const user = useState('user', () => null); // Trạng thái người dùng
    const authToken = useCookie('authToken'); // Lưu token trong cookie
  
    // Đăng nhập
    const login = async (credentials) => {
      const { user: loggedInUser, token } = await $fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        body: credentials,
      });
      user.value = loggedInUser; // Lưu thông tin người dùng
      authToken.value = token;  // Lưu token vào cookie
    };
  
    const createuser = async (payload) => {
      const { user: registeredUser, token } = await $fetch('http://localhost:5000/auth/createuser', {
        method: 'POST',
        body: payload,
      });
      user.value = registeredUser;
      authToken.value = token;
    };
  
    // Đăng xuất
    const logout = () => {
      user.value = null;
      authToken.value = null; // Xóa token trong cookie
    };
  
    // Khởi tạo phiên người dùng từ token
    const initializeUser = async () => {
      if (!authToken.value) return; // Không có token thì không làm gì
      try {
        const { user: fetchedUser } = await $fetch('http://localhost:5000/auth/me', {
          headers: {
            Authorization: `Bearer ${authToken.value}`,
          },
        });
        user.value = fetchedUser; // Lấy thông tin người dùng từ backend
      } catch {
        logout(); // Token hết hạn hoặc không hợp lệ
      }
    };
  
    return {
      user,
      login,
      adduser,
      logout,
      initializeUser,
    };
  }
  