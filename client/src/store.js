import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    bearerToken: null,
    username: null, // Add the username property
  }),
  actions: {
    setBearerToken(token) {
      this.bearerToken = token;
    },
    setUsername(username) {
      // Add the setUsername action
      this.username = username;
    },
  },
});

export default pinia;
