
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: null as string | null,
    token: null as string | null,
  }),
  actions: {
    login(email: string, token: string) {
      this.email = email;
      this.token = token;
    },
    logout() {
      this.email = null;
      this.token = null;
    },
  },
});
