"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Member {
  personId: number
  name: {
    firstName: string
    lastName: string
  }
  factionName: string | null
}

interface ParliamentSeatLayoutProps {
  members: Member[]
  title?: string
  subtitle?: string
  className?: string
}

// Color palette for parties - using distinct colors
const PARTY_COLORS = [
  "rgb(51, 153, 255)",   // Blue
  "rgb(255, 0, 0)",       // Red
  "rgb(255, 215, 0)",     // Gold
  "rgb(0, 128, 0)",       // Green
  "rgb(128, 0, 128)",     // Purple
  "rgb(255, 165, 0)",     // Orange
  "rgb(0, 0, 255)",       // Dark Blue
  "rgb(255, 20, 147)",    // Pink
  "rgb(0, 191, 255)",     // Sky Blue
  "rgb(255, 140, 0)",     // Dark Orange
  "rgb(50, 205, 50)",     // Lime Green
  "rgb(138, 43, 226)",    // Blue Violet
  "rgb(181, 181, 181)",  // Gray
  "rgb(153, 153, 153)",  // Dark Gray
  "rgb(0, 0, 0)",         // Black
]

// Generate a color for a party based on its name
function getPartyColor(partyName: string | null, index: number): string {
  if (!partyName) {
    return "rgb(200, 200, 200)" // Light gray for unaffiliated
  }
  
  // Use a hash of the party name to get a consistent color
  const hash = partyName.split("").reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0)
  }, 0)
  
  return PARTY_COLORS[Math.abs(hash) % PARTY_COLORS.length]
}

// Calculate positions for seats in a circular layout
// Distributes seats in concentric rings for better visual organization
function calculateSeatPositions(
  totalSeats: number,
  innerRadius: number,
  outerRadius: number
): Array<{ x: number; y: number; angle: number }> {
  const positions: Array<{ x: number; y: number; angle: number }> = []
  
  // Calculate number of rings needed
  const rings = Math.ceil(Math.sqrt(totalSeats / 2))
  const seatsPerRing = Math.ceil(totalSeats / rings)
  
  let seatIndex = 0
  
  for (let ring = 0; ring < rings && seatIndex < totalSeats; ring++) {
    // Calculate radius for this ring
    const ringProgress = ring / (rings - 1)
    const radius = innerRadius + (outerRadius - innerRadius) * ringProgress
    
    // Calculate number of seats in this ring
    const seatsInRing = Math.min(seatsPerRing, totalSeats - seatIndex)
    const angleStep = (2 * Math.PI) / seatsInRing
    
    // Offset angle for each ring to create a spiral effect
    const ringOffset = ring * (Math.PI / rings)
    
    for (let i = 0; i < seatsInRing && seatIndex < totalSeats; i++) {
      const angle = i * angleStep + ringOffset - Math.PI / 2 // Start from top
      
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)
      
      positions.push({ x, y, angle })
      seatIndex++
    }
  }
  
  return positions
}

