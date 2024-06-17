<template>
  <v-container class="filter-bar" fluid>
    <v-row align="center" class="flex-wrap">
      <v-col cols="12" md="auto">
        <v-btn @click="toggleFilterSidebar" class="toggle-button"
          >Filtros</v-btn
        >
      </v-col>
      <v-col cols="12" md="auto" class="chips-container">
        <v-chip-group v-model="selectedFilters" multiple class="filter-chips">
          <v-chip
            v-for="filter in categories"
            :key="filter.id"
            class="filter-chip"
            filter
          >
            {{ filter.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="auto" class="sort-select-container">
        <v-select
          v-model="sortOption"
          :items="sortOptions"
          label="Ordenar"
          class="sort-select"
          dense
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useCoursesStore } from "@/stores/coursesStore";

export default {
  props: ["toggleFilterSidebar"],
  setup() {
    const coursesStore = useCoursesStore();
    const categories = ref([]);
    const selectedFilters = ref([]);
    const sortOption = ref(null);
    const sortOptions = ref(["Opção 1", "Opção 2", "Opção 3"]);

    onMounted(async () => {
      await coursesStore.fetchCategories();
      categories.value = coursesStore.categories;
    });

    return {
      selectedFilters,
      categories,
      sortOption,
      sortOptions,
    };
  },
};
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
}
.toggle-button {
  margin-right: 1rem;
}
.chips-container {
  display: flex;
  flex-wrap: wrap;
}
.filter-chip {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
.sort-select {
  margin-left: auto;
}
@media (max-width: 600px) {
  .toggle-button {
    width: 100%;
    margin-bottom: 1rem;
  }
  .chips-container {
    width: 100%;
    justify-content: center;
  }
  .sort-select-container {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
