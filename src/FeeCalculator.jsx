import { useState } from 'react'
import { parkingFee } from './fee.js'

export default function FeeCalculator() {
  const [entry, setEntry] = useState('')
  const [exit, setExit] = useState('')
  const [fee, setFee] = useState(null)
  const [message, setMessage] = useState('')

  function calculate(event) {
    event.preventDefault()

    const [entryHour, entryMinute] = entry.split(':').map(Number)
    const [exitHour, exitMinute] = exit.split(':').map(Number)
    const entryMinutes = entryHour * 60 + entryMinute
    const exitMinutes = exitHour * 60 + exitMinute

    if (exitMinutes <= entryMinutes) {
      setFee(null)
      setMessage('Exit time must be after entry time')
      return
    }

    const amount = parkingFee(exitMinutes - entryMinutes)
    setFee('RM ' + amount.toFixed(2))
    setMessage('')
  }

  return (
    <div className="calculator">
      <div className="panel-heading">
        <span>01 / NEW CALCULATION</span>
        <span>SAME DAY ONLY</span>
      </div>
      <h2>Parking fee</h2>
      <p className="panel-intro">Enter the time on the ticket and the time the car leaves.</p>

      <form onSubmit={calculate}>
        <label htmlFor="entry">Entry time</label>
        <input
          id="entry"
          type="time"
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
        />
        <label htmlFor="exit">Exit time</label>
        <input
          id="exit"
          type="time"
          value={exit}
          onChange={(event) => setExit(event.target.value)}
        />
        <button type="submit" className="calculate-button">Calculate fee</button>
      </form>

      <div className="result" aria-live="polite">
        <span>TOTAL TO COLLECT</span>
        {message ? <p className="error">{message}</p> : <strong>{fee ?? 'RM 0.00'}</strong>}
        {!message && <small>{fee === null ? 'Ready for the first ticket' : 'For this parking session'}</small>}
      </div>
    </div>
  )
}
