<template>
  <v-container class="courseCatalog" fluid>
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
          <v-col cols="12" md="9">
            <v-card-title class="course__card-title">{{
              course.title
            }}</v-card-title>
            <v-card-subtitle class="course__card-category">{{
              course.category
            }}</v-card-subtitle>
            <v-card-subtitle class="course__card-trainer">{{
              course.trainer
            }}</v-card-subtitle>
            <v-card-text>
              {{ course.duration }} | {{ course.cost }}
              <span class="course__card-rating">{{
                course.average_rating
              }}</span>
              <span>({{ course.total_reviews }})</span>
            </v-card-text>
            <div class="d-flex flex-row">
              <v-btn color="primary">Inscrever</v-btn>
              <v-btn icon>
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="1">
            <p>{{ course.cost }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>

  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    :total-visible="4"
    color="primary"
    @update:model-value="fetchPaginatedCourses"
  ></v-pagination>
</template>

<script>
import { useCoursesStore } from "@/stores/coursesStore";
import { onMounted, computed, ref, watch, Transition } from "vue";
import CourseImage from "@/assets/Images/image.png";

export default {
  setup() {
    const coursesStore = useCoursesStore();

    const paginatedCourses = computed(() => coursesStore.paginatedCourses);
    const currentPage = ref(coursesStore.currentPage);
    const totalPages = computed(() => coursesStore.totalPages);

    const fetchPaginatedCourses = (page) => {
      coursesStore.fetchPaginatedCourses(page);
    };

    onMounted(() => {
      fetchPaginatedCourses(currentPage.value);
    });

    watch(currentPage, (newPage) => {
      fetchPaginatedCourses(newPage);
    });

    return {
      paginatedCourses,
      currentPage,
      totalPages,
      fetchPaginatedCourses,
      CourseImage,
    };
  },
};
</script>

<style scoped>
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
}

.course__card-title {
  font-size: 1.6rem;
  font-weight: 700;
  font-family: var(--font-title);
}

.course__card-category {
  font-size: 1.4rem;
  font-weight: 200;
  font-family: var(--font-text);
  color: var(--color-text-light);
}

.course__card-trainer {
  font-size: 1.4rem;
  font-weight: 200;
  font-family: var(--font-text);
  color: var(--color-text-light);
}
</style>
