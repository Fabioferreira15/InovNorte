<template>
  <nav>
    <v-app-bar flat color="transparent" dense>
      <v-app-bar-title> <v-img :src="Logo" max-width="45"></v-img> </v-app-bar-title>
      <v-btn variant="plain" color="white" class="btn">Login</v-btn>
      <v-btn variant="plain" color="white" class="btn">Registar</v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import Logo from "@/assets/Images/Logo.svg";

export default {
  data() {
    return {
      Logo,
    };
  },
};
</script>

<style scoped>
.btn {
  font-size: 1.5rem;
  font-family: var(--font-title);
  font-weight: 700;
}
</style>
