import { HeaderBar } from '../shell/HeaderBar.jsx'
import { profile, resume, skills } from '../data.js'
import { Sym } from '../shared/icons.jsx'
import { ExternalLink, displayUrl } from '../shared/links.jsx'
import './DocumentViewer.css'

export function DocumentViewer() {
  const contacts = [
    { href: `mailto:${profile.email}`, text: profile.email },
    { href: profile.links.linkedin, text: displayUrl(profile.links.linkedin) },
    { href: profile.links.github, text: displayUrl(profile.links.github) },
    { href: profile.links.website, text: displayUrl(profile.links.website) },
  ]

  const downloadButton = profile.resumePdf && (
    <a className="hb-btn" href={profile.resumePdf} download aria-label="Download resume as PDF" title="Download PDF">
      <Sym name="download" />
    </a>
  )

  return (
    <>
      <HeaderBar title="resume.pdf" subtitle="~/Documents" end={downloadButton} />
      <div className="docs" tabIndex={0} data-autofocus aria-label="Resume">
        <article className="paper">
          <header>
            <h1>{profile.name}</h1>
            <p className="paper-contact">
              {contacts.map((c, i) => (
                <span key={c.href}>
                  {i > 0 && ' | '}
                  <ExternalLink href={c.href}>{c.text}</ExternalLink>
                </span>
              ))}
            </p>
          </header>

          <h2>Education</h2>
          {resume.education.map((ed) => (
            <section key={ed.school + ed.degree} className="paper-entry">
              <div className="paper-row">
                <strong>{ed.school}</strong>
                <span>{ed.place}</span>
              </div>
              <div className="paper-row">
                <em>
                  <WithBold text={ed.degree} />
                </em>
                <span>{ed.dates}</span>
              </div>
              <p className="paper-note">
                <strong>Relevant Coursework:</strong> {ed.coursework.join(', ')}
              </p>
            </section>
          ))}

          <h2>Professional Experience</h2>
          {resume.experience.map((job) => (
            <section key={job.org + job.role} className="paper-entry">
              <div className="paper-row">
                <strong>{job.org}</strong>
                <span>{job.dates}</span>
              </div>
              <em className="paper-sub">{job.role}</em>
              <BulletPoints points={job.points} />
            </section>
          ))}

          <h2>Software Engineering Projects</h2>
          {resume.projects.map((p) => (
            <section key={p.name} className="paper-entry">
              <div className="paper-row">
                <div>
                  <strong>{p.name}</strong> |{' '}
                  <em>
                    <WithBold text={p.subtitle} />
                  </em>
                </div>
                <span>{p.dates}</span>
              </div>
              <BulletPoints points={p.points} />
            </section>
          ))}

          <h2>Technical Skills</h2>
          <dl className="paper-skills">
            {skills.map((s) => (
              <div key={s.category}>
                <dt>{s.category}</dt>
                <dd>{s.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </>
  )
}

function BulletPoints({ points }) {
  return (
    <ul>
      {points.map((point) => (
        <li key={point}>
          <WithBold text={point} />
        </li>
      ))}
    </ul>
  )
}

function WithBold({ text }) {
  // Splitting on ** leaves the bold pieces in the odd positions.
  return text.split('**').map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}
