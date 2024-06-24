import { defineStore } from "pinia";

export const useCoursesStore = defineStore("courses", {
  state: () => ({
    courses: [],
    randomCourses: [],
    recentCourses: [],
    allCourses: [],
    bestForUser: null,
    interestsCourses: [],
    top10Rated: [],
    categories: [],
    selectedCategories: [],
    searchResults: [],
    sortedSearchResults: [],
    currentPage: 1,
    perPage: 6,
    totalPages: 0,
    sortOption: null,
    isLoading: false,
  }),
  getters: {
    courseTitles: (state) => {
      return state.allCourses.map((course) => course.title);
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
    async fetchTop10Rated() {
      this.isLoading = true;
      try {
        const response = await fetch("/toprated");
        if (!response.ok) {
          throw new Error("Erro a obter os cursos mais bem avaliados");
        }
        const data = await response.json();
        if (data.courses) {
          this.top10Rated = data.courses;
          this.isLoading = false;
        } else {
          throw new Error("Erro a obter os cursos mais bem avaliados");
        }
      } catch (error) {
        throw new Error("Erro a obter os cursos mais bem avaliados");
      }
    },

    async fetchRandomCourses() {
      this.isLoading = true;
      try {
        const response = await fetch("/courses/random");
        if (!response.ok) {
          throw new Error("Erro a obter os cursos aleatórios");
        }
        const data = await response.json();
        if (data.courses) {
          this.randomCourses = data.courses;
          this.isLoading = false;
        } else {
          throw new Error("Erro a obter os cursos aleatórios");
        }
      } catch (error) {
        throw new Error("Erro a obter os cursos aleatórios");
      }
    },

    async fetchRecentlyAdded() {
      this.isLoading = true;
      try {
        const response = await fetch("/courses/recents");
        if (!response.ok) {
          throw new Error("Erro a obter os cursos recentemente adicionados");
        }
        const data = await response.json();
        if (data.courses) {
          this.recentCourses = data.courses;
          this.isLoading = false;
        } else {
          throw new Error("Erro a obter os cursos recentemente adicionados");
        }
      } catch (error) {
        throw new Error("Erro a obter os cursos recentemente adicionados");
      }
    },

    async fetchBestForUser(userId) {
      this.loading = true;
      try {
        const response = await fetch(`/courses/best/${userId}`);
        if (!response.ok) {
          throw new Error("Erro a obter o melhor curso para o utilizador");
        }
        const data = await response.json();
        if (data.course) {
          this.bestForUser = data.course;
          this.loading = false;
        } else {
          throw new Error("Erro a obter o melhor curso para o utilizador");
        }
      } catch (error) {
        throw new Error("Erro a obter o melhor curso para o utilizador");
      }
    },

    async fetchInterestsCourses(userId) {
      this.loading = true;
      try {
        const response = await fetch(`/courses/interests/${userId}`);
        if (!response.ok) {
          throw new Error(
            "Erro a obter os cursos com base nos interesses do utilizador"
          );
        }
        const data = await response.json();
        if (data.courses) {
          this.interestsCourses = data.courses;
          this.loading = false;
        } else {
          throw new Error(
            "Erro a obter os cursos com base nos interesses do utilizador"
          );
        }
      } catch (error) {
        throw new Error(
          "Erro a obter os cursos com base nos interesses do utilizador"
        );
      }
    },

    async fetchCourses() {
      this.isLoading = true;
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
      } finally {
        this.isLoading = false;
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
    clearUserBest() {
      this.bestForUser = null;
      
    },
  },
});
