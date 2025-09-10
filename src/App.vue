<script setup lang="ts">
import ChannelList from './components/ChannelList.vue';
import { ref } from 'vue';
import { useAuthStore } from './stores/AuthStore';

const authStore = useAuthStore();
const drawer = ref(true);
</script>

<template>
  <v-app>

    <v-main >
      <div v-if="authStore.token !== null">
        <ChannelList v-model="drawer"/>
      <v-app-bar  app flat color="grey-darken-2" dark>
      <v-app-bar-title>TeamCollab</v-app-bar-title>
      <v-app-bar-nav-icon variant="text" @click="drawer = !drawer" />
      <v-avatar size="50" class="ml-auto mr-4 mt-2 mb-2">
        <v-img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
      </v-avatar>
    </v-app-bar>
      </div>
      <RouterView />
    </v-main>
      
  </v-app>
</template>


<style scoped>

</style>

