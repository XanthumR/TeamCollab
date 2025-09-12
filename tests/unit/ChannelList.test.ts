// tests/ChannelList.spec.ts
import { render, fireEvent, waitFor, getByTestId, getByRole,screen } from "@testing-library/vue";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ChannelList from "../../src/components/ChannelList.vue";
import { createTestingPinia } from "@pinia/testing";
import { useVoiceChannelStore } from "../../src/stores/voiceChannelStore";

describe("ChannelList.vue Voice Channels", () => {
  let voiceStore: ReturnType<typeof useVoiceChannelStore>;

  beforeEach(() => {
    render(ChannelList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn, // makes all actions spies
          }),
        ],
      },
    });

    voiceStore = useVoiceChannelStore();
  });

  it("calls joinVoiceChannel when a voice channel is clicked", async () => {
    const { getByText } = render(ChannelList, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    // Click the "Software" channel
    const channelItem = screen.getAllByTestId("list-item");
    await fireEvent.click(channelItem[0]);

    expect(voiceStore.joinChannel).toHaveBeenCalledTimes(1);
    expect(voiceStore.joinChannel).toHaveBeenCalledWith(1, "Kullanıcı1");
  });

  it("calls leaveVoiceChannel when leave button is clicked", async () => {
    const { getByText } = render(ChannelList, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    // Click the Leave Channel button
    const leaveButton = screen.getAllByRole('button', { name: /leave channel/i });
    await fireEvent.click(leaveButton[0]);

    await waitFor(() =>{
      expect(voiceStore.leaveChannel).toHaveBeenCalledTimes(1);
      expect(voiceStore.leaveChannel).toHaveBeenCalledWith(voiceStore.currentChannelId, "Kullanıcı1");
    });
  });
});