export default function ParliamentSeatLayout({
  members,
  title = "Knesset Seat Layout",
  subtitle,
  className,
}: ParliamentSeatLayoutProps) {
  const [hoveredParty, setHoveredParty] = useState<string | null>(null)

  // Group members by party
  const partyGroups = useMemo(() => {
    const groups = new Map<string, Member[]>()
    
    members.forEach((member) => {
      const partyName = member.factionName || "Unaffiliated"
      if (!groups.has(partyName)) {
        groups.set(partyName, [])
      }
      groups.get(partyName)!.push(member)
    })
    
    // Sort parties by number of members (descending)
    return Array.from(groups.entries())
      .map(([partyName, members]) => ({
        partyName,
        members,
        count: members.length,
      }))
      .sort((a, b) => b.count - a.count)
  }, [members])

  // Calculate seat positions for 120 seats
  const totalSeats = 120
  const svgSize = 600
  const centerX = svgSize / 2
  const centerY = svgSize / 2
  const innerRadius = 80
  const outerRadius = 240
  const seatRadius = 8

  const seatPositions = useMemo(
    () => calculateSeatPositions(totalSeats, innerRadius, outerRadius),
    []
  )

  // Assign seats to members
  const seatAssignments = useMemo(() => {
    const assignments: Array<{
      x: number
      y: number
      member: Member | null
      partyName: string | null
      color: string
    }> = []

    let seatIndex = 0
    
    // Assign seats by party, grouping parties together
    partyGroups.forEach((party) => {
      const color = getPartyColor(party.partyName, seatIndex)
      
      for (let i = 0; i < party.count && seatIndex < totalSeats; i++) {
        const pos = seatPositions[seatIndex]
        assignments.push({
          x: pos.x,
          y: pos.y,
          member: party.members[i] || null,
          partyName: party.partyName,
          color,
        })
        seatIndex++
      }
    })
    
    // Fill remaining seats with empty slots
    while (seatIndex < totalSeats) {
      const pos = seatPositions[seatIndex]
      assignments.push({
        x: pos.x,
        y: pos.y,
        member: null,
        partyName: null,
        color: "rgb(240, 240, 240)",
      })
      seatIndex++
    }
    
    return assignments
  }, [partyGroups, seatPositions])

  // Get unique parties with colors for legend
  const legendItems = useMemo(() => {
    const seen = new Set<string>()
    return partyGroups
      .map((party, index) => {
        if (seen.has(party.partyName)) return null
        seen.add(party.partyName)
        return {
          name: party.partyName,
          count: party.count,
          color: getPartyColor(party.partyName, index),
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
  }, [partyGroups])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-[600px] aspect-square">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="overflow-visible"
          >
            <defs>
              <radialGradient id="label-gradient">
                <stop offset="0%" stopColor="rgb(255, 255, 255)" stopOpacity="1" />
                <stop offset="80%" stopColor="rgb(255, 255, 255)" stopOpacity="1" />
                <stop offset="90%" stopColor="rgb(255, 255, 255)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(255, 255, 255)" stopOpacity="0" />
              </radialGradient>
              <mask id="label-clip">
                <circle
                  fill="url(#label-gradient)"
                  cx={centerX}
                  cy={centerY}
                  r={innerRadius}
                />
              </mask>
            </defs>

            {/* Background circles */}
            <circle
              cx={centerX}
              cy={centerY}
              r={outerRadius}
              fill="#ffffff"
              stroke="#e5e5e5"
              strokeWidth="2"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={innerRadius}
              fill="#ffffff"
              stroke="#e5e5e5"
              strokeWidth="2"
            />

            {/* Seat groups by party */}
            {partyGroups.map((party) => {
              const partySeats = seatAssignments.filter(
                (seat) => seat.partyName === party.partyName
              )
              const partyColor = getPartyColor(party.partyName, 0)
              const isHovered = hoveredParty === party.partyName
              
              return (
                <g
                  key={party.partyName}
                  className="party-group"
                  data-party={party.partyName}
                  style={{ opacity: hoveredParty && !isHovered ? 0.3 : 1 }}
                  onMouseEnter={() => setHoveredParty(party.partyName)}
                  onMouseLeave={() => setHoveredParty(null)}
                >
                  {partySeats.map((seat, index) => (
                    <circle
                      key={`${party.partyName}-${index}`}
                      cx={centerX + seat.x}
                      cy={centerY + seat.y}
                      r={seatRadius}
                      fill={seat.color}
                      stroke={seat.color}
                      className="cursor-pointer transition-opacity"
                      style={{
                        opacity: isHovered ? 1 : hoveredParty ? 0.3 : 1,
                      }}
                    />
                  ))}
                </g>
              )
            })}

            {/* Center label (shows party info on hover) */}
            {hoveredParty && (
              <g className="label-container" mask="url(#label-clip)">
                <text
                  className="party_count"
                  x={centerX}
                  y={centerY - 10}
                  textAnchor="middle"
                  fontSize="48"
                  fontWeight="bold"
                  fill={getPartyColor(hoveredParty, 0)}
                >
                  {partyGroups.find((p) => p.partyName === hoveredParty)?.count || 0}
                </text>
                <text
                  className="party_name"
                  x={centerX}
                  y={centerY + 20}
                  textAnchor="middle"
                  fontSize="16"
                  fill={getPartyColor(hoveredParty, 0)}
                >
                  {hoveredParty}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="w-full max-w-[600px]">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {legendItems.map((item) => {
              const isHovered = hoveredParty === item.name
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-2 cursor-pointer transition-opacity"
                  style={{ opacity: hoveredParty && !isHovered ? 0.3 : 1 }}
                  onMouseEnter={() => setHoveredParty(item.name)}
                  onMouseLeave={() => setHoveredParty(null)}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">
                    {item.name} ({item.count})
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary table */}
        <div className="w-full max-w-[600px] mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-bold">Party</th>
                <th className="text-right p-2 font-bold">Seats</th>
              </tr>
            </thead>
            <tbody>
              {legendItems.map((item) => (
                <tr
                  key={item.name}
                  className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredParty(item.name)}
                  onMouseLeave={() => setHoveredParty(null)}
                >
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="text-right p-2">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

