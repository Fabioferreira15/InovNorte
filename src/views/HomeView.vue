<template>
  <div class="home">
    <nav class="navbar">
      <NavBar />
    </nav>

    <v-main class="main">
      <v-container fluid class="video-container">
        <transition name="fade" mode="out-in">
          <div :key="highlightedCourse.id">
            <video autoplay muted loop class="bg-video">
              <source :src="Video" type="video/mp4" />
              Your browser does not support the video.
            </video>
          </div>
        </transition>
      </v-container>
      <div class="overlay">
        <v-container fluid class="info">
          <v-row class="d-flex align-center course__header-info">
            <v-col cols="12" xl="5">
              <transition name="slide-fade" mode="out-in">
                <div :key="highlightedCourse.id">
                  <h1 class="course__title">
                    {{ highlightedCourse.title }}
                  </h1>
                  <p class="course__categorie mt-md-6 mt-3">
                    {{ highlightedCourse.category }}
                    <span>
                      <v-rating
                        v-model="highlightedCourse.average_rating"
                        active-color="primary"
                        color="white"
                        half-increments
                        readonly
                        size="20"
                      ></v-rating>
                    </span>
                    <span>({{ highlightedCourse.total_reviews }})</span>
                  </p>

                  <p class="course__description mt-4">
                    {{ highlightedCourse.description }}
                  </p>
                  <div class="mt-3 d-flex align-center">
                    <v-btn color="primary" class="header__btn-primary btn">
                      Inscrever</v-btn
                    >
                    <v-btn
                      class="ml-5 header__btn-secondary btn"
                      variant="outlined"
                      color="white"
                      >Mais informações</v-btn
                    >
                  </div>
                </div>
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <CourseCarousel title="Em destaque" :courses="topCourses" />

      <CourseCarousel title="Novidades" :courses="RecentlyAdded" />

      <v-container fluid class="allcourses">
        <v-row>
          <v-col cols="12" class="d-flex align-center justify-center">
            <v-btn
              class="allcourses__btn btn"
              color="primary"
              :to="{ name: 'course-catalog' }"
              >Ver todos os cursos</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid class="categories">
        <v-row>
          <v-col cols="12">
            <h2>Explora as nossas categorias</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="3"
            v-for="category in categories"
            :key="category.id"
          >
            <v-card class="card__categories">
              <v-img
                :src="category.image"
                cover
                class="card__categories-image"
              ></v-img>

              <v-container class="card_categories-info">
                <v-card-title>{{ category.name }}</v-card-title>
                <v-card-text class="mb-4">{{
                  category.description
                }}</v-card-text>
                <v-btn color="primary">Explorar</v-btn>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <Search />
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
    const rating = ref(3);
    const coursesStore = useCoursesStore();
    const highlightedCourse = ref({
      title: "",
      category: "",
      description: "",
      rating: 0,
    });
    const categories = ref([]);

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

    const getRandomCourse = () => {
      const allCourses = coursesStore.courses;
      const randomIndex = Math.floor(Math.random() * allCourses.length);
      return allCourses[randomIndex];
    };

    const updateHighlightedCourse = () => {
      highlightedCourse.value = getRandomCourse();
    };

    onMounted(() => {
      coursesStore.fetchCourses().then(() => {
        updateHighlightedCourse();
        setInterval(updateHighlightedCourse, 5000);
      });

      coursesStore.fetchCategories().then(() => {
        categories.value = coursesStore.categories;
      });
    });

    return {
      topCourses,
      RecentlyAdded,
      Video,
      rating,
      highlightedCourse,
      categories,
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
  background-color: var(--color-primary-200);
  height: 100%;
  padding: 2rem;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 0.5s ease;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-250px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

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
  position: relative;
}

.video-container {
  position: relative;
  height: 100vh;
}

.overlay {
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
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
  display: flex;
  align-items: center;
  gap: 1rem;
}

.course__description {
  color: var(--color-text-light);
  font-size: 1.6rem;
  font-family: var(--font-text);
  font-weight: 200;
}

.btn {
  font-family: var(--font-text);
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: capitalize;
}

.header__btn-primary {
  background-color: var(--color-primary-200);
  color: var(--color-text-light);
  transition: all 0.3s;
}

.header__btn-primary:hover {
  box-shadow: 0px 4px 10px 0px var(--color-primary-200);
}

.header__btn-secondary {
  color: var(--color-primary-200);
}

.categories {
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
}

.categories h2 {
  color: var(--color-text-light);
  font-size: 2.4rem;
  margin-top: 10rem;
  margin-bottom: 2rem;
  font-family: var(--font-title);
  font-weight: 700;
}

.card__categories {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgba(255, 255, 255, 0.17);
  min-height: 100%;
  max-height: 100%;
}

.card__categories .v-card-title {
  font-size: 1.6rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-text-light);
  padding: 0;
}

.card__categories .v-card-text {
  font-size: 1.4rem;
  font-family: var(--font-text);
  font-weight: 200;
  color: #a3a3a3;
  padding: 0;
}

.card__categories-image {
  max-height: 200px;
}

.card_categories-info {
  padding: 1rem;
}

.allcourses {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

.allcourses__btn {
  color: var(--color-text-light);
  transition: all 0.3s;
}

.allcourses__btn:hover {
  transform: translateY(-10px);
  box-shadow: 0px 4px 10px 0px var(--color-primary-200);
}

@media (max-width: 768px) {
  .bg-video {
    height: 50vh;
  }
  .video-container {
    height: 50vh;
  }

  .overlay {
    height: 40vh;
    background: none;
    position: static;
    top: auto;
    left: auto;
  }
  .course__header-info {
    height: 0;
  }
  .course__title {
    font-size: 2rem;
  }

  .course__categorie {
    font-size: 1.2rem;
  }

  .course__description {
    font-size: 1.2rem;
  }
}
</style>
