export const createKeydownEvent = (option: KeyboardEventInit) => {
  return new KeyboardEvent('keydown', option)
}
