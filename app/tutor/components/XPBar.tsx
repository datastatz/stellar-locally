"use client"

interface XPBarProps {
  currentXP: number
  totalXP: number
}

export function XPBar({ currentXP, totalXP }: XPBarProps) {
  const percentage = Math.min((currentXP / totalXP) * 100, 100)

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-muted-foreground">Level Voortgang</span>
        <span className="text-xs font-medium text-muted-foreground">{currentXP}/{totalXP} XP</span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
