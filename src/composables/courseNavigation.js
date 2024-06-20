import { useRouter } from "vue-router";

export function useCourseNavigation() {
  const router = useRouter();

  const openCourse = (course) => {
    router.push({
      name: "course",
      params: {
        name: course.title,
        id: course.id,
      },
    });
  };

  return {
    openCourse,
  };
}
