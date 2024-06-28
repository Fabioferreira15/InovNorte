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
import Registo from "@/views/RegisterView.vue";
import { useAuthStore } from "@/stores/authStore";
import { useBreadcrumbsStore } from "@/stores/breadcrumbsStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
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
      meta: { breadcrumbName: "Home" },
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: { breadcrumbName: "Perfil" },
    },
    {
      path: "/favourites",
      name: "favourites",
      component: FavouritesView,
      meta: { breadcrumbName: "Favoritos" },
    },
    {
      path: "/edit-profile",
      name: "edit-profile",
      component: EditProfileView,
      meta: { breadcrumbName: "Editar Perfil" },
    },
    {
      path: "/course-catalog",
      name: "course-catalog",
      component: CourseCatalogView,
      meta: { breadcrumbName: "Catálogo de Cursos" },
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
      meta: { breadcrumbName: "Definições" },
    },
    {
      path: "/search-result",
      name: "search-result",
      component: SearchResultView,
      meta: { breadcrumbName: "Resultados da Pesquisa" },
    },
    {
      path: "/course/:name/:id",
      name: "course",
      component: Course,
      meta: { breadcrumbName: "Curso" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { breadcrumbName: "Login" },
    },
    {
      path: "/registo",
      name: "registo",
      component: Registo,
      meta: { breadcrumbName: "Registo" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ["/login", "/", "/registo"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authStore.isLoggedIn) {
    localStorage.setItem("redirect", to.fullPath);
    next({ name: "login" });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  const breadcrumbsStore = useBreadcrumbsStore();
  breadcrumbsStore.addBreadcrumb({
    path: to.path,
    name: to.meta.breadcrumbName,
  });
});

export default router;
