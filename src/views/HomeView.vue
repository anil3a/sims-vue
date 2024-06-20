<template>
  <div class="container mx-auto">
    <component :is="isAuthenticated ? 'DashboardView' : 'LoginView'"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DashboardView from './DashboardView.vue';
import LoginView from './LoginView.vue';

export default {
  name: 'HomeView',
  components: {
    DashboardView,
    LoginView,
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },

};
</script>