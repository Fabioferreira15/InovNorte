<template>
  <NavBar />
  <v-container>
    <v-row>
      <v-col
        v-for="course in filteredCourses"
        :key="course.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>{{ course.title }}</v-card-title>
          <v-card-text>{{ course.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCoursesStore } from "@/stores/coursesStore";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },

  setup() {
    const route = useRoute();
    const coursesStore = useCoursesStore();
    const filteredCourses = computed(() => coursesStore.filteredCourses);

    // Filtrar os cursos quando o componente é montado
    onMounted(() => {
      const query = route.query.q || "";
      console.log("Query on mount:", query); // Log para verificar a consulta
      coursesStore.filterCourses(query);
    });

    // Watch para a rota de consulta
    watch(
      () => route.query.q,
      (newQuery) => {
        console.log("Query changed:", newQuery); // Log para verificar mudanças na consulta
        coursesStore.filterCourses(newQuery);
      }
    );

    // Watch para filteredCourses
    watch(
      filteredCourses,
      (newVal) => {
        console.log("Filtered courses:", newVal);
      },
      { immediate: true }
    );

    return {
      filteredCourses,
    };
  },
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
