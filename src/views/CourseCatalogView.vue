<template>
  <div class="courseCatalog">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <NavBar />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-navigation-drawer
            v-model="drawer"
            app
            temporary
            :permanent="!isMobile"
            class="drawer"
          >
            <Filters />
          </v-navigation-drawer>
        </v-col>
        <v-col cols="12" md="9">
          <Courses />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Filters from "@/components/Filters.vue";
import Courses from "@/components/Courses.vue";
import { ref, computed } from "vue";
import { useDisplay } from "vuetify/lib/framework";

export default {
  components: {
    NavBar,
    Filters,
    Courses,
  },

  setup() {
    const drawer = ref(false);
    const { mobile } = useDisplay();
    const isMobile = computed(() => mobile.value);

    return {
      drawer,
      isMobile,
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
.drawer {
  background-color: var(--color-background-dark);
  color: var(--color-text-light);
  border: none;
}
</style>
