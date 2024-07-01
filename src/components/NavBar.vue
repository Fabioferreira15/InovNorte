<template>
  <v-app-bar flat color="rgba(251, 251, 254, 0.06)" class="navbar" dense>
    <v-app-bar-title>
      <router-link to="/">
        <v-img :src="Logo" max-width="45"></v-img>
      </router-link>
    </v-app-bar-title>

    <SearchBar v-if="!isMobile" />

    <v-spacer></v-spacer>

    <div class="navigation-btns">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon size="large" color="white">
              <svg class="icon" width="24" height="24">
                <use xlink:href="../assets/coolicons-sprite.svg#User_02"></use>
              </svg>
            </v-icon>
          </v-btn>
        </template>
        <v-list class="user__list">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
            @click="item.title === 'Logout' ? logout() : null"
          >
            <template v-slot:prepend>
              <v-icon color="primary">
                <svg class="icon" width="24" height="24">
                  <use :href="`${sprite}#${item.icon}`"></use>
                </svg>
              </v-icon>
            </template>
            <v-list-item-title class="user__list-title">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon>
        <v-icon size="large" color="white">
          <svg class="icon" width="24" height="24">
            <use
              xlink:href="../assets/coolicons-sprite.svg#Bell_Notification"
            ></use>
          </svg>
        </v-icon>
      </v-btn>

      <v-btn v-if="isMobile" icon @click="toggleSearchBar" class="search-btn">
        <v-icon size="large" color="white">
          <svg class="icon" width="24" height="24">
            <use
              xlink:href="../assets/coolicons-sprite.svg#Search_Magnifying_Glass"
            ></use>
          </svg>
        </v-icon>
      </v-btn>

      <v-btn icon @click="overlay = !overlay">
        <v-icon size="large" color="white">
          <svg class="icon" width="24" height="24">
            <use xlink:href="../assets/coolicons-sprite.svg#Hamburger_LG"></use>
          </svg>
        </v-icon>
      </v-btn>
    </div>
  </v-app-bar>

  <v-dialog
    v-model="overlay"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card class="custom-dialog-card">
      <v-card-title class="d-flex align-end justify-end">
        <v-btn icon variant="text" @click="overlay = false">
          <v-icon size="large" color="white">
            <svg class="icon" width="24" height="24">
              <use xlink:href="../assets/coolicons-sprite.svg#Close_LG"></use>
            </svg>
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-container fluid class="menu d-flex align-center justify-center">
        <v-list
          class="d-flex align-center justify-center flex-column navigation__list"
        >
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="selectItem(item)"
            class="navigation__list-item"
          >
            <v-list-item-content>
              <v-list-item-title class="navigation__list-title">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card>
  </v-dialog>

  <transition name="fade-from-top">
    <v-main v-if="showSearchBar">
      <div v-if="isMobile && showSearchBar" class="search-container">
        <v-container class="d-flex align-center justify-center searchmobile">
          <SearchBar />
        </v-container>
      </div>
    </v-main>
  </transition>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import Logo from "@/assets/Images/Logo.svg";
import sprite from "@/assets/coolicons-sprite.svg";
import SearchBar from "@/components/SearchBar.vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

export default {
  components: {
    SearchBar,
  },

  setup() {
    const overlay = ref(false);
    const authStore = useAuthStore();
    const router = useRouter();
    const isMobile = ref(false);
    const showSearchBar = ref(false);

    const checkIsMobile = () => {
      isMobile.value = window.matchMedia("(max-width: 768px)").matches;
    };

    const toggleSearchBar = () => {
      showSearchBar.value = !showSearchBar.value;
    };

    onMounted(() => {
      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);
      console.log(isMobile.value);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkIsMobile);
    });
    const items = [
      { title: "Perfil", icon: "User_02" },
      { title: "Definições", icon: "Settings" },
      { title: "Favoritos", icon: "Heart_01" },
      { title: "Logout", icon: "Log_Out" },
    ];

    const menuItems = [
      { title: "Catálogo de Cursos" },
      { title: "HelpDesk Virtual" },
      { title: "Comunidades Práticas" },
    ];

    const logout = () => {
      authStore.logout();
      alert("Logout realizado com sucesso!");
      router.push("/");
    };

    return {
      Logo,
      overlay,
      items,
      sprite,
      logout,
      isMobile,
      showSearchBar,
      toggleSearchBar,
      menuItems,
    };
  },
};
</script>

<style scoped>
.fade-from-top-enter-active,
.fade-from-top-leave-active {
  transition: all 0.3s ease;
}

.fade-from-top-enter-from,
.fade-from-top-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.navbar {
  backdrop-filter: blur(15.899999618530273px);
}

.search-container {
  position: fixed;
  width: 100%;
}

.searchmobile {
  padding: 1rem;
  background: var(--color-background-dark);
}

.search-btn {
  z-index: 1000;
}

.navigation-menu {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.menu {
  height: 100%;
}

.navigation-btns {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user__list {
  width: 20rem;
  font-size: 1.6rem;
}

.user__list-title {
  font-family: var(--font-text);
  font-size: 1.6rem;
  font-weight: 200;
}

.navigation__list {
  width: 100%;
  font-size: 1.6rem;
  background-color: transparent;
  color: var(--color-text-light);
}
.navigation__list-title {
  font-family: var(--font-title);
  font-size: 4rem;
  font-weight: 700;
  padding: 2rem;
}
.navigation__list-item {
  transition: all 0.4s;
}
.navigation__list-item:hover,
.navigation__list-item:active {
  background-position: 100%;
  transform: translateX(1rem) scale(1.1);
}
.v-dialog {
  background-color: var(--color-background-dark);
}

.custom-dialog-card {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background-home.svg");
  background-size: cover;
}

@media (max-width: 768px) {
  .navigation__list-title {
    font-size: 2rem;
  }
  .navigation__list-item {
    padding: 1rem;
  }
}
</style>
