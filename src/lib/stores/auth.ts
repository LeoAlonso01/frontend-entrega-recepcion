import { writable } from 'svelte/store'; // Importa la función writable
//import { browser } from '$app/env'; // Importa la variable browser de SvelteKit

const browser = typeof window !== 'undefined'; // Para evitar errores en SSR

// Interfaz de usuario
interface User {
  username: string;
  email: string;
  role: string;
}

// Estado de autenticación
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

//  Estado inicial del store
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

// Store de autenticación
export const authStore = writable<AuthState>(initialState);

// Versión adaptada de tus funciones
export const authService = {
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      return Date.now() > expirationTime;
    } catch (err) {
      return true;
    }
  },

  notifyTokenExpiry(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const timeLeft = expirationTime - Date.now();

      if (timeLeft > 0 && timeLeft < 5 * 60 * 1000) {
        authStore.update(state => ({
          ...state,
          error: "Tu sesión está a punto de expirar. Por favor, inicia sesión nuevamente."
        }));
      }
    } catch (err) {
      console.error("Error al decodificar el token:", err);
    }
  },

  checkAuth(): void {
    if (!browser) return;

    const token = localStorage.getItem('token');
    
    if (!token || this.isTokenExpired(token)) {
      this.logout("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      //alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      authStore.set({
        user: {
          username: payload.sub,
          email: payload.email,
          role: payload.role
        },
        isAuthenticated: true,
        loading: false,
        error: null
      });

      this.notifyTokenExpiry(token);
    } catch (err) {
      this.logout("Error al validar la sesión. Por favor, inicia sesión nuevamente.");
      console.error("Error al decodificar el token:", err);
      //alert("Error al validar la sesión. Por favor, inicia sesión nuevamente.");
    }
  },

  logout(message?: string): void {
    if (!browser) return;
    
    localStorage.removeItem("token");
    authStore.set({
      ...initialState,
      loading: false,
      error: message || null
    });
    
    if (message) {
      alert(message);
    }
    
    window.location.href = "/login";
  }
};