<script setup lang="ts">
import ChannelList from './components/ChannelList.vue';
import { ref } from 'vue';
import { useAuthStore } from './stores/AuthStore';


const authStore = useAuthStore();
const drawer = ref(true);
const menu = ref(false); // State for the dropdown menu


import { useRouter } from 'vue-router';

const router = useRouter();

function logout() {
  authStore.logout();
  router.push('/login');
}


</script>

<template>
  <v-app>
    <v-main>
      <div v-if="authStore.token !== null">
        <ChannelList v-model="drawer" />
        <v-app-bar app flat color="grey" dark class="d-flex justify-center align-center">
          <v-icon color="primary" class="ml-4 mr-2" size="36">
            mdi-account-group
          </v-icon>
          <v-app-bar-title @click="$router.push({ name: 'Welcome' })" style="cursor: pointer;">
            <div class="text-h5 font-weight-bold text-primary">
              TeamCollab
            </div>
          </v-app-bar-title>
          <v-btn text class="mx-4" @click="$router.push({ name: 'TaskBoard' })">
            <div class="text-h6 font-weight-bold text-white">
              Task Management
            </div>
          </v-btn>
          <v-app-bar-nav-icon variant="text" @click="drawer = !drawer" />
          <v-menu v-model="menu" offset-y>
            <template #activator="{ props }">
              <v-avatar size="50" class="ml-auto mr-4 mt-2 mb-2" v-bind="props">
          <v-img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
              </v-avatar>
            </template>
            <v-list style="background: linear-gradient(135deg, white, black);">
              <v-list-item :to="{ name: 'Profile' }" class="hover-bg-gray">
          <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item :to="{ name: 'Settings' }" class="hover-bg-gray">
          <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout" class="hover-bg-gray">
          <div class="d-flex align-center hover-scale-icon">
            <v-icon>mdi-logout</v-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
      </div>
      <RouterView />
    </v-main>
  </v-app>
   
</template>

<style scoped>

.hover-bg-gray:hover {
  background-color: #5c5858 !important; /* grey-darken-3 */
}


</style>

