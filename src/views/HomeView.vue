<template>
  <div class="home">
    <nav class="navbar">
      <NavBar />
    </nav>

    <v-main v-if="coursesStore.isLoading">
      <SkeletonLoader />
    </v-main>
    <v-main v-else class="main">
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
            <v-col cols="12" md="5">
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
                    {{ highlightedCourse.short_desc }}
                  </p>
                  <div class="mt-3 d-flex align-center">
                    <v-btn
                      color="primary"
                      class="header__btn-primary btn"
                      @click="openCourse(highlightedCourse)"
                    >
                      Inscrever</v-btn
                    >
                    <v-btn
                      class="ml-5 header__btn-secondary btn"
                      variant="outlined"
                      color="white"
                      @click="openCourse(highlightedCourse)"
                      >Mais informações</v-btn
                    >
                  </div>
                </div>
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-container fluid class="best__choice">
        <v-row>
          <v-col cols="12">
            <h1 class="user__message">
              Bem-vindo de volta <span>{{ userName }}</span>
            </h1>
          </v-col>
        </v-row>
        <v-row class="mt-6">
          <v-col cols="12">
            <h2 class="title">A nossa escolha para ti</h2>
          </v-col>
        </v-row>
        <v-card
          v-if="getBestCourseForUser"
          class="OurPick"
          @mouseenter="showVideo[getBestCourseForUser.id] = true"
          @mouseleave="showVideo[getBestCourseForUser.id] = false"
        >
          <v-row>
            <v-col cols="12" md="2">
              <template v-if="showVideo[getBestCourseForUser.id]">
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
            </v-col>
            <v-col cols="12" md="9" class="d-flex flex-column justify-center">
              <v-card-title class="course__card-title">{{
                getBestCourseForUser.title
              }}</v-card-title>
              <v-card-subtitle class="course__card-category">{{
                getBestCourseForUser.category
              }}</v-card-subtitle>
              <v-card-subtitle class="course__card-trainer">{{
                getBestCourseForUser.trainer
              }}</v-card-subtitle>
              <v-card-text class="mt-4 rating d-flex align-center">
                <v-rating
                  v-model="getBestCourseForUser.average_rating"
                  active-color="primary"
                  color="white"
                  half-increments
                  readonly
                  size="23"
                  class="mr-4"
                ></v-rating>
                <span class="course__card-rating">{{
                  getBestCourseForUser.average_rating
                }}</span>
                <span class="course__card-total"
                  >({{ getBestCourseForUser.total_reviews }})</span
                >
              </v-card-text>
              <div class="d-flex flex-row align-center btns mt-auto">
                <v-btn color="primary" @click="openCourse(getBestCourseForUser)"
                  >Inscrever</v-btn
                >
                <v-btn icon flat class="favourite">
                  <v-icon size="large">mdi-heart-outline</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="1" class="d-flex justify-end price">
              <p>{{ getBestCourseForUser.cost }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <CourseCarousel
        title="Em destaque"
        :courses="topCourses"
        class="destaque"
      />

      <CourseCarousel
        title="Novidades"
        :courses="RecentlyAdded"
        class="recents"
      />

      <CourseCarousel
        title="Baseado nos teus interesses"
        :courses="BasedOnInterests"
        class="interests"
      />

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
                <v-btn
                  @click="openCategory(category.name)"
                  class="explore__btn"
                  color="primary"
                  >Explorar</v-btn
                >
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import { useCoursesStore } from "@/stores/coursesStore";
import NavBar from "@/components/NavBar.vue";
import Video from "@/assets/video_example.mp4";
import CourseCarousel from "@/components/CourseCarousel.vue";
import { useCourseNavigation } from "@/composables/courseNavigation";
import CourseImage from "@/assets/Images/image.png";
import SkeletonLoader from "@/components/skeletonLoaders/HomeSkeleton.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    NavBar,
    CourseCarousel,
    SkeletonLoader,
  },
  setup() {
    const rating = ref(3);
    const coursesStore = useCoursesStore();
    const highlightedCourse = ref({
      id: null,
      title: "",
      category: "",
      description: "",
      rating: 0,
    });
    const categories = ref([]);
    const { openCourse } = useCourseNavigation();
    const router = useRouter();

    const openCategory = (categoryName) => {
      router.push({ name: "course-catalog", query: { categoryName } });
    };

    const topCourses = computed(() => {
      return coursesStore.top10Rated;
    });

    const RecentlyAdded = computed(() => {
      return coursesStore.recentCourses;
    });

    const BasedOnInterests = computed(() => {
      return coursesStore.interestsCourses;
    });
    const getBestCourseForUser = computed(() => {
      return coursesStore.bestForUser;
    });

    const getRandomCourse = () => {
      const randomIndex = Math.floor(
        Math.random() * coursesStore.randomCourses.length
      );
      return coursesStore.randomCourses[randomIndex];
    };

    const updateHighlightedCourse = () => {
      highlightedCourse.value = getRandomCourse();
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user.username;

    const showVideo = ref({});

    onMounted(() => {
      if (coursesStore.randomCourses.length === 0) {
        coursesStore.fetchRandomCourses().then(() => {
          updateHighlightedCourse();
          setInterval(updateHighlightedCourse, 5000);
        });
      } else {
        updateHighlightedCourse();
        setInterval(updateHighlightedCourse, 5000);
      }

      if (coursesStore.bestForUser === null) {
        coursesStore.fetchBestForUser(user.id);
      }

      if (coursesStore.interestsCourses.length === 0) {
        coursesStore.fetchInterestsCourses(user.id);
      }

      if (coursesStore.categories.length === 0) {
        coursesStore.fetchCategories().then(() => {
          categories.value = coursesStore.categories;
        });
      }

      if (coursesStore.top10Rated.length === 0) {
        coursesStore.fetchTop10Rated();
      }

      if (coursesStore.recentCourses.length === 0) {
        coursesStore.fetchRecentlyAdded();
      }
    });

    return {
      topCourses,
      RecentlyAdded,
      Video,
      rating,
      highlightedCourse,
      categories,
      openCourse,
      userName,
      BasedOnInterests,
      getBestCourseForUser,
      CourseImage,
      showVideo,
      coursesStore,
      openCategory,
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

.best__choice {
  max-width: 1800px;
  scale: 0.8;
  opacity: 0;
  animation: fade-in linear forwards;
  animation-timeline: view(450px 200px);
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
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px var(--color-primary-100);
}

.course__card-img {
  border-radius: 5px;
  height: 100%;
}

.course__card-title {
  color: var(--color-text-light);
  font-size: 1.6rem;
  font-weight: 700;
  font-family: var(--font-title);
  padding: 0;
  letter-spacing: 1px;
}

.course__card-category {
  font-size: 1.4rem;
  font-weight: 200;
  font-family: var(--font-text);
  color: var(--color-text-light);
  padding: 0;
}

.course__card-trainer {
  font-size: 1.4rem;
  font-weight: 200;
  font-family: var(--font-text);
  color: var(--color-text-light);
  padding: 0;
}

.v-card-text {
  padding: 0;
}

.favourite {
  background-color: transparent;
  color: var(--color-text-light);
}
.rating {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 1.6rem;
  color: var(--color-text-light);
}

.course__card-total {
  color: #8c8c8c;
}

.btns {
  height: 100%;
}

.price {
  font-size: 1.4rem;
  font-weight: 400;
  font-family: var(--font-title);
  color: var(--color-text-light);
  text-transform: capitalize;
}

.OurPick {
  padding: 2rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgba(255, 255, 255, 0.17);
}

.title {
  color: var(--color-text-light);
  font-size: 2.4rem;
  font-family: var(--font-title);
  font-weight: 700;
}

.user__message {
  color: var(--color-text-light);
  font-size: 4rem;
  font-family: var(--font-title);
  font-weight: 700;
  margin-top: 5rem;
}

.user__message span {
  -webkit-text-decoration: var(--color-primary-200) double underline;
  text-decoration: var(--color-primary-200) double underline;
}

.course__card-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.explore__btn {
  width: 100%;
}

.destaque,
.interests {
  transform: translateX(-100px);
  opacity: 0;
  animation: fade-left linear forwards;
  animation-timeline: view(650px 200px);
}

.recents {
  transform: translateX(100px);
  opacity: 0;
  animation: fade-left linear forwards;
  animation-timeline: view(650px 200px);
}

@keyframes fade-in {
  to {
    scale: 1;
    opacity: 1;
  }
}

@keyframes fade-left {
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 960px) {
  .bg-video {
    height: 40vh;
  }
  .video-container {
    height: 40vh;
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
}

@media (max-width: 768px) {
  .course__title {
    font-size: 2rem;
  }

  .course__categorie {
    font-size: 1.2rem;
  }

  .course__description {
    font-size: 1.2rem;
  }
  .best__choice {
    animation-timeline: view(650px 200px);
  }

  .destaque,
  .interests {
    transform: none;
    opacity: 1;
    animation: none;
  }
  .recents {
    transform: none;
    opacity: 1;
    animation: none;
  }
}
</style>
