export const useApi = () => {
    const fetchData = async (url, options = {}) => {
      const baseURL = useRuntimeConfig().public.apiBase;
      const res = await fetch(`${baseURL}${url}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
  
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra');
      }
      return await res.json();
    };
  
    return { fetchData };
  };
  