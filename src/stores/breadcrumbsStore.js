import { defineStore } from "pinia";


export const useBreadcrumbsStore = defineStore("breadcrumbs", {
  state: () => ({
    breadcrumbs: [],
  }),
  actions: {
    addBreadcrumb(breadcrumb) {
        const existingBreadcrumbIndex = this.breadcrumbs.findIndex((b) => b.path === breadcrumb.path);

      if (existingBreadcrumbIndex > -1) {
        this.breadcrumbs = this.breadcrumbs.slice(0, existingBreadcrumbIndex + 1);
      } else {
        this.breadcrumbs.push(breadcrumb);
      }
    },
    clearBreadcrumbs() {
      this.breadcrumbs = [];
    },
  },
});
