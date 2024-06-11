import { defineStore } from "pinia";

export const useCoursesStore = defineStore("courses", {
  state: () => ({
    courses: [],
    filteredCourses: [],
  }),
  getters: {
    getTop10Rated: (state) => {
      return [...state.courses]
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(0,10)
    },
    courseTitles: (state) => {
      return state.courses.map((course) => course.title);
    },
    getRecentlyAdded: (state) => {
      return [...state.courses]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
    },
  },
  actions: {
    async fetchCourses() {
      try {
        const response = await fetch("/courses");
        if (!response.ok) {
          throw new Error("Erro a obter os cursos");
        }
        const data = await response.json();
        if (Array.isArray(data.courses)) {
          this.courses = data.courses;
          this.fileredCourses = data.courses;
        } else {
          throw new Error("Erro a obter os cursos");
        }
      } catch (error) {
        console.error("Erro a obter os cursos", error);
      }
    },
    filterCourses(query){
      this.filteredCourses = this.courses.filter((course) => {
        return course.title.toLowerCase().includes(query.toLowerCase());
      });
    }
  },
});
