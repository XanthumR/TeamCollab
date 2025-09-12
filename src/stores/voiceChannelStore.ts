import { defineStore } from "pinia";
import type { VoiceChannel } from "../types/channel";

export const useVoiceChannelStore = defineStore("voiceChannel", {
  state: () => ({
    lastVoiceChannelId: 0,
    currentChannelId: 0,
    voiceChannels: [
      { id: 1, name: "Genel", participants: ["Kullanıcı4", "Kullanıcı5", "Kullanıcı6"] },
      { id: 2, name: "Proje", participants: ["Kullanıcı2"] },
      { id: 3, name: "Sohbet", participants: ["Kullanıcı3"] },
    ] as VoiceChannel[],
    currentUser: "Kullanıcı1"
  }),
  actions: {
    joinChannel(channelId: number, userSelect: string) {
      this.currentChannelId = channelId;
      const channel = this.voiceChannels.find(c => c.id === channelId);
      if (this.lastVoiceChannelId !== channelId) {
        if (this.lastVoiceChannelId !== 0) {
          const lastChannel = this.voiceChannels.find(c => c.id === this.lastVoiceChannelId);
          if (lastChannel) {
            lastChannel.participants = lastChannel.participants.filter(p => p !== userSelect);
          }
        }
        this.lastVoiceChannelId = channelId;
      }
      if (channel && !channel.participants.includes(userSelect)) {
        channel.participants.push(userSelect);
      }
    },

    leaveChannel(channelId: number, userSelect: string) {
      const channel = this.voiceChannels.find(c => c.id === channelId);
      if (channel) {
        channel.participants = channel.participants.filter(p => p !== userSelect);
      }
    }
}});