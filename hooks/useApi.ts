import { useState, useCallback } from 'react';
import api from '../config/api'; 
const useApi = () => {
  const [loading, setIsLoading] = useState<boolean>(false);

  const callApi = useCallback(
    async (
      method: 'get' | 'post' | 'put' | 'delete',
      url: string,
      data?: any,
      message?: string
    ) => {
      try {
        setIsLoading(true);
        const response = await api[method](url, data);
        if (message) console.log(message);
        return response.data;
      } catch (e: any) {
        console.error(e);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },[]);

  return { loading, callApi, setIsLoading };
};

export default useApi;
