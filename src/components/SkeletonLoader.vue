<template>
  <v-container fluid class="video-container">
    <transition name="fade" mode="out-in">
      <div>
        <div class="skeleton-video"></div>
      </div>
    </transition>
  </v-container>
  <div class="overlay">
    <v-container fluid class="info">
      <v-row class="d-flex align-center course__header-info">
        <v-col cols="12" md="5">
          <transition name="slide-fade" mode="out-in">
            <div>
              <div class="skeleton-title"></div>
              <div class="skeleton-category mt-md-6 mt-3"></div>
              <div class="skeleton-rating mt-1"></div>
              <div class="skeleton-reviews mt-1"></div>
              <div class="skeleton-description mt-4"></div>
              <div class="mt-3 d-flex align-center">
                <div class="skeleton-btn primary-btn"></div>
                <div class="skeleton-btn secondary-btn ml-5"></div>
              </div>
            </div>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton-video {
  width: 100vw;
  height: 100vh;
  background-color: #e0e0e0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
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
  background-color: #bdbdbd;
  z-index: 1;
}

.course__header-info {
  height: 80vh;
}

.skeleton-title,
.skeleton-category,
.skeleton-rating,
.skeleton-reviews,
.skeleton-description,
.skeleton-btn {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-title {
  width: 70%;
  height: 3rem;
  background-color: #bdbdbd;
  margin-bottom: 1rem;
}

.skeleton-category {
  width: 50%;
  height: 2rem;
  background-color: #bdbdbd;
}

.skeleton-rating {
  width: 30%;
  height: 1rem;
  background-color: #bdbdbd;
}

.skeleton-reviews {
  width: 20%;
  height: 1rem;
  background-color: #bdbdbd;
}

.skeleton-description {
  width: 100%;
  height: 4rem;
  background-color: #bdbdbd;
}

.skeleton-btn {
  width: 40%;
  height: 2.5rem;
  background-color: #bdbdbd;
  border-radius: 4px;
}

.primary-btn {
  width: 30%;
}

.secondary-btn {
  width: 35%;
}

@media (max-width: 960px) {
  .skeleton-video {
    height: 40vh;
  }

  .video-container {
    height: 40vh;
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
}

@media (max-width: 768px) {
  .skeleton-title {
    height: 2rem;
  }

  .skeleton-category,
  .skeleton-description {
    height: 1.2rem;
  }

  .skeleton-btn {
    height: 2rem;
  }
}
</style>
