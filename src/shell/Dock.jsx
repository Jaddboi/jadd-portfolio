import { useSystem } from '../system/SystemProvider.jsx'
import { APPS, DOCK, windowKey } from '../system/apps.js'
import './Dock.css'

export function Dock() {
  const { windows, focusedId, openApp, focus, minimize } = useSystem()

  return (
    <nav className="dock" aria-label="Dock">
      <ul>
        {DOCK.map((item) => {
          const { title, icon: Icon } = APPS[item.app]
          const win = windows.find((w) => w.key === windowKey(item.app, item.props) && !w.closing)
          const inFront = win && win.id === focusedId

          // Like Ubuntu: open the app, hide it if it's already in front, or
          // bring it back if it's behind or minimised.
          const onClick = () => {
            if (!win) openApp(item.app, item.props)
            else if (inFront) minimize(win.id)
            else focus(win.id)
          }

          return (
            <li key={item.app}>
              <button
                className={`dock-item ${win ? 'running' : ''} ${inFront ? 'active' : ''}`}
                onClick={onClick}
                aria-label={`${title} — ${item.hint}`}
              >
                <Icon />
                <span className="dock-tip" aria-hidden="true">
                  {title} <span>· {item.hint}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
