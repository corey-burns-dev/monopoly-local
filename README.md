# Monopoly Local

A fully local Monopoly-style board game built with Vite, React, and TypeScript. It supports 2 to 8 players sharing one computer and includes end-to-end playable rules for movement, buying, rent, houses/hotels, jail, cards, auctions, bankruptcy, and win detection.

## Setup

```bash
npm install
npm run dev
```

Open the local Vite URL in a browser.

## Scripts

```bash
npm run dev
npm run build
npm test
```

## Implemented gameplay

- 2 to 8 local players with custom names, tokens, and colors
- Full 40-space square board with properties, railroads, utilities, taxes, cards, jail, free parking, and go to jail
- Dice rolling, doubles, triple-doubles jail rule, and animated movement one space at a time
- Property purchase flow with auctions on decline
- Rent for properties, color monopolies, houses, hotels, railroads, and utilities
- House and hotel building with even-building enforcement across color groups
- Jail flow with bail, get-out card use, and doubles escape logic
- Chance and Community Chest style decks with shuffled cycling and reusable get-out cards
- Debt handling, mortgaging, selling buildings, bankruptcy, asset transfer, and winner detection
- Local save/load through `localStorage`

## Architecture

- `src/game/data`
  - Static board and card definitions.
- `src/game/engine.ts`
  - Pure rules engine functions for turn flow, movement, economy, jail, auctions, and bankruptcy.
- `src/game/selectors.ts`
  - Derived lookups for ownership, rent context, and UI summaries.
- `src/game/storage.ts`
  - Local save/load helpers.
- `src/components`
  - Setup screen, board, sidebar, modal, and property management UI.

The UI is intentionally thin. It dispatches engine operations, animates token movement, and renders prompts from engine state. That keeps the rules layer reusable for a later multiplayer or AI version.

## Notes

- Save data is written automatically while playing and can also be saved manually from the sidebar.
- Mortgages are included. Trading and AI players are not included yet.
- A small Vitest suite covers purchase flow, extra-turn persistence through card resolution, and even-building rules.
