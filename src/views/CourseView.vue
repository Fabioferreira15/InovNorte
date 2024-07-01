<template>
  <div class="courseView">
    <nav>
      <NavBar />
    </nav>

    <v-main v-if="coursesStore.isLoading">
      <SkeletonLoader />
    </v-main>

    <v-main v-else>
      <v-container fluid class="video-container">
        <video autoplay muted loop class="bg-video">
          <source :src="Video" type="video/mp4" />
          Your browser does not support the video.
        </video>
      </v-container>
      <div class="overlay">
        <v-container fluid>
          <v-row>
            <v-col>
              <Breadcrumb />
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid class="info">
          <v-row class="d-flex align-center course__header-info">
            <v-col cols="12" md="5">
              <div :key="course.id">
                <h1 class="course__title">
                  {{ course.title }}
                </h1>
                <p class="course__categorie mt-3">
                  {{ course.category }}
                  <span>
                    <v-rating
                      v-model="course.average_rating"
                      active-color="primary"
                      color="white"
                      half-increments
                      readonly
                      size="20"
                    ></v-rating>
                  </span>
                  <span>({{ course.total_reviews }})</span>
                </p>
                <p class="course__description mt-2">{{ course.short_desc }}</p>
                <div class="mt-3 d-flex align-center">
                  <v-btn
                    color="primary"
                    class="header__btn-primary btn"
                    @click="openCourse(course)"
                  >
                    Inscrever
                  </v-btn>
                  <v-btn icon flat class="favourite">
                    <v-icon size="large">mdi-heart-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-container fluid class="tabs">
        <v-row>
          <v-col>
            <v-bottom-navigation
              v-if="isMobile"
              v-model="tab"
              class="v-tabs"
              color="primary"
            >
              <v-btn
                v-for="tabItem in tabs"
                :key="tabItem.value"
                :value="tabItem.value"
                class="v-tab"
              >
                {{ tabItem.title }}
              </v-btn>
            </v-bottom-navigation>

            <v-tabs v-else v-model="tab" color="primary" grow class="v-tabs">
              <v-tab
                v-for="tabItem in tabs"
                :key="tabItem.value"
                :value="tabItem.value"
              >
                {{ tabItem.title }}
              </v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="description">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <h2 class="title">Descrição</h2>
                    </v-col>
                    <v-col cols="12">
                      <p class="content">
                        {{ course.description }}
                      </p>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <h2 class="title">Objetivos</h2>
                    </v-col>
                    <v-col cols="12">
                      <ul class="columns">
                        <li
                          class="content"
                          v-for="objective in course.program.objectives"
                          :key="objective"
                        >
                          <v-icon small color="white" class="mr-2">
                            <svg class="icon" width="24" height="24">
                              <use
                                xlink:href="../assets/coolicons-sprite.svg#Checkbox_Check"
                              ></use>
                            </svg>
                          </v-icon>
                          {{ objective }}
                        </li>
                      </ul>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <h2 class="title">Conteúdos</h2>
                    </v-col>
                    <v-col cols="12">
                      <ul>
                        <li
                          class="content"
                          v-for="module in course.program.contents"
                          :key="module"
                        >
                          <v-icon color="white" class="mr-2">
                            <svg class="icon" width="24" height="24">
                              <use
                                xlink:href="../assets/coolicons-sprite.svg#Checkbox_Check"
                              ></use>
                            </svg>
                          </v-icon>
                          {{ module }}
                        </li>
                      </ul>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tabs-window-item>

              <v-tabs-window-item value="details">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <h2 class="title">Metodologias</h2>
                    </v-col>
                    <v-col cols="12">
                      <p class="content">{{ course.program.methodologies }}</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <h2 class="title">Avaliação</h2>
                    </v-col>
                    <v-col cols="12">
                      <p class="content">{{ course.program.assessment }}</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tabs-window-item>

              <v-tabs-window-item value="resources">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <h2 class="title">Bibliografia</h2>
                    </v-col>
                    <v-col cols="12">
                      <p class="content">{{ course.program.bibliography }}</p>
                    </v-col>
                    <v-col cols="12">
                      <h2 class="title">Recursos adicionais</h2>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tabs-window-item>

              <v-tabs-window-item value="reviews">
                <v-container >
                  <v-row v-if="course.reviews && course.reviews.length > 0" class="d-flex align-center justify-center">
                    <v-col
                      v-for="(review, index) in course.reviews"
                      :key="index"
                      cols="12"
                      sm="4"
                    >
                      <v-container class="review">
                        <v-row>
                          <v-col
                            cols="1"
                            class="review__user "
                          >
                            <v-avatar size="40">
                              <img
                                :src="Avatar"
                                alt="User image"
                              />
                            </v-avatar>
                          </v-col>
                          <v-col cols="10">
                            <v-row>
                              <v-col cols="12" class="review__name">{{
                                review.user.name
                              }}</v-col>
                              <v-col cols="12" class="review__rating">
                                <v-rating
                                  v-model="review.nota"
                                  active-color="primary"
                                  color="white"
                                  half-increments
                                  readonly
                                  size="20"
                                ></v-rating>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-row>
                            <v-col cols="12" class="review__comment">{{
                              review.comentário
                            }}</v-col>
                          </v-row>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                  <v-row v-else>
                    <v-col cols="12">
                      <p class="noReviews">Não existem reviews para este curso.</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCoursesStore } from "@/stores/coursesStore";
