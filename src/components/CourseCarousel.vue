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
        <v-hover v-slot="{ isHovering, props }">
          <v-card class="course__card" v-bind="props">
            <v-container fluid class="course__card-container">
              <v-img :src="CourseImage" cover class="course__card-img"></v-img>
              <v-card-subtitle>{{ course.category }}</v-card-subtitle>
              <v-card-title>{{ course.title }}</v-card-title>
              <v-card-text>
                {{ course.duration }} | {{ course.cost }}
                <span class="course__card-rating">{{
                  course.average_rating
                }}</span>
                <span>({{ course.total_reviews }})</span>
              </v-card-text>
            </v-container>
            <v-expand-transition>
              <div
                v-if="isHovering"
                class="d-flex flex-column transition-fast-in-fast-out v-card--reveal"
              >
                <p>{{ course.program.objectives }}</p>

                <v-btn color="primary">Inscrever</v-btn>
                <v-btn class="ml-5" variant="outlined" color="white"
                  >Mais informações</v-btn
                >
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
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

    return {
      breakpoints,
      props,
      CourseImage,
    };
  },
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
  background-color: blueviolet;
  height: 100%;
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
