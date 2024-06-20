<template>
  <!-- <div>
    <p v-if="course">{{ course.title }}</p>
    <p v-else>Loading...</p>
  </div> -->

  <div class="courseView">
    <nav>
      <NavBar />
    </nav>

    <v-main>
      <v-container fluid class="video-container">
        <video autoplay muted loop class="bg-video">
          <source :src="Video" type="video/mp4" />
          Your browser does not support the video.
        </video>
      </v-container>
      <div class="overlay">
        <v-container fluid class="info">
          <v-row class="d-flex align-center course__header-info">
            <v-col cols="12" xl="5">
              <div :key="course.id">
                <h1 class="course__title">
                  {{ course.title }}
                </h1>
                <p class="course__categorie mt-md-6 mt-3">
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

                <p class="course__cost mt-4">
                  {{ course.cost }}
                </p>
                <div class="mt-3 d-flex align-center">
                  <v-btn
                    color="primary"
                    class="header__btn-primary btn"
                    @click="openCourse(course)"
                  >
                    Inscrever</v-btn
                  >
                  <v-btn
                    class="ml-5 header__btn-secondary btn"
                    variant="outlined"
                    color="white"
                    >favoritos</v-btn
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-container fluid>
        <v-row>
          <v-col>
            <v-tabs v-model="tab" bg-color="primary" grow>
              <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
                {{ tab.title }}
              </v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="description">
                <v-container>
                  <v-row>
                    <v-col>
                      <h2>Descrição</h2>
                    </v-col>
                    <v-col>
                      <p>{{ course.description }}</p>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <h2>Objetivos</h2>
                    </v-col>
                    <v-col>
                      <ul>
                        <li
                          v-for="objective in course.program.objectives"
                          :key="objective"
                        >
                          {{ objective }}
                        </li>
                      </ul>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <h2>Conteúdos</h2>
                    </v-col>
                    <v-col>
                      <ul>
                        <li
                          v-for="module in course.program.contents"
                          :key="module"
                        >
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
                    <v-col>
                      <h2>Metodologias</h2>
                    </v-col>
                    <v-col>
                     <p>{{ course.program.methodologies }}</p> 
                    </v-col>
                  </v-row>
                  <v-row> </v-row>
                  <v-col>
                    <h2>Avaliação</h2>
                  </v-col>
                  <v-col>
                    <p>{{ course.program.assessment }}</p>
                  </v-col>
                </v-container>
              </v-tabs-window-item>

              <v-tabs-window-item value="resources">
                <v-container>
                  <v-row>
                    <v-col>
                      <h2>Bibliografia</h2>
                    </v-col>
                    <v-col>
                      <p> {{ course.program.bibliography }} </p>
                    </v-col>
                    <v-col>
                      <h2>Recursos adicionais</h2>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tabs-window-item>
              <v-tabs-window-item value="reviews"> 
                <v-container>
                  <v-row>
                    <v-col>
                      <h2>Reviews</h2>
                    </v-col>
                    <v-col>
                      <p>{{ course.reviews }}</p>
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
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCoursesStore } from "@/stores/coursesStore";
import NavBar from "@/components/NavBar.vue";
import Video from "@/assets/video_example.mp4";

export default {
  components: {
    NavBar,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const coursesStore = useCoursesStore();
    const course = ref(null);
    const tab = ref(null);

    const tabs = [
      { value: "description", title: "Descrição" },
      { value: "details", title: "Detalhes" },
      { value: "resources", title: "Recursos" },
      { value: "reviews", title: "Reviews" },
    ];

    const loadCourse = async () => {
      const id = Number(route.params.id);

      let loadedCourse = coursesStore.getCourseById(id);
      if (!loadedCourse) {
        await coursesStore.fetchCourses();
        loadedCourse = coursesStore.getCourseById(id);
      }

      if (loadedCourse) {
        course.value = loadedCourse;

        if (route.params.name !== loadedCourse.title) {
          router.replace({
            name: "course",
            params: { name: loadedCourse.title, id: loadedCourse.id },
          });
        }
      }
    };

    onMounted(() => {
      loadCourse();
    });

    watch(route, () => {
      loadCourse();
    });

    return {
      course,
      Video,
      tab,
      tabs,
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

.course__cost {
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
}
</style>
