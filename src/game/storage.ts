import type { GameState } from './types'

export const SAVE_KEY = 'monopoly-local-save'

export function saveGame(state: GameState): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state))
}

export function loadGame(): GameState | null {
  const saved = localStorage.getItem(SAVE_KEY)

  if (!saved) {
    return null
  }

  try {
    return JSON.parse(saved) as GameState
  } catch {
    return null
  }
}

export function clearSavedGame(): void {
  localStorage.removeItem(SAVE_KEY)
}
