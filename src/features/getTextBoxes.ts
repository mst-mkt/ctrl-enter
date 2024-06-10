import { match } from 'ts-pattern'
import type { Services } from '~/types/serviceType'

export const getTriggeredTextBoxes = (service: Services): HTMLElement[] =>
  match(service)
    .with('discord', () => [
      ...document.querySelectorAll<HTMLDivElement>(
        '[class^="textArea"] > div > div[role="textbox"]',
      ),
    ])
    .otherwise(() => [])
