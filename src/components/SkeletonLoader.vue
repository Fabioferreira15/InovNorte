<template>
  <v-container fluid class="video-container">
    <div class="skeleton skeleton-video"></div>
  </v-container>
  <div class="overlay">
    <v-container fluid class="info">
      <v-row class="d-flex align-center course__header-info">
        <v-col cols="12" md="5">
          <div class="skeleton-container">
            <div class="skeleton skeleton-title mb-2"></div>
            <div class="skeleton skeleton-text mb-1"></div>
            <div class="skeleton skeleton-rating mb-2"></div>
            <div class="skeleton skeleton-description mb-3"></div>
            <div class="skeleton skeleton-btn mb-1"></div>
            <div class="skeleton skeleton-btn"></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.skeleton {
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.skeleton::after {
  content: "";
  display: block;
  position: absolute;
  left: -150%;
  top: 0;
  height: 100%;
  width: 150%;
  background: linear-gradient(
    to right,
    transparent 0%,
    #fff 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -150%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

.skeleton-video {
  width: 100%;
  height: 300px; /* Adjust based on your layout */
}

.skeleton-title {
  width: 70%;
  height: 32px;
}

.skeleton-text {
  width: 50%;
  height: 24px;
}

.skeleton-rating {
  width: 30%;
  height: 20px;
}

.skeleton-description {
  width: 90%;
  height: 60px; /* Adjust the height based on expected text size */
}

.skeleton-btn {
  width: 120px;
  height: 40px;
  display: inline-block;
  margin-right: 10px;
}
</style>
