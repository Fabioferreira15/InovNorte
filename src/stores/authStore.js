import { defineStore } from "pinia";
import { useCoursesStore } from "./coursesStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
    isLoading: false,
    usernameError: null,
    passwordError: null,
  }),

  actions: {
    async login(username, password) {
      try {
        this.isLoading = true;
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
          this.usernameError = null;
          this.passwordError = null;

          const coursesStore = useCoursesStore();
          await coursesStore.fetchBestForUser(data.user.id);
          await coursesStore.fetchInterestsCourses(data.user.id);
        } else {
          this.isLoggedIn = false;
          this.isLoading = false;
          if (data.type === "username") {
            this.usernameError = data.message;
          } else {
            this.passwordError = data.message;
          }
        }
      } catch (error) {
        this.isLoggedIn = false;
        this.isLoading = false;
        throw new Error(error.message);
      }
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      this.user = null;
      this.isLoggedIn = false;
      this.usernameError = null;
      this.passwordError = null;
      const coursesStore = useCoursesStore();
      coursesStore.clearUserBest();
    },
  },
});
