<template>
  <div class="courseCatalog">
    <nav>
      <Navbar />
    </nav>

    <v-main>
      <v-container>
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
        <Courses />
      </div>
    </v-main>
  </div>
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import Courses from "@/components/Courses.vue";
import FilterBar from "@/components/FilterBar.vue";
import Filters from "@/components/Filters.vue";

export default {
  components: {
    Navbar,
    Courses,
    FilterBar,
    Filters,
  },
  data() {
    return {
      isFilterSidebarVisible: false,
    };
  },
  methods: {
    toggleFilterSidebar() {
      this.isFilterSidebarVisible = !this.isFilterSidebarVisible;
    },
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
