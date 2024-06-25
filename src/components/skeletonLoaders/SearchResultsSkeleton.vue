<template>
  <v-card class="course-item skeleton" variant="flat">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="2">
          <v-skeleton-loader
            type="image"
            class="course__card-img"
            style="height: 100px; width: 100%"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="9" class="d-flex flex-column justify-center">
          <v-skeleton-loader
            type="heading"
            class="course__card-title"
            style="height: 24px; width: 70%"
          ></v-skeleton-loader>
          <v-skeleton-loader
            type="text"
            class="course__card-category"
            style="height: 18px; width: 50%; margin-top: 8px"
          ></v-skeleton-loader>
          <v-skeleton-loader
            type="text"
            class="course__card-trainer"
            style="height: 18px; width: 50%; margin-top: 8px"
          ></v-skeleton-loader>
          <v-skeleton-loader
            type="text"
            class="course__card-rating"
            style="height: 18px; width: 30%; margin-top: 8px"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="1" class="d-flex justify-end price">
          <v-skeleton-loader
            type="text"
            style="height: 18px; width: 50%"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>
.v-skeleton-loader {
  background-color: transparent;
}

.skeleton {
  background-color: transparent;
  color: var(--color-text-light);
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
}
.course__card-img {
  border-radius: 5px;
}
.course__card-title {
  font-size: 1.6rem;
  font-weight: 700;
  font-family: var(--font-title);
  padding: 0;
  letter-spacing: 1px;
}
.course__card-category,
.course__card-trainer,
.course__card-rating {
  font-size: 1.4rem;
  font-weight: 200;
  font-family: var(--font-text);
  color: var(--color-text-light);
  padding: 0;
}
</style>
