<template>
  <v-form  class="form">
    <v-text-field
      :loading="loading"
      v-model="searchQuery"
      label="Procurar cursos"
      variant="underlined"
      clearable
      hide-details
      single-line
    ></v-text-field>
  </v-form>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const searchQuery = ref("");


    return {
      searchQuery,
    };
  },
};
</script>

<style scoped>
.form{
  width: 50rem;
}
.v-text-field {
  color: white;
}
</style>
