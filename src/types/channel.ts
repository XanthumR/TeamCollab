export interface Channel {
  id: number;
  name: string;
  messages: { id: number; text: string; user: string;  }[];
}

export interface VoiceChannel {
  id: number;
  name: string;
  participants: string[];
}
