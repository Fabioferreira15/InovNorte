<template>
  <div class="courseCatalog">
    <nav>
      <Navbar />
    </nav>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <Breadcrumb />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h1 class="page__title">Catálogo de cursos</h1>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <FilterBar :toggleFilterSidebar="toggleFilterSidebar" />
      </v-container>

      <div class="content">
        <v-navigation-drawer
          v-model="isFilterSidebarVisible"
          class="filter-sidebar"
        >
          <div class="sidebar-content">
            <Filters />
          </div>
        </v-navigation-drawer>

        <v-container fluid v-if="coursesStore.isLoading">
          <v-row>
            <v-col v-for="n in coursesStore.perPage" :key="n" cols="12">
              <SkeletonLoader />
            </v-col>
          </v-row>
        </v-container>

        <v-container fluid v-else>
          <Courses />
        </v-container>
      </div>
    </v-main>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import Navbar from "@/components/NavBar.vue";
import Courses from "@/components/Courses.vue";
import FilterBar from "@/components/FilterBar.vue";
import Filters from "@/components/Filters.vue";
import { useCoursesStore } from "@/stores/coursesStore";
import Breadcrumb from "@/components/Breadcrumb.vue";
import SkeletonLoader from "@/components/skeletonLoaders/SearchResultsSkeleton.vue";

export default {
  components: {
    Navbar,
    Courses,
    FilterBar,
    Filters,
    Breadcrumb,
    SkeletonLoader,
  },
  setup() {
    const coursesStore = useCoursesStore();
    const isFilterSidebarVisible = ref(false);

    const toggleFilterSidebar = () => {
      isFilterSidebarVisible.value = !isFilterSidebarVisible.value;
    };

    const currentPage = computed({
      get: () => coursesStore.currentPage,
      set: (value) => {
        coursesStore.setCurrentPage(value);
        coursesStore.fetchCourses();
      },
    });

    onMounted(() => {
      if (coursesStore.allCourses.length === 0) {
        coursesStore.fetchCourses();
      }
    });

    watch(currentPage, () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return {
      isFilterSidebarVisible,
      toggleFilterSidebar,
      coursesStore,
    };
  },
};
</script>

<style scoped>
.courseCatalog {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background-home.svg");
  background-size: cover;
  position: relative;
  min-height: 100vh;
}

.page__title {
  font-family: var(--font-title);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-text-light);
}

.filter-sidebar {
  width: 300px;
  background-color: transparent;
  border: none;
  color: var(--color-text-light);
}

.sidebar-content {
  padding: 20px;
}
</style>
