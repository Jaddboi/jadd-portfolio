import { useEffect, useRef } from 'react'
import { HeaderBar } from '../shell/HeaderBar.jsx'
import { basename, getNode, parentOf, pretty } from '../fs.js'
import { drawContours } from '../shared/contours.js'
import './ImageViewer.css'

export function ImageViewer({ win }) {
  const path = win.props.path
  const project = getNode(path).project
  return (
    <>
      <HeaderBar title={basename(path)} subtitle={pretty(parentOf(path))} />
      <div className="viewer">
        {project.image ? <img src={project.image} alt={`Screenshot of ${project.name}`} /> : <ProjectCover project={project} />}
      </div>
    </>
  )
}

function ProjectCover({ project }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const draw = () =>
      drawContours(canvas, { seed: hash(project.slug), line: 'rgba(120, 190, 186, .22)', strong: 'rgba(242, 169, 59, .6)' })
    draw()
    // The cover is drawn to fit, so it is redrawn whenever the window resizes.
    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [project.slug])

  return (
    <figure className="cover">
      <canvas ref={canvasRef} aria-hidden="true" />
      <figcaption>
        <span className="cover-name">{project.name}</span>
        <span className="cover-tag">{project.tagline}</span>
        <span className="cover-stack">{project.stack.join('  ·  ')}</span>
      </figcaption>
    </figure>
  )
}

// A number from the project's name, so each project always gets the same cover.
function hash(text) {
  let h = 2166136261
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return h >>> 0
}
