<template>
  <div class="home">
    <nav class="navbar">
      <NavBar />
    </nav>

    <v-main class="main">
      <v-container fluid class="video-container">
        <video autoplay muted loop class="bg-video">
          <source :src="Video" type="video/mp4" />
          Your browser does not support the video.
        </video>
        <div class="overlay">
          <v-container fluid>
            <v-row class="d-flex align-center course__header-info">
              <v-col cols="12" md="5">
                <h1 class="course__title">
                  Introdução à Segurança da Informação Classificada
                </h1>
                <p class="course__categorie">Ciências exatas e tecnologias</p>
                <v-rating
                  v-model="rating"
                  active-color="blue"
                  color="orange-lighten-1"
                  readonly
                ></v-rating>
                <p class="course__description">
                  Os desafios colocados à preservação e segurança da informação
                  classificada nunca foram tão altos como na atualidade. Venha
                  aprender a classificar a informação sensível!
                </p>
                <v-btn color="primary">Inscrever</v-btn>
                <v-btn variant="outlined" color="white">Mais informações</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-container>
      <CourseCarousel title="Em destaque" :courses="topCourses" />

      <CourseCarousel title="Novidades" :courses="RecentlyAdded" />
    </v-main>
  </div>
</template>
<script>
import { onMounted, ref, computed } from "vue";
import { useCoursesStore } from "@/stores/coursesStore";
import NavBar from "@/components/NavBar.vue";
import Video from "@/assets/video_example.mp4";
import CourseCarousel from "@/components/CourseCarousel.vue";

export default {
  components: {
    NavBar,
    CourseCarousel,
  },
  setup() {
    const rating = ref(4);
    const coursesStore = useCoursesStore();

    const topCourses = computed(() => {
      const courses = coursesStore.getTop10Rated;
      console.log("Top 10 Courses by Rating:", courses);
      return courses;
    });

    const RecentlyAdded = computed(() => {
      const courses = coursesStore.getRecentlyAdded;
      console.log("Recently Added Courses:", courses);
      return courses;
    });

    onMounted(() => {
      coursesStore.fetchCourses();
    });

    return {
      topCourses,
      RecentlyAdded,
      Video,
      rating,
    };
  },
};
</script>

<style scoped>
.bg-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.home {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background-home.svg");
  background-size: cover;
  height: 4000px;
  position: relative;
}

.video-container {
  position: relative;
  height: 100vh;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 2;
}

.course__header-info {
  height: 80vh;
}

.course__title {
  color: var(--color-text-light);
  font-size: 4rem;
  font-family: var(--font-title);
  font-weight: 700;
}

.course__categorie {
  color: #8c8c8c;
  font-size: 1.6rem;
  font-family: var(--font-text);
  font-weight: 300;
}

.course__description {
  color: var(--color-text-light);
  font-size: 1.6rem;
  font-family: var(--font-text);
  font-weight: 200;
}

@media (max-width: 768px) {
  .bg-video {
    height: 50vh;
  }
  .video-container {
    height: 50vh;
  }

  .overlay {
    height: 50vh;
  }
}
</style>
