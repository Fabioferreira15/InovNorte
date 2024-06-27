<template>
  <v-container fluid class="video-container">
    <v-skeleton-loader
      class="skeleton-video"
      :loading="true"
      card
      elevation="0"
    />
  </v-container>

  <div class="skeleton-overlay">
    <v-container fluid>
      <v-row class="d-flex align-center info">
        <v-col cols="12" md="5">
          <v-skeleton-loader
            class="skeleton-title"
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
            class="skeleton-description"
            :height="'80px'"
            :width="'80%'"
            :loading="true"
            card
          />
          <div class="mt-3 d-flex align-center">
            <v-skeleton-loader
              class="btn"
              :height="'30px'"
              :width="'100px'"
              :loading="true"
              card
            />
            <v-skeleton-loader
              class="ml-5 btn"
              :height="'30px'"
              :width="'100px'"
              :loading="true"
              card
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.skeleton-video {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 1;
}
.video-container {
  position: relative;
  height: 100vh;
}

.skeleton-overlay {
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
  background-color: transparent;
}

.info {
  height: 80vh;
}

.skeleton-title,
.skeleton-category,
.skeleton-rating,
.skeleton-description,
.skeleton-button-group {
  background-color: transparent;
  margin-bottom: 2rem;

}

.skeleton-button-group {
  display: flex;
  align-items: center;
  background-color: transparent;
}

.btn {
  background-color: transparent;
}

@media (max-width: 960px) {
  .skeleton-video {
    height: 40vh;
  }

  .video-container {
    height: 40vh;
  }
  .skeleton-overlay {
    height: 40vh;
    background: none;
    position: relative;
    top: auto;
    left: auto;
  }
  .info {
    height: 0;
  }
}

@media (max-width: 768px) {
  .skeleton-title {
    height: 30px;
    width: 100%;
    background-color: transparent;
  }

  .skeleton-category,
  .skeleton-rating,
  .skeleton-description,
  .skeleton-button-group v-skeleton-loader {
    width: 100%;
    background-color: transparent;
  }
}
</style>
