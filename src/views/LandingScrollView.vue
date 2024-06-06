<template>
  <header>
    <NavBar class="navbar" />
  </header>

  <main>
    <v-container class="hero">
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center flex-column hero__info"
        >
          <h1 class="hero__heading">
            Explore, <span>Aprenda</span> e Conecte-se
          </h1>
          <p class="hero__subheading">
            Descubra cursos personalizados, receba suporte imediato e faça parte
            de uma comunidade vibrante de educadores.
          </p>
          <div class="hero__btns mt-5">
            <Button variant="primary" size="large">Inicie a sua Jornada</Button>
            <Button variant="tertiary" size="large">Saiba mais</Button>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-img :src="heroImage" class="hero__image"> </v-img>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="botfeatures">
      <v-row class="mb-10">
        <v-col cols="12" class="text-center">
          <h1 class="botfeatures__heading">O nosso assistente virtual</h1>
        </v-col>
      </v-row>

      <v-row class="feature-row">
        <v-col cols="4" class="text-center">
          <h1>Conselhos Personalizados</h1>
          <p class="botfeatures__text">
            Receba dicas de estudo, estratégias de aprendizagem e recursos
            adaptados às suas necessidades para otimizar seu desempenho
          </p>
        </v-col>
        <v-col cols="4">
          <v-img :src="botImage" class="botfeatures__image"></v-img>
        </v-col>
        <v-col cols="4" class="text-center">
          <h1>Respostas Rápidas</h1>
          <p class="botfeatures__text">
            Encontre respostas rápidas para suas dúvidas mais comuns sobre o
            curso
          </p>
        </v-col>
      </v-row>

      <v-row class="last">
        <v-col cols="12" class="text-center">
          <h1>Material de Curso</h1>
          <p class="botfeatures__text">
            Encontre materiais específicos para os seus cursos, como livros,
            artigos e vídeos.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <Button variant="secondary" size="large">Conversar</Button>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="courses mt-10">
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="courses__heading">Os Nossos Cursos de Destaque</h1>
          <p class="courses__subheading">
            Explore cursos atualizados em diversas áreas e impulsione a sua
            carreira
          </p>
          <Button variant="secondary" size="large">Explorar</Button>
        </v-col>
      </v-row>

      <v-container class="mt-16">
        <v-row class="d-flex justify-center align center">
          <v-col cols="12" md="3" v-for="course in courses" :key="course.id">
            <v-card class="course-card">
              <v-img
                :src="courseImage"
                class="course-image"
                aspect-ratio="1.7"
              ></v-img>
              <v-card-title class="text-h5">{{ course.title }}</v-card-title>
              <v-card-text>{{ course.description }}</v-card-text>
              <v-card-actions>
                <v-btn color="primary">Saiba Mais</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-container fluid class="communities">
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col
              v-for="community in communities"
              :key="community.id"
              cols="12"
              sm="6"
            >
              <v-card>
                <v-card-title>{{ community.title }}</v-card-title>
                <v-card-text>{{ community.text }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <h1>Comunidades Práticas Onde Profissionais Inovam Juntos</h1>
          <p>
            Conecte-se com outros profissionais, compartilhe conhecimento e
            participe em discussões relevantes.
          </p>
          <Button variant="secondary" size="large">Explorar</Button>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<
<script>
import NavBar from "../components/NavBarLanding.vue";
import Button from "@/components/Button.vue";

import heroImage from "@/assets/Images/heroImage.png";
import botImage from "@/assets/Images/bot.png";
import courseImage from "@/assets/Images/course1.png";

export default {
  components: {
    NavBar,
    Button,
  },
  data() {
    return {
      heroImage,
      botImage,
      courseImage,
      courses: [
        {
          id: 1,
          title: "Desenvolvimento Web",
          description: "Aprenda a construir websites e aplicações web do zero.",
        },
        {
          id: 2,
          title: "Ciência de Dados",
          description: "Mergulhe nos dados e transforme insights em ação.",
        },
        {
          id: 3,
          title: "Marketing Digital",
          description:
            "Domine as estratégias de marketing para o mundo digital.",
        },
      ],
      communities: [
        {
          id: 1,
          title: "Matchmaking automático",
          text: "Conexões Inteligentes para Crescimento Rápido",
        },
        {
          id: 2,
          title: "Partilha de ficheiros",
          text: "Acesso Imediato a Ferramentas e Conhecimentos Essenciais",
        },
        {
          id: 3,
          title: "Discussões e Fóruns",
          text: "Espaço para diálogo e troca de ideias",
        },
        {
          id: 4,
          title: "Mentoria Personalizada",
          text: "Orientação individualizada para impulsionar seu sucesso",
        },
      ],
    };
  },
};
</script>

<style scoped>
.hero {
  overflow: hidden;
}

.v-col {
  padding: 0;
}

.hero__image {
  height: 80%;
}

.hero__info {
  translate: 0 -10%;
}

.hero__heading {
  font-family: var(--font-title);
  font-size: 5.6rem;
  color: var(--color-text-dark);
}

.hero__heading span {
  color: var(--color-primary-100);
}

.hero__subheading {
  font-family: var(--font-text);
  font-size: 1.8rem;
  font-weight: 400;
}

.hero__btns :not(:last-child) {
  margin-right: 2rem;
}

.botfeatures {
  max-height: 75vh;
}
.botfeatures__image {
  max-height: 50vh;
  width: auto;
}

.botfeatures__text {
  font-family: var(--font-text);
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--color-text-dark);
}

.botfeatures__heading {
  font-size: 3.8rem;
  font-family: var(--font-title);
  font-weight: 700;
}

.courses {
  min-height: 50rem;
  max-height: 50rem;
  background-color: var(--color-primary-100);
  border-radius: 2rem;
}

.courses__heading {
  font-size: 4rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-text-light);
}

.courses__subheading {
  font-size: 2rem;
  font-family: var(--font-text);
  color: var(--color-text-light);
}

.course-card {
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--color-primary-900);
  max-height: 38rem;
}

.course-card:hover {
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
}

.course-image {
  width: 100%;
  transition: transform 0.3s ease-in-out;
}

.course-image:hover {
  transform: scale(1.05);
}

.v-card-title {
  color: var(--color-primary-dark);
  font-weight: bold;
}

.v-card-text {
  font-size: 1rem;
  color: var(--color-text-dark);
}

.v-btn {
  color: var(--color-text-light);
  background-color: var(--color-primary-100);
}

.v-btn:hover {
  background-color: var(--color-primary-dark);
}



.communities {
  margin-top: 20rem;
  background-color: var(--color-primary-900);
}

.communities .v-card {
  background-color: var(--color-primary-100);
  color: var(--color-text-light);
  height: 100%;
}

.communities .v-card-title {
  font-family: var(--font-title);
  font-size: 1.6rem;
  font-weight: 700;
}

.communities .v-card-text {
  color: var(--color-text-light);
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 1.6rem;
}


@media (max-width: 600px) {
  .hero__heading {
    font-size: 3rem;
  }
  .hero__subheading {
    font-size: 1.2rem;
  }
  .hero__btns {
    flex-direction: column;
    align-items: center;
  }
  .hero__btns :not(:last-child) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .hero {
    height: auto;
  }
  .hero__image {
    height: 60%;
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .hero__heading {
    font-size: 4.5rem;
  }
  .hero__subheading {
    font-size: 1.5rem;
  }
  .hero__image {
    height: 70%;
  }
}
</style>
