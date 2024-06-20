<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Avaliações</h1>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-radio-group v-model="starRating" row>
              <v-radio label="Mais de 4.5" value="4.5"></v-radio>
              <v-radio label="Mais de 4" value="4"></v-radio>
              <v-radio label="Mais de 3.5" value="3.5"></v-radio>
              <v-radio label="Mais de 3" value="3"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h1>Dificuldade</h1>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-radio-group v-model="difficulty" row>
            <v-radio label="Fácil" value="easy"></v-radio>
            <v-radio label="Médio" value="medium"></v-radio>
            <v-radio label="Difícil" value="hard"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-row>

    <v-row>
      <v-col>
        <h1>Preço</h1>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-radio-group v-model="price" row>
              <v-radio label="Grátis" value="free"></v-radio>
              <v-radio label="Pago" value="paid"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const starRating = ref(null);
    const difficulty = ref(null);
    const price = ref(null);

    return {
      starRating,
      difficulty,
      price,
    };
  },
};
</script>

<style scoped></style>
