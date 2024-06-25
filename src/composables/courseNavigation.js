import { useRouter } from "vue-router";
import { useCoursesStore } from "@/stores/coursesStore";

export function useCourseNavigation() {
  const router = useRouter();
  const coursesStore = useCoursesStore();

  const openCourse = (course) => {
    router
      .push({
        name: "course",
        params: {
          name: course.title,
          id: course.id,
        },
      })
      .then(() => {
        coursesStore.fetchCourseById(course.id);
      });
  };

  return {
    openCourse,
  };
}
