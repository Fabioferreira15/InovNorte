<template>
  <div class="results">
    <nav>
      <NavBar />
    </nav>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="10">
            <h1 class="title">
              Resultados para <span>{{ searchQuery }}</span>
            </h1>
          </v-col>
          <v-col cols="2" class="sort-select-container">
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

      <v-container fluid>
        <v-card
          class="course-item"
          variant="flat"
          v-for="course in paginatedCourses"
          :key="course.id"
        >
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="2">
                <v-img
                  :src="CourseImage"
                  cover
                  class="course__card-img"
                ></v-img>
              </v-col>
              <v-col cols="12" md="9" class="d-flex flex-column justify-center">
                <v-card-title class="course__card-title">{{
                  course.title
                }}</v-card-title>
                <v-card-subtitle class="course__card-category">{{
                  course.category
                }}</v-card-subtitle>
                <v-card-subtitle class="course__card-trainer">{{
                  course.trainer
                }}</v-card-subtitle>
                <v-card-text class="mt-4 rating d-flex align-center">
                  <v-rating
                    v-model="course.average_rating"
                    active-color="primary"
                    color="white"
                    half-increments
                    readonly
                    size="23"
                    class="mr-4"
                  ></v-rating>
                  <span class="course__card-rating">{{
                    course.average_rating
                  }}</span>
                  <span class="course__card-total"
                    >({{ course.total_reviews }})</span
                  >
                </v-card-text>
                <div class="d-flex flex-row align-center btns mt-auto">
                  <v-btn color="primary" @click="openCourse(course)"
                    >Inscrever</v-btn
                  >
                  <v-btn icon flat class="favourite">
                    <v-icon size="large">mdi-heart-outline</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="1" class="d-flex justify-end price">
                <p>{{ course.cost }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-main>

    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :total-visible="4"
      color="primary"
    ></v-pagination>
  </div>
</template>

<script>
import { onMounted, computed, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useCoursesStore } from "@/stores/coursesStore";
import NavBar from "@/components/NavBar.vue";
import CourseImage from "@/assets/Images/image.png";
import { useCourseNavigation } from "@/composables/courseNavigation";

export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();
    const coursesStore = useCoursesStore();
    const searchQuery = computed(() => route.query.q);
    const { openCourse } = useCourseNavigation();

    const sortOptions = ref([
      "Avaliações",
      "Data de Início",
      "Data de Criação",
      "Total de avaliações",
    ]);

    const sortOption = ref();

    const paginatedCourses = computed(
      () => coursesStore.paginatedSearchResults
    );
    const currentPage = computed({
      get: () => coursesStore.currentPage,
      set: (value) => coursesStore.setCurrentPage(value),
    });
    const totalPages = computed(() => coursesStore.totalPages);

    const searchCourses = () => {
      coursesStore.searchCourses(searchQuery.value);
      coursesStore.setCurrentPage(1);
    };

    const applySearchSorting = () => {
      coursesStore.sortOption = sortOption.value;
      coursesStore.applySearchSorting();
    };

    onMounted(async () => {
      if (coursesStore.allCourses.length === 0) {
        await coursesStore.fetchCourses();
      }
      searchCourses();
    });

    watch(searchQuery, () => {
      searchCourses();
    });

    watch(sortOption, () => {
      applySearchSorting();
    });

    return {
      searchQuery,
      paginatedCourses,
      currentPage,
      totalPages,
      CourseImage,
      sortOptions,
      sortOption,
      openCourse,
    };
  },
};
</script>

<style scoped>
.results {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background-home.svg");
  background-size: cover;
  position: relative;
  min-height: 100vh;
}

.title {
  font-family: var(--font-title);
  font-size: 2.8rem;
  color: var(--color-text-light);
}

.title span {
  -webkit-text-decoration: var(--color-primary-200) double underline;
  text-decoration: var(--color-primary-200) double underline;
}

.course-item {
  background-color: transparent;
  color: var(--color-text-light);
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
}
.pagination-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.course__card-img {
  border-radius: 5px;
  height: 100%;
}

.course__card-title {
  font-size: 1.6rem;
  font-weight: 700;
  font-family: var(--font-title);
  padding: 0;
  letter-spacing: 1px;
}

.course__card-category {
  font-size: 1.4rem;
  font-weight: 200;
  font-family: var(--font-text);
  color: var(--color-text-light);
  padding: 0;
}

.course__card-trainer {
  font-size: 1.4rem;
  font-weight: 200;
  font-family: var(--font-text);
  color: var(--color-text-light);
  padding: 0;
}

.v-card-text {
  padding: 0;
}

.favourite {
  background-color: transparent;
  color: var(--color-text-light);
}
.rating {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 1.6rem;
  color: var(--color-text-light);
}

.course__card-total {
  color: #8c8c8c;
}

.btns {
  height: 100%;
}

.price {
  font-size: 1.4rem;
  font-weight: 400;
  font-family: var(--font-title);
  color: var(--color-text-light);
  text-transform: capitalize;
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
