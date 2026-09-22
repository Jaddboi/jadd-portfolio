import { useEffect, useRef, useState } from 'react'
import { useSystem } from '../system/SystemProvider.jsx'
import { HeaderBar } from '../shell/HeaderBar.jsx'
import { HOME, getNode, pretty, resolve } from '../fs.js'
import { profile } from '../data.js'
import { ALIASES, COMMANDS, Neofetch, pageLoadedAt } from './terminalCommands.jsx'
import './Terminal.css'

const COMMAND_NAMES = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)]

export function Terminal({ win }) {
  const system = useSystem()
  const [cwd, setCwd] = useState(HOME)
  const [lines, setLines] = useState(() => [
    { id: 0, kind: 'out', node: <span className="t-dim">Last login: {new Date(pageLoadedAt).toLocaleString()} on tty1</span> },
    { id: 1, kind: 'cmd', cwd: HOME, text: 'neofetch' },
    { id: 2, kind: 'out', node: <Neofetch theme={system.theme} /> },
    {
      id: 3,
      kind: 'out',
      node: (
        <span>
          Type <span className="t-cmd">help</span> to see what you can run here.
        </span>
      ),
    },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1) // -1 = not browsing the history
  const nextId = useRef(4)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight // keep the newest line in view
  }, [lines])

  const addLines = (...newLines) => setLines((ls) => [...ls, ...newLines.map((line) => ({ ...line, id: nextId.current++ }))])
  const echo = (text) => addLines({ kind: 'cmd', cwd, text })
  const print = (...outputs) => addLines(...outputs.map((node) => ({ kind: 'out', node })))

  function run(typed) {
    echo(typed)
    const text = typed.trim()
    if (!text) return
    const newHistory = [...history, text]
    setHistory(newHistory)
    setHistoryIndex(-1)

    const [name, ...args] = text.split(/\s+/)
    const command = COMMANDS[ALIASES[name] ?? name]
    if (!command) {
      print(
        <span>
          jsh: command not found: {name}. Type <span className="t-cmd">help</span> to see what you can run.
        </span>,
      )
      return
    }
    command.run({
      name,
      args,
      arg: args.join(' '),
      cwd,
      path: (p) => resolve(cwd, p),
      print,
      setCwd,
      clear: () => setLines([]),
      history: newHistory,
      exit: () => system.close(win.id),
      openApp: system.openApp,
      openPath: system.openPath,
      theme: system.theme,
      setTheme: system.setTheme,
    })
  }

  // Tab: complete the command name, or a file name in the last word. One match
  // is filled in; several are listed and completed as far as they agree.
  function complete() {
    const words = input.split(' ')
    const last = words.at(-1)
    let folderPart = ''
    let options

    if (words.length === 1) {
      options = COMMAND_NAMES.filter((name) => name.startsWith(last)).map((name) => ({ name, suffix: ' ' }))
    } else {
      // In 'cat Projects/hu', the 'Projects/' part stays as typed.
      folderPart = last.slice(0, last.lastIndexOf('/') + 1)
      const folder = getNode(resolve(cwd, folderPart || '.'))
      if (folder?.type !== 'dir') return
      const typedName = last.slice(folderPart.length)
      options = folder.children
        .filter((item) => item.name.startsWith(typedName))
        .map((item) => ({ name: item.name, suffix: item.type === 'dir' ? '/' : '' }))
    }
    if (options.length === 0) return

    let completed
    if (options.length === 1) {
      completed = options[0].name + options[0].suffix
    } else {
      echo(input)
      print(options.map((o) => (o.suffix === '/' ? o.name + '/' : o.name)).join('  '))
      completed = commonPrefix(options.map((o) => o.name))
    }
    setInput([...words.slice(0, -1), folderPart + completed].join(' '))
  }

  function historyUp() {
    if (!history.length) return
    const i = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
    setHistoryIndex(i)
    setInput(history[i])
  }

  function historyDown() {
    if (historyIndex === -1) return
    const i = historyIndex + 1
    if (i < history.length) {
      setHistoryIndex(i)
      setInput(history[i])
    } else {
      setHistoryIndex(-1)
      setInput('')
    }
  }

  function onKeyDown(e) {
    const textSelected = Boolean(window.getSelection()?.toString())
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      complete()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      historyUp()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      historyDown()
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      setLines([])
    } else if (e.ctrlKey && e.key === 'c' && !textSelected) {
      // Cancel the line, unless text is selected: then Ctrl+C should copy.
      e.preventDefault()
      echo(input + '^C')
      setInput('')
    }
  }

  // Clicking anywhere focuses the input, unless text is being selected to copy.
  function focusInput() {
    if (!window.getSelection()?.toString()) inputRef.current.focus({ preventScroll: true })
  }

  return (
    <>
      <HeaderBar title={`${profile.username}@${profile.hostname}: ${pretty(cwd)}`} />
      <div className="terminal" ref={scrollRef} onClick={focusInput}>
        {lines.map((line) => (
          <div key={line.id} className="t-line">
            {line.kind === 'cmd' ? (
              <>
                <Prompt cwd={line.cwd} />
                {line.text}
              </>
            ) : (
              line.node
            )}
          </div>
        ))}
        <label className="t-line t-input-row">
          <Prompt cwd={cwd} />
          <input
            ref={inputRef}
            data-autofocus
            className="t-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Terminal input"
          />
        </label>
      </div>
    </>
  )
}

function Prompt({ cwd }) {
  return (
    <span className="t-prompt">
      <span className="t-user">
        {profile.username}@{profile.hostname}
      </span>
      :<span className="t-path">{pretty(cwd)}</span>$&nbsp;
    </span>
  )
}

function commonPrefix(words) {
  let prefix = words[0]
  for (const word of words) while (!word.startsWith(prefix)) prefix = prefix.slice(0, -1)
  return prefix
}
