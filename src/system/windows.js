import { APPS } from './apps.js'

// Keep these in step with --topbar-h and --dock-reserve in base.css.
export const TOPBAR_HEIGHT = 32
const DOCK_WIDTH = 76

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

export function newWindowGeometry(app, openedSoFar) {
  const areaWidth = window.innerWidth
  const areaHeight = window.innerHeight - TOPBAR_HEIGHT
  const w = Math.min(APPS[app].width, areaWidth - DOCK_WIDTH - 32)
  const h = Math.min(APPS[app].height, areaHeight - 40)
  // -2, -1, 0, 1, 2, 3, then round again: each window opens a little further
  // down and right than the last, in a cycle of six.
  const step = (openedSoFar % 6) - 2
  return {
    x: clamp(Math.round((areaWidth - w) / 2 + step * 28), DOCK_WIDTH, areaWidth - w - 8),
    y: clamp(Math.round((areaHeight - h) / 2 + step * 24), 8, areaHeight - h - 8),
    w,
    h,
  }
}

export const initialWindows = { windows: [], topZ: 10 }

// The focused window, worked out rather than stored: the visible one on top.
export function frontWindow(windows) {
  const visible = windows.filter((w) => !w.minimized && !w.closing)
  return visible.reduce((top, w) => (top && top.z > w.z ? top : w), null)
}

export function windowsReducer(state, action) {
  switch (action.type) {
    case 'open': {
      // A window playing its closing animation doesn't count: it's on its way out.
      const existing = state.windows.find((w) => w.key === action.key && !w.closing)
      if (existing) {
        const props = { ...existing.props, ...action.props, openedAt: action.openedAt }
        return bringToFront(update(state, existing.id, { props, minimized: false }), existing.id)
      }
      const win = {
        id: action.id,
        key: action.key,
        app: action.app,
        props: action.props,
        ...action.geometry,
        minimized: false,
        maximized: false,
        closing: false,
      }
      return bringToFront({ ...state, windows: [...state.windows, win] }, win.id)
    }
    case 'focus': {
      const win = state.windows.find((w) => w.id === action.id)
      // Returning the same state tells React nothing changed, so clicks inside
      // the front window don't redraw anything.
      if (frontWindow(state.windows) === win) return state
      return bringToFront(update(state, win.id, { minimized: false }), win.id)
    }
    case 'minimize':
      return update(state, action.id, { minimized: true })
    case 'toggleMaximize': {
      const win = state.windows.find((w) => w.id === action.id)
      return update(state, action.id, { maximized: !win.maximized })
    }
    case 'update':
      return update(state, action.id, action.changes)
    // Closing happens in two steps: marked first, so the fade-out in Window.css
    // can play, then removed by the timer in SystemProvider's close().
    case 'startClosing':
      return update(state, action.id, { closing: true })
    case 'remove':
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) }
  }
}

// A copy of the state with one window's fields changed; every other window is
// the same object as before, so React can see exactly what changed.
function update(state, id, changes) {
  return { ...state, windows: state.windows.map((w) => (w.id === id ? { ...w, ...changes } : w)) }
}

function bringToFront(state, id) {
  const topZ = state.topZ + 1
  return { ...update(state, id, { z: topZ }), topZ }
}
