import { useSystem } from '../system/SystemProvider.jsx'
import { HeaderBar } from '../shell/HeaderBar.jsx'
import { profile } from '../data.js'
import { Sym } from '../shared/icons.jsx'
import { ExternalLink, displayUrl } from '../shared/links.jsx'
import './Contacts.css'

export function Contacts() {
  const { showToast } = useSystem()
  const initials = profile.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      showToast('Email address copied')
    } catch {
      showToast(`Couldn't copy. The address is ${profile.email}`)
    }
  }

  return (
    <>
      <HeaderBar title="Contacts" />
      <div className="contacts">
        <div className="avatar" aria-hidden="true">
          {initials}
        </div>
        <h2>{profile.name}</h2>
        <p className="contact-role">{profile.role}</p>
        <p className="contact-status">
          <span className="dot" aria-hidden="true" />
          {profile.status}
        </p>
        <ul className="boxed-list">
          <Row icon="mail" label="Email" href={`mailto:${profile.email}`} text={profile.email}>
            <button className="icon-btn" onClick={copyEmail} aria-label="Copy email address" title="Copy">
              <Sym name="copy" />
            </button>
          </Row>
          <Row icon="code" label="GitHub" href={profile.links.github} text={displayUrl(profile.links.github)}>
            <Sym name="external" className="row-trail" />
          </Row>
          <Row icon="work" label="LinkedIn" href={profile.links.linkedin} text={displayUrl(profile.links.linkedin)}>
            <Sym name="external" className="row-trail" />
          </Row>
          <Row icon="pin" label="Location" text={profile.location} />
        </ul>
        <a className="pill-btn suggested" href={`mailto:${profile.email}`} data-autofocus>
          Send email
        </a>
      </div>
    </>
  )
}

function Row({ icon, label, href, text, children }) {
  return (
    <li>
      <Sym name={icon} />
      <div>
        <span className="row-label">{label}</span>
        {href ? <ExternalLink href={href}>{text}</ExternalLink> : <span>{text}</span>}
      </div>
      {children}
    </li>
  )
}
