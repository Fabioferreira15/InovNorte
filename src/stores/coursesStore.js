import { defineStore } from "pinia";

export const useCoursesStore = defineStore("courses", {
  state: () => ({
    courses: [],
    categories: [],
    filteredCourses: [],
    paginatedCourses: [],
    currentPage: 1,
    perPage: 6,
    totalPages: 0,
  }),
  getters: {
    getTop10Rated: (state) => {
      return [...state.courses]
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(0, 10);
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
        if (data.courses) {
          this.courses = data.courses;
          this.filteredCourses = data.courses;
        } else {
          throw new Error("Erro a obter os cursos");
        }
      } catch (error) {
        console.error("Erro a obter os cursos", error);
      }
    },

    async fetchCategories() {
      try {
        const response = await fetch("/categories");
        if (!response.ok) {
          throw new Error("Erro a obter as categorias");
        }
        const data = await response.json();
        if (data.categories) {
          this.categories = data.categories;
        } else {
          throw new Error("Erro a obter as categorias");
        }
      } catch (error) {
        console.error("Erro a obter as categorias", error);
      }
    },
    filterCourses(query) {
      this.filteredCourses = this.courses.filter((course) => {
        return course.title.toLowerCase().includes(query.toLowerCase());
      });
    },
    async fetchPaginatedCourses(
      page = this.currentPage,
      perPage = this.perPage
    ) {
      try {
        const response = await fetch(`/courses/page/${page}`);
        if (!response.ok) {
          throw new Error("Erro a obter os cursos");
        }
        const result = await response.json();
        this.paginatedCourses = result.data;
        this.totalPages = Math.ceil(result.total / perPage);
        this.currentPage = page;
      } catch (error) {
        console.error("Erro a obter os cursos", error);
      }
    },
  },
});
