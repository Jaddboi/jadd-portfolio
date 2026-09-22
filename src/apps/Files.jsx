import { useEffect, useState } from 'react'
import { useSystem } from '../system/SystemProvider.jsx'
import { HeaderBar } from '../shell/HeaderBar.jsx'
import { HOME, displayName, getNode, join, places } from '../fs.js'
import { NodeIcon, Sym } from '../shared/icons.jsx'
import { iconClicks } from '../shared/iconClicks.js'
import './Files.css'

export function Files({ win }) {
  const { openPath, touch } = useSystem()
  // Visited folders, like a browser's history; `index` is the one showing, so
  // Back and Forward only move it.
  const [history, setHistory] = useState({ paths: [win.props.path], index: 0 })
  const [selected, setSelected] = useState(null)

  const path = history.paths[history.index]
  const folder = getNode(path)
  const project = folder.project

  function goTo(next) {
    if (next === path) return
    // Going somewhere new drops whatever Forward would have led to.
    setHistory(({ paths, index }) => ({ paths: [...paths.slice(0, index + 1), next], index: index + 1 }))
    setSelected(null)
  }

  const goBack = () => setHistory((h) => ({ ...h, index: h.index - 1 }))
  const goForward = () => setHistory((h) => ({ ...h, index: h.index + 1 }))

  // Opening a folder while Files is already open reuses this window, so it
  // navigates instead. openedAt changes on every open, even to the same folder.
  useEffect(() => {
    goTo(win.props.path)
  }, [win.props.openedAt])

  function open(item) {
    const itemPath = join(path, item.name)
    if (item.type === 'dir') goTo(itemPath)
    else openPath(itemPath)
  }

  const crumbs = breadcrumbs(path)

  return (
    <div className="files">
      <nav className="files-sidebar" aria-label="Places">
        <HeaderBar title="Files" controls={false} />
        <ul>
          {places.map((place) => (
            <li key={place.path}>
              <button className={`place ${path === place.path ? 'active' : ''}`} onClick={() => goTo(place.path)}>
                <Sym name={place.icon} />
                {place.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="files-main">
        <HeaderBar
          start={
            <div className="linked">
              <button className="hb-btn" aria-label="Back" disabled={history.index === 0} onClick={goBack}>
                <Sym name="back" />
              </button>
              <button className="hb-btn" aria-label="Forward" disabled={history.index === history.paths.length - 1} onClick={goForward}>
                <Sym name="forward" />
              </button>
            </div>
          }
          title={
            <div className="pathbar" data-no-drag>
              {crumbs.map((crumb, i) => (
                <span key={crumb.path} className="crumb-wrap">
                  {i > 0 && <span className="crumb-sep">/</span>}
                  <button className={`crumb ${i === crumbs.length - 1 ? 'current' : ''}`} onClick={() => goTo(crumb.path)}>
                    {i === 0 && <Sym name="home" />}
                    {crumb.label}
                  </button>
                </span>
              ))}
            </div>
          }
        />

        <div className="files-view" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          {project && (
            <div className="project-banner">
              <div>
                <strong>{project.tagline}</strong>
                <span className="banner-year">{project.year}</span>
                <p>{project.description}</p>
              </div>
              <ul className="chips" aria-label="Built with">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          )}

          {folder.children.length > 0 ? (
            <ul className="icon-grid" role="listbox" aria-label={crumbs.at(-1).label}>
              {folder.children.map((item) => (
                <li key={item.name} role="option" aria-selected={selected === item.name}>
                  <button
                    className={`file-item ${selected === item.name ? 'selected' : ''}`}
                    title={`Open ${displayName(item)}`}
                    {...iconClicks({ touch, select: () => setSelected(item.name), open: () => open(item) })}
                  >
                    <span className="file-icon">
                      <NodeIcon node={item} />
                    </span>
                    <span className="file-label">{displayName(item)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="files-empty">This folder is empty.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function breadcrumbs(path) {
  const names = path.slice(HOME.length).split('/').filter(Boolean)
  return [{ label: 'Home', path: HOME }, ...names.map((name, i) => ({ label: name, path: join(HOME, names.slice(0, i + 1).join('/')) }))]
}
