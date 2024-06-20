<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold mb-4 text-center">Login</h1>
      <form @submit.prevent="triggerLogin" class="space-y-4">
        <div>
          <input v-model="username" class="w-full p-2 border border-gray-300 rounded" placeholder="Username" />
        </div>
        <div>
          <input v-model="password" type="password" class="w-full p-2 border border-gray-300 rounded" placeholder="Password" />
        </div>
        <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
      </form>
      <p v-if="formError" class="text-red-600 text-center mt-2">{{ formError }}</p>
      <p v-if="formMessage" class="text-green-500 text-center mt-2">{{ formMessage }}</p>
      <p class="text-center mt-4">
        <a href="/register" class="text-blue-500 hover:text-blue-600">Don't have an account? Register here.</a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      username: 'anilprz',
      password: 'Anilanil'
    };
  },
  computed: {
    ...mapState(['formError', 'formMessage'])
  },
  methods: {
    ...mapActions(['login']),
    async triggerLogin() {
      const token = await this.login({ username: this.username, password: this.password });
      if (token) {
        this.$router.push('/');
      }
    },
  },
};
</script>
