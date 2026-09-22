import { Fragment } from 'react'
import { HOME, getNode, pretty } from '../fs.js'
import { profile, projects, skills } from '../data.js'
import { ExternalLink, displayUrl } from '../shared/links.jsx'

export const pageLoadedAt = Date.now()

// Every command the terminal understands, in the order `help` lists them.
// `run` receives one object built in Terminal.jsx: what was typed, the current
// folder, print() for output, and the desktop actions a command may need.
export const COMMANDS = {
  help: {
    description: 'list these commands',
    run: ({ print }) => print(<HelpTable />),
  },
  neofetch: {
    description: 'system info, of sorts',
    run: ({ print, theme }) => print(<Neofetch theme={theme} />),
  },
  about: {
    description: 'who I am',
    run: ({ print }) => print(<pre className="t-pre">{getNode(`${HOME}/Documents/about.txt`).content}</pre>),
  },
  hobbies: {
    description: 'what I do outside code',
    run: ({ print }) => print(<pre className="t-pre">{getNode(`${HOME}/Documents/hobbies.txt`).content}</pre>),
  },
  projects: {
    description: 'list my projects',
    run: ({ print }) =>
      print(
        <ProjectList />,
        <span className="t-dim">
          Run <span className="t-cmd">open ~/Projects/{projects[0]?.slug}</span> to look inside.
        </span>,
      ),
  },
  skills: {
    description: 'my tech stack',
    run: ({ print }) =>
      print(
        <Table rows={skills.map((s) => [s.category, s.items.join(', ')])} />,
        <span className="t-ok">
          ✓ {skills.length} of {skills.length} stacks loaded
        </span>,
      ),
  },
  contact: {
    description: 'ways to reach me',
    run: ({ print }) =>
      print(
        <Table
          rows={[
            ['Email', <ExternalLink href={`mailto:${profile.email}`}>{profile.email}</ExternalLink>],
            ['GitHub', <ExternalLink href={profile.links.github}>{displayUrl(profile.links.github)}</ExternalLink>],
            ['LinkedIn', <ExternalLink href={profile.links.linkedin}>{displayUrl(profile.links.linkedin)}</ExternalLink>],
          ]}
        />,
      ),
  },
  resume: {
    description: 'open my resume',
    run: ({ print, openApp }) => {
      openApp('docs')
      print(<span className="t-dim">Opening resume.pdf in Document Viewer…</span>)
    },
  },

  ls: {
    usage: 'ls [dir]',
    description: 'list a folder',
    run: ({ args, arg, path, print }) => {
      const folder = getNode(path(args.find((a) => !a.startsWith('-')) || '.'))
      if (!folder) print(`ls: cannot access '${arg}': No such file or directory`)
      else if (folder.type !== 'dir') print(folder.name)
      else print(<Ls folder={folder} />)
    },
  },
  cd: {
    usage: 'cd <dir>',
    description: 'change folder',
    run: ({ arg, path, print, setCwd }) => {
      const target = path(arg || '~')
      const node = getNode(target)
      if (!node) print(`cd: no such file or directory: ${arg}`)
      else if (node.type !== 'dir') print(`cd: not a directory: ${arg}`)
      else setCwd(target)
    },
  },
  pwd: {
    description: 'show the current folder',
    run: ({ cwd, print }) => print(cwd),
  },
  open: {
    usage: 'open <path>',
    description: 'open a file or folder in its app',
    run: ({ name, arg, path, print, openPath }) => {
      const target = path(arg || '.')
      if (!getNode(target)) return print(`${name}: ${arg}: No such file or directory`)
      openPath(target)
      print(<span className="t-dim">Opening {pretty(target)}…</span>)
    },
  },

  theme: {
    usage: 'theme [light|dark]',
    description: 'switch the desktop style',
    run: ({ arg, print, theme, setTheme }) => {
      const next = arg === 'light' || arg === 'dark' ? arg : theme === 'dark' ? 'light' : 'dark'
      setTheme(next)
      print(`Switched to ${next} style.`)
    },
  },
  whoami: {
    description: 'show who is logged in',
    run: ({ print }) => print(`${profile.username} — ${profile.name}, ${profile.role.toLowerCase()}`),
  },
  date: {
    description: 'show the date and time',
    run: ({ print }) => print(new Date().toString()),
  },
  history: {
    description: 'list the commands you have run',
    run: ({ history, print }) =>
      print(<pre className="t-pre">{history.map((cmd, i) => `${String(i + 1).padStart(4)}  ${cmd}`).join('\n')}</pre>),
  },
  clear: {
    description: 'clear the screen (or Ctrl+L)',
    run: ({ clear }) => clear(),
  },
  exit: {
    description: 'close the terminal',
    run: ({ exit }) => exit(),
  },
}

