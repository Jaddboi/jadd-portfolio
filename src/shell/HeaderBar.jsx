import { useSystem } from '../system/SystemProvider.jsx'
import { Sym } from '../shared/icons.jsx'
import { useWindow } from './Window.jsx'
import './HeaderBar.css'

export function HeaderBar({ start, title, subtitle, end, controls = true }) {
  const { win, startDrag, onDrag, endDrag } = useWindow()
  const { close, minimize, toggleMaximize, mobile } = useSystem()

  const onDoubleClick = (e) => {
    if (!mobile && !e.target.closest('button, input, a')) toggleMaximize(win.id)
  }

  return (
    <header
      className="headerbar"
      onPointerDown={(e) => startDrag(e, 'move')}
      onPointerMove={onDrag}
      onPointerUp={endDrag}
      onDoubleClick={onDoubleClick}
    >
      <div className="hb-start">{start}</div>
      <div className="hb-title">
        {typeof title === 'string' ? <span className="hb-title-text">{title}</span> : title}
        {subtitle && <span className="hb-subtitle">{subtitle}</span>}
      </div>
      <div className="hb-end">
        {end}
        {controls && (
          <div className="win-controls">
            {!mobile && (
              <>
                <button className="wc" onClick={() => minimize(win.id)} aria-label="Minimize">
                  <Sym name="minimize" />
                </button>
                <button className="wc" onClick={() => toggleMaximize(win.id)} aria-label={win.maximized ? 'Restore' : 'Maximize'}>
                  <Sym name={win.maximized ? 'restore' : 'maximize'} />
                </button>
              </>
            )}
            <button className="wc wc-close" onClick={() => close(win.id)} aria-label="Close">
              <Sym name="close" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
