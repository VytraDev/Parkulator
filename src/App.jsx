import { useEffect, useState } from 'react'
import FeeCalculator from './FeeCalculator.jsx'
import { supabase } from './supabaseClient.js'
import './App.css'

export default function App() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      setSession(data.session)
      setChecking(false)
      if (error) setAuthError(error.message)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession)
        setChecking(false)
      },
    )

    return () => subscription.unsubscribe()
  }, [])

  async function signIn() {
    setAuthError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) setAuthError(error.message)
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) setAuthError(error.message)
  }

  const staffName = session?.user?.user_metadata?.full_name
    || session?.user?.email
    || 'Staff member'

  return (
    <main className="shell">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">P</div>
          <div>
            <strong>Parkulator</strong>
            <span>COUNTER TOOLS</span>
          </div>
        </div>
        <p>STAFF PORTAL / 01</p>
      </header>

      <div className="workspace">
        <section className="intro">
          <p className="eyebrow">PARKING, MADE PLAIN</p>
          <h1>Count the hours.<br /><em>Not the guesses.</em></h1>
          <p className="intro-copy">A quick fee check for the people keeping the car park moving.</p>

          <div className="tariff">
            <div className="tariff-title">
              <span>THE RATE CARD</span>
              <span>ALL PRICES IN RM</span>
            </div>
            <div className="tariff-row"><span>First 15 minutes</span><strong>FREE</strong></div>
            <div className="tariff-row"><span>First hour</span><strong>3.00</strong></div>
            <div className="tariff-row"><span>Each extra hour or part</span><strong>+ 2.00</strong></div>
            <div className="tariff-row"><span>Daily maximum</span><strong>20.00</strong></div>
          </div>
          <p className="fine-print">Same-day tickets only. Check the times before collecting payment.</p>
        </section>

        <section className="panel" aria-label="Staff calculator">
          {checking ? (
            <p className="status">Checking your sign-in...</p>
          ) : session ? (
            <>
              <div className="staff-row">
                <span>Signed in as {staffName}</span>
                <button type="button" className="text-button" onClick={signOut}>Sign out</button>
              </div>
              <FeeCalculator />
            </>
          ) : (
            <div className="sign-in">
              <div className="panel-heading">
                <span>01 / STAFF ACCESS</span>
                <span>GOOGLE SIGN-IN</span>
              </div>
              <div className="sign-in-symbol" aria-hidden="true">P</div>
              <h2>Your counter is ready.</h2>
              <p>Sign in with your Google account to open the fee calculator.</p>
              <button type="button" className="calculate-button" onClick={signIn}>
                Continue with Google
              </button>
              <small>For mall counter staff.</small>
            </div>
          )}
          {authError && <p className="auth-error" role="alert">{authError}</p>}
        </section>
      </div>
      <footer>Parkulator / A little less counting, a little more moving.</footer>
    </main>
  )
}
