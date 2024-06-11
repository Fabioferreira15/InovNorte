import { defineStore } from "pinia";

export const useCoursesStore = defineStore("courses", {
  state: () => ({
    courses: [],
  }),
  getters: {
    getTop10Rated: (state) => {
      // Certificando que courses é um array antes de aplicar sort
      if (Array.isArray(state.courses)) {
        return [...state.courses]
          .sort((a, b) => b.classificacao_media - a.classificacao_media)
          .slice(0, 10);
      }
      return [];
    },
  },
  actions: {
    async fetchCourses() {
      try {
        const response = await fetch("/courses");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data.courses)) {
          this.courses = data.courses;
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    },
  },
});
