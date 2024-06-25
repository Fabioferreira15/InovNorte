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
    error: null,
    filters: {
      starRating: null,
      difficulty: null,
      price: null,
      duration: null,
    },
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
          (state.selectedCategories.length === 0 ||
            state.selectedCategories.includes(course.category)) &&
          (state.filters.starRating === null ||
            course.average_rating >= state.filters.starRating) &&
          (state.filters.difficulty === null ||
            course.difficulty === state.filters.difficulty) &&
          (state.filters.price === null ||
            (state.filters.price === "free" && course.cost === "gratuito") ||
            (state.filters.price === "paid" && course.cost === "pago")) &&
          (state.filters.duration === null ||
            (state.filters.duration === "short" && course.duration === "curto") ||
            (state.filters.duration === "medium" && course.duration==='médio' )||
            (state.filters.duration === "long" && course.duration==='longo'))
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
    async fetchData(endpoint, mutation, error) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(error);
        }
        const data = await response.json();
        this[mutation] = data.courses || data.course || data.categories;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchTop10Rated() {
      await this.fetchData(
        "/courses/toprated",
        "top10Rated",
        "Erro a obter os cursos mais bem avaliados"
      );
    },
    async fetchRandomCourses() {
      await this.fetchData(
        "/courses/random",
        "randomCourses",
        "Erro a obter os cursos aleatórios"
      );
    },
    async fetchRecentlyAdded() {
      await this.fetchData(
        "/courses/recents",
        "recentCourses",
        "Erro a obter os cursos recentemente adicionados"
      );
    },
    async fetchBestForUser(userId) {
      await this.fetchData(
        `/courses/best/${userId}`,
        "bestForUser",
        "Erro a obter os cursos recomendados para o utilizador"
      );
    },
    async fetchInterestsCourses(userId) {
      await this.fetchData(
        `/courses/interests/${userId}`,
        "interestsCourses",
        "Erro a obter os cursos recomendados para o utilizador"
      );
    },
    async fetchCourses() {
      await this.fetchData("/courses", "allCourses", "Erro a obter os cursos");
      this.applySorting();
    },

    async fetchCategories() {
      await this.fetchData(
        "/categories",
        "categories",
        "Erro a obter as categorias"
      );
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

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
      this.applySorting();
      this.setCurrentPage(1);
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
