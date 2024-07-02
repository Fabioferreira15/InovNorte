import { defineStore } from "pinia";
import { useCoursesStore } from "./coursesStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    userProfile: null,
    isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
    usernameError: null,
    passwordError: null,
    isLoading: false,
    coursesInProgress: [],
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

          const user = {
            id: data.user.id,
            username: data.user.username,
          };


          this.user = user;
          this.isLoggedIn = true;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", true);
          this.usernameError = null;
          this.passwordError = null;

          const coursesStore = useCoursesStore();
          await coursesStore.fetchBestForUser(data.user.id);
          await coursesStore.fetchInterestsCourses(data.user.id);
        } else {
          this.isLoggedIn = false;
          if (data.type === "username") {
            this.usernameError = data.message;
          } else {
            this.passwordError = data.message;
          }
        }
      } catch (error) {
        this.isLoggedIn = false;
        throw new Error(error.message);
      }
    },

    async fetchUserById(userId) {
      this.isLoading = true;
      try {
        const response = await fetch(`/users/${userId}`);

        if (!response.ok) {
          throw new Error("Utilizador não encontrado");
        }

        const data = await response.json();

        this.userProfile = data.user;
        this.coursesInProgress = data.coursesInProgress;
        this.isLoading = false;
        
      } catch (error) {
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
