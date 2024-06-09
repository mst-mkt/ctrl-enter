import type { Services } from '~/types/serviceType'

type SendActions = Record<Services, (e: KeyboardEvent) => void>

export const send: SendActions = {
  discord: (e) => {
    console.log('send to discord')
  },
}
