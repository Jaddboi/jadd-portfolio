import { useEffect, useState } from 'react'
import { useSystem } from '../system/SystemProvider.jsx'
import { profile, projects, skills } from '../data.js'
import './BootScreen.css'

// padStart lines the brackets up, the way a real kernel log does.
const kernel = (time, text) => ({ kind: 'kernel', text: `[${time.padStart(12)}] ${text}` })
const ok = (text) => ({ kind: 'ok', text })

const BOOT_LINES = [
  kernel('0.000000', `Jinux version 6.9.0-portfolio (${profile.username}@${profile.hostname})`),
  kernel('0.000000', 'Command line: BOOT_IMAGE=/vmlinuz root=/dev/portfolio ro quiet splash'),
  kernel('0.084213', 'Memory: 16384K/16384K available'),
  kernel('0.412007', 'Run /sbin/init as init process'),
  { kind: 'plain', text: `\nWelcome to ${profile.firstName}'s portfolio!\n` },
  ok(`Mounted /home/${profile.username}.`),
  ok(`Mounted /home/${profile.username}/Projects (${projects.length} ${projects.length === 1 ? 'project' : 'projects'}).`),
  ok(`Loaded skills: ${skills.flatMap((s) => s.items).slice(0, 5).join(', ')}…`),
  ok('Started Network Manager.'),
  ok('Started Terminal (jsh).'),
  ok('Reached target Portfolio.'),
  ok('Started Display Manager.'),
]

export function BootScreen() {
  const { finishBoot } = useSystem()
  const [shown, setShown] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Each line schedules the next one, so the effect runs again and again
    // until the log is finished; then it fades out and the desktop appears.
    if (shown < BOOT_LINES.length) {
      const timer = setTimeout(() => setShown(shown + 1), shown < 4 ? 55 : 110)
      return () => clearTimeout(timer)
    }
    const fadeTimer = setTimeout(() => setFading(true), 380)
    const doneTimer = setTimeout(finishBoot, 820)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [shown, finishBoot])

  useEffect(() => {
    window.addEventListener('keydown', finishBoot)
    window.addEventListener('pointerdown', finishBoot)
    return () => {
      window.removeEventListener('keydown', finishBoot)
      window.removeEventListener('pointerdown', finishBoot)
    }
  }, [finishBoot])

  return (
    <div className={`boot ${fading ? 'leaving' : ''}`} aria-live="polite">
      {BOOT_LINES.slice(0, shown).map((line, i) => (
        <div key={i} className={line.kind === 'kernel' ? 'boot-line boot-kernel' : 'boot-line'}>
          {line.kind === 'ok' ? (
            <>
              [<span className="ok-tag">&nbsp;&nbsp;OK&nbsp;&nbsp;</span>] {line.text}
            </>
          ) : (
            line.text
          )}
        </div>
      ))}
      <div className="boot-skip">Press any key to skip</div>
    </div>
  )
}
