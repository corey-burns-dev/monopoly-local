export type ColorGroup =
  | 'brown'
  | 'lightBlue'
  | 'pink'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'green'
  | 'darkBlue'

export type SpaceType =
  | 'go'
  | 'property'
  | 'railroad'
  | 'utility'
  | 'tax'
  | 'chance'
  | 'communityChest'
  | 'jail'
  | 'freeParking'
  | 'goToJail'

export type DeckType = 'chance' | 'communityChest'

export type TurnPhase =
  | 'await_roll'
  | 'moving'
  | 'await_purchase'
  | 'show_card'
  | 'auction'
  | 'manage_debt'
  | 'await_end_turn'
  | 'game_over'

export type DiceTuple = readonly [number, number]

export interface BaseSpace {
  index: number
  name: string
  type: SpaceType
}

export interface GoSpace extends BaseSpace {
  type: 'go'
}

export interface PropertySpace extends BaseSpace {
  type: 'property'
  colorGroup: ColorGroup
  price: number
  rent: readonly [number, number, number, number, number, number]
  houseCost: number
  mortgageValue: number
}

export interface RailroadSpace extends BaseSpace {
  type: 'railroad'
  price: number
  mortgageValue: number
}

export interface UtilitySpace extends BaseSpace {
  type: 'utility'
  price: number
  mortgageValue: number
}

export interface TaxSpace extends BaseSpace {
  type: 'tax'
  amount: number
}

export interface CardSpace extends BaseSpace {
  type: 'chance' | 'communityChest'
}

export interface JailSpace extends BaseSpace {
  type: 'jail'
}

export interface FreeParkingSpace extends BaseSpace {
  type: 'freeParking'
}

export interface GoToJailSpace extends BaseSpace {
  type: 'goToJail'
}

export type BoardSpace =
  | GoSpace
  | PropertySpace
  | RailroadSpace
  | UtilitySpace
  | TaxSpace
  | CardSpace
  | JailSpace
  | FreeParkingSpace
  | GoToJailSpace

export interface DeedState {
  ownerId: string | null
  houses: number
  hotel: boolean
  mortgaged: boolean
}

export interface PlayerState {
  id: string
  name: string
  token: string
  color: string
  money: number
  position: number
  inJail: boolean
  jailTurns: number
  bankrupt: boolean
  getOutOfJailCards: DeckType[]
}

export interface MoveState {
  playerId: string
  stepsRemaining: number
  direction: 1 | -1
  dice: DiceTuple | null
  total: number
  startedWithDoubles: boolean
  suppressExtraTurn: boolean
  passGoAllowed: boolean
  specialRent?: {
    railroadMultiplier?: number
    utilityMultiplier?: number
  }
}

export interface PendingPurchase {
  propertyId: number
}

export interface PendingCard {
  deck: DeckType
  cardId: string
  description: string
}

export interface AuctionState {
  propertyId: number
  activePlayerId: string
  eligiblePlayerIds: string[]
  passedPlayerIds: string[]
  highestBidderId: string | null
  highestBid: number
}

export interface DebtState {
  payerId: string
  amount: number
  recipientId: string | null
  reason: string
}

export interface ContinueWithMove {
  type: 'movement'
  move: MoveState
}

export interface ContinueWithTransfers {
  type: 'transfers'
  transfers: Array<{
    playerId: string
    amount: number
  }>
}

export type PendingContinuation = ContinueWithMove | ContinueWithTransfers | null

export interface DeckState {
  drawPile: string[]
  discardPile: string[]
}

export interface SettingsState {
  passGoAmount: number
  bailAmount: number
  startingMoney: number
  auctionsEnabled: boolean
}

export interface GameState {
  players: PlayerState[]
  currentPlayerIndex: number
  phase: TurnPhase
  deeds: Record<number, DeedState>
  decks: Record<DeckType, DeckState>
  dice: DiceTuple | null
  lastRollTotal: number | null
  doublesRolledThisTurn: number
  move: MoveState | null
  pendingPurchase: PendingPurchase | null
  pendingCard: PendingCard | null
  pendingAuction: AuctionState | null
  pendingDebt: DebtState | null
  continuation: PendingContinuation
  extraTurn: boolean
  turn: number
  winnerId: string | null
  log: string[]
  settings: SettingsState
  selectedSpace: number | null
}

export interface PlayerSetup {
  name: string
  token: string
  color: string
}

export type CardAction =
  | { type: 'money'; amount: number }
  | { type: 'moveTo'; destination: number; collectGo: boolean }
  | { type: 'moveRelative'; spaces: number }
  | { type: 'goToJail' }
  | { type: 'collectFromEach'; amount: number }
  | { type: 'payEach'; amount: number }
  | { type: 'getOutOfJailFree' }
  | { type: 'streetRepairs'; perHouse: number; perHotel: number }
  | { type: 'nearestRailroad'; multiplier: number }
  | { type: 'nearestUtility'; multiplier: number }

export interface CardDefinition {
  id: string
  deck: DeckType
  description: string
  action: CardAction
}
