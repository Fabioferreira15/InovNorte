<template>
  <div>
    <p v-if="course">{{ course.title }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCoursesStore } from "@/stores/coursesStore";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const coursesStore = useCoursesStore();
    const course = ref(null);

    const loadCourse = async () => {
      const id = Number(route.params.id);

      let loadedCourse = coursesStore.getCourseById(id);
      if (!loadedCourse) {
        await coursesStore.fetchCourses();
        loadedCourse = coursesStore.getCourseById(id);
      }

      if (loadedCourse) {
        course.value = loadedCourse;

        if (route.params.name !== loadedCourse.title) {
          router.replace({
            name: "course",
            params: { name: loadedCourse.title, id: loadedCourse.id },
          });
        }
      }
    };

    onMounted(() => {
      loadCourse();
    });

    watch(route, () => {
      loadCourse();
    });

    return {
      course,
    };
  },
};
</script>

<style lang="scss" scoped></style>