import { useCourseNavigation } from "@/composables/courseNavigation";
import NavBar from "@/components/NavBar.vue";
import Video from "@/assets/video_example.mp4";
import Avatar from "@/assets/Images/avatar.png";
import SkeletonLoader from "@/components/skeletonLoaders/HomeSkeleton.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  components: {
    NavBar,
    SkeletonLoader,
    Breadcrumb,
  },

  setup() {
    const route = useRoute();
    const coursesStore = useCoursesStore();
    const tab = ref(null);
    const { openCourse } = useCourseNavigation();
    const isMobile = ref(false);

    const checkIsMobile = () => {
      isMobile.value = window.matchMedia("(max-width: 768px)").matches;
    };

    onMounted(() => {
      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkIsMobile);
    });

    const tabs = [
      { value: "description", title: "Informações" },
      { value: "details", title: "Detalhes" },
      { value: "resources", title: "Recursos" },
      { value: "reviews", title: "Reviews" },
    ];

    const course = computed(() => {
      return coursesStore.course;
    });

    onMounted(() => {
      coursesStore.fetchCourseById(route.params.id);
    });

    watch(route, () => {
      coursesStore.fetchCourseById(route.params.id);
    });

    return {
      course,
      Video,
      Avatar,
      tab,
      tabs,
      openCourse,
      coursesStore,
      isMobile,
    };
  },
};
</script>

<style scoped>
.courseView {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background-home.svg");
  background-size: cover;
  position: relative;
  min-height: 100vh;
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
  font-size: 3.5rem;
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
  font-weight: 100;
}

.title {
  font-family: var(--font-title);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-text-light);
}

.content {
  font-family: var(--font-text);
  font-size: 1.6rem;
  font-weight: 200;
  color: var(--color-text-light);
  line-height: 2;
}

.v-tabs {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgba(255, 255, 255, 0.17);
}

.v-tabs .v-tab:not(.v-tab--active) {
  color: var(--color-text-light);
  text-transform: capitalize;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: var(--font-title);
}

.columns {
  column-count: 2;
  column-gap: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

.favourite {
  background-color: transparent;
  color: var(--color-text-light);
}



.review__user {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
}

.review__user img {
  border-radius: 50%;
  object-fit: cover;
  width: 100%; /* Ajuste o tamanho conforme necessário */
  height: 100%; /* Ajuste o tamanho conforme necessário */
}

.review__name {
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--color-text-light);
  font-family: var(--font-title);
  padding: 0;
}

.review__rating {
  padding: 0;
}

.review__comment {
  font-size: 1.4rem;
  color: var(--color-text-light);
  font-family: var(--font-text);
  font-weight: 200;
  padding: 0;
}

.noReviews {
  font-size: 1.6rem;
  color: var(--color-text-light);
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

  .course__cost {
    font-size: 1.2rem;
  }

  .title {
    font-size: 1.8rem;
  }

  .content {
    font-size: 1.2rem;
  }

  .columns {
    column-count: 1;
  }
  .tabs {
    margin-top: 20rem;
  }
}
</style>
