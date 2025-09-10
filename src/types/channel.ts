export interface Channel {
  id: number;
  name: string;
  messages: { id: number; text: string; user: string;  }[];
}
