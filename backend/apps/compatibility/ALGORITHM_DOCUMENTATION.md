# Simple Compatibility Algorithm Documentation

## Overview

The Compatibility API implements a straightforward graph-based algorithm to find compatible bicycle components. The algorithm directly queries the compatibility graph database without complex scoring or ranking - it simply returns components that are connected in the compatibility graph.

## Algorithm Architecture

### **Simple Graph Traversal Algorithm**

```
Input: Selected component IDs + target component types
Output: Compatible components from graph database

Algorithm:
1. Load selected components from database
2. For each target component type:
   a. Get all components of that type
   b. Check graph compatibility with each selected component
   c. Only include components compatible with ALL selected components
3. Return results with compatibility details
```

## Core Logic

### 1. **Component Loading**
- Load selected components from database by ID
- Validate that components exist
- Return error if no valid components found

### 2. **Graph Compatibility Check**
- For each target component, check compatibility with all selected components
- Use existing `GraphCompatibilityEngine.check_direct_compatibility()`
- Component must be compatible with ALL selected components to be included

### 3. **Compatibility Status Filtering**
- `compatible`: Direct compatibility, include in results
- `compatible_with_adapter`: Compatible with adapters, include in results  
- `not_compatible`: Exclude from results
- `unknown`: Exclude from results (no graph data available)

### 4. **Result Assembly**
- Group compatible components by target type
- Include compatibility details for each component
- Return structured JSON response

## API Endpoints

### 1. Find Compatible Components
**POST** `/api/compatibility/find-compatible/`

**Request:**
```json
{
    "selected_components": [123, 456],
    "target_component_types": ["derailleur", "brakes", "chain"]
}
```

**Response:**
```json
{
    "results": {
        "derailleur": [
            {
                "id": 789,
                "brand": "Shimano",
                "model": "105 R7000",
                "type": "derailleur",
                "speed": 11,
                "price": 89.99,
                "compatibility_details": [
                    {
                        "with_component_id": 123,
                        "status": "compatible",
                        "adapters_required": [],
                        "explanation": "Direct compatibility: both 11-speed"
                    },
                    {
                        "with_component_id": 456,
                        "status": "compatible",
                        "adapters_required": [],
                        "explanation": "Same brand family compatibility"
                    }
                ]
            }
        ]
    },
    "selected_components": [
        {
            "id": 123,
            "brand": "Trek",
            "model": "Emonda Frame",
            "type": "frame"
        },
        {
            "id": 456,
            "brand": "Shimano",
            "model": "105 Crankset",
            "type": "crankset"
        }
    ]
}
```

### 2. Build Validation Endpoint
**POST** `/api/compatibility/validate-build/`

**Request:**
```json
{
    "component_ids": [123, 456, 789, 101, 112]
}
```

**Response:**
```json
{
    "is_valid": false,
    "compatibility_matrix": {
        "123-456": {
            "component_a": {
                "id": 123,
                "brand": "Trek",
                "model": "Emonda Frame",
                "type": "frame"
            },
            "component_b": {
                "id": 456,
                "brand": "Shimano",
                "model": "105 Crankset",
                "type": "crankset"
            },
            "status": "compatible",
            "adapters_required": [],
            "explanation": "BSA bottom bracket compatible with Hollowtech II spindle"
        },
        "456-789": {
            "component_a": {
                "id": 456,
                "brand": "Shimano",
                "model": "105 Crankset",
                "type": "crankset"
            },
            "component_b": {
                "id": 789,
                "brand": "SRAM",
                "model": "12-speed Cassette",
                "type": "cassette"
            },
            "status": "not_compatible",
            "adapters_required": [],
            "explanation": "Speed mismatch: 11-speed crankset with 12-speed cassette"
        }
    },
    "issues": [
        {
            "component_a_id": 456,
            "component_b_id": 789,
            "component_a_name": "Shimano 105 Crankset",
            "component_b_name": "SRAM 12-speed Cassette",
            "issue": "Speed mismatch: 11-speed crankset with 12-speed cassette"
        }
    ],
    "total_components": 5,
    "total_compatibility_checks": 10
}
```

## Algorithm Performance Characteristics

### Time Complexity
- **O(n × m)** where n = target components, m = selected components
- Each compatibility check is a direct graph lookup
- Linear scaling with number of components

### Space Complexity
- **O(g)** where g = size of compatibility graph in memory
- Minimal additional memory for result storage
- Graph engine loads compatibility data once

### Performance Optimizations
1. **Graph Caching**: Compatibility graph loaded once in memory
2. **Database Indexing**: Indexed queries on component type and ID
3. **Direct Lookups**: No complex calculations or scoring
4. **Batch Queries**: Load components in batches when possible

## Data Requirements

### Graph Database Structure
- **Nodes**: Components with basic metadata (ID, brand, model, type, speed, price)
- **Edges**: Compatibility links with status and adapter requirements
- **Status Values**: `compatible`, `compatible_with_adapter`, `not_compatible`

### Minimum Data for Functionality
- At least 2 components in database
- At least 1 compatibility link between components
- Component type classification (frame, crankset, derailleur, etc.)

## Accuracy and Reliability

### Data Quality Dependency
- Algorithm accuracy depends entirely on graph data quality
- No inference or prediction - only returns known compatibility relationships
- Missing graph data results in "unknown" compatibility status

### Validation Approach
- Direct graph traversal ensures consistent results
- No probabilistic scoring reduces uncertainty
- Clear compatibility status for each component pair

## Limitations

### Current Limitations
1. **No Inference**: Cannot predict compatibility for unknown component pairs
2. **Graph Dependency**: Requires pre-populated compatibility data
3. **No Ranking**: All compatible components treated equally
4. **No Preferences**: Cannot filter by user preferences or budget

### Potential Enhancements
1. **Specification-based Inference**: Add fallback to spec engine for unknown pairs
2. **Basic Filtering**: Add price and brand filtering options
3. **Caching Layer**: Add Redis caching for frequently requested combinations
4. **Batch API**: Support multiple compatibility checks in single request