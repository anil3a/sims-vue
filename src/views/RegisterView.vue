<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold mb-4 text-center">Register</h1>
      <form @submit.prevent="submitRegister" class="space-y-4">
        <div>
          <input 
            v-model="username" 
            class="w-full p-2 border border-gray-300 rounded" 
            placeholder="Username" />
        </div>
        <div>
          <input 
            v-model="firstname" 
            class="w-full p-2 border border-gray-300 rounded" 
            placeholder="First Name" />
        </div>
        <div>
          <input 
            v-model="lastname" 
            class="w-full p-2 border border-gray-300 rounded" 
            placeholder="Last Name" />
        </div>
        <div>
          <input
            v-model="email"
            type="email" class="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
          />
        </div>
        <div>
          <input 
            v-model="password" 
            type="password" 
            class="w-full p-2 border border-gray-300 rounded" 
            placeholder="Password" />
        </div>
        <button 
          type="submit" 
          class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Register
        </button>
      </form>
      <p v-if="formError" class="text-red-600 text-center mt-2">{{ formError }}</p>
      <p v-if="formMessage" class="text-green-500 text-center mt-2">{{ formMessage }}</p>
      <p class="text-center mt-4">
        <a href="/login" class="text-blue-500 hover:text-blue-600">Already have an account? Login here.</a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      username: 'anilprz',
      password: 'Anilanil',
      firstname: 'Anil',
      lastname: 'Prz',
      email: 'anilprz3@gmail.com'
    };
  },
  computed: {
    ...mapState(['formError', 'formMessage'])
  },
  methods: {
    ...mapActions(['register']),
    async submitRegister() {
      await this.$store.dispatch('register', {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email
      });
    },
  },
};
</script>
