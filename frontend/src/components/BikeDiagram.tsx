'use client'

import { useState } from 'react'
import { BikeComponentArea, SelectedComponent, CompatibilityResult } from '@/types'

// Placeholder bike component areas for initial setup
const initialComponentAreas: BikeComponentArea[] = [
  {
    id: 'bottom-bracket',
    name: 'Bottom Bracket & Crankset',
    coordinates: { x: 50, y: 60, width: 20, height: 10 },
    category: 'bottom_bracket',
    isSelected: false,
  },
  {
    id: 'cassette-derailleur',
    name: 'Cassette & Derailleur',
    coordinates: { x: 70, y: 50, width: 15, height: 10 },
    category: 'cassette_derailleur',
    isSelected: false,
  },
  {
    id: 'brake-system',
    name: 'Brake System',
    coordinates: { x: 30, y: 30, width: 10, height: 10 },
    category: 'brake_system',
    isSelected: false,
  },
  {
    id: 'wheel-frame',
    name: 'Wheel & Frame Interface',
    coordinates: { x: 50, y: 40, width: 20, height: 20 },
    category: 'wheel_frame',
    isSelected: false,
  },
  {
    id: 'seatpost',
    name: 'Seatpost',
    coordinates: { x: 50, y: 20, width: 5, height: 15 },
    category: 'seatpost',
    isSelected: false,
  },
]

interface BikeDiagramProps {
  selectedComponents: SelectedComponent[]
  onComponentClick: (area: BikeComponentArea) => void
  compatibilityResults?: CompatibilityResult[]
}

export function BikeDiagram({
  selectedComponents,
  onComponentClick,
  compatibilityResults = [],
}: BikeDiagramProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)
  
  // Update component areas with selection status
  const componentAreas = initialComponentAreas.map(area => {
    const isSelected = selectedComponents.some(s => s.area.id === area.id)
    
    // Find compatibility status if available
    let compatibilityStatus = undefined
    if (isSelected && selectedComponents.length > 1) {
      // This is a simplified approach - in a real app, you'd need more complex logic
      // to determine the overall compatibility status of a component
      const relatedResults = compatibilityResults.filter(result => 
        selectedComponents.some(s => s.area.id === area.id && 
          (s.component.id === result.components?.[0]?.id || 
           s.component.id === result.components?.[1]?.id))
      )
      
      if (relatedResults.length > 0) {
        // Use the worst compatibility status
        if (relatedResults.some(r => r.status === 'incompatible')) {
          compatibilityStatus = 'incompatible'
        } else if (relatedResults.some(r => r.status === 'conditional')) {
          compatibilityStatus = 'conditional'
        } else {
          compatibilityStatus = 'compatible'
        }
      }
    }
    
    return {
      ...area,
      isSelected,
      compatibilityStatus,
    }
  })
  
  // Get color for component area based on selection and compatibility
  const getAreaColor = (area: BikeComponentArea) => {
    if (!area.isSelected) {
      return hoveredArea === area.id ? 'rgba(59, 130, 246, 0.5)' : 'rgba(209, 213, 219, 0.5)'
    }
    
    if (area.compatibilityStatus === 'compatible') {
      return 'rgba(34, 197, 94, 0.7)'
    } else if (area.compatibilityStatus === 'conditional') {
      return 'rgba(245, 158, 11, 0.7)'
    } else if (area.compatibilityStatus === 'incompatible') {
      return 'rgba(239, 68, 68, 0.7)'
    }
    
    return 'rgba(59, 130, 246, 0.7)'
  }

  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg border border-gray-300">
      {/* Placeholder for bike diagram - in a real app, use an SVG or Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <p className="text-lg">Bike Diagram Placeholder</p>
          <p className="text-sm">Click on a component area below</p>
        </div>
      </div>
      
      {/* Component areas */}
      {componentAreas.map(area => (
        <div
          key={area.id}
          className="absolute cursor-pointer transition-colors duration-200 rounded-md border border-gray-400"
          style={{
            left: `${area.coordinates.x}%`,
            top: `${area.coordinates.y}%`,
            width: `${area.coordinates.width}%`,
            height: `${area.coordinates.height}%`,
            backgroundColor: getAreaColor(area),
          }}
          onClick={() => onComponentClick(area)}
          onMouseEnter={() => setHoveredArea(area.id)}
          onMouseLeave={() => setHoveredArea(null)}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md">
            {area.name}
          </div>
        </div>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md text-xs">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-green-500 mr-1 rounded-sm"></div>
          <span>Compatible</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-yellow-500 mr-1 rounded-sm"></div>
          <span>Conditional</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 mr-1 rounded-sm"></div>
          <span>Incompatible</span>
        </div>
      </div>
    </div>
  )
}