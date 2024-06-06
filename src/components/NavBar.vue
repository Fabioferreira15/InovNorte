<template>
  <nav>
    <v-app-bar flat color="transparent" dense>
      <v-app-bar-title>
        <v-img :src="Logo" max-width="45"></v-img>
      </v-app-bar-title>
      <v-btn icon @click="overlay = !overlay">
        <v-icon icon="fa-solid fa-bars"></v-icon>
      </v-btn>
    </v-app-bar>

    <v-overlay v-model="overlay" scroll-strategy="block" class="overlay">
      <v-container
        class="pa-12 navigation-menu"
        style="background-color: white; border-radius: 8px"
      >
        <nav class="navigation__nav">
          <ul class="navigation__list">
            <li class="navigation__item">
              <a href="#" class="navigation__link"
                ><span>01</span>About Natous</a
              >
            </li>
            <li class="navigation__item">
              <a href="#" class="navigation__link"
                ><span>02</span>Your benefits</a
              >
            </li>
            <li class="navigation__item">
              <a href="#" class="navigation__link"
                ><span>03</span>Popular tours</a
              >
            </li>
            <li class="navigation__item">
              <a href="#" class="navigation__link"><span>04</span>Stories</a>
            </li>
            <li class="navigation__item">
              <a href="#" class="navigation__link"><span>05</span>Book now</a>
            </li>
          </ul>
        </nav>
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
