import { useEffect, useState } from 'react'
import { useSystem } from '../system/SystemProvider.jsx'
import { HOME, displayName, getNode } from '../fs.js'
import { profile, projects } from '../data.js'
import { NodeIcon } from '../shared/icons.jsx'
import { iconClicks } from '../shared/iconClicks.js'
import './Desktop.css'

const DESKTOP_ITEMS = [
  ...projects.map((p) => `${HOME}/Projects/${p.slug}`),
  `${HOME}/Documents/resume.pdf`,
  `${HOME}/Documents/about.txt`,
  `${HOME}/Documents/hobbies.txt`,
]

export function Desktop() {
  const { openPath, touch, reducedMotion } = useSystem()
  const typed = useTypewriter(profile.typing, !reducedMotion)
  const [selected, setSelected] = useState(null)

  // A press on the desktop itself, rather than on an icon, clears the selection.
  const onPointerDown = (e) => e.target === e.currentTarget && setSelected(null)

  return (
    <div className="desktop" onPointerDown={onPointerDown}>
      <div className="welcome">
        <p className="welcome-kicker">Hi, I'm {profile.firstName}. Welcome to my</p>
        <h1 className="welcome-title">portfolio</h1>
        <p className="welcome-typed">
          <span className="typed-prompt">{profile.username}@{profile.hostname}</span>:~$ {typed}
          <span className="cursor" aria-hidden="true" />
        </p>
        <p className="welcome-hint">
          {touch ? 'Tap a folder to look inside' : 'Double-click a folder to look inside'}, or open Terminal and type{' '}
          <kbd>help</kbd>
        </p>
      </div>
      <ul className="desk-icons" aria-label="Desktop">
        {DESKTOP_ITEMS.map((path) => {
          const node = getNode(path)
          const name = displayName(node)
          return (
            <li key={path}>
              <button
                className={`desk-icon ${selected === path ? 'selected' : ''}`}
                title={`Open ${name}`}
                {...iconClicks({ touch, select: () => setSelected(path), open: () => openPath(path) })}
              >
                <span className="desk-glyph">
                  <NodeIcon node={node} />
                </span>
                <span className="desk-label">{name}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Types a phrase out letter by letter, waits, deletes it, then starts the next.
// With `animate` off, the first phrase is simply shown in full.
function useTypewriter(phrases, animate) {
  const [phrase, setPhrase] = useState(0)
  const [shown, setShown] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!animate) return
    const full = shown === phrases[phrase].length
    const empty = shown === 0
    // One timer per letter: pause before the next phrase, delete, rest at the
    // end of a phrase, or type. Each change re-runs this effect, which
    // schedules the next letter.
    const wait = deleting ? (empty ? 350 : 45) : full ? 1900 : 80
    const timer = setTimeout(() => {
      if (deleting && empty) {
        setDeleting(false)
        setPhrase((p) => (p + 1) % phrases.length)
      } else if (!deleting && full) {
        setDeleting(true)
      } else {
        setShown(shown + (deleting ? -1 : 1))
      }
    }, wait)
    return () => clearTimeout(timer)
  }, [phrases, phrase, shown, deleting, animate])

  return animate ? phrases[phrase].slice(0, shown) : phrases[0]
}
