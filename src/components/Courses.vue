<template>
  <v-container class="courseCatalog" fluid>
    <!-- Exibir Spinner ou Conteúdo Principal -->
    <div v-if="isLoading" class="loading-container">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-card
        class="course-item"
        variant="flat"
        v-for="course in paginatedCourses"
        :key="course.id"
      >
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="2">
              <v-img :src="CourseImage" cover class="course__card-img"></v-img>
            </v-col>
            <v-col cols="12" md="9" class="d-flex flex-column justify-center">
              <v-card-title class="course__card-title">
                {{ course.title }}
              </v-card-title>
              <v-card-subtitle class="course__card-category">
                {{ course.category }}
              </v-card-subtitle>
              <v-card-subtitle class="course__card-trainer">
                {{ course.trainer }}
              </v-card-subtitle>
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
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="4"
        color="primary"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { useCoursesStore } from "@/stores/coursesStore";
import { onMounted, computed, watch } from "vue";
import CourseImage from "@/assets/Images/image.png";
import { useCourseNavigation } from "@/composables/courseNavigation";

export default {
  setup() {
    const coursesStore = useCoursesStore();
    const { openCourse } = useCourseNavigation();

    const paginatedCourses = computed(() => coursesStore.allCourses);
    const currentPage = computed({
      get: () => coursesStore.currentPage,
      set: (value) => {
        coursesStore.setCurrentPage(value);
        coursesStore.fetchCourses();
      },
    });
    const totalPages = computed(() => coursesStore.totalPages);
    const isLoading = computed(() => coursesStore.isLoading);

    onMounted(() => {
      if (!coursesStore.allCourses.length) {
        coursesStore.fetchCourses();
      }
    });

    return {
      paginatedCourses,
      currentPage,
      totalPages,
      isLoading,
      CourseImage,
      openCourse,
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

.course__card-category,
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
</style>
