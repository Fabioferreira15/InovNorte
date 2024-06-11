<template>
  <v-text-field
    v-model="searchQuery"
    label="Procurar cursos"
    @keyup.enter="searchCourses"
  ></v-text-field>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const searchQuery = ref("");
    const router = useRouter();

    const searchCourses = () => {
      router.push({ name: "search-result", query: { q: searchQuery.value } });
    };

    return {
      searchQuery,
      searchCourses,
    };
  },
};
</script>

<style lang="sass" scoped></style>
