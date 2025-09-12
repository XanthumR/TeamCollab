<template>
  <v-navigation-drawer
    app
    class="text-white bg-grey-darken-4"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
  >
  <v-card class="d-flex align-center bg-grey-darken-4 hover-scale-icon">
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
        class="rounded-lg"
        color="white"
      >
      <v-card color="grey" class="pa-2 d-flex align-center hover-scale-icon" outlined>
        <v-icon class="hover-scale" start>mdi-message-reply-text</v-icon>
        <v-list-item-title>{{ ch.name }}</v-list-item-title>
      </v-card>
        
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav>
      <v-divider></v-divider>

      <v-list-item
        v-for="ch in voiceChannels"
        :key="ch.id"
        @click="joinVoiceChannel(ch.id)"
        class="rounded-lg hover-scale-icon "
        color="white"

      >
      <v-card color="grey" hover  class="pa-2 d-flex align-center " outlined>
        <v-icon class="hover-scale"  start>mdi-volume-high</v-icon>
        <v-list-item-title>{{ ch.name }}</v-list-item-title>
      </v-card>
      <v-list nav>
        <v-list-item
          v-for="participant in ch.participants"
          :key="participant"
          class="ml-4 fade-in-animation"
        >
        <v-card color="grey" hover  class="pa-2 d-flex align-center" outlined>
          <v-avatar size="40" class="align-self-start">
            <v-img :src="`https://randomuser.me/api/portraits/men/${participant.charAt(participant.length - 1)}.jpg`" />
          </v-avatar>
          <v-list-item-title>{{ participant }}</v-list-item-title>
          <v-icon  class="ml-2 hover-gray" start>mdi-volume-high</v-icon>
          <v-icon class="ml-2 hover-gray" start>mdi-headphones</v-icon>
      </v-card>
          
        </v-list-item>
      </v-list>
        
      </v-list-item>
    </v-list>
      <v-card
        class="ma-4 d-flex align-center justify-center hover-scale-icon"
        color="grey"
        outlined
        style="position: sticky; bottom: 0; z-index: 10;"
      >
      <div @click="leaveVoiceChannel(voiceStore.currentChannelId)">
        <v-icon class="ml-2 cursor-pointer" color="white" >mdi-logout</v-icon>
        <span>Leave Channel</span>
      </div>
        <v-avatar size="50" class="ml-auto mr-4 mt-2 mb-2" @click="$router.push({ name: 'Profile' })">
          <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
        </v-avatar>
      </v-card>

  </v-navigation-drawer>

</template>

<script setup lang="ts">
import { useChannelStore } from "../stores/channelStore";
import { useVoiceChannelStore } from "../stores/voiceChannelStore";
import { storeToRefs } from "pinia";
const store = useChannelStore();
const { channels } = storeToRefs(store);
const voiceStore = useVoiceChannelStore();
const { voiceChannels } = storeToRefs(voiceStore);


function joinVoiceChannel(channelId: number) {
  const userSelect = voiceStore.currentUser;
  voiceStore.joinChannel(channelId, userSelect);
}

function leaveVoiceChannel(channelId: number) {
  const userSelect = voiceStore.currentUser;
  voiceStore.leaveChannel(channelId, userSelect);
}




</script>


<style>


.hover-scale-icon:hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

.cursor-pointer {
  cursor: pointer;
}




.hover-gray:hover {
  color: gray;
}

</style>
