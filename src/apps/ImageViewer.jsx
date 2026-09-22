import { HeaderBar } from '../shell/HeaderBar.jsx'
import { basename, getNode, parentOf, pretty } from '../fs.js'
import './ImageViewer.css'

export function ImageViewer({ win }) {
  const path = win.props.path
  const project = getNode(path).project
  return (
    <>
      <HeaderBar title={basename(path)} subtitle={pretty(parentOf(path))} />
      <div className="viewer">
        <img src={project.image} alt={`Screenshot of ${project.name}`} />
      </div>
    </>
  )
}
