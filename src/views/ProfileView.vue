<template>
  <div class="profile">
    <nav>
      <NavBar />
    </nav>

    <v-main>
      <v-container v-if="!authStore.isLoading" fluid class="user__info">
        <v-row>
          <v-col
            cols="12"
            md="1"
            class="d-flex align-center justify-center flex-column flex-md-row"
          >
            <v-avatar :image="Avatar" size="64"></v-avatar>
            <h2 class="mobile-username">{{ userProfile.username }}</h2>
          </v-col>
          <v-col cols="12" md="11" class="interests">
            <div
              class="user__name--interests d-flex flex-column flex-md-row align-center"
            >
              <h2 class="desktop-username">{{ userProfile.username }}</h2>

              <div class="interests-container">
                <v-chip
                  v-for="interest in userProfile.interests"
                  :key="interest"
                  class="interest-chip"
                >
                  {{ interest }}
                </v-chip>
              </div>
            </div>
            <p class="user__biography">
              {{ userProfile.bio }}
            </p>
            <v-btn color="primary">Editar perfil</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid class="containers">
        <v-row>
          <v-col cols="12" md="8">
            <v-card flat>
              <v-card-title class="title">Cursos em progresso</v-card-title>

              <div
                class="horizontal-scroll-container"
                v-if="courses.length > 0"
              >
                <v-row class="flex-nowrap">
                  <v-col
                    v-for="curso in courses"
                    :key="curso.id"
                    cols="7"
                    sm="6"
                    md="4"
                  >
                    <v-card flat class="mx-auto course-card">
                      <v-img :src="CourseImage" class="course-image"></v-img>
                      <v-card-title>{{ curso.title }}</v-card-title>

                      <v-card-actions>
                        <v-btn color="primary" block>Continuar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </div>

              <v-empty-state v-else class="my-4">
                <template v-slot:image>
                  <v-icon size="100">mdi-book-open-variant</v-icon>
                </template>
                <div class="d-flex align-center justify-center flex-column emptyState">
                  <p>
                    Ainda não começou nenhum curso. Explore os nossos cursos e
                    comece a sua aprendizagem
                  </p>
                  <v-btn @click="router.push('/course-catalog')"
                    >Explorar</v-btn
                  >
                </div>
              </v-empty-state>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card flat>
              <v-card-title class="title">As minhas comunidades</v-card-title>
              <v-empty-state v-if="mostrarEmptyStateComunidades" class="my-4">
                <template v-slot:image>
                  <v-icon size="100">mdi-account-group</v-icon>
                </template>
                <div class="d-flex align-center justify-center flex-column emptyState">
                  <p >
                    Ainda não participa em nenhuma comunidade. Encontre
                    comunidades do seu interesse.
                  </p>
                  <v-btn>Comunidades</v-btn>
                </div>
              </v-empty-state>
              <v-sheet v-else height="400"></v-sheet>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8">
            <v-card flat>
              <v-card-title class="title">Conversas fixadas</v-card-title>
              <v-empty-state v-if="mostrarEmptyStateConversas" class="my-4">
                <template v-slot:image>
                  <v-icon size="100">mdi-message-text</v-icon>
                </template>
                <div class="d-flex align-center justify-center flex-column emptyState">
                  <p>
                    Sem conversas fixadas. Fixe as suas conversas favoritas para
                    fácil acesso.
                  </p>
                  <v-btn>Nova conversa</v-btn>
                </div>
              </v-empty-state>
              <v-sheet v-else height="200"></v-sheet>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import NavBar from "@/components/NavBar.vue";
import Avatar from "@/assets/Images/avatar.png";
import { useRouter } from "vue-router";
import CourseImage from "@/assets/Images/image.png";

export default {
  components: {
    NavBar,
  },

  setup() {
    const authStore = useAuthStore();
    const mostrarEmptyStateCursos = ref(true);
    const mostrarEmptyStateComunidades = ref(true);
    const mostrarEmptyStateConversas = ref(true);
    const router = useRouter();

    const courses = computed(() => {
      return authStore.coursesInProgress;
    });

    const userProfile = computed(() => {
      return authStore.userProfile;
    });

    onMounted(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        authStore.fetchUserById(user.id);
      }
    });

    return {
      userProfile,
      Avatar,
      authStore,
      mostrarEmptyStateCursos,
      mostrarEmptyStateComunidades,
      mostrarEmptyStateConversas,
      router,
      courses,
      CourseImage,
    };
  },
};
</script>

<style scoped>
.profile {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background-home.svg");
  background-size: cover;
  min-height: 100vh;
}

.user__info {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgba(255, 255, 255, 0.17);
  margin-top: 4rem;
  width: 90%;
}
.containers {
  width: 90%;
}

.user__name--interests {
  margin-top: 1rem;
}

.user__name--interests h2 {
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-title);
  color: var(--color-text-light);
  margin-right: 2rem;
}

.mobile-username {
  display: none;
  font-size: 1.6rem;
  font-weight: 700;
  font-family: var(--font-title);
  color: var(--color-text-light);
  margin-top: 0.5rem;
}

.desktop-username {
  display: block;
}

.interests-container {
  display: flex;
  flex-wrap: wrap;
}

.user__biography {
  font-size: 1.4rem;
  font-family: var(--font-text);
  color: var(--color-text-light);
  font-weight: 300;
  margin-top: 1rem;
}

.v-btn {
  font-family: var(--font-title);
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 8px;
  margin-top: 1rem;
}

.interest-chip {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: var(--color-primary-200);
  min-width: 8rem;
  height: 3rem !important;
  font-family: var(--font-text);
  font-size: 1.4rem !important;
  font-weight: 300;
  color: var(--color-text-light);
}

.v-card {
  background-color: transparent;
}

.course-card {
  max-width: 25rem;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgba(255, 255, 255, 0.17);
}

.course-card .v-card-title {
  font-family: var(--font-title);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-text-light);
}

.couse-image {
  height: 15rem;
}

.horizontal-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: thin;
}

.v-row {
  display: flex;
}

.title {
  font-family: var(--font-title);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-light);

}

.emptyState {
  text-align: center;
}

.emptyState p{
  font-size: 1.4rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: #888;


}

@media screen and (max-width: 768px) {
  .user__name--interests h2 {
    margin-right: 0;
    font-size: 1.6rem;
  }

  .interest-chip {
    min-width: 6rem;
    height: 2.5rem !important;
    font-size: 1.2rem !important;
  }

  .user__biography {
    font-size: 1.2rem;
  }

  .mobile-username {
    display: block;
  }

  .desktop-username {
    display: none;
  }

  .d-flex.align-center.justify-center.flex-column {
    align-items: center !important;
  }
  .interests {
    padding-top: 0;
  }
  .course-card {
    max-width: 18rem;
  }
  .course-image {
    height: 10rem;
  }
}
</style>
