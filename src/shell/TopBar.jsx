import { useEffect, useRef, useState } from 'react'
import { useSystem } from '../system/SystemProvider.jsx'
import { Sym } from '../shared/icons.jsx'
import './TopBar.css'

export function TopBar() {
  const now = useClock()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuArea = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e) => {
      if (!menuArea.current.contains(e.target)) setMenuOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const date = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  const time = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

  return (
    <header className="topbar">
      <time className="tb-clock" dateTime={now.toISOString()}>
        {date}&ensp;{time}
      </time>
      <div className="tb-right" ref={menuArea}>
        <button
          className={`tb-btn ${menuOpen ? 'pressed' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="System menu"
        >
          <Sym name="wifi" />
          <Sym name="volume" />
          <Sym name="battery" />
        </button>
        {menuOpen && <SystemMenu />}
      </div>
    </header>
  )
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10_000)
    return () => clearInterval(timer)
  }, [])
  return now
}

function SystemMenu() {
  const { theme, setTheme } = useSystem()
  const dark = theme === 'dark'
  return (
    <div className="qs" role="dialog" aria-label="System menu">
      <button className={`qs-toggle ${dark ? 'on' : ''}`} aria-pressed={dark} onClick={() => setTheme(dark ? 'light' : 'dark')}>
        <Sym name="moon" />
        Dark Style
      </button>
    </div>
  )
}
