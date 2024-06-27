<template>
  <v-breadcrumbs :items="breadcrumbs" >
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :to="item.path"
        :class="{
          'current-breadcrumb': item.path === $route.path,
          'other-breadcrumb': item.path !== $route.path,
        }"
        >{{ item.name }}</v-breadcrumbs-item
      >
    </template>
  </v-breadcrumbs>
</template>

<script>
import { useBreadcrumbsStore } from "@/stores/breadcrumbsStore";

export default {
  setup() {
    const breadcrumbStore = useBreadcrumbsStore();

    return {
      breadcrumbs: breadcrumbStore.breadcrumbs,
    };
  },
};
</script>

<style scoped>
.current-breadcrumb {
  color: var(--color-primary-200);
  font-family: var(--font-title);
  font-weight: 300;
  font-size: 1.4rem;
}

.other-breadcrumb {
  color: var(--color-primary-900);
  font-family: var(--font-title);
  font-weight: 300;
  font-size: 1.4rem;
}

</style>
