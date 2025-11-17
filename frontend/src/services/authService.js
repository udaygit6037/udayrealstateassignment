// src/services/authService.js
import api from './api';
import jwtDecode from 'jwt-decode';

const AUTH_KEY = 'rt_token';

export async function loginAdmin({ email, password }) {
  const res = await api.post('/auth/login', { email, password });
  const { token } = res.data;
  if (token) {
    localStorage.setItem(AUTH_KEY, token);
  }
  return token;
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_KEY);
}

export function getAdminInfo() {
  const token = getAuthToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  return !!getAuthToken();
}
