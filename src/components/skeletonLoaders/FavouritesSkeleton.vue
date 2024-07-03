<template>
  <div class="favourites-skeleton">
    <v-row class="favourites-row">
      <v-col v-for="index in 6" :key="index" cols="12" md="4">
        <v-card class="skeleton-card" flat>
          <v-skeleton-loader
            type="card"
            :loading="true"
            width="100%"
            height="150px"
            class="skeleton-card"
          />
          <v-card-text >
            <v-skeleton-loader
              type="text"
              :loading="true"
              width="50%"
              height="16px"
              class="skeleton-info"
            />
            <v-skeleton-loader
              type="text"
              :loading="true"
              width="80%"
              height="24px"
              class="skeleton-info"
            />
            <v-skeleton-loader
              type="text"
              :loading="true"
              width="60%"
              height="16px"
              class="skeleton-info"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "FavouritesSkeleton",
};
</script>

<style scoped>
.favourites-skeleton {
  margin-top: 20px;
  background-color:transparent;
}

.favourites-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70%;
  background-color:transparent;
}

.skeleton-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  animation: fadeIn 0.5s ease-out;
  background-color:transparent;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.skeleton-info {
  padding: 20px;
  background-color:transparent;
}

.skeleton-button-group {
  display: flex;
  align-items: center;
  background-color:transparent;
}

.btn {
  margin-top: 10px;
  background-color:transparent;
}

@media (max-width: 1800px) {
  .favourites-row {
    justify-content: center;
  }
}
</style>
