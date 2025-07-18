'use client'

import { CompatibilityResult, Component } from '@/types'

interface CompatibilityDisplayProps {
  result: CompatibilityResult
  components: [Component, Component]
}

export function CompatibilityDisplay({
  result,
  components,
}: CompatibilityDisplayProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compatible':
        return 'bg-compatible-500'
      case 'conditional':
        return 'bg-conditional-500'
      case 'incompatible':
        return 'bg-incompatible-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'compatible':
        return 'YES'
      case 'conditional':
        return 'TBD'
      case 'incompatible':
        return 'NO'
      default:
        return '?'
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center p-4 bg-gray-50">
        <div className="flex-1">
          <div className="font-medium">{components[0].brand} {components[0].name}</div>
          <div className="text-sm text-gray-600">{components[0].category}</div>
        </div>
        
        <div className="mx-4">
          <div className={`w-12 h-12 rounded-full ${getStatusColor(result.status)} flex items-center justify-center text-white font-bold`}>
            {getStatusText(result.status)}
          </div>
        </div>
        
        <div className="flex-1 text-right">
          <div className="font-medium">{components[1].brand} {components[1].name}</div>
          <div className="text-sm text-gray-600">{components[1].category}</div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="mb-2">
          <span className="text-sm font-medium">Confidence:</span>{' '}
          <span className="text-sm">{Math.round(result.confidence * 100)}%</span>
        </div>
        
        <div className="text-sm">{result.explanation}</div>
        
        {result.required_adapters && result.required_adapters.length > 0 && (
          <div className="mt-3">
            <div className="text-sm font-medium mb-1">Required Adapters:</div>
            <ul className="text-sm list-disc list-inside">
              {result.required_adapters.map((adapter, index) => (
                <li key={index}>{adapter.brand} {adapter.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}