import { useEffect, useRef } from 'react'
import { useSystem } from '../system/SystemProvider.jsx'
import { drawContours } from '../shared/contours.js'
import './Wallpaper.css'

const INK = {
  dark: { line: 'rgba(120, 196, 190, .13)', strong: 'rgba(140, 214, 206, .30)' },
  light: { line: 'rgba(30, 80, 90, .13)', strong: 'rgba(30, 80, 90, .27)' },
}

export function Wallpaper() {
  const { theme } = useSystem()
  const canvasRef = useRef(null)

  useEffect(() => {
    const draw = () => drawContours(canvasRef.current, { seed: 7, ...INK[theme] })
    draw()
    let timer
    // Redraw once the resizing stops, not on every resize event.
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(draw, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(timer)
    }
  }, [theme])

  return (
    <div className="wallpaper" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
