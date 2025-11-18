// src/services/authService.js
import api from "./api";
import {jwtDecode} from "jwt-decode";

const AUTH_KEY = "rt_token";

// ========== LOGIN ==========
export async function loginAdmin({ email, password }) {
  const res = await api.post("/admin/login", { email, password });
  const { token, admin } = res.data;

  if (!token) {
    throw new Error("Missing token from login response");
  }

  localStorage.setItem(AUTH_KEY, token);
  return { token, admin };
}

// ========== LOGOUT ==========
export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY);
}

// ========== GET TOKEN ==========
export function getAuthToken() {
  return localStorage.getItem(AUTH_KEY);
}

// ========== TOKEN EXPIRY CHECK ==========
function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return false;
    return Date.now() >= exp * 1000; // exp is in seconds
  } catch (err) {
    return true; // if decode fails, treat as expired
  }
}

// ========== GET ADMIN INFO ==========
export function getAdminInfo() {
  const token = getAuthToken();
  if (!token || isTokenExpired(token)) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

// ========== AUTH CHECK ==========
export function isAuthenticated() {
  const token = getAuthToken();
  if (!token) return false;

  if (isTokenExpired(token)) {
    logoutAdmin();
    return false;
  }
  return true;
}

// ========== DEFAULT EXPORT ==========
export default {
  loginAdmin,
  logoutAdmin,
  getAuthToken,
  getAdminInfo,
  isAuthenticated,
};
