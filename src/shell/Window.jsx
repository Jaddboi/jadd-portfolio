import { createContext, useContext, useEffect, useRef } from 'react'
import { useSystem } from '../system/SystemProvider.jsx'
import { APPS } from '../system/apps.js'
import { TOPBAR_HEIGHT } from '../system/windows.js'
import { basename } from '../fs.js'
import './Window.css'

const MIN_WIDTH = 320
const MIN_HEIGHT = 220

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const WindowContext = createContext(null)
export const useWindow = () => useContext(WindowContext)

export function Window({ win, children }) {
  const { focusedId, focus, updateWindow, mobile } = useSystem()
  const ref = useRef(null)
  const drag = useRef(null)

  useEffect(() => {
    const target = ref.current.querySelector('[data-autofocus]') || ref.current
    target.focus({ preventScroll: true })
  }, [])

  function startDrag(e, mode) {
    if (mobile || e.button !== 0) return
    if (mode === 'move' && e.target.closest('button, input, a, [data-no-drag]')) return

    let { x, y } = win
    if (mode === 'move' && win.maximized) {
      // Dragging a maximised window restores it, keeping the same point of the
      // title bar under the pointer: the pointer sits the same fraction along
      // the restored width as it did along the full width.
      const rect = ref.current.getBoundingClientRect()
      x = Math.round(e.clientX - win.w * ((e.clientX - rect.left) / rect.width))
      y = Math.max(0, e.clientY - TOPBAR_HEIGHT - 22)
      updateWindow(win.id, { maximized: false, x, y })
    }
    drag.current = { mode, startX: e.clientX, startY: e.clientY, start: { x, y, w: win.w, h: win.h }, result: null }
    // Keeps the moves coming to this element even if the pointer outruns it.
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onDrag(e) {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.result && Math.abs(dx) + Math.abs(dy) < 3) return // ignore a shaky click

    const areaWidth = window.innerWidth
    const areaHeight = window.innerHeight - TOPBAR_HEIGHT
    // The size and position are written straight onto the element while
    // dragging, and saved to state once, in endDrag: state here would redraw
    // the window and its whole app on every pointer move.
    const { style } = ref.current
    if (d.mode === 'move') {
      d.result = {
        // 120px of the window must stay on screen, so it can always be grabbed.
        x: clamp(d.start.x + dx, -win.w + 120, areaWidth - 120),
        y: clamp(d.start.y + dy, 0, areaHeight - 48),
      }
      style.left = `${d.result.x}px`
      style.top = `${d.result.y}px`
    } else {
      d.result = {
        w: clamp(d.start.w + dx, MIN_WIDTH, areaWidth - win.x),
        h: clamp(d.start.h + dy, MIN_HEIGHT, areaHeight - win.y),
      }
      style.width = `${d.result.w}px`
      style.height = `${d.result.h}px`
    }
  }

  function endDrag() {
    if (drag.current?.result) updateWindow(win.id, drag.current.result)
    drag.current = null
  }

  const style =
    win.maximized || mobile
      ? { zIndex: win.z }
      : { zIndex: win.z, left: win.x, top: win.y, width: win.w, height: win.h }

  const className = [
    'win',
    `app-${win.app}`,
    focusedId === win.id && 'focused',
    win.minimized && 'min',
    win.maximized && 'max',
    win.closing && 'closing',
  ]
    .filter(Boolean)
    .join(' ')

  const label = APPS[win.app].single ? APPS[win.app].title : basename(win.props.path)

  return (
    <WindowContext.Provider value={{ win, startDrag, onDrag, endDrag }}>
      <section
        ref={ref}
        className={className}
        style={style}
        role="dialog"
        aria-label={label}
        aria-hidden={win.minimized || undefined}
        tabIndex={-1}
        onPointerDownCapture={() => focus(win.id)}
      >
        {children}
        {!win.maximized && !mobile && (
          <div
            className="resize-grip"
            onPointerDown={(e) => startDrag(e, 'resize')}
            onPointerMove={onDrag}
            onPointerUp={endDrag}
            aria-hidden="true"
          />
        )}
      </section>
    </WindowContext.Provider>
  )
}
