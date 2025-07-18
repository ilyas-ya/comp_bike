'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { ComponentCategory, Component } from '@/types'
import { componentsApi } from '@/lib/api'

interface ComponentSearchProps {
  category: ComponentCategory
  onComponentSelect: (component: Component) => void
  onCancel: () => void
}

export function ComponentSearch({
  category,
  onComponentSelect,
  onCancel,
}: ComponentSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [brand, setBrand] = useState('')
  
  // Get category display name
  const getCategoryDisplayName = (category: ComponentCategory) => {
    const categoryMap: Record<ComponentCategory, string> = {
      bottom_bracket: 'Bottom Bracket & Crankset',
      cassette_derailleur: 'Cassette & Derailleur',
      brake_system: 'Brake System',
      wheel_frame: 'Wheel & Frame Interface',
      seatpost: 'Seatpost',
    }
    return categoryMap[category] || category
  }
  
  // Query components
  const { data, isLoading, error } = useQuery(
    ['components', category, searchQuery, brand],
    () => componentsApi.search({ 
      category, 
      q: searchQuery,
      brand 
    }).then(res => res.data),
    {
      // For demo purposes, return mock data
      enabled: false, // Disable actual API call for now
      initialData: [
        {
          id: 1,
          name: 'Dura-Ace FC-R9200',
          brand: 'Shimano',
          category: category,
          price_range: '$500-600',
          image: null,
        },
        {
          id: 2,
          name: 'Ultegra FC-R8100',
          brand: 'Shimano',
          category: category,
          price_range: '$300-400',
          image: null,
        },
        {
          id: 3,
          name: 'Red AXS',
          brand: 'SRAM',
          category: category,
          price_range: '$600-700',
          image: null,
        },
      ]
    }
  )

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search {getCategoryDisplayName(category)}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="search"
            className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Search by name or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={onCancel}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
          Brand
        </label>
        <select
          id="brand"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          <option value="Shimano">Shimano</option>
          <option value="SRAM">SRAM</option>
          <option value="Campagnolo">Campagnolo</option>
        </select>
      </div>
      
      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading components...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">
          Error loading components. Please try again.
        </div>
      ) : (
        <div className="space-y-2">
          {data && data.length > 0 ? (
            data.map((component) => (
              <div
                key={component.id}
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => onComponentSelect(component)}
              >
                <div className="font-medium">{component.name}</div>
                <div className="text-sm text-gray-600">{component.brand}</div>
                <div className="text-sm text-gray-500">{component.price_range}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No components found. Try adjusting your search.
            </div>
          )}
        </div>
      )}
    </div>
  )
}