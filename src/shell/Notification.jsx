import { useEffect, useState } from 'react'
import { useSystem } from '../system/SystemProvider.jsx'
import { profile } from '../data.js'
import { ContactsIcon, Sym } from '../shared/icons.jsx'
import './Notification.css'

export function Notification() {
  const { booting, windows, openApp } = useSystem()
  const [state, setState] = useState('waiting') // 'waiting' then 'shown' then 'dismissed'

  useEffect(() => {
    if (booting || state !== 'waiting') return
    const timer = setTimeout(() => setState('shown'), 1200)
    return () => clearTimeout(timer)
  }, [booting, state])

  useEffect(() => {
    if (windows.length > 0) setState('dismissed')
  }, [windows.length])

  if (state !== 'shown') return null

  return (
    <div className="notif" role="status">
      <span className="notif-icon">
        <ContactsIcon />
      </span>
      <div>
        <div className="notif-app">Contacts · now</div>
        <div className="notif-title">{profile.status}</div>
        <div className="notif-body">Have a role or project in mind? Get in touch.</div>
        <div className="notif-actions">
          <button onClick={() => openApp('contacts')}>Get in touch</button>
        </div>
      </div>
      <button className="notif-close" onClick={() => setState('dismissed')} aria-label="Dismiss notification">
        <Sym name="close" />
      </button>
    </div>
  )
}
