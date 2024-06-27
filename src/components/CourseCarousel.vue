<template>
  <v-container fluid class="recomendations">
    <h1 class="title">{{ title }}</h1>
    <carousel
      ref="carousel"
      :items-to-show="5"
      :breakpoints="breakpoints"
      class="custom-carousel"
    >
      <slide v-for="course in courses" :key="course.id">
        <v-menu open-on-hover location="end" transition="scroll-x-transition">
          <template v-slot:activator="{ props, on }">
            <v-card
              class="course__card"
              v-bind="props"
              @mouseenter="showVideo[course.id] = true"
              @mouseleave="showVideo[course.id] = false"
              v-on="{ ...on, click: () => openCourse(course) }"
            >
              <v-container fluid class="course__card-container">
                <transition name="fade" mode="out-in">
                  <template v-if="showVideo[course.id]">
                    <video autoplay muted loop class="course__card-video">
                      <source :src="Video" type="video/mp4" />
                      Your browser does not support the video.
                    </video>
                  </template>
                  <template v-else>
                    <v-img
                      :src="CourseImage"
                      cover
                      class="course__card-img"
                    ></v-img>
                  </template>
                </transition>

                <v-card-subtitle>{{ course.category }}</v-card-subtitle>
                <div class="info">
                  <v-card-title>{{ course.title }}</v-card-title>
                  <v-card-text>
                    {{ course.duration }} | {{ course.cost }}
                    <span class="course__card-rating">{{
                      course.average_rating
                    }}</span>
                    <span>({{ course.total_reviews }})</span>
                  </v-card-text>
                </div>
              </v-container>
            </v-card>
          </template>

          <v-card
            max-width="300"
            class="v-card--reveal"
            @mouseenter="showVideo[course.id] = true"
            @mouseleave="showVideo[course.id] = false"
          >
            <v-card-text class="objectives__card-title">
              <h1>Objetivos</h1>
              <ul>
                <li
                  v-for="objective in course.program.objectives.slice(0, 3)"
                  :key="objective"
                >
                  {{ objective }}
                </li>
              </ul>
            </v-card-text>
            <div class="btns d-flex">
              <v-btn
                class="flex-grow-1"
                color="white"
                @click="openCourse(course)"
                >Inscrever</v-btn
              >
              <v-btn class="ml-5" variant="plain" color="white">
                <svg class="icon" width="24" height="24">
                  <use
                    xlink:href="../assets/coolicons-sprite.svg#Heart_01"
                  ></use>
                </svg>
              </v-btn>
            </div>
          </v-card>
        </v-menu>
      </slide>
      <template #addons>
        <Navigation />
      </template>
    </carousel>
  </v-container>
</template>

<script>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import CourseImage from "@/assets/Images/image.png";
import { ref } from "vue";
import Video from "@/assets/video_example.mp4";
import { useCourseNavigation } from "@/composables/courseNavigation";

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  props: {
    title: String,
    courses: Array,
  },

  setup(props) {
    const { openCourse } = useCourseNavigation();

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

    const menu = ref(true);
    const showVideo = ref({});

    props.courses.forEach((course) => {
      showVideo.value[course.id] = false;
    });

    return {
      breakpoints,
      props,
      CourseImage,
      menu,
      Video,
      showVideo,
      openCourse,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.objectives__card-title {
  padding: 2rem !important;
}

.objectives__card-title h1 {
  color: var(--color-text-light);
}

.objectives__card-title li {
  color: var(--color-text-light);
}

.v-menu > .v-overlay__content > .v-card,
.v-menu > .v-overlay__content > .v-sheet,
.v-menu > .v-overlay__content > .v-list {
  background-color: var(--color-primary-200);
}

.btns {
  padding: 2rem;
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

.course__card-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.course__card-rating {
  color: var(--color-text-light);
}

.btns {
  width: 100%;
}

.info {
  height: 100%;
}

@media (max-width: 768px) {
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
