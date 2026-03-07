import type { CardDefinition } from '../types'

export const CHANCE_CARDS: CardDefinition[] = [
  { id: 'chance-advance-go', deck: 'chance', description: 'Advance to Go. Collect $200.', action: { type: 'moveTo', destination: 0, collectGo: true } },
  { id: 'chance-advance-illinois', deck: 'chance', description: 'Advance to Illinois Avenue.', action: { type: 'moveTo', destination: 24, collectGo: true } },
  { id: 'chance-advance-st-charles', deck: 'chance', description: 'Advance to St. Charles Place.', action: { type: 'moveTo', destination: 11, collectGo: true } },
  { id: 'chance-nearest-utility', deck: 'chance', description: 'Advance token to the nearest Utility. If unowned, you may buy it. If owned, pay ten times the amount thrown.', action: { type: 'nearestUtility', multiplier: 10 } },
  { id: 'chance-nearest-railroad-1', deck: 'chance', description: 'Advance token to the nearest Railroad and pay double rent if owned.', action: { type: 'nearestRailroad', multiplier: 2 } },
  { id: 'chance-nearest-railroad-2', deck: 'chance', description: 'Advance token to the nearest Railroad and pay double rent if owned.', action: { type: 'nearestRailroad', multiplier: 2 } },
  { id: 'chance-bank-dividend', deck: 'chance', description: 'Bank pays you dividend of $50.', action: { type: 'money', amount: 50 } },
  { id: 'chance-get-out', deck: 'chance', description: 'Get Out of Jail Free. This card may be kept until needed.', action: { type: 'getOutOfJailFree' } },
  { id: 'chance-go-back-three', deck: 'chance', description: 'Go back three spaces.', action: { type: 'moveRelative', spaces: -3 } },
  { id: 'chance-go-to-jail', deck: 'chance', description: 'Go directly to Jail. Do not pass Go. Do not collect $200.', action: { type: 'goToJail' } },
  { id: 'chance-building-loan', deck: 'chance', description: 'Your building loan matures. Collect $150.', action: { type: 'money', amount: 150 } },
  { id: 'chance-chairman', deck: 'chance', description: 'You have been elected Chairman of the Board. Pay each player $50.', action: { type: 'payEach', amount: 50 } },
  { id: 'chance-boardwalk', deck: 'chance', description: 'Take a trip to Boardwalk.', action: { type: 'moveTo', destination: 39, collectGo: false } },
  { id: 'chance-general-repairs', deck: 'chance', description: 'Make general repairs on all your property: pay $25 per house and $100 per hotel.', action: { type: 'streetRepairs', perHouse: 25, perHotel: 100 } },
  { id: 'chance-crossword', deck: 'chance', description: 'You have won a crossword competition. Collect $100.', action: { type: 'money', amount: 100 } },
  { id: 'chance-poor-tax', deck: 'chance', description: 'Pay poor tax of $15.', action: { type: 'money', amount: -15 } },
]

export const COMMUNITY_CHEST_CARDS: CardDefinition[] = [
  { id: 'chest-advance-go', deck: 'communityChest', description: 'Advance to Go. Collect $200.', action: { type: 'moveTo', destination: 0, collectGo: true } },
  { id: 'chest-bank-error', deck: 'communityChest', description: 'Bank error in your favor. Collect $200.', action: { type: 'money', amount: 200 } },
  { id: 'chest-doctors-fee', deck: 'communityChest', description: 'Doctor’s fee. Pay $50.', action: { type: 'money', amount: -50 } },
  { id: 'chest-sale-stock', deck: 'communityChest', description: 'From sale of stock you get $50.', action: { type: 'money', amount: 50 } },
  { id: 'chest-get-out', deck: 'communityChest', description: 'Get Out of Jail Free. This card may be kept until needed.', action: { type: 'getOutOfJailFree' } },
  { id: 'chest-go-to-jail', deck: 'communityChest', description: 'Go to Jail. Go directly to jail. Do not pass Go. Do not collect $200.', action: { type: 'goToJail' } },
  { id: 'chest-holiday-fund', deck: 'communityChest', description: 'Holiday fund matures. Receive $100.', action: { type: 'money', amount: 100 } },
  { id: 'chest-income-tax-refund', deck: 'communityChest', description: 'Income tax refund. Collect $20.', action: { type: 'money', amount: 20 } },
  { id: 'chest-birthday', deck: 'communityChest', description: 'It is your birthday. Collect $10 from every player.', action: { type: 'collectFromEach', amount: 10 } },
  { id: 'chest-life-insurance', deck: 'communityChest', description: 'Life insurance matures. Collect $100.', action: { type: 'money', amount: 100 } },
  { id: 'chest-hospital-fees', deck: 'communityChest', description: 'Hospital fees. Pay $100.', action: { type: 'money', amount: -100 } },
  { id: 'chest-school-fees', deck: 'communityChest', description: 'School fees. Pay $50.', action: { type: 'money', amount: -50 } },
  { id: 'chest-consultancy', deck: 'communityChest', description: 'Receive $25 consultancy fee.', action: { type: 'money', amount: 25 } },
  { id: 'chest-street-repairs', deck: 'communityChest', description: 'You are assessed for street repairs: pay $40 per house and $115 per hotel.', action: { type: 'streetRepairs', perHouse: 40, perHotel: 115 } },
  { id: 'chest-beauty-contest', deck: 'communityChest', description: 'You have won second prize in a beauty contest. Collect $10.', action: { type: 'money', amount: 10 } },
  { id: 'chest-inheritance', deck: 'communityChest', description: 'You inherit $100.', action: { type: 'money', amount: 100 } },
]

export const CARD_LOOKUP: Record<string, CardDefinition> = [...CHANCE_CARDS, ...COMMUNITY_CHEST_CARDS].reduce<Record<string, CardDefinition>>(
  (accumulator, card) => {
    accumulator[card.id] = card
    return accumulator
  },
  {},
)
