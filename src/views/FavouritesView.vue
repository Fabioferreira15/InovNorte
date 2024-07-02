<template>
  <div class="favourites">
    <NavBar />
    <v-main>
      <v-container class="favourites-container">
        <h1 class="favourites-title">Os meus favoritos</h1>

        <v-row v-if="favourites.length > 0">
          <v-col
            v-for="course in favourites"
            :key="course.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="custom-card" @click="openCourse(course)">
              <v-img
                :src="CourseImage"
                height="180"
                class="course__card-img"
                cover
              ></v-img>
              <v-card-subtitle>{{ course.category }}</v-card-subtitle>
              <v-card-title class="card__title">{{
                course.title
              }}</v-card-title>

              <v-card-text>
                {{ course.duration }} | {{ course.cost }}
                <span class="course__card-rating">{{
                  course.average_rating
                }}</span>
                <span>({{ course.total_reviews }})</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

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
import CourseImage from "@/assets/Images/image.png";
import { useCourseNavigation } from "@/composables/courseNavigation";

export default {
  components: {
    NavBar,
  },

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { openCourse } = useCourseNavigation();

    const favourites = computed(() => {
      return authStore.favourites;
    });

    onMounted(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      authStore.fetchUserFavourites(user.id);
    });

    return {
      authStore,
      favourites,
      router,
      openCourse,
      CourseImage,
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

.custom-card {
  width: 250px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgba(255, 255, 255, 0.17);
  border-radius: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
}

.custom-card .v-card__text {
  flex-grow: 1;
  padding: 8px;
}

.empty-state {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #fff;
}

.favourites-container {
  padding-top: 100px;
  padding-bottom: 100px;
}

.card__title {
  color: var(--color-text-light);
  font-size: 1.8rem;
  font-family: var(--font-title);
}

.course__card-rating {
  color: var(--color-text-light);
}

.course__card-rating {
  color: var(--color-text-light);
}

.course__card-img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

@media (max-width: 768px) {
  .custom-card {
    width: 100%;
    max-width: 100%;
  }
}
</style>
