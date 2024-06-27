<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<script>
import { RouterView } from "vue-router";
</script>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-out;
}
</style>
