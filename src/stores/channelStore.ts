import { defineStore } from "pinia";
import type { Channel } from "../types/channel";

export const useChannelStore = defineStore("channel", {
  state: () => ({
    channels: [
      { id: 1, name: "Genel", messages: [{ id: 1, text: "Merhaba", user: "Kullanıcı1" }] },
      { id: 2, name: "Proje", messages: [{ id: 2, text: "Proje hakkında konuşalım", user: "Kullanıcı2" }] },
      { id: 3, name: "Sohbet", messages: [{ id: 3, text: "Sohbet odasına hoş geldiniz", user: "Kullanıcı3" }] },
    ] as Channel[],
    currentUser: "Kullanıcı1"
  }),
  actions: {
    sendMessage(channelId: number, text: string, userSelect: string) {
      const channel = this.channels.find(c => c.id === channelId);
      if (channel) {
        channel.messages.push({
          id: Date.now(), // Basit bir ID oluşturma

          text,
          user: userSelect
        });
      }
    }
  }
});
