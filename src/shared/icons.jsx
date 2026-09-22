// Gradients and the drop shadow live here, drawn once at the root of the page.
// Chrome ignores definitions that sit inside hidden elements, so they can't
// live inside each icon: a minimised window would take its gradients with it.
export function IconDefs() {
  const lg = (id, a, b) => (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={a} />
      <stop offset="1" stopColor={b} />
    </linearGradient>
  )
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="icon-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.1" floodColor="#000" floodOpacity=".28" />
        </filter>
        {lg('folder-default', '#5bb6c9', '#3d97ad')}
        {lg('img-sky', '#8fd0dc', '#d7eef2')}
      </defs>
    </svg>
  )
}

export function FolderIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g filter="url(#icon-shadow)">
        <path d="M5 11.5A3.5 3.5 0 0 1 8.5 8h9.6a3.5 3.5 0 0 1 2.6 1.1l2.5 2.9h16.3A3.5 3.5 0 0 1 43 15.5V37a3.5 3.5 0 0 1-3.5 3.5h-31A3.5 3.5 0 0 1 5 37z" fill="#2b7084" />
        <rect x="5" y="16" width="38" height="24.5" rx="3.5" fill="url(#folder-default)" />
        <rect x="5" y="16" width="38" height="1.2" rx=".6" fill="#fff" opacity=".35" />
      </g>
    </svg>
  )
}

export function TerminalIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g filter="url(#icon-shadow)">
        <rect x="5" y="7" width="38" height="34" rx="6" fill="#22272b" />
        <path d="M11 7h26a6 6 0 0 1 6 6v1H5v-1a6 6 0 0 1 6-6z" fill="#394046" />
        <rect x="5.5" y="7.5" width="37" height="33" rx="5.5" fill="none" stroke="#fff" strokeOpacity=".1" />
        <path d="M12 22l5.5 4.5L12 31" fill="none" stroke="#e8eef0" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="21" y="29.4" width="10" height="2.8" rx="1.4" fill="#f2a93b" />
      </g>
    </svg>
  )
}

function Page({ children }) {
  return (
    <g filter="url(#icon-shadow)">
      <path d="M12 5h16.5L38 14.5V40a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" fill="#f5f6f4" />
      <path d="M28.5 5v6.5a3 3 0 0 0 3 3H38z" fill="#d7dadb" />
      {children}
    </g>
  )
}

function TextFileIcon({ accent }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <Page>
        <rect x="14" y="19" width="19" height="2" rx="1" fill={accent ? '#3d97ad' : '#9aa4aa'} />
        <rect x="14" y="24" width="16" height="2" rx="1" fill="#b4bcc0" />
        <rect x="14" y="29" width="19" height="2" rx="1" fill="#b4bcc0" />
        <rect x="14" y="34" width="12" height="2" rx="1" fill="#b4bcc0" />
      </Page>
    </svg>
  )
}

export function EditorIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <Page>
        <rect x="14" y="18" width="14" height="2.4" rx="1.2" fill="#3d97ad" />
        <rect x="14" y="23.5" width="19" height="2" rx="1" fill="#b4bcc0" />
        <rect x="14" y="28.5" width="17" height="2" rx="1" fill="#b4bcc0" />
        <rect x="14" y="33.5" width="9" height="2" rx="1" fill="#b4bcc0" />
        <rect x="24.5" y="32.6" width="2" height="4" rx=".6" fill="#f2a93b" />
      </Page>
    </svg>
  )
}

export function PdfIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <Page>
        <rect x="14" y="17" width="17" height="2" rx="1" fill="#b4bcc0" />
        <rect x="14" y="21.5" width="19" height="2" rx="1" fill="#b4bcc0" />
        <path d="M9 29h29v8H9z" fill="#d6453a" />
        <text x="23.5" y="35.3" textAnchor="middle" fontSize="6.6" fontWeight="700" fill="#fff" fontFamily="Ubuntu Sans, sans-serif" letterSpacing=".4">PDF</text>
      </Page>
    </svg>
  )
}

function ImageFileIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g filter="url(#icon-shadow)">
        <rect x="6" y="9" width="36" height="30" rx="3.5" fill="#f5f6f4" />
        <rect x="9" y="12" width="30" height="24" rx="1.5" fill="url(#img-sky)" />
        <circle cx="31" cy="18.5" r="3" fill="#f2a93b" />
        <path d="M9 32l8.5-9 6.5 7 4-4 11 10v.5a1.5 1.5 0 0 1-1.5 1.5h-27A1.5 1.5 0 0 1 9 36.5z" fill="#2b7084" />
      </g>
    </svg>
  )
}

function LinkFileIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <Page>
        <circle cx="23.5" cy="28" r="8" fill="#3d97ad" />
        <path d="M20.5 31l6-6m-4.2 0h4.2v4.2" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </Page>
    </svg>
  )
}

export function ContactsIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g filter="url(#icon-shadow)">
        <rect x="8" y="6" width="32" height="36" rx="5" fill="#2b7084" />
        <rect x="12" y="9" width="26" height="30" rx="3" fill="#f5f6f4" />
        <circle cx="25" cy="20" r="5" fill="#3d97ad" />
        <path d="M16.5 33.5c1.3-4.6 4.6-7 8.5-7s7.2 2.4 8.5 7z" fill="#3d97ad" />
        <rect x="6" y="13" width="5" height="2.4" rx="1.2" fill="#f2a93b" />
        <rect x="6" y="20" width="5" height="2.4" rx="1.2" fill="#f2a93b" />
        <rect x="6" y="27" width="5" height="2.4" rx="1.2" fill="#f2a93b" />
      </g>
    </svg>
  )
}

const paths = {
  home: 'M2.5 7.5L8 3l5.5 4.5M4 6.5V13h3v-3.5h2V13h3V6.5',
  folder: 'M2 4.5A1.5 1.5 0 0 1 3.5 3h3l1.5 1.5h4.5A1.5 1.5 0 0 1 14 6v5.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5z',
  document: 'M4.5 2h4.5l3 3v8.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5zM9 2v3h3M6 8.5h4M6 11h4',
  picture: 'M2.5 3.5h11v9h-11zM2.5 10.5l3-3 2.5 2.5 2-2 3.5 3.5',
  back: 'M10 3L5 8l5 5',
  forward: 'M6 3l5 5-5 5',
  close: 'M4.5 4.5l7 7M11.5 4.5l-7 7',
  minimize: 'M4.5 11h7',
  maximize: 'M4.5 4.5h7v7h-7z',
  restore: 'M5.5 3.5h7v7M3.5 5.5h7v7h-7z',
  wifi: 'M1.8 6.2a9 9 0 0 1 12.4 0M4 8.6a6 6 0 0 1 8 0M6.2 11a3 3 0 0 1 3.6 0M8 13.2v.1',
  volume: 'M2.5 6h2.5L8.5 3v10L5 10H2.5zM11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8',
  battery: 'M2 5h10.5v6H2zM14 7v2M3.5 6.5h6v3h-6z',
  moon: 'M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z',
  copy: 'M5.5 5.5h7v8h-7zM3.5 10.5v-8h7',
  download: 'M8 2.5v7.5M4.8 7L8 10.2 11.2 7M3 13.5h10',
  external: 'M9 3h4v4M13 3L7.5 8.5M11 9.5V13H3V5h3.5',
  mail: 'M2 4h12v8.5H2zM2 4.5l6 4.5 6-4.5',
  code: 'M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5M9 3l-2 10',
  work: 'M2 5.5h12v7.5H2zM5.5 5.5V3.5h5v2M2 9h12',
  pin: 'M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 9.8 8 14 8 14zM8 8.3a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z',
}

export function Sym({ name, size = 16, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}

export function NodeIcon({ node }) {
  if (node.type === 'dir') return <FolderIcon />
  if (node.kind === 'text') return <TextFileIcon accent={node.name.endsWith('.md')} />
  if (node.kind === 'image') return <ImageFileIcon />
  if (node.kind === 'pdf') return <PdfIcon />
  return <LinkFileIcon /> // kind 'link'
}
