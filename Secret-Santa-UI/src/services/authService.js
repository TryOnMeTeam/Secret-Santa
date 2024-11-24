
import axiosInstance from '../services/axionsInstance';

const TOKEN_KEY = 'token';
const USER_KEY = 'userId';

export const registerHandler = async (name, email, password) => {
  try {
    const response = await axiosInstance.post('api/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Registration failed';
  }
};

export const loginHandler = async (email, password) => {
  try {
    const response = await axiosInstance.post('api/auth/login', { email, password });
    const { token, userId } = response.data.data;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userId));

    return { token, userId };
  } catch (error) {
    throw error.response ? error.response.data : 'Login failed';
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};