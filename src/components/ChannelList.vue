<template>
  <v-navigation-drawer
    app
    class="text-white bg-grey-darken-4"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
  >
  <v-card class="d-flex align-center bg-grey-darken-4">
        <v-icon class="ml-2" color="white">mdi-home</v-icon>
        <v-card-text class="font-bold text-h6">Kanallar</v-card-text>
  </v-card>
    <v-list nav>
      
      

      
      <v-divider></v-divider>

      <v-list-item
        v-for="ch in channels"
        :key="ch.id"
        :to="`/channel/${ch.id}`"
        link
        class="hover:red rounded-lg"
        color="white"
      >
      <v-card color="grey" hover  class="pa-2 d-flex align-center" outlined>
        <v-icon  start>mdi-message-reply-text</v-icon>
        <v-list-item-title>{{ ch.name }}</v-list-item-title>
      </v-card>
        
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>

<script setup lang="ts">
import { useChannelStore } from "../stores/channelStore";
import { storeToRefs } from "pinia";
const store = useChannelStore();
const { channels } = storeToRefs(store);





</script>


<style scoped>


</style>
