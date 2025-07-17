'use client'

import { BikeCompatibilityChecker } from '@/components/BikeCompatibilityChecker'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Component Compatibility System
          </h1>
          <p className="text-lg text-gray-600">
            Check bicycle component compatibility with visual feedback
          </p>
        </header>
        
        <BikeCompatibilityChecker />
      </div>
    </main>
  )
}