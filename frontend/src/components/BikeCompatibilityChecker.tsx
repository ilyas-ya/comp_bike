'use client'

import { useState } from 'react'
import { BikeDiagram } from './BikeDiagram'
import { ComponentSearch } from './ComponentSearch'
import { CompatibilityDisplay } from './CompatibilityDisplay'
import { SelectedComponent, BikeComponentArea, Component, CompatibilityResult } from '@/types'
import { compatibilityApi } from '@/lib/api'

export function BikeCompatibilityChecker() {
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponent[]>([])
  const [activeArea, setActiveArea] = useState<BikeComponentArea | null>(null)
  const [compatibilityResults, setCompatibilityResults] = useState<CompatibilityResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleComponentAreaClick = (area: BikeComponentArea) => {
    setActiveArea(area)
  }

  const handleComponentSelect = async (component: Component) => {
    if (!activeArea) return

    const newSelection: SelectedComponent = {
      area: activeArea,
      component,
    }

    const updatedSelections = [
      ...selectedComponents.filter(s => s.area.id !== activeArea.id),
      newSelection,
    ]

    setSelectedComponents(updatedSelections)
    setActiveArea(null)

    // Check compatibility with other selected components
    if (updatedSelections.length > 1) {
      await checkAllCompatibilities(updatedSelections)
    }
  }

  const checkAllCompatibilities = async (selections: SelectedComponent[]) => {
    setIsLoading(true)
    const results: CompatibilityResult[] = []

    try {
      // Check compatibility between all pairs
      for (let i = 0; i < selections.length; i++) {
        for (let j = i + 1; j < selections.length; j++) {
          const componentA = selections[i].component
          const componentB = selections[j].component

          const response = await compatibilityApi.checkCompatibility(
            componentA.id,
            componentB.id
          )
          results.push(response.data)
        }
      }

      setCompatibilityResults(results)
    } catch (error) {
      console.error('Error checking compatibility:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveComponent = (areaId: string) => {
    const updatedSelections = selectedComponents.filter(s => s.area.id !== areaId)
    setSelectedComponents(updatedSelections)
    
    if (updatedSelections.length > 1) {
      checkAllCompatibilities(updatedSelections)
    } else {
      setCompatibilityResults([])
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bike Diagram */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Interactive Bike Diagram</h2>
          <BikeDiagram
            selectedComponents={selectedComponents}
            onComponentClick={handleComponentAreaClick}
            compatibilityResults={compatibilityResults}
          />
        </div>
      </div>

      {/* Component Search & Results */}
      <div className="space-y-6">
        {/* Component Search */}
        {activeArea && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Select {activeArea.name}
            </h3>
            <ComponentSearch
              category={activeArea.category}
              onComponentSelect={handleComponentSelect}
              onCancel={() => setActiveArea(null)}
            />
          </div>
        )}

        {/* Selected Components */}
        {selectedComponents.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Selected Components</h3>
            <div className="space-y-3">
              {selectedComponents.map((selection) => (
                <div
                  key={selection.area.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{selection.area.name}</div>
                    <div className="text-sm text-gray-600">
                      {selection.component.brand} {selection.component.name}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveComponent(selection.area.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compatibility Results */}
        {compatibilityResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Compatibility Results</h3>
            {isLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Checking compatibility...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {compatibilityResults.map((result, index) => (
                  <CompatibilityDisplay
                    key={index}
                    result={result}
                    components={[
                      selectedComponents[Math.floor(index / (selectedComponents.length - 1))].component,
                      selectedComponents[index % (selectedComponents.length - 1) + 1].component,
                    ]}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}