import { match } from 'ts-pattern'
import type { Services } from '~/types/serviceType'

const querySelectorArray = <T extends Element>(selector: string): T[] => [
  ...document.querySelectorAll<T>(selector),
]

export const getTriggeredTextBoxes = (service: Services): HTMLElement[] =>
  match(service)
    .with('discord', () =>
      querySelectorArray<HTMLDivElement>('[class^="textArea"] > div > div[role="textbox"]'),
    )
    .with('twitter', () =>
      querySelectorArray<HTMLDivElement>(
        '.DraftEditor-root > .DraftEditor-editorContainer > div[role="textbox"]',
      ),
    )
    .otherwise(() => [])
