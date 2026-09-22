import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react'
import { getNode } from '../fs.js'
import { OPEN_WITH, windowKey } from './apps.js'
import { frontWindow, initialWindows, newWindowGeometry, windowsReducer } from './windows.js'
import { useMediaQuery } from './useMediaQuery.js'
import { saved } from './storage.js'

const SystemContext = createContext(null)

export const useSystem = () => useContext(SystemContext)

export function SystemProvider({ children }) {
  const [{ windows }, dispatch] = useReducer(windowsReducer, initialWindows)
  const focusedId = frontWindow(windows)?.id ?? null // worked out, never stored
  const windowsOpened = useRef(0)

  const mobile = useMediaQuery('(max-width: 720px)')
  const coarsePointer = useMediaQuery('(pointer: coarse)')
  const touch = mobile || coarsePointer
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  const [chosenTheme, setChosenTheme] = useState(() => saved.get('theme'))
  const theme = chosenTheme || (prefersDark ? 'dark' : 'light')

  // Visitors who asked their system for less motion skip the boot log.
  const [booting, setBooting] = useState(!reducedMotion)

  const [toast, setToast] = useState(null)
  const toastTimer = useRef()

  // The CSS switches every colour from this attribute on <html>.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function openApp(app, props = {}) {
    const openedSoFar = windowsOpened.current++
    dispatch({
      type: 'open',
      id: `w${openedSoFar + 1}`,
      key: windowKey(app, props),
      app,
      props,
      openedAt: Date.now(),
      geometry: newWindowGeometry(app, openedSoFar),
    })
  }

  // Like double-clicking a file: open it in whichever app handles its kind.
  function openPath(path) {
    const node = getNode(path)
    if (node.kind === 'link') window.open(node.url, '_blank', 'noopener,noreferrer')
    else openApp(OPEN_WITH[node.type === 'dir' ? 'dir' : node.kind], { path })
  }

  function close(id) {
    dispatch({ type: 'startClosing', id })
    // Removed once the 150ms closing animation in Window.css has played.
    setTimeout(() => dispatch({ type: 'remove', id }), reducedMotion ? 0 : 150)
  }

  function setTheme(next) {
    setChosenTheme(next)
    saved.set('theme', next)
  }

  function showToast(message) {
    clearTimeout(toastTimer.current)
    setToast({ message, id: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }

  function finishBoot() {
    setBooting(false)
  }

  const system = {
    windows,
    focusedId,
    openApp,
    openPath,
    close,
    focus: (id) => dispatch({ type: 'focus', id }),
    minimize: (id) => dispatch({ type: 'minimize', id }),
    toggleMaximize: (id) => dispatch({ type: 'toggleMaximize', id }),
    updateWindow: (id, changes) => dispatch({ type: 'update', id, changes }),
    theme,
    setTheme,
    booting,
    finishBoot,
    toast,
    showToast,
    mobile,
    touch,
    reducedMotion,
  }

  return <SystemContext.Provider value={system}>{children}</SystemContext.Provider>
}
