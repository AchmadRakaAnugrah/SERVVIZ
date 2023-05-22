// store/auth.ts
import { defineStore } from 'pinia';


interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    isAuthenticated: false,
  }),
  actions: {
    setToken(token: string | null) {
      this.token = token;
      this.isAuthenticated = !!token;
    },
  },
});
