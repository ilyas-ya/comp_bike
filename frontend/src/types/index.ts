export interface Component {
  id: number
  name: string
  brand: string
  model?: string
  category: ComponentCategory
  specifications: Record<string, any>
  price_range?: string
  image?: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Frame {
  id: number
  brand: string
  model: string
  year: number
  frame_type: FrameType
  frame_type_display: string
  bottom_bracket_standard: number
  rear_axle_standard: number
  front_axle_standard: number
  brake_mount_standard: number
  headtube_standard: number
  seatpost_diameter: number
  specifications: Record<string, any>
  image?: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Standard {
  id: number
  name: string
  category: StandardCategory
  category_display: string
  description: string
  specifications: Record<string, any>
  diameter?: number
  width?: number
  thread_pitch?: string
  created_at: string
  updated_at: string
}

export interface Adapter {
  id: number
  name: string
  brand: string
  description: string
  price_range?: string
  image?: string
  from_specification: Record<string, any>
  to_specification: Record<string, any>
  created_at: string
  updated_at: string
}

export interface CompatibilityResult {
  status: CompatibilityStatus
  confidence: number
  explanation: string
  required_adapters?: Adapter[]
  alternative_suggestions?: Component[]
  processing_time_ms?: number
}

export type ComponentCategory = 
  | 'bottom_bracket'
  | 'cassette_derailleur'
  | 'brake_system'
  | 'wheel_frame'
  | 'seatpost'

export type FrameType = 
  | 'road'
  | 'mountain'
  | 'gravel'
  | 'cyclocross'
  | 'hybrid'
  | 'bmx'
  | 'track'

export type StandardCategory = 
  | 'bottom_bracket'
  | 'axle'
  | 'brake_mount'
  | 'headtube'
  | 'seatpost'
  | 'cassette'
  | 'chain'

export type CompatibilityStatus = 'compatible' | 'conditional' | 'incompatible'

export interface BikeComponentArea {
  id: string
  name: string
  coordinates: { x: number; y: number; width: number; height: number }
  category: ComponentCategory
  isSelected: boolean
  compatibilityStatus?: CompatibilityStatus
}

export interface SelectedComponent {
  area: BikeComponentArea
  component: Component
}