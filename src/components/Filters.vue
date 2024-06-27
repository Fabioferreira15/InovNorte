<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Avaliações</h1>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-radio-group v-model="starRating" row>
              <v-radio label="Mais de 4.5" value="4.5"></v-radio>
              <v-radio label="Mais de 4" value="4"></v-radio>
              <v-radio label="Mais de 3.5" value="3.5"></v-radio>
              <v-radio label="Mais de 3" value="3"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1>Dificuldade</h1>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-radio-group v-model="difficulty" row>
              <v-radio label="Iniciante" value="iniciante"></v-radio>
              <v-radio label="Intermediário" value="intermediário"></v-radio>
              <v-radio label="Avançado" value="avançado"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1>Preço</h1>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-radio-group v-model="price" row>
              <v-radio label="Grátis" value="free"></v-radio>
              <v-radio label="Pago" value="paid"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1>Duração</h1>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-radio-group v-model="duration" row>
              <v-radio label="Curto" value="short"></v-radio>
              <v-radio label="Médio" value="medium"></v-radio>
              <v-radio label="Longo" value="long"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <v-btn @click="resetFilters">Resetar Filtros</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, watch, computed, onMounted } from "vue";
import { useCoursesStore } from "@/stores/coursesStore";

export default {
  setup() {
    const coursesStore = useCoursesStore();

    const starRating = ref(coursesStore.filters.starRating);
    const difficulty = ref(coursesStore.filters.difficulty);
    const price = ref(coursesStore.filters.price);
    const duration = ref(coursesStore.filters.duration);
    const isLoading = computed(() => coursesStore.isLoading);

    watch(starRating, (newValue) => {
      coursesStore.setFilters({ starRating: newValue });
      coursesStore.fetchCourses();
    });

    watch(difficulty, (newValue) => {
      coursesStore.setFilters({ difficulty: newValue });
      coursesStore.fetchCourses();
    });

    watch(price, (newValue) => {
      coursesStore.setFilters({ price: newValue });
      coursesStore.fetchCourses();
    });

    watch(duration, (newValue) => {
      coursesStore.setFilters({ duration: newValue });
      coursesStore.fetchCourses();
    });

    const resetFilters = () => {
      starRating.value = null;
      difficulty.value = null;
      price.value = null;
      duration.value = null;
      coursesStore.setFilters({
        starRating: null,
        difficulty: null,
        price: null,
        duration: null,
      });
      coursesStore.fetchCourses();
    };

    onMounted(() => {
      coursesStore.fetchCourses();
    });

    return {
      starRating,
      difficulty,
      price,
      duration,
      resetFilters,
      isLoading,
    };
  },
};
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
