import { defineStore } from "pinia";

export const useCoursesStore = defineStore("courses", {
  state: () => ({
    courses: [],
    allCourses: [],
    categories: [],
    selectedCategories: [],
    searchResults: [],
    sortedSearchResults: [],
    currentPage: 1,
    perPage: 6,
    totalPages: 0,
    sortOption: null,
  }),
  getters: {
    getTop10Rated: (state) => {
      return [...state.allCourses]
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(0, 10);
    },
    courseTitles: (state) => {
      return state.allCourses.map((course) => course.title);
    },
    getRecentlyAdded: (state) => {
      return [...state.allCourses]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
    },
    getCourseById: (state) => (id) => {
      return state.allCourses.find((course) => course.id === id);
    },
    paginatedCourses: (state) => {
      const start = (state.currentPage - 1) * state.perPage;
      const end = start + state.perPage;
      return state.courses.slice(start, end);
    },
    paginatedSearchResults: (state) => {
      const start = (state.currentPage - 1) * state.perPage;
      const end = start + state.perPage;
      return state.sortedSearchResults.slice(start, end);
    },
    filteredAndSortedCourses: (state) => {
      let filtered = state.allCourses.filter(
        (course) =>
          state.selectedCategories.length === 0 ||
          state.selectedCategories.includes(course.category)
      );

      switch (state.sortOption) {
        case "Avaliações":
          return filtered.sort((a, b) => b.average_rating - a.average_rating);
        case "Data de Início":
          return filtered.sort(
            (a, b) => new Date(a.start_date) - new Date(b.start_date)
          );
        case "Data de Criação":
          return filtered.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        case "Total de avaliações":
          return filtered.sort((a, b) => b.total_reviews - a.total_reviews);
        default:
          return filtered;
      }
    },
    getBestForUser: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const interests = user.interests;
      const preferredFormat = user.preferred_format;

      const filteredCourses = state.allCourses.filter((course) => {
        return (
          interests.some((interest) => course.tags.includes(interest)) &&
          course.format === preferredFormat
        );
      });

      if (filteredCourses.length > 0) {
        return filteredCourses.sort(
          (a, b) => b.average_rating - a.average_rating
        )[0];
      }

      return state.allCourses.sort(
        (a, b) => b.average_rating - a.average_rating
      )[0];
    },
    getBasedOnUserInterests: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const interests = user.interests;

      return [...state.allCourses]
        .filter((course) => {
          return interests.some((interest) => course.tags.includes(interest));
        })
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
          this.allCourses = data.courses;
          this.applySorting();
        } else {
          throw new Error("Erro a obter os cursos");
        }
      } catch (error) {
        console.error("Erro a obter os cursos", error);
      }
    },

    applySorting() {
      this.courses = this.filteredAndSortedCourses;
      this.totalPages = Math.ceil(this.courses.length / this.perPage);
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    setSortOption(option) {
      this.sortOption = option;
      this.applySorting();
      this.setCurrentPage(1);
    },

    setCategoriesFilter(categories) {
      this.selectedCategories = categories;
      this.applySorting();
      this.setCurrentPage(1);
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
    searchCourses(query) {
      this.searchResults = this.allCourses.filter((course) => {
        return course.title.toLowerCase().includes(query.toLowerCase());
      });
      this.applySearchSorting();
    },
    applySearchSorting() {
      this.sortedSearchResults = this.sortCourses(
        this.searchResults,
        this.sortOption
      );
      this.totalPages = Math.ceil(
        this.sortedSearchResults.length / this.perPage
      );
      this.setCurrentPage(1);
    },
    sortCourses(courses, sortOption) {
      switch (sortOption) {
        case "Avaliações":
          return courses.sort((a, b) => b.average_rating - a.average_rating);
        case "Data de Início":
          return courses.sort(
            (a, b) => new Date(a.start_date) - new Date(b.start_date)
          );
        case "Data de Criação":
          return courses.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        case "Total de avaliações":
          return courses.sort((a, b) => b.total_reviews - a.total_reviews);
        default:
          return courses;
      }
    },
  },
});
