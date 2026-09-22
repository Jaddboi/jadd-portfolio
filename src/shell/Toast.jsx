import { useSystem } from '../system/SystemProvider.jsx'
import './Toast.css'

export function Toast() {
  const { toast } = useSystem()
  if (!toast) return null
  return (
    // A new key restarts the slide-in animation for each new message.
    <div className="toast" role="status" key={toast.id}>
      {toast.message}
    </div>
  )
}
