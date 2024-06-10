import type { Services } from '~/types/serviceType'
import { createKeydownEvent } from '~/utils/createKeydownEvent'
import { getEventKey } from '~/utils/getEventKey'

type SendActions = Record<Services, (e: KeyboardEvent) => void>

export const sendController: SendActions = {
  discord: (e) => {
    const key = getEventKey(e)
    if (key === 'enter') e.stopPropagation()
  },
  twitter: (e) => {
    const key = getEventKey(e)
    if (key === 'enter') {
      const shiftEnterEvent = createKeydownEvent({ keyCode: 13, shiftKey: true, bubbles: true })
      e.currentTarget?.dispatchEvent(shiftEnterEvent)

      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
    if (key === 'ctrl-enter') {
      const textBox = e.currentTarget as HTMLDivElement
      const container = textBox.closest('[role="complementary"]')
      const sendButton = container.querySelector<HTMLButtonElement>(
        'button[data-testid="dmComposerSendButton"]',
      )
      sendButton.click()
    }
  },
}
