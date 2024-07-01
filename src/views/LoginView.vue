<template>
  <div class="login-form">
    <v-container fluid class="outer__container">
      <v-row class="teste" align="center">
        <v-col cols="12" md="6" class="d-flex justify-center">
          <v-img :src="Robot" class="image" contain></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <v-container class="form__container">
            <v-row class="d-flex justify-center flex-column align-center">
              <v-col cols="12">
                <h1 class="form__title text-center">Login</h1>
              </v-col>
              <v-col cols="12" sm="10" md="8" lg="6">
                <v-form @submit.prevent="handleLogin" class="form">
                  <v-text-field
                    v-model="username"
                    :readonly="loading"
                    :rules="[required]"
                    class="mb-2 form__input"
                    label="Nome de utilizador"
                    clearable
                    :error-messages="usernameError"
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :readonly="loading"
                    :rules="[required]"
                    label="Password"
                    placeholder="Coloque a sua password"
                     variant="outlined"
                    class="form__input"
                    :type="showPassword ? 'text' : 'password'"
                    :append-inner-icon="
                      showPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append-inner="showPassword = !showPassword"
                    :error-messages="passwordError"
                  ></v-text-field>

                  <v-btn
                    type="submit"
                    error-messages="passwordError"
                    :disabled="!isFormValid"
                    :loading="loading"
                    size="large"
                    block
                    color="primary"
                    class="form__button"
                   
                    >Entrar</v-btn
                  >
                </v-form>
              </v-col>
              <v-col class="text-center text__register">
                <p>Ainda não tens uma conta? Regista-te <router-link class="link" to="/registo">aqui</router-link></p>
              
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import Robot from "@/assets/Images/bot.png";

export default {
  setup() {
    const authStore = useAuthStore();
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const loading = ref(false);
    const showPassword = ref(false);


    const required = (v) => !!v || "Campo obrigatório";

    const isFormValid = computed(() => {
      return !!username.value && !!password.value;
    });

    const handleLogin = async () => {
      try {
        loading.value = true;
        await authStore.login(username.value, password.value);
        const redirect = localStorage.getItem("redirect");
        if (redirect) {
          localStorage.removeItem("redirect");
          loading.value = false;
          router.push(redirect);
        } else {
          router.push("/home-catalog");
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };

    const logout = () => {
      authStore.logout();
      alert("Logout realizado com sucesso!");
    };

    const { user, isLoggedIn, usernameError, passwordError } = storeToRefs(authStore);
    return {
      username,
      password,
      handleLogin,
      logout,
      user,
      isLoggedIn,
      Robot,
      required,
      isFormValid,
      loading,
      showPassword,
      usernameError,
      passwordError,
    };
  },
};
</script>

<style scoped>
.login-form {
  background-color: var(--color-background-dark);
  background-image: url("../assets/Images/backgrounds/Background-home.svg");
  background-size: cover;
  position: relative;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

.outer__container {
  height: 100vh;
}

.teste {
  height: 100%;
}

.form__container {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgba(255, 255, 255, 0.17);
  width: 100%;
}

.image {
  max-width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
}

.form__input {
  width: 100%;
  margin-bottom: 1rem;
}

.form__button {
  width: 100%;
}

.form__title {
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-light);
  font-family: var(--font-title);
  font-weight: 700;
}

.text__register {
  color: var(--color-text-light);
  font-size: 1.4rem;
  font-family: var(--font-text);
  font-weight: 200;
}

.link {
  color: var(--color-primary-200);
  font-weight: 700;
}
.v-input {
  color: var(--color-text-light) !important;
}




@media (max-width: 768px) {
  .image {
    max-height: 150px;
  }
}
</style>
