<template>
  <v-container class="flex-column pa-0" fluid>
    <!-- Mesajlar -->
    <v-sheet
      ref="messagesContainer"
      class="fill-width overflow-y-auto pa-4"
      color="grey-darken-3"
      style="
        height: calc(100vh - 128px);
        background: linear-gradient(135deg, white, black);
        box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.3);
      "
    >
>
  <v-card
    v-for="msg in channel?.messages"
    :key="msg.id"
    class="mb-2 w-25 rounded-xl mt-8 bg-grey-darken-2 "
    :class="msg.user === 'Kullanıcı1' ? 'ml-auto' : 'mr-auto'"
    outlined
  >
    <v-card-title class="text-blue-accent-2 bg-grey-darken-2">
      {{ new Date(msg.id).toLocaleString().slice(0, 16) }}
    </v-card-title>
    <v-sheet class="d-flex pa-2" color="grey-darken-4" rounded>
      <v-avatar size="40" class="align-self-start">
      <v-img :src="`https://randomuser.me/api/portraits/men/${msg.user.charAt(msg.user.length - 1)}.jpg`" />
    </v-avatar>
    <v-card-text style="white-space: normal; word-break: break-word;">
      <strong class="text-blue-accent-2">{{ msg.user }}:</strong>
      {{ msg.text }}
    </v-card-text>
    </v-sheet>
    
  </v-card>
</v-sheet>


    <!-- Input -->
    
  </v-container>
  <v-sheet
      class="pa-3 d-flex align-center"
      color="grey-darken-3"
      style="position: sticky; bottom: 0; z-index: 10;"
    >
      <v-text-field
        v-model="newMessage"
        placeholder="Mesaj yaz..."
        hide-details
        variant="outlined"
        color="blue-accent-2"
        class="flex-grow-1 mr-2"
        @keyup.enter="send"
      />
      <v-btn color="blue-accent-2" @click="send">Gönder</v-btn>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed,nextTick } from "vue";
import { useRoute } from "vue-router";
import { useChannelStore } from "../stores/channelStore";

const store = useChannelStore();
const route = useRoute();

const channel = computed(() => {
  const id = Number(route.params.id);
  return store.channels.find((c) => c.id === id);
});

const newMessage = ref("");
const messagesContainer = ref<HTMLElement | null>(null);

function send() {
  if (newMessage.value.trim() && channel.value) {
    store.sendMessage(channel.value.id, newMessage.value, "Kullanıcı1");
    store.sendMessage(channel.value.id, "Meşgulüm şu anda sonra konuşuruz", "Kullanıcı2");
    newMessage.value = "";
    
  }
}



</script>
