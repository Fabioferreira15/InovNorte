<template>
  <nav>
    <v-app-bar flat color="rgba(251, 251, 254, 0.06)" class="navbar" dense>
      <v-app-bar-title>
        <v-img :src="Logo" max-width="45"></v-img>
      </v-app-bar-title>

      <SearchBar />

      <v-spacer></v-spacer>

      <div class="navigation-btns">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon size="large" color="white">mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
            >
              <template v-slot:prepend>
                <v-icon color="primary">{{ item.icon }}</v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn icon>
          <v-icon size="large" color="white">mdi-bell</v-icon>
        </v-btn>

        <v-btn icon @click="overlay = !overlay">
          <v-icon size="large" color="white">mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-overlay v-model="overlay" scroll-strategy="block" class="overlay">
      <v-container
        class="navigation-menu"
        style="background-color: white; border-radius: 8px"
      >
      </v-container>
    </v-overlay>
  </nav>
</template>

<script>
import { ref } from "vue";
import Logo from "@/assets/Images/Logo.svg";

import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    SearchBar,
  },

  setup() {
    const overlay = ref(false);

    const items = [
      { title: "Perfil", icon: "mdi-account" },
      { title: "Definições", icon: "mdi-cog" },
      { title: "Favoritos", icon: "mdi-heart" },
      { title: "Logout", icon: "mdi-logout" },
    ];

    return {
      Logo,
      overlay,
      items,
    };
  },
};
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(15.899999618530273px);
}

.search-container {
  flex-grow: 1;
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  z-index: 1;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 0 0 4px 4px;
}

.search-suggestions .v-list-item {
  cursor: pointer;
}

.navigation-menu {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.overlay {
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
}

.navigation-btns {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.v-list {
  width: 20rem;
  font-size: 1.6rem;
}
.v-list-item-title {
  font-family: var(--font-text);
  font-size: 1.6rem;
  font-weight: 200;
}
</style>
