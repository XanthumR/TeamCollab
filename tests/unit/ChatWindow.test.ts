import { render, screen, fireEvent,waitFor } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import ChatWindow from '../../src/components/ChatWindow.vue'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('ChatWindow.vue', () => {
  let router: ReturnType<typeof createRouter>

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/channels/:id', component: ChatWindow }],
    })
    router.push('/channels/1')
    await router.isReady()
  })

  it('sends a message and displays it', async () => {
    render(ChatWindow, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              channel: {
                channels: [
                  {
                    id: 1,
                    name: 'Genel',
                    messages: [{ id: 1, text: 'Merhaba', user: 'Kullanıcı1' }],
                  },
                ],
                currentUser: 'Kullanıcı1',
              },
            },
            createSpy: vi.fn,
          }),
          router,
        ],
      },
    })

    const input = screen.getByPlaceholderText('Mesaj yaz...')

    // v-text-field wraps input; update value + fire Enter
    await fireEvent.update(input, 'Yeni mesaj')
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    waitFor(() => expect(screen.getByText('Yeni mesaj')).toBeInTheDocument())
    expect(screen.getByText('Kullanıcı1:')).toBeInTheDocument()
  })
}) 
