import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LandingView from "../views/LandingPageView.vue";
import ProfileView from "../views/ProfileView.vue";
import FavouritesView from "../views/FavouritesView.vue";
import EditProfileView from "../views/EditProfileView.vue";
import CourseCatalogView from "../views/CourseCatalogView.vue";
import SettingsView from "../views/SettingsView.vue";
import LandingScrollView from "@/views/LandingScrollView.vue";
import SearchResultView from "@/views/SearchResultView.vue";
import Course from "@/views/CourseView.vue";
import Login from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/landing-scroll",
      name: "landing-scroll",
      component: LandingScrollView,
    },
    {
      path: "/home-catalog",
      name: "homeCatalog",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/favourites",
      name: "favourites",
      component: FavouritesView,
    },
    {
      path: "/edit-profile",
      name: "edit-profile",
      component: EditProfileView,
    },
    {
      path: "/course-catalog",
      name: "course-catalog",
      component: CourseCatalogView,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
    {
      path: "/search-result",
      name: "search-result",
      component: SearchResultView,
    },
    {
      path: "/course/:name/:id",
      name: "course",
      component: Course,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ["/login", "/"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authStore.isLoggedIn) {
    localStorage.setItem("redirect", to.fullPath);
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
