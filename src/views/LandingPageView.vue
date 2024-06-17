<template>
  <nav>
    <NavBar />
  </nav>
  <v-main class="d-flex flex-column align-center background">
    <v-container
      class="text-md-left text-lg-center d-flex flex-column align-center py-5 mt-sm-5 intro-section"
    >
      <h1 class="heading">Explore, Aprenda e Conecte-se</h1>
      <p class="mb-4 description">
        Descubra cursos sob medida, obtenha suporte instantâneo e integre-se a
        uma comunidade de profissionais
      </p>
      <div class="d-flex justify-content-center">
        <v-btn color="primary" class="btn-hero">Comece agora</v-btn>
        <v-btn variant="outlined" color="white" class="btn-hero"
          >Saiba Mais</v-btn
        >
      </div>
    </v-container>
    <v-container class="features mt-10">
      <v-row class="justify-center">
        <v-col class="d-flex justify-center" cols="12" md="4">
          <router-link
            :to="{ name: 'homeCatalog' }"
            tag="div"
            style="text-decoration: none; color: inherit"
          >
            <v-card
              class="d-flex flex-column justify-center align-center feature feature-left"
            >
              <div style="width: 100px; height: 100px">
                <v-img
                  :src="bookImage"
                  alt="Catálogo de Cursos"
                  max-width="100"
                  class="align-self-center"
                ></v-img>
              </div>
              <v-card-title class="mt-4">Catálogo de Cursos</v-card-title>
              <v-card-text class="mt-2">
                Explore cursos atualizados em diversas áreas e impulsione sua
                carreira.
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
        <v-col class="d-flex justify-center" cols="12" md="4">
          <v-card
            class="d-flex flex-column justify-center align-center feature feature-up"
          >
            <div style="width: 100px; height: 100px">
              <v-img
                :src="botImage"
                alt="Helpdesk Virtual"
                max-width="100"
              ></v-img>
            </div>
            <v-card-title class="mt-4">Helpdesk Virtual</v-card-title>
            <v-card-text class="mt-2">
              Tenha acesso a um assistente virtual 24 horas por dia para tirar
              dúvidas e obter suporte rápido.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="d-flex justify-center" cols="12" md="4">
          <v-card
            class="d-flex flex-column justify-center align-center feature feature-right"
          >
            <div style="width: 100px; height: 100px">
              <v-img
                :src="comunity"
                alt="Comunidades Práticas"
                max-width="100"
              ></v-img>
            </div>
            <v-card-title class="mt-4">Comunidades Práticas</v-card-title>
            <v-card-text class="mt-2">
              Conecte-se com outros profissionais, compartilhe conhecimento e
              participe de discussões relevantes.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import NavBar from "../components/NavBarLanding.vue";
import Button from "../components/Button.vue";

import bookImage from "@/assets/Images/catalogo.png";
import botImage from "@/assets/Images/bot.png";
import comunity from "@/assets/Images/comunidades.png";

export default {
  name: "LandingPageView",
  components: {
    NavBar,
    Button,
  },
  data() {
    return {
      bookImage,
      botImage,
      comunity,
    };
  },
};
</script>

<style scoped>
.background {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background.svg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  width: 100%;
  color: var(--color-text-light);
}

.heading {
  font-family: var(--font-title);
  font-size: 6rem;
  font-weight: 900;
}

.description {
  font-family: var(--font-text);
  font-weight: 200;
  font-size: 2rem;
  width: 60%;
  display: block;
}

.btn-hero {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.6rem;
  text-transform: capitalize;
}

.btn-hero + .btn-hero {
  margin-left: 1rem;
}

.features .v-card {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgba(255, 255, 255, 0.17);
  padding: 2rem;
  width: 100%;
  max-width: 350px;
  min-height: 280px;
  transition: transform 0.3s;
}

.features .v-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 4px 62.5px 0px var(--color-primary-200);
}

.features .v-card-title {
  font-family: var(--font-title);
  font-size: 2rem;
  font-weight: 700;
  color: #f8f9fa;
}

.features .v-card-text {
  font-family: var(--font-text);
  font-size: 1.6rem;
  font-weight: 200;
  color: #f8f9fa;
  text-align: center;
  line-height: 1.5;
  padding: 0;
}

.feature-left {
  animation: fadeInLeft 1s ease;
}

.feature-up {
  animation: fadeInUp 1s ease;
}

.feature-right {
  animation: fadeInRight 1s ease;
}

/* ANIMATIONS */

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .heading {
    font-size: 2.5rem;
    letter-spacing: 0;
    margin-top: 5rem;
    width: 100%;
  }
  .description {
    font-size: 1.5rem;
    margin: 2rem 0;
    width: 100%;
  }

  .feature {
    max-width: 100%;
    margin: 10px 0;
  }
}

@media (max-width: 960px) {
  .heading {
    font-size: 2.5rem;
    letter-spacing: 0;
    margin-top: 5rem;
    width: 100%;
  }
  .description {
    font-size: 1.5rem;
    margin: 2rem 0;
    width: 100%;
  }
}

@media (min-width: 1920px) {
  .v-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .heading,
  .description {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .features .v-card {
    max-width: 400px;
  }
}
</style>
