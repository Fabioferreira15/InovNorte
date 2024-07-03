<template>
  <v-main>
    <v-container fluid class="user__info">
      <v-row>
        <v-col
          cols="12"
          md="1"
          class="d-flex align-center justify-center flex-column flex-md-row"
        >
          <v-skeleton-loader :height="64" :width="64"></v-skeleton-loader>
          <v-skeleton-loader
            class="mobile-username"
            width="100%"
            height="2rem"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="11" class="interests">
          <div
            class="user__name--interests d-flex flex-column flex-md-row align-center"
          >
            <v-skeleton-loader
              class="desktop-username"
              width="100%"
              height="2rem"
            ></v-skeleton-loader>
            <div class="interests-container">
              <v-skeleton-loader
                class="interest-chip"
                v-for="n in 5"
                :key="n"
                width="8rem"
                height="3rem"
              ></v-skeleton-loader>
            </div>
          </div>
          <v-skeleton-loader
            class="user__biography"
            width="100%"
            height="10rem"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="v-btn"
            width="10rem"
            height="3rem"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="containers">
      <v-row>
        <v-col cols="12" md="8">
          <v-card flat>
            <v-card-title class="title">Cursos em progresso</v-card-title>

            <v-skeleton-loader
              v-if="mostrarEmptyStateCursos"
              class="my-4"
              height="20rem"
            ></v-skeleton-loader>

            <div v-else class="horizontal-scroll-container">
              <v-row class="flex-nowrap">
                <v-col v-for="n in 4" :key="n" cols="7" sm="6" md="4">
                  <v-card flat class="mx-auto course-card">
                    <v-skeleton-loader
                      class="course-image"
                      height="15rem"
                    ></v-skeleton-loader>
                    <v-card-title
                      ><v-skeleton-loader
                        width="100%"
                        height="2rem"
                      ></v-skeleton-loader
                    ></v-card-title>
                    <v-card-actions>
                      <v-skeleton-loader
                        class="v-btn"
                        width="8rem"
                        height="3rem"
                      ></v-skeleton-loader>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card flat>
            <v-card-title class="title">As minhas comunidades</v-card-title>

            <v-skeleton-loader
              v-if="mostrarEmptyStateComunidades"
              class="my-4"
              height="20rem"
            ></v-skeleton-loader>
            <v-sheet v-else height="400"></v-sheet>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
          <v-card flat>
            <v-card-title class="title">Conversas fixadas</v-card-title>

            <v-skeleton-loader
              v-if="mostrarEmptyStateConversas"
              class="my-4"
              height="20rem"
            ></v-skeleton-loader>
            <v-sheet v-else height="200"></v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  props: {
    mostrarEmptyStateCursos: Boolean,
    mostrarEmptyStateComunidades: Boolean,
    mostrarEmptyStateConversas: Boolean,
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

.v-skeleton-loader {
  background-color: transparent;
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

.emptyState p {
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
