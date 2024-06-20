<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <nav class="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
      <div>
        <router-link to="/" class="text-blue-500 hover:text-blue-700">Home</router-link>
      </div>
      <div>
        <router-link to="/logout" class="text-red-500 hover:text-red-700">Log out</router-link>
      </div>
    </nav>

    <h1 class="text-3xl font-bold text-center mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="item in items" :key="item.id" class="bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold">{{ item.name }}</h2>
        <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
      </div>
    </div>

    <form @submit.prevent="addItem" class="mt-6 bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Add Item</h2>
      <div class="mb-4">
        <input 
          type="text" 
          v-model="itemName" 
          placeholder="Item Name" 
          class="w-full p-2 border border-gray-300 rounded"
        >
      </div>
      <div class="mb-4">
        <input 
          type="number" 
          v-model="itemQuantity" 
          placeholder="Quantity" 
          class="w-full p-2 border border-gray-300 rounded"
        >
      </div>
      <button 
        type="submit" 
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      itemName: '',
      itemQuantity: '',
    };
  },
  computed: {
    ...mapState(['items']),
  },
  methods: {
    ...mapActions(['fetchItems', 'createItem']),
    async addItem() {
      await this.createItem({ name: this.itemName, quantity: this.itemQuantity });
      this.itemName = '';
      this.itemQuantity = '';
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>
