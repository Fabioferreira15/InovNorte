<template>
  <v-container fluid class="video-container">
    <v-skeleton-loader
      class="skeleton-video"
      :height="'100vh'"
      :width="'100%'"
      :loading="true"
      card
      elevation="2"
    />

    <div class="skeleton-overlay">
      <v-container fluid>
        <v-row class="d-flex align-center">
          <v-col cols="12" md="5">
            <v-skeleton-loader
              class="skeleton-title"
              :height="'56px'"
              :width="'70%'"
              :loading="true"
              card
            />
            <v-skeleton-loader
              class="skeleton-category"
              :height="'24px'"
              :width="'50%'"
              :loading="true"
              card
            />
            <v-skeleton-loader
              class="skeleton-rating"
              :height="'24px'"
              :width="'30%'"
              :loading="true"
              card
            />
            <v-skeleton-loader
              class="skeleton-description"
              :height="'80px'"
              :width="'80%'"
              :loading="true"
              card
            />
            <div class="skeleton-button-group">
              <v-skeleton-loader
                :height="'48px'"
                :width="'200px'"
                :loading="true"
                card
              />
              <v-skeleton-loader
                class="ml-4"
                :height="'48px'"
                :width="'200px'"
                :loading="true"
                card
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<style scoped>
.skeleton-video {
  position: absolute;
  top: 0;
  left: 0;
}

.skeleton-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  padding: 20px;
}

.skeleton-title,
.skeleton-category,
.skeleton-rating,
.skeleton-description,
.skeleton-button-group {
  margin-top: 20px;
}

.skeleton-button-group {
  display: flex;
  align-items: center;
}

.ml-4 {
  margin-left: 16px;
}

@media (max-width: 960px) {
  .skeleton-video,
  .skeleton-overlay {
    height: 40vh;
  }
}

@media (max-width: 768px) {
  .skeleton-title {
    height: 40px;
    width: 100%;
  }

  .skeleton-category,
  .skeleton-rating,
  .skeleton-description,
  .skeleton-button-group v-skeleton-loader {
    width: 100%;
  }
}
</style>
