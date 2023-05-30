import { createPinia, defineStore } from 'pinia';

const pinia = createPinia();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    bearerToken: null,
  }),
  actions: {
    setBearerToken(token) {
      this.bearerToken = token;
    },
  },
});

export default pinia;
