import axios, { AxiosRequestConfig, Method } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/',
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async <T>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config,
    });

    return response.data as T;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'Error desconocido';
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message,
      });
      throw new Error(message);
    } else {
      console.error('Error inesperado:', error);
      throw error;
    }
  }
};
