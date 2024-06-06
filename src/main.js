import "./assets/css/root.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "@fortawesome/fontawesome-free/css/all.css";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: "#4922D9",
    secondary: "#FC4E2E",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
});

async function initApp() {
  if (import.meta.env.DEV) {
    const module = await import("./mock/browser");
    const worker = module.worker;
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }

  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(vuetify);
  app.mount("#app");
}

initApp();
