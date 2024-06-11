<template>
  <nav>
    <v-app-bar flat color="rgba(251, 251, 254, 0.06)" class="navbar" dense>
      <v-app-bar-title>
        <v-img :src="Logo" max-width="45"></v-img>
      </v-app-bar-title>

      <SearchBar />

      <v-spacer></v-spacer>

      <v-btn icon @click="overlay = !overlay">
        <v-icon icon="fa-solid fa-bars"></v-icon>
      </v-btn>
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
    return {
      Logo,
      overlay,
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
</style>
