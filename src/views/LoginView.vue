<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Nome de utilizador:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="isLoggedIn">Bem-vindo, {{ user.username }}!</p>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const handleLogin = async () => {
      try {
        await authStore.login(username.value, password.value);
        const redirect = localStorage.getItem("redirect");
        if (redirect) {
          localStorage.removeItem("redirect");
          router.push(redirect);
        }
        alert("Login bem-sucedido!");
      } catch (error) {
        alert(error.message);
      }
    };

    const logout = () => {
      authStore.logout();
      alert("Logout realizado com sucesso!");
    };

    const { user, isLoggedIn } = storeToRefs(authStore);
    return { username, password, handleLogin, logout, user, isLoggedIn };
  },
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
