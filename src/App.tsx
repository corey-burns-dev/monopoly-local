import { useEffect, useRef, useState } from 'react'
import './App.css'
import { GameBoard } from './components/GameBoard'
import { SetupScreen } from './components/SetupScreen'
import { LeftSidebar, BottomBar } from './components/Sidebar'
import { useGameStore } from './game/store'
import { getPropertyDetailsSummary, getSpace } from './game/selectors'
import { Celebration } from './components/Celebration'

function App() {
  const {
    game,
    hasSavedGame,
    startGame,
    loadSavedGame,
    clearSavedGame,
    advanceMovement,
    buyProperty,
    declineProperty,
    acknowledgeCard,
  } = useGameStore()

  const [toast, setToast] = useState<string | null>(null)
  const logLengthRef = useRef(0)
  const toastTimerRef = useRef<number | undefined>(undefined)

  // Auto-advance movement
  useEffect(() => {
    if (!game || game.phase !== 'moving' || !game.move) {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      advanceMovement()
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [game, advanceMovement])

  // Toast notifications for game log
  useEffect(() => {
    if (!game || game.log.length === 0) return
    if (game.log.length <= logLengthRef.current) {
      logLengthRef.current = game.log.length
      return
    }
    const latest = game.log[game.log.length - 1]
    logLengthRef.current = game.log.length
    setToast(latest)
    
    clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3000)
  }, [game?.log.length])

  if (!game) {
    return (
      <SetupScreen
        hasSavedGame={hasSavedGame}
        onStart={startGame}
        onLoadSaved={loadSavedGame}
        onClearSaved={clearSavedGame}
      />
    )
  }

  const currentPlayer = game.players[game.currentPlayerIndex]
  const pendingPurchaseSpace = game.pendingPurchase ? getSpace(game.pendingPurchase.propertyId) : null

  return (
    <>
      <div className="app-shell">
        <LeftSidebar />
        <main className="main-content">
          <GameBoard />
          <BottomBar />
        </main>
      </div>

      {toast && (
        <div className="toast glass nm-flat">
          {toast}
        </div>
      )}

      {/* Modern Glassmorphism Modals */}
      {game.phase === 'await_purchase' && pendingPurchaseSpace && (
        <div className="modal-overlay">
          <div className="modal-content glass nm-convex">
            <h2 className="modal-title">Buy {pendingPurchaseSpace.name}?</h2>
            <div className="modal-body">
              <p>{getPropertyDetailsSummary(game, pendingPurchaseSpace.index)}</p>
              {'rent' in pendingPurchaseSpace ? (
                <p className="muted-text">{`Rent scale: ${pendingPurchaseSpace.rent.join(' / ')}`}</p>
              ) : (
                <p className="muted-text">Railroads and utilities have dynamic rent based on ownership and dice.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-nm" onClick={declineProperty}>
                Decline
              </button>
              <button
                type="button"
                className="btn-nm btn-primary"
                onClick={buyProperty}
                disabled={!('price' in pendingPurchaseSpace) || currentPlayer.money < pendingPurchaseSpace.price}
              >
                {'price' in pendingPurchaseSpace ? `Buy ($${pendingPurchaseSpace.price})` : 'Buy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {game.phase === 'show_card' && game.pendingCard && (
        <div className="modal-overlay">
          <div className="modal-content glass nm-convex">
            <h2 className="modal-title">{game.pendingCard.deck === 'chance' ? 'Chance' : 'Community Chest'}</h2>
            <div className="modal-body">
              <p>{game.pendingCard.description}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-nm btn-primary" onClick={acknowledgeCard}>
                Resolve
              </button>
            </div>
          </div>
        </div>
      )}

      {game.winnerId && (
        <>
          <Celebration />
          <div className="modal-overlay">
            <div className="modal-content glass nm-convex">
              <h2 className="modal-title">Game Over</h2>
              <div className="modal-body">
                <p>{game.players.find(p => p.id === game.winnerId)?.name} wins!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-nm btn-primary" onClick={clearSavedGame}>
                  New Game
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default App
