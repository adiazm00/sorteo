import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import logoUrl from '../img/logo_res.webp'
import './main.css'

function App() {
  const [minimum, setMinimum] = useState('0')
  const [maximum, setMaximum] = useState('10000')
  const [winner, setWinner] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState('')

  const calculateWinner = () => {
    const min = Number(minimum)
    const max = Number(maximum)

    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      setError('Introduce límites enteros.')
      return
    }

    if (min < 0 || max < 0 || min > 10000 || max > 10000) {
      setError('Los límites deben estar entre 0 y 10000.')
      return
    }

    setError('')
    setWinner(null)
    setIsCalculating(true)

    window.setTimeout(() => {
      let selected: number

      if (min <= max) {
        selected = Math.floor(Math.random() * (max - min + 1)) + min
      } else {
        const upperCount = 10000 - min + 1
        const lowerCount = max + 1
        const position = Math.floor(Math.random() * (upperCount + lowerCount))
        selected = position < upperCount ? min + position : position - upperCount
      }

      setWinner(selected)
      setIsCalculating(false)
    }, 3000)
  }

  return (
    <main className="app-shell">
      <section className="draw-card" aria-labelledby="draw-title">
        <header className="header">
          <img className="logo" src={logoUrl} alt="Escudo de San Pablo F.S." />
          <div>
            <p className="eyebrow">Sorteo oficial</p>
            <div className="title-container">
              <h1 id="draw-title">Papeletas </h1>
              <h1 id="draw-title">San Pablo F.S.</h1>
            </div>
          </div>
        </header>

        <div className="main-container">
          <div className="limit-grid">
            <label>
              Primer número
              <input
                type="number"
                min="0"
                max="10000"
                value={minimum}
                onChange={(event) => setMinimum(event.target.value)}
              />
            </label>

            <span className="range-divider" aria-hidden="true">
              -
            </span>

            <label>
              Último número
              <input
                type="number"
                min="0"
                max="10000"
                value={maximum}
                onChange={(event) => setMaximum(event.target.value)}
              />
            </label>
          </div>

          <button type="button" onClick={calculateWinner} disabled={isCalculating}>
            {isCalculating ? 'Calculando ganador...' : 'Escoger número'}
          </button>

          {error && (
            <p className="status status-error" role="alert">
              {error}
            </p>
          )}
          {isCalculating && (
            <p className="status status-loading">
              <span className="spinner" aria-hidden="true" />
              Calculando el ganador...
            </p>
          )}
          {!isCalculating && winner !== null && (
            <div className="winner" aria-live="polite">
              <span>Número ganador</span>
              <strong>{winner}</strong>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
