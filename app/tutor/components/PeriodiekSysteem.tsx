"use client"

import { useMemo } from "react"

type ElementCellProps = {
  z?: number
  symbol: string
  label?: string
}

type PeriodiekSysteemProps = {
  className?: string
  size?: number
}

const MASS: Record<string, number> = {
  H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.81, C: 12.01, N: 14.01, O: 16.00, F: 19.00, Ne: 20.18,
  Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.06, Cl: 35.45, Ar: 39.95,
  K: 39.10, Ca: 40.08, Sc: 44.96, Ti: 47.87, V: 50.94, Cr: 52.00, Mn: 54.94, Fe: 55.85, Co: 58.93, Ni: 58.69,
  Cu: 63.55, Zn: 65.38, Ga: 69.72, Ge: 72.64, As: 74.92, Se: 78.96, Br: 79.90, Kr: 83.80,
  Rb: 85.47, Sr: 87.62, Y: 88.91, Zr: 91.22, Nb: 92.91, Mo: 95.94, Tc: 98, Ru: 101.1, Rh: 102.9, Pd: 106.4,
  Ag: 107.9, Cd: 112.4, In: 114.8, Sn: 118.7, Sb: 121.8, Te: 127.6, I: 126.9, Xe: 131.3,
}

const Cell = ({ z, symbol, label }: ElementCellProps) => {
  const mass = MASS[symbol]
  const neutrons = z && mass ? Math.max(0, Math.round(mass) - z) : undefined
  return (
    <div
      className="relative rounded-sm border border-border p-2 shadow-sm hover:shadow-md transition"
      title={label || symbol}
    >
      {/* atomic number top-right */}
      <div className="absolute right-1 top-1 text-[10px] text-muted-foreground">{z ?? ""}</div>
      {/* atomic mass top-left if known */}
      {mass && <div className="absolute left-1 top-1 text-[10px] text-muted-foreground">{mass}</div>}
      <div className="mt-3 text-base font-bold leading-none">{symbol}</div>
      {label && <div className="mt-1 text-[10px] text-muted-foreground truncate">{label}</div>}
      <div className="mt-1 grid grid-cols-3 gap-1 text-[9px] text-muted-foreground">
        <div>p {z ?? ""}</div>
        <div>n {neutrons ?? "—"}</div>
        <div>e {z ?? ""}</div>
      </div>
    </div>
  )
}

// Simple name map (symbol → Dutch/English name); extend later as needed
const NAMES: Record<string, string> = {
  H: "Waterstof",
  He: "Helium",
  Li: "Lithium",
  Be: "Beryllium",
  B: "Boor",
  C: "Koolstof",
  N: "Stikstof",
  O: "Zuurstof",
  F: "Fluor",
  Ne: "Neon",
  Na: "Natrium",
  Mg: "Magnesium",
  Al: "Aluminium",
  Si: "Silicium",
  P: "Fosfor",
  S: "Zwavel",
  Cl: "Chloor",
  Ar: "Argon",
  K: "Kalium",
  Ca: "Calcium",
  Sc: "Scandium",
  Ti: "Titaan",
  V: "Vanadium",
  Cr: "Chroom",
  Mn: "Mangaan",
  Fe: "IJzer",
  Co: "Kobalt",
  Ni: "Nikkel",
  Cu: "Koper",
  Zn: "Zink",
  Ga: "Gallium",
  Ge: "Germanium",
  As: "Arseen",
  Se: "Seleen",
  Br: "Broom",
  Kr: "Krypton",
  Rb: "Rubidium",
  Sr: "Strontium",
  Y: "Yttrium",
  Zr: "Zirkonium",
  Nb: "Niobium",
  Mo: "Molybdeen",
  Tc: "Technetium",
  Ru: "Ruthenium",
  Rh: "Rhodium",
  Pd: "Palladium",
  Ag: "Zilver",
  Cd: "Cadmium",
  In: "Indium",
  Sn: "Tin",
  Sb: "Antimoon",
  Te: "Telluur",
  I: "Jodium",
  Xe: "Xenon",
  Cs: "Cesium",
  Ba: "Barium",
  Hf: "Hafnium",
  Ta: "Tantaal",
  W: "Wolfraam",
  Re: "Rhenium",
  Os: "Osmium",
  Ir: "Iridium",
  Pt: "Platina",
  Au: "Goud",
  Hg: "Kwik",
  Tl: "Thallium",
  Pb: "Lood",
  Bi: "Bismut",
  Po: "Polonium",
  At: "Astatium",
  Rn: "Radon",
  Fr: "Francium",
  Ra: "Radium",
  Rf: "Rutherfordium",
  Db: "Dubnium",
  Sg: "Seaborgium",
  Bh: "Bohrium",
  Hs: "Hassium",
  Mt: "Meitnerium",
  Ds: "Darmstadtium",
  Rg: "Roentgenium",
  Cn: "Copernicium",
  Nh: "Nihonium",
  Fl: "Flerovium",
  Mc: "Moscovium",
  Lv: "Livermorium",
  Ts: "Tennessine",
  Og: "Oganesson",
  // Lanthanides
  La: "Lanthaan",
  Ce: "Cerium",
  Pr: "Praseodymium",
  Nd: "Neodymium",
  Pm: "Promethium",
  Sm: "Samarium",
  Eu: "Europium",
  Gd: "Gadolinium",
  Tb: "Terbium",
  Dy: "Dysprosium",
  Ho: "Holmium",
  Er: "Erbium",
  Tm: "Thulium",
  Yb: "Ytterbium",
  Lu: "Lutetium",
  // Actinides
  Ac: "Actinium",
  Th: "Thorium",
  Pa: "Protactinium",
  U: "Uranium",
  Np: "Neptunium",
  Pu: "Plutonium",
  Am: "Americium",
  Cm: "Curium",
  Bk: "Berkelium",
  Cf: "Californium",
  Es: "Einsteinium",
  Fm: "Fermium",
  Md: "Mendelevium",
  No: "Nobelium",
  Lr: "Lawrencium",
}

