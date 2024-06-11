<template>
  <nav>
    <v-app-bar flat color="rgba(251, 251, 254, 0.06)" class="navbar" dense>
      <v-app-bar-title>
        <v-img :src="Logo" max-width="45"></v-img>
      </v-app-bar-title>
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
import Logo from "@/assets/Images/Logo.svg";
export default {
  data() {
    return {
      Logo,
      overlay: false,
    };
  },
};
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(15.899999618530273px);
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
