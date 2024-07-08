<template>
  <div class="favourites">
    <NavBar />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <Breadcrumb />
          </v-col>
        </v-row>
      </v-container>
      <v-container class="favourites-container">
        <v-row>
          <v-col cols="12">
            <h1 class="page__title">Meus favoritos</h1>
          </v-col>
        </v-row>

        <div class="courses" v-if="favourites.length > 0">
          <v-row class="favourites-row">
            <v-col
              v-for="course in favourites"
              :key="course.id"
              cols="12"
              md="4"
            >
              <CourseCard :course="course" :showVideo="showVideo" />
            </v-col>
          </v-row>
        </div>

        <FavouritesSkeleton v-else-if="authStore.isLoading" />

        <div v-else class="empty-state">
          <h2>Você ainda não tem cursos favoritos</h2>
          <p>
            Adicione cursos aos seus favoritos para acessá-los rapidamente aqui.
          </p>
          <v-btn @click="router.push('/course-catalog')" color="primary">
            Explorar cursos
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { useAuthStore } from "@/stores/authStore";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useCourseNavigation } from "@/composables/courseNavigation";
import FavouritesSkeleton from "@/components/skeletonLoaders/FavouritesSkeleton.vue";
import CourseCard from "@/components/CourseCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  components: {
    NavBar,
    FavouritesSkeleton,
    CourseCard,
    Breadcrumb,
  },

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { openCourse } = useCourseNavigation();

    const favourites = computed(() => {
      return authStore.favourites;
    });

    const showVideo = ref({});

    onMounted(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      authStore.fetchUserFavourites(user.id);

      authStore.favourites.forEach((course) => {
        showVideo.value[course.id] = false;
      });
    });

    return {
      authStore,
      favourites,
      router,
      openCourse,
      showVideo,
    };
  },
};
</script>

<style scoped>
.favourites {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background-home.svg");
  background-size: cover;
  position: relative;
  min-height: 100vh;
}

.empty-state {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #fff;
}

.favourites-container {
  max-width: 1800px;
  margin: 0 auto;
}

.favourites-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70%;
}

.courses {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.page__title {
  color: var(--color-text-light);
  font-size: 2.8rem;
  font-family: var(--text-title);
  font-weight: 700;
}

@media (max-width: 1800px) {
  .favourites-row {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .courses {
    align-items: start;
  }
}
</style>
