"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type UnitCircleProps = {
  className?: string
  size?: number // diameter of the SVG drawing area
}

// Define canonical angles with pretty π labels
const STANDARD_ANGLES: Array<{ deg: number; piLabel: string }> = [
  { deg: 0, piLabel: "0" },
  { deg: 30, piLabel: "π/6" },
  { deg: 45, piLabel: "π/4" },
  { deg: 60, piLabel: "π/3" },
  { deg: 90, piLabel: "π/2" },
  { deg: 120, piLabel: "2π/3" },
  { deg: 135, piLabel: "3π/4" },
  { deg: 150, piLabel: "5π/6" },
  { deg: 180, piLabel: "π" },
  { deg: 210, piLabel: "7π/6" },
  { deg: 225, piLabel: "5π/4" },
  { deg: 240, piLabel: "4π/3" },
  { deg: 270, piLabel: "3π/2" },
  { deg: 300, piLabel: "5π/3" },
  { deg: 315, piLabel: "7π/4" },
  { deg: 330, piLabel: "11π/6" },
]

function clampAngle(deg: number): number {
  let d = deg % 360
  if (d < 0) d += 360
  return d
}

export function UnitCircle({ className = "", size = 360 }: UnitCircleProps) {
  const [angleDeg, setAngleDeg] = useState<number>(30)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [snapEnabled, setSnapEnabled] = useState<boolean>(true)
  const [showExact, setShowExact] = useState<boolean>(true)
  const svgRef = useRef<SVGSVGElement>(null)

  // Geometry
  const padding = 36 // generous padding for labels outside
  const viewSize = size + padding * 2
  const cx = padding + size / 2
  const cy = padding + size / 2
  const r = size / 2 - 4 // circle radius
  const tickOuter = r + 18
  const labelR = r + 34 // labels comfortably away from the circle

  // Snap logic
  const SNAP_THRESHOLD = 8 // degrees
  const snappedDeg = useMemo(() => {
    if (!snapEnabled) return undefined
    let closest: number | undefined
    let best = Infinity
    for (const s of STANDARD_ANGLES) {
      const d = Math.abs(clampAngle(angleDeg) - s.deg)
      if (d < best) {
        best = d
        closest = s.deg
      }
    }
    if (closest !== undefined && best <= SNAP_THRESHOLD) return closest
    return undefined
  }, [angleDeg, snapEnabled])

  const displayDeg = snappedDeg ?? clampAngle(angleDeg)
  const rad = (displayDeg * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)

  // Mouse handling
  const computeAngleFromEvent = (clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return angleDeg
    const rect = svg.getBoundingClientRect()
    const x = clientX - rect.left - cx
    const y = clientY - rect.top - cy
    // atan2 uses (y, x); SVG y grows downward → invert y for math orientation
    const deg = (Math.atan2(-y, x) * 180) / Math.PI
    return clampAngle(deg)
  }

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setAngleDeg(computeAngleFromEvent(e.clientX, e.clientY))
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setAngleDeg(computeAngleFromEvent(e.clientX, e.clientY))
  }

  const stopDrag = () => setIsDragging(false)
  useEffect(() => {
    if (!isDragging) return
    const move = (e: MouseEvent) => setAngleDeg(computeAngleFromEvent(e.clientX, e.clientY))
    const up = () => setIsDragging(false)
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }
  }, [isDragging])

  // Helpers
  const prettyPi = () => {
    const hit = STANDARD_ANGLES.find((s) => Math.abs(s.deg - displayDeg) < 0.001)
    return hit ? hit.piLabel : `${(displayDeg * Math.PI / 180).toFixed(3)} rad`
  }

  const exactOr = (approx: number, type: "cos" | "sin" | "tan") => {
    if (!showExact) return approx.toFixed(3)
    const hit = STANDARD_ANGLES.find((s) => Math.abs(s.deg - displayDeg) < 0.001)
    if (!hit) return approx.toFixed(3)
    const map: Record<number, { cos: string; sin: string; tan: string }> = {
      0: { cos: "1", sin: "0", tan: "0" },
      30: { cos: "√3/2", sin: "1/2", tan: "√3/3" },
      45: { cos: "√2/2", sin: "√2/2", tan: "1" },
      60: { cos: "1/2", sin: "√3/2", tan: "√3" },
      90: { cos: "0", sin: "1", tan: "∞" },
      120: { cos: "-1/2", sin: "√3/2", tan: "-√3" },
      135: { cos: "-√2/2", sin: "√2/2", tan: "-1" },
      150: { cos: "-√3/2", sin: "1/2", tan: "-√3/3" },
      180: { cos: "-1", sin: "0", tan: "0" },
      210: { cos: "-√3/2", sin: "-1/2", tan: "√3/3" },
      225: { cos: "-√2/2", sin: "-√2/2", tan: "1" },
      240: { cos: "-1/2", sin: "-√3/2", tan: "√3" },
      270: { cos: "0", sin: "-1", tan: "∞" },
      300: { cos: "1/2", sin: "-√3/2", tan: "-√3" },
      315: { cos: "√2/2", sin: "-√2/2", tan: "-1" },
      330: { cos: "√3/2", sin: "-1/2", tan: "-√3/3" },
    }
    const item = map[hit.deg as keyof typeof map]
    if (!item) return approx.toFixed(3)
    return item[type]
  }

  // UI values panel
  const Value = ({ label, color, val, exactKey }: { label: string; color: string; val: number; exactKey: "cos" | "sin" | "tan" }) => (
    <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        <span className={`inline-block h-2 w-2 rounded-full`} style={{ backgroundColor: color }} />
      </div>
      <div className="mt-1 text-2xl font-semibold" style={{ color }}>{exactOr(val, exactKey)}</div>
      {showExact && exactOr(val, exactKey) !== val.toFixed(3) && (
        <div className="text-xs text-muted-foreground">≈ {val.toFixed(3)}</div>
      )}
    </div>
  )

  return (
    <div className={`rounded-xl border border-border bg-background shadow-md ${className}`}>
      <div className="flex flex-col gap-6 p-5 md:flex-row">
        {/* Left: SVG */}
        <div className="flex-1">
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <svg
              ref={svgRef}
              width={viewSize}
              height={viewSize}
              viewBox={`0 0 ${viewSize} ${viewSize}`}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={stopDrag}
              className="select-none"
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              {/* background grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect x={0} y={0} width={viewSize} height={viewSize} fill="url(#grid)" />

              {/* axes */}
              <line x1={padding} y1={cy} x2={viewSize - padding} y2={cy} stroke="#111827" strokeWidth={2} />
              <line x1={cx} y1={padding} x2={cx} y2={viewSize - padding} stroke="#111827" strokeWidth={2} />

              {/* circle */}
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4f46e5" strokeWidth={3} />

              {/* standard ticks + labels (farther out) */}
              {STANDARD_ANGLES.map((s) => {
                const a = (s.deg * Math.PI) / 180
                const x1 = cx + Math.cos(a) * r
                const y1 = cy - Math.sin(a) * r
                const x2 = cx + Math.cos(a) * tickOuter
                const y2 = cy - Math.sin(a) * tickOuter
                const lx = cx + Math.cos(a) * labelR
                const ly = cy - Math.sin(a) * labelR
                const active = snappedDeg !== undefined ? Math.abs(s.deg - snappedDeg) < 0.001 : false
                return (
                  <g key={s.deg}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={active ? "#ef4444" : "#6b7280"} strokeWidth={active ? 2.5 : 1.5} />
                    <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fontSize={12} fill={active ? "#ef4444" : "#374151"} fontWeight={active ? 700 : 500}>
                      {s.piLabel}
                    </text>
                  </g>
                )
              })}

              {/* angle arc */}
              <path
                d={`M ${cx} ${cy} L ${cx + Math.cos(0) * 24} ${cy - Math.sin(0) * 24} A 24 24 0 ${displayDeg > 180 ? 1 : 0} 1 ${cx + Math.cos(rad) * 24} ${cy - Math.sin(rad) * 24} Z`}
                fill="#6366f1"
                fillOpacity={0.15}
                stroke="#6366f1"
                strokeWidth={1.5}
              />

              {/* radius */}
              <line x1={cx} y1={cy} x2={cx + Math.cos(rad) * r} y2={cy - Math.sin(rad) * r} stroke="#ef4444" strokeWidth={3} />
              <circle cx={cx + Math.cos(rad) * r} cy={cy - Math.sin(rad) * r} r={7} fill="#ef4444" stroke="#ffffff" strokeWidth={2} />

              {/* axis labels kept outside */}
              <text x={cx + r + 22} y={cy + 16} fontSize={13} fill="#111827">1</text>
              <text x={cx - r - 28} y={cy + 16} fontSize={13} fill="#111827">-1</text>
              <text x={cx - 6} y={cy - r - 14} fontSize={13} fill="#111827">1</text>
              <text x={cx - 10} y={cy + r + 24} fontSize={13} fill="#111827">-1</text>
            </svg>
          </div>
        </div>

        {/* Right: values + controls */}
        <div className="w-full max-w-sm space-y-4">
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">Hoek</div>
            <div className="mt-1 text-3xl font-semibold text-foreground">{displayDeg.toFixed(1)}°</div>
            <div className="text-sm text-muted-foreground">{prettyPi()}</div>
          </div>

          <Value label="cos(θ)" color="#16a34a" val={cos} exactKey="cos" />
          <Value label="sin(θ)" color="#3b82f6" val={sin} exactKey="sin" />
          <Value label="tan(θ)" color="#f59e0b" val={sin / cos} exactKey="tan" />

          <div className="rounded-lg border border-border bg-card p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" className="rounded border-border" checked={snapEnabled} onChange={(e) => (setSnapEnabled(e.target.checked))} />
                Snap naar standaard hoeken
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" className="rounded border-border" checked={showExact} onChange={(e) => setShowExact(e.target.checked)} />
                Exacte waarden
              </label>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {STANDARD_ANGLES.slice(0, 8).map((s) => (
                <button
                  key={s.deg}
                  onClick={() => setAngleDeg(s.deg)}
                  className={`rounded-md border px-2 py-1 text-xs font-medium transition ${Math.abs(displayDeg - s.deg) < 0.001 ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-muted"}`}
                >
                  {s.piLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}