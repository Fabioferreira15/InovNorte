<template>
  <div>
    <ul>
      <li v-for="course in filteredCourses" :key="course.id">
        <v-card>
          <v-img :src="course.image" height="200px"></v-img>
          <v-card-title>{{ course.title }}</v-card-title>
          <v-card-subtitle>{{ course.category }}</v-card-subtitle>
          <v-card-text>{{ course.description }}</v-card-text>
          <v-card-actions>
            <v-rating v-model="course.rating" readonly></v-rating>
          </v-card-actions>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useCoursesStore } from "@/stores/coursesStore";

export default {
  setup() {
    const route = useRoute();
    const coursesStore = useCoursesStore();
    const filteredCourses = computed(() => coursesStore.filteredCourses);

    onMounted(() => {
      const searchQuery = route.query.q;
      coursesStore.filterCourses(searchQuery);
    });

    return {
      filteredCourses,
    };
  },
};
</script>

<style lang="scss" scoped></style>
