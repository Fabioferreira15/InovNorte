<template>
  <div class="notfound">
    <v-container class="d-flex align-center justify-center flex-column">
      <v-row class="d-flex align-center justify-center">
        <v-col>
          <h1>A página que procuras não foi encontrada</h1>
          <p>Nem o nosso bot conseguiu encontrar</p>
          <router-link to="/"><v-btn>Página principal</v-btn></router-link>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col>
          <v-img :src="botImage" alt="Bot" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import botImage from "@/assets/Images/bot.png";

export default {
  setup() {
    return {
      botImage,
    };
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
