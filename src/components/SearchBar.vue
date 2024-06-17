<template>
  <v-form class="form" @submit.prevent="handleSearch">
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
import { useRouter } from "vue-router";

export default {
  setup() {
    const searchQuery = ref("");
    const router = useRouter();
    const loading = ref(false);
    const loaded = ref(false);

    const handleSearch = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        loaded.value = true;
        router.push({ name: "search-result", query: { q: searchQuery.value } });
      }, 2000);
    };

    return {
      searchQuery,
      handleSearch,
      loading,
      loaded,
    };
  },
};
</script>

<style scoped>
.form {
  width: 50rem;
}
.v-text-field {
  color: white;
}
</style>
