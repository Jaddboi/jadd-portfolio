import { hobbies, profile, projects, skills } from './data.js'

export const HOME = `/home/${profile.username}`

const dir = (name, children, extra = {}) => ({ type: 'dir', name, children, ...extra })
const file = (name, kind, extra = {}) => ({ type: 'file', name, kind, ...extra })

function readme(p) {
  const lines = [`# ${p.name}`, '', p.tagline, '', p.description]
  if (p.highlights.length) {
    lines.push('', '## Highlights', ...p.highlights.map((h) => `- ${h}`))
  }
  lines.push('', '## Built with', p.stack.join(', '))
  const links = []
  if (p.live) links.push(`- Live demo: ${p.live}`)
  if (p.source) links.push(`- Source: ${p.source}`)
  if (links.length) lines.push('', '## Links', ...links)
  return lines.join('\n')
}

// A project's picture keeps the extension of its real screenshot, so the name
// in Files matches the file that is shown.
const picture = (p) => `${p.slug}${p.image ? p.image.slice(p.image.lastIndexOf('.')) : '.png'}`

function projectDir(p) {
  const children = [
    file('README.md', 'text', { content: readme(p) }),
    file(picture(p), 'image', { project: p }),
  ]
  if (p.live) children.push(file('live-demo.desktop', 'link', { label: 'Live demo', url: p.live }))
  if (p.source) children.push(file('source-code.desktop', 'link', { label: 'Source code', url: p.source }))
  return dir(p.slug, children, { label: p.name, project: p })
}

const aboutText = [
  `# ${profile.name}`,
  '',
  `${profile.role} · ${profile.location}`,
  '',
  ...profile.bio.flatMap((para) => [para, '']),
  '## Right now',
  profile.status,
  '',
  '## Get in touch',
  `- Email: ${profile.email}`,
  `- GitHub: ${profile.links.github}`,
  `- LinkedIn: ${profile.links.linkedin}`,
].join('\n')

const skillsText = skills.map((s) => `${s.category}\n  ${s.items.join(', ')}`).join('\n\n')

const hobbiesText = [
  '# Hobbies',
  '',
  ...hobbies.flatMap(({ heading, body }) => [
    `## ${heading}`,
    '',
    ...body.flatMap((block) => (Array.isArray(block) ? [...block.map((item) => `- ${item}`), ''] : [block, ''])),
  ]),
]
  .join('\n')
  .trimEnd()

const root = dir('/', [
  dir('home', [
    dir(profile.username, [
      dir('Projects', projects.map(projectDir)),
      dir('Documents', [
        file('about.txt', 'text', { content: aboutText }),
        file('hobbies.txt', 'text', { content: hobbiesText }),
        file('resume.pdf', 'pdf'),
        file('skills.txt', 'text', { content: skillsText }),
      ]),
      dir('Pictures', projects.map((p) => file(picture(p), 'image', { project: p }))),
    ]),
  ]),
])

// '/home/jadd/Projects/../Documents/' becomes '/home/jadd/Documents'.
function normalize(path) {
  const out = []
  for (const part of path.split('/')) {
    if (!part || part === '.') continue
    if (part === '..') out.pop()
    else out.push(part)
  }
  return '/' + out.join('/')
}

// Turns what someone types after `cd` into a full path: '~', '~/x', '/x' or
// something relative to where they are.
export function resolve(cwd, input) {
  if (input === '~') return HOME
  if (input.startsWith('~/')) return normalize(HOME + input.slice(1))
  if (input.startsWith('/')) return normalize(input)
  return normalize(`${cwd}/${input}`)
}

export function getNode(path) {
  let node = root
  for (const part of normalize(path).split('/').filter(Boolean)) {
    if (node.type !== 'dir') return null
    node = node.children.find((c) => c.name === part)
    if (!node) return null
  }
  return node
}

export function join(parent, name) {
  return normalize(`${parent}/${name}`)
}

export function parentOf(path) {
  return normalize(`${path}/..`)
}

export function basename(path) {
  return normalize(path).split('/').pop()
}

// '/home/jadd/Projects' shown as '~/Projects', the way a shell does.
export function pretty(path) {
  const p = normalize(path)
  if (p === HOME) return '~'
  if (p.startsWith(HOME + '/')) return '~' + p.slice(HOME.length)
  return p
}

export function displayName(node) {
  return node.label || node.name
}

export const places = [
  { path: HOME, label: 'Home', icon: 'home' },
  { path: `${HOME}/Projects`, label: 'Projects', icon: 'folder' },
  { path: `${HOME}/Documents`, label: 'Documents', icon: 'document' },
  { path: `${HOME}/Pictures`, label: 'Pictures', icon: 'picture' },
]
