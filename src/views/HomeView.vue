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
                  active-color="yellow-accent-4"
                  color="white"
                  size="18"
                  half-increments
                  hover
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

      <v-container fluid class="recomendations">
        <h1 class="title">Em destaque</h1>
        <carousel
          ref="carousel"
          :items-to-show="5"
          :breakpoints="breakpoints"
          class="custom-carousel"
        >
          <slide v-for="course in topCourses" :key="course.id">
            <v-card class="course__card">
              <v-container fluid class="course__card-container">
                <v-img :src="Robot" cover class="course__card-img"></v-img>

                <v-card-subtitle>{{ course.category }}</v-card-subtitle>
                <v-card-title>{{ course.title }}</v-card-title>
                <v-card-text>
                  {{ course.duration }} | {{ course.cost }}
                  <span class="course__card-rating"
                    >{{ course.average_rating }}
                  </span>
                </v-card-text>
              </v-container>
            </v-card>
          </slide>
          <template #addons>
            <Navigation />
          </template>
        </carousel>
      </v-container>
    </v-main>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useCoursesStore } from "@/stores/coursesStore";
import NavBar from "@/components/NavBar.vue";
import Video from "@/assets/video_example.mp4";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Robot from "@/assets/Images/image.png";

const coursesStore = useCoursesStore();
const breakpoints = {
  1024: {
    itemsToShow: 5,
  },
  768: {
    itemsToShow: 3,
  },
  600: {
    itemsToShow: 2,
  },
  0: {
    itemsToShow: 1.3,
  },
};
const rating = ref(0);
const topCourses = computed(() => coursesStore.getTop10Rated);

onMounted(() => {
  coursesStore.fetchCourses();
});
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
.carousel {
  text-align: left;
}

.custom-carousel .v-card {
  margin-right: 20px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgba(255, 255, 255, 0.17);
  width: 300px;
  height: 350px;
  border-radius: 10px;
}

.title {
  color: var(--color-text-light);
  font-size: 2.4rem;
  margin-top: 10rem;
  margin-bottom: 2rem;
  font-family: var(--font-title);
  font-weight: 700;
}

.recomendations {
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
}

.v-card-subtitle {
  font-size: 1.4rem;
  font-family: var(--font-text);
  font-weight: 200;
  color: #a3a3a3;
  padding-top: 2rem;
}

.v-card-title {
  font-size: 1.6rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-text-light);
  white-space: normal;
  padding-top: 0;
}

.v-card-text {
  font-size: 1.4rem;
  font-family: var(--font-text);
  font-weight: 200;
  color: #a3a3a3;
  padding-top: 5rem;
}

.course__card-container {
  padding: 0;
}
.course__card-img {
  height: 10%;
}
.course__card-rating {
  color: var(--color-text-light);
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
  .course__title {
    font-size: 2.4rem;
  }

  .course__categorie {
    font-size: 1.2rem;
  }
  .course__header-info {
    height: 50vh;
  }
}
</style>
