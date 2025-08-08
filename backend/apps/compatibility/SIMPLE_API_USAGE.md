# Simple Compatibility API Usage

## Overview

This API simply queries the graph database to find compatible components. No complex scoring or algorithms - just direct graph traversal.

## Endpoints

### 1. Find Compatible Components

**POST** `/api/compatibility/find-compatible/`

Find components that are compatible with your selected components.

**Request:**
```json
{
    "selected_components": [123, 456, 789],
    "target_component_types": ["derailleur", "brakes", "chain"]
}
```

**Response:**
```json
{
    "results": {
        "derailleur": [
            {
                "id": 101,
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
                        "status": "compatible_with_adapter",
                        "adapters_required": ["Chain guide adapter"],
                        "explanation": "Compatible with adapter"
                    }
                ]
            }
        ],
        "brakes": [
            {
                "id": 201,
                "brand": "Shimano",
                "model": "105 BR-R7070",
                "type": "brakes",
                "speed": null,
                "price": 129.99,
                "compatibility_details": [
                    {
                        "with_component_id": 123,
                        "status": "compatible",
                        "adapters_required": [],
                        "explanation": "Flat mount brake compatible with frame"
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
        }
    ]
}
```

### 2. Validate Build

**POST** `/api/compatibility/validate-build/`

Check if all components in a build are compatible with each other.

**Request:**
```json
{
    "component_ids": [123, 456, 789, 101, 201]
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
            "explanation": "BSA bottom bracket compatible with Hollowtech II"
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

## How It Works

### Algorithm
1. **Load Components**: Get selected components from database
2. **Graph Traversal**: For each target component type, check compatibility with all selected components using the graph engine
3. **Filter Results**: Only return components that are compatible with ALL selected components
4. **Return Data**: Simple JSON response with compatibility details

### Compatibility Status
- `compatible`: Direct compatibility, no adapters needed
- `compatible_with_adapter`: Compatible but requires adapters
- `not_compatible`: Not compatible
- `unknown`: No compatibility data available

## Frontend Integration Examples

### JavaScript/Fetch
```javascript
// Find compatible derailleurs for selected frame and crankset
async function findCompatibleComponents(selectedIds, targetTypes) {
    const response = await fetch('/api/compatibility/find-compatible/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selected_components: selectedIds,
            target_component_types: targetTypes
        })
    });
    
    const data = await response.json();
    return data.results;
}

// Usage
const compatibleComponents = await findCompatibleComponents(
    [123, 456], // frame and crankset IDs
    ['derailleur', 'cassette', 'brakes']
);

console.log(compatibleComponents.derailleur); // Array of compatible derailleurs
```

### React Hook
```jsx
import { useState, useEffect } from 'react';

function useCompatibleComponents(selectedComponents, targetTypes) {
    const [compatible, setCompatible] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (selectedComponents.length > 0 && targetTypes.length > 0) {
            setLoading(true);
            
            fetch('/api/compatibility/find-compatible/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    selected_components: selectedComponents,
                    target_component_types: targetTypes
                })
            })
            .then(res => res.json())
            .then(data => {
                setCompatible(data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoading(false);
            });
        }
    }, [selectedComponents, targetTypes]);
    
    return { compatible, loading };
}

// Usage in component
function BikeBuilder() {
    const [selectedComponents, setSelectedComponents] = useState([123, 456]);
    const { compatible, loading } = useCompatibleComponents(
        selectedComponents, 
        ['derailleur', 'cassette']
    );
    
    if (loading) return <div>Loading compatible components...</div>;
    
    return (
        <div>
            <h3>Compatible Derailleurs:</h3>
            {compatible.derailleur?.map(derailleur => (
                <div key={derailleur.id}>
                    {derailleur.brand} {derailleur.model} - ${derailleur.price}
                </div>
            ))}
        </div>
    );
}
```

### Build Validation
```javascript
async function validateBuild(componentIds) {
    const response = await fetch('/api/compatibility/validate-build/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            component_ids: componentIds
        })
    });
    
    const validation = await response.json();
    
    if (!validation.is_valid) {
        console.log('Build has compatibility issues:');
        validation.issues.forEach(issue => {
            console.log(`- ${issue.component_a_name} incompatible with ${issue.component_b_name}: ${issue.issue}`);
        });
    }
    
    return validation;
}

// Usage
const buildValidation = await validateBuild([123, 456, 789, 101, 201]);
```

## Performance Notes

- The API queries the graph database directly
- Results are not cached (add Redis caching if needed)
- For large component catalogs, consider pagination
- Graph engine rebuilds on each request (consider caching the graph in memory)

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad request (invalid input)
- `500`: Server error

Error responses include an `error` field with description:
```json
{
    "error": "At least one component must be selected"
}
```