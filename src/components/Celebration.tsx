import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export function Celebration() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { zIndex: 1000 },
        particles: {
          number: { value: 0 },
          color: { value: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'] },
          shape: { type: ['circle', 'square'] },
          opacity: { value: { min: 0, max: 1 }, animation: { enable: true, speed: 2, startValue: 'max', destroy: 'min' } },
          size: { value: { min: 3, max: 7 } },
          life: { duration: { sync: true, value: 5 }, count: 1 },
          move: {
            enable: true,
            gravity: { enable: true, acceleration: 10 },
            speed: { min: 10, max: 20 },
            decay: 0.1,
            direction: 'none',
            outModes: { default: 'destroy', top: 'none' }
          }
        },
        emitters: [
          {
            direction: 'top-right',
            rate: { delay: 0.1, quantity: 10 },
            position: { x: 0, y: 100 },
            size: { width: 0, height: 0 }
          },
          {
            direction: 'top-left',
            rate: { delay: 0.1, quantity: 10 },
            position: { x: 100, y: 100 },
            size: { width: 0, height: 0 }
          }
        ]
      }}
    />
  )
}