// Other names for a command: xdg-open is the real Linux one.
export const ALIASES = { 'xdg-open': 'open' }

function Table({ rows, labelClass = 't-key', valueClass }) {
  return (
    <div className="t-table">
      {rows.map(([label, value]) => (
        <Fragment key={label}>
          <span className={labelClass}>{label}</span>
          <span className={valueClass}>{value}</span>
        </Fragment>
      ))}
    </div>
  )
}

function HelpTable() {
  const rows = Object.entries(COMMANDS).map(([name, command]) => {
    const aliases = Object.keys(ALIASES).filter((alias) => ALIASES[alias] === name)
    const also = aliases.length > 0 ? ` (also ${aliases.join(', ')})` : ''
    return [command.usage ?? name, command.description + also]
  })
  return <Table rows={rows} labelClass="t-cmd" valueClass="t-dim" />
}

function ProjectList() {
  return (
    <div className="t-projects">
      {projects.map((p) => (
        <div key={p.slug}>
          <span className="t-dir">{p.name}</span> <span className="t-dim">({p.year})</span> — {p.tagline}
          <div className="t-dim">  {p.stack.join(' · ')}</div>
        </div>
      ))}
    </div>
  )
}

function Ls({ folder }) {
  return (
    <div className="t-ls">
      {folder.children.map((item) => (
        <span key={item.name} className={item.type === 'dir' ? 't-dir' : item.kind === 'link' ? 't-exec' : undefined}>
          {item.name}
          {item.type === 'dir' ? '/' : ''}
        </span>
      ))}
    </div>
  )
}

// String.raw keeps the backslashes in the penguin exactly as typed.
const TUX = String.raw`    .--.
   |o_o |
   |:_/ |
  //   \ \
 (|     | )
/'\_   _/'\
\___)=(___/`

const SWATCHES = ['#1c2326', '#e0564b', '#6cc070', '#f2a93b', '#4f97d8', '#b67fd6', '#5bb6c9', '#e8eef0']

export function Neofetch({ theme }) {
  const title = `${profile.username}@${profile.hostname}`
  const rows = [
    ['OS', 'Jinux, running in a browser tab'],
    ['Host', `${browserName()} on ${window.screen.width}×${window.screen.height}`],
    ['Shell', 'jsh 1.0'],
    ['Uptime', uptime()],
    ['Theme', theme === 'dark' ? 'Dark' : 'Light'],
    ['Role', profile.role],
    ['Location', profile.location],
    ['Languages', skills[0]?.items.join(', ')],
    ['Status', profile.status],
  ]
  return (
    <div className="t-neofetch">
      <pre className="t-tux">{TUX}</pre>
      <div>
        <div>
          <span className="t-key">{profile.username}</span>@<span className="t-key">{profile.hostname}</span>
        </div>
        <div className="t-dim">{'-'.repeat(title.length)}</div>
        {rows.map(([label, value]) => (
          <div key={label}>
            <span className="t-key">{label}</span>: {value}
          </div>
        ))}
        <div className="t-swatches" aria-hidden="true">
          {SWATCHES.map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Every browser's user agent claims to be several browsers, so the order of
// these checks matters: Edge before Chrome, Chrome before Safari.
function browserName() {
  const ua = navigator.userAgent
  if (/Edg\//.test(ua)) return 'Edge'
  if (/Firefox\//.test(ua)) return 'Firefox'
  if (/Chrome\//.test(ua)) return 'Chrome'
  if (/Safari\//.test(ua)) return 'Safari'
  return 'a web browser'
}

function uptime() {
  const minutes = Math.floor((Date.now() - pageLoadedAt) / 60000)
  if (minutes < 1) return 'less than a minute'
  return minutes === 1 ? '1 min' : `${minutes} mins`
}
