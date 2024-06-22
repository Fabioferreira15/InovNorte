import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
  }),

  actions: {
    async login(username, password) {
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error("Credenciais inválidas");
        }

        const data = await response.json();

        if (data.user) {
          this.user = data.user;
          this.isLoggedIn = true;
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", true);
        } else {
          this.isLoggedIn = false;
          throw new Error(data.message);
        }
      } catch (error) {
        this.isLoggedIn = false;
        throw new Error(error.message);
      }
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      this.user = null;
      this.isLoggedIn = false;
    },
  },
});
