import { HOME } from '../fs.js'
import { ContactsIcon, EditorIcon, FolderIcon, PdfIcon, TerminalIcon } from '../shared/icons.jsx'

// Every app on the desktop. `single` apps have one window, reused when opened
// again; the others open one window per file. The component that draws each
// app's contents is listed in App.jsx.
export const APPS = {
  files: { title: 'Files', icon: FolderIcon, width: 860, height: 540, single: true },
  terminal: { title: 'Terminal', icon: TerminalIcon, width: 760, height: 470, single: true },
  editor: { title: 'Text Editor', icon: EditorIcon, width: 700, height: 560 },
  viewer: { title: 'Image Viewer', width: 820, height: 560 },
  docs: { title: 'Document Viewer', icon: PdfIcon, width: 740, height: 660, single: true },
  contacts: { title: 'Contacts', icon: ContactsIcon, width: 440, height: 600, single: true },
}

export const OPEN_WITH = { dir: 'files', text: 'editor', image: 'viewer', pdf: 'docs' }

export const DOCK = [
  { app: 'files', hint: 'projects', props: { path: `${HOME}/Projects` } },
  { app: 'terminal', hint: 'skills' },
  { app: 'editor', hint: 'about me', props: { path: `${HOME}/Documents/about.txt` } },
  { app: 'docs', hint: 'resume' },
  { app: 'contacts', hint: 'get in touch' },
]

// Names a window, so opening something already open focuses it instead of
// making a copy: single apps by app name, others by app name plus file.
export function windowKey(app, props = {}) {
  return APPS[app].single ? app : `${app}:${props.path}`
}
