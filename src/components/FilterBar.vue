<template>
  <v-container class="filter-bar" fluid>
    <v-row align="center" class="flex-wrap">
      <v-col cols="12" md="auto">
        <v-btn @click="toggleFilterSidebar" class="toggle-button" icon flat>
          <v-icon>
            <svg class="icon" width="100" height="100">
              <use xlink:href="../assets/coolicons-sprite.svg#Filter"></use>
            </svg>
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto" class="chips-container">
        <v-chip-group v-model="selectedFilters" multiple class="filter-chips">
          <v-chip
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            class="filter-chip d-flex align-center justify-center"
            filter
          >
            {{ category.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="sort-select-container">
        <v-select
          v-model="sortOption"
          :items="sortOptions"
          variant="outlined"
          label="Ordenar"
          class="sort-select"
          hide-details
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useCoursesStore } from "@/stores/coursesStore";

export default {
  props: ["toggleFilterSidebar"],
  setup() {
    const coursesStore = useCoursesStore();
    const categories = ref([]);
    const selectedFilters = ref([]);
    const sortOptions = ref([
      "Avaliações",
      "Data de Início",
      "Data de Criação",
      "Total de avaliações",
    ]);

    onMounted(async () => {
      await coursesStore.fetchCategories();
      categories.value = coursesStore.categories;
    });

    const sortOption = computed({
      get: () => coursesStore.sortOption,
      set: (value) => {
        coursesStore.setSortOption(value);
      },
    });

    watch(selectedFilters, (newFilters) => {
      const categoryNames = newFilters
        .map((id) => {
          const category = categories.value.find((cat) => cat.id === id);
          return category ? category.name : null;
        })
        .filter((name) => name !== null); 
      coursesStore.setCategoriesFilter(categoryNames);
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
  color: var(--color-text-light);
  background-color: transparent;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
}
.filter-chip {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: var(--color-primary-600);
  min-width: 10rem;
  font-family: var(--font-text);
  font-size: 1.4rem !important;
  font-weight: 300;
  color: var(--color-text-dark);
}

.sort-select-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.sort-select {
  min-width: 200px;
  max-width: 300px;
  background-color: var(--color-background);
  border-radius: 8px;
  font-family: var(--font-text);
  font-size: 1.87rem;
}

.sort-select .v-input__control {
  border-radius: 8px;
  background-color: var(--color-background);
  padding: 0.5rem;
}

.sort-select .v-select__selections {
  padding-left: 0.5rem;
}

.sort-select .v-input__append-inner {
  margin-right: 0.5rem;
}

.sort-select .v-list-item {
  font-family: var(--font-text);
  font-size: 1.4rem;
}
.v-input {
  color: var(--color-text-light) !important;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
}
</style>