export const PeriodiekSysteem = ({ className = "", size = 360 }: PeriodiekSysteemProps) => {
  // classify elements for coloring (approximate like the provided legend)
  const metalloids = new Set(["B","Si","Ge","As","Sb","Te","Po"]) // half-metals
  const nonmetals = new Set(["H","He","C","N","O","F","Ne","P","S","Cl","Ar","Se","Br","Kr","I","Xe","At","Rn","Og"]) // incl. halogens + noble gases

  const bgClass = (sym: string) => {
    if (nonmetals.has(sym)) return "bg-sky-200/70"
    if (metalloids.has(sym)) return "bg-orange-200/70"
    return "bg-amber-100/70" // metals default
  }

  const mainRows: string[][] = [
    // 18 columns per row, empty string = placeholder
    ["H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "He"],
    ["Li", "Be", "", "", "", "", "", "", "", "", "", "", "B", "C", "N", "O", "F", "Ne"],
    ["Na", "Mg", "", "", "", "", "", "", "", "", "", "", "Al", "Si", "P", "S", "Cl", "Ar"],
    ["K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"],
    ["Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe"],
    ["Cs", "Ba", "La-Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"],
    ["Fr", "Ra", "Ac-Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"],
  ]

  // Build atomic numbers across main grid, accounting for f-block placeholders
  const mainCells = useMemo(() => {
    const cells: { z?: number; symbol: string }[] = []
    let z = 0
    for (const row of mainRows) {
      for (const sym of row) {
        if (!sym) {
          cells.push({ symbol: "" })
          continue
        }
        if (sym === "La-Lu") {
          z += 15 // skip 57-71
          cells.push({ symbol: sym })
          continue
        }
        if (sym === "Ac-Lr") {
          z += 15 // skip 89-103
          cells.push({ symbol: sym })
          continue
        }
        z += 1
        cells.push({ z, symbol: sym })
      }
    }
    return cells
  }, [])

  const lanth = ["La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu"]
  const actin = ["Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr"]

  const lanthCells = useMemo(() => lanth.map((s, i) => ({ z: 57 + i, symbol: s })), [])
  const actCells = useMemo(() => actin.map((s, i) => ({ z: 89 + i, symbol: s })), [])

  return (
    <div className={`rounded-xl border border-border bg-white p-4 shadow-md ${className}`}>
      <h3 className="mb-2 text-lg font-semibold text-foreground">Periodiek systeem</h3>

      {/* Group header numbers */}
      <div className="ml-10 grid grid-cols-18 gap-2 text-center text-[11px] text-muted-foreground">
        {Array.from({ length: 18 }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      {/* Main grid with period numbers on the left */}
      <div className="mt-1 space-y-2">
        {Array.from({ length: 7 }, (_, rowIdx) => (
          <div key={rowIdx} className="flex items-start gap-2">
            <div className="w-10 shrink-0 text-center text-[11px] text-muted-foreground pt-2">{rowIdx + 1}</div>
            <div className="grid flex-1 grid-cols-18 gap-2">
              {mainRows[rowIdx].map((sym, colIdx) => {
                const cell = mainCells[rowIdx * 18 + colIdx]
                if (!sym) return <div key={`${rowIdx}-${colIdx}`} />
                if (sym === "La-Lu" || sym === "Ac-Lr") {
                  return (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className="flex min-h-[58px] items-center justify-center rounded-sm border border-dashed border-border bg-yellow-50 text-[11px] text-muted-foreground"
                    >
                      {sym.replace("-", "–")}
                    </div>
                  )
                }
                return (
                  <div key={`${rowIdx}-${colIdx}`} className={`${bgClass(sym)} min-h-[58px]`}>
                    <Cell z={cell?.z} symbol={sym} label={NAMES[sym] || sym} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* f-block rows */}
      <div className="mt-6 ml-10 space-y-3">
        <div>
          <div className="mb-1 text-xs text-muted-foreground">lanthaniden</div>
          <div className="grid grid-cols-15 gap-2">
            {lanthCells.map((c) => (
              <div key={c.symbol} className={`${bgClass(c.symbol)} min-h-[58px]`}>
                <Cell z={c.z} symbol={c.symbol} label={NAMES[c.symbol] || c.symbol} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1 text-xs text-muted-foreground">actiniden</div>
          <div className="grid grid-cols-15 gap-2">
            {actCells.map((c) => (
              <div key={c.symbol} className={`${bgClass(c.symbol)} min-h-[58px]`}>
                <Cell z={c.z} symbol={c.symbol} label={NAMES[c.symbol] || c.symbol} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-[12px]">
        <div className="flex items-center gap-2"><span className="inline-block h-3 w-5 bg-amber-100/70 border border-border" /> metaal</div>
        <div className="flex items-center gap-2"><span className="inline-block h-3 w-5 bg-orange-200/70 border border-border" /> metalloïde</div>
        <div className="flex items-center gap-2"><span className="inline-block h-3 w-5 bg-sky-200/70 border border-border" /> niet-metaal</div>
      </div>
    </div>
  )
}
