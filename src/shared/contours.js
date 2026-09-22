// A seeded random generator: the same seed always gives the same sequence, so
// a landscape can be redrawn exactly as it was.
function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Smooth noise: a height for any point, where nearby points are alike. Four
// layers of it, each half as strong and twice as fine, give big hills with
// small bumps on them.
function makeNoise(seed) {
  const rand = mulberry32(seed)
  const perm = new Uint8Array(512)
  const p = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]

  const grad = (h, x, y) => {
    switch (h & 7) {
      case 0: return x + y
      case 1: return -x + y
      case 2: return x - y
      case 3: return -x - y
      case 4: return x
      case 5: return -x
      case 6: return y
      default: return -y
    }
  }
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (a, b, t) => a + (b - a) * t

  const noise = (x, y) => {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    x -= Math.floor(x)
    y -= Math.floor(y)
    const u = fade(x)
    const v = fade(y)
    const a = perm[X] + Y
    const b = perm[X + 1] + Y
    return lerp(
      lerp(grad(perm[a], x, y), grad(perm[b], x - 1, y), u),
      lerp(grad(perm[a + 1], x, y - 1), grad(perm[b + 1], x - 1, y - 1), u),
      v,
    )
  }

  return (x, y) => {
    let sum = 0
    let amp = 1
    let freq = 1
    for (let o = 0; o < 4; o++) {
      sum += noise(x * freq, y * freq) * amp
      amp *= 0.5
      freq *= 2.03
    }
    return sum
  }
}

// Draws a contour map of that noise, the way a hiking map draws hills.
export function drawContours(canvas, { seed, line, strong }) {
  // Capped at 2 real pixels per CSS pixel: a 3x screen would cost far more to
  // draw for no visible gain.
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // so the code below can think in CSS pixels
  ctx.clearRect(0, 0, w, h)

  const field = makeNoise(seed)
  const step = 7
  const cols = Math.ceil(w / step) + 1
  const rows = Math.ceil(h / step) + 1
  // Scaled by the longer side, so the terrain keeps its shape on any screen.
  const scale = 1 / Math.max(620, Math.max(w, h) * 0.46)
  const values = new Float32Array(cols * rows)
  let min = Infinity
  let max = -Infinity
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = i * step
      const y = j * step
      // The height every 7 pixels, plus a gentle slope across the screen so
      // the contours run in a direction instead of circling.
      const v = field(x * scale + 3.1, y * scale + 1.7) + (x / w) * 0.35 - (y / h) * 0.2
      values[j * cols + i] = v
      if (v < min) min = v
      if (v > max) max = v
    }
  }

  const interval = (max - min) / 26 // 26 heights to draw lines at
  const paths = { minor: new Path2D(), major: new Path2D() }
  const at = (i, j) => values[j * cols + i]

  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = at(i, j)
      const b = at(i + 1, j)
      const c = at(i + 1, j + 1)
      const d = at(i, j + 1)
      const lo = Math.min(a, b, c, d)
      const hi = Math.max(a, b, c, d)
      const first = Math.ceil((lo - min) / interval)
      const last = Math.floor((hi - min) / interval)
      for (let k = first; k <= last; k++) {
        const level = min + k * interval
        const x0 = i * step
        const y0 = j * step
        // Marching squares: where one corner of this little square is below
        // the height and the next is above, the contour crosses that edge. How
        // far along depends on how close each corner is, which is what makes
        // the lines smooth instead of jagged.
        const pts = []
        const edge = (va, vb, xa, ya, xb, yb) => {
          if ((va < level) !== (vb < level)) {
            const t = (level - va) / (vb - va)
            pts.push([xa + (xb - xa) * t, ya + (yb - ya) * t])
          }
        }
        edge(a, b, x0, y0, x0 + step, y0)
        edge(b, c, x0 + step, y0, x0 + step, y0 + step)
        edge(c, d, x0 + step, y0 + step, x0, y0 + step)
        edge(d, a, x0, y0 + step, x0, y0)
        // Every fifth line is drawn heavier, like an index contour on a map.
        const path = k % 5 === 0 ? paths.major : paths.minor
        for (let p = 0; p + 1 < pts.length; p += 2) {
          path.moveTo(pts[p][0], pts[p][1])
          path.lineTo(pts[p + 1][0], pts[p + 1][1])
        }
      }
    }
  }

  ctx.lineCap = 'round'
  ctx.strokeStyle = line
  ctx.lineWidth = 1
  ctx.stroke(paths.minor)
  ctx.strokeStyle = strong
  ctx.lineWidth = 1.6
  ctx.stroke(paths.major)
}
