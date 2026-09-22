import { HeaderBar } from '../shell/HeaderBar.jsx'
import { basename, getNode, parentOf, pretty } from '../fs.js'
import { ExternalLink } from '../shared/links.jsx'
import './TextEditor.css'

export function TextEditor({ win }) {
  const path = win.props.path
  const lines = getNode(path).content.split('\n')
  return (
    <>
      <HeaderBar title={basename(path)} subtitle={pretty(parentOf(path))} />
      <div className="editor" tabIndex={0} data-autofocus aria-label={`Contents of ${basename(path)}`}>
        <ol>
          {lines.map((line, i) => (
            <li key={i} className={markdownClass(line)}>
              {/* A non-breaking space keeps an empty line's height. */}
              <span>{line ? <WithLinks text={line} /> : ' '}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

function markdownClass(line) {
  if (line.startsWith('# ')) return 'md-h1'
  if (line.startsWith('## ')) return 'md-h2'
  return undefined
}

const LINK_PATTERN = /(https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.]+)/g

// Splitting on a pattern in (parentheses) keeps the matches, so the pieces
// alternate: text, link, text, link...
function WithLinks({ text }) {
  return text.split(LINK_PATTERN).map((part, i) => {
    if (i % 2 === 0) return part
    const href = part.startsWith('http') ? part : `mailto:${part}`
    return (
      <ExternalLink key={i} href={href}>
        {part}
      </ExternalLink>
    )
  })
}
