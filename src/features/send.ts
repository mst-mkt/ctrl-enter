import type { Services } from '~/types/serviceType'
import { getEventKey } from '~/utils/getEventKey'

type SendActions = Record<Services, (e: KeyboardEvent) => void>

export const send: SendActions = {
  discord: (e) => {
    const key = getEventKey(e)
    if (key === 'enter') e.stopPropagation()
  },
}
