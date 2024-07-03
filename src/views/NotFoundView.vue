<template>
  <div class="notfound">
    <nav class="navbar">
      <NavBar />
    </nav>

    <v-container class="d-flex align-center justify-center">
      <v-row class="d-flex align-center justify-center">
        <v-col>
          <h1>A página que procuras não foi encontrada</h1>
          <p>Nem o nosso bot conseguiu encontrar</p>
          <router-link to="/"><v-btn>Página principal</v-btn></router-link>
        </v-col>
      </v-row>
    </v-container>


  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  Components: {
    NavBar,
  },

  setup() {
    return {};
  },
};
</script>

<style scoped>
.notfound {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background-home.svg");
  background-size: cover;
  position: relative;
  min-height: 100vh;
}
</style>
