# Simple Compatibility API - Usage Examples

## Quick Start

### 1. Basic Compatibility Check

Find compatible derailleurs for a selected crankset:

```bash
curl -X POST http://localhost:8000/api/compatibility/find-compatible/ \
  -H "Content-Type: application/json" \
  -d '{
    "selected_components": [456],
    "target_component_types": ["derailleur"]
  }'
```

### 2. Multi-Component Compatibility

Find compatible components for multiple selected components:

```bash
curl -X POST http://localhost:8000/api/compatibility/find-compatible/ \
  -H "Content-Type: application/json" \
  -d '{
    "selected_components": [123, 456, 789],
    "target_component_types": ["derailleur", "cassette", "brakes"]
  }'
```

### 3. Build Validation

Validate a complete bike build:

```bash
curl -X POST http://localhost:8000/api/compatibility/validate-build/ \
  -H "Content-Type: application/json" \
  -d '{
    "component_ids": [123, 456, 789, 101, 112, 131, 141, 151]
  }'
```

## Frontend Integration Examples

### React Component Example

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompatibilitySelector = ({ selectedComponentIds, onComponentSelect }) => {
  const [compatibleComponents, setCompatibleComponents] = useState({});
  const [loading, setLoading] = useState(false);

  const findCompatibleComponents = async (targetTypes) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/compatibility/find-compatible/', {
        selected_components: selectedComponentIds,
        target_component_types: targetTypes
      });
      
      setCompatibleComponents(response.data.results);
    } catch (error) {
      console.error('Error finding compatible components:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedComponentIds.length > 0) {
      const targetTypes = ['derailleur', 'cassette', 'brakes'];
      findCompatibleComponents(targetTypes);
    }
  }, [selectedComponentIds]);

  return (
    <div className="compatibility-selector">
      {loading && <div>Finding compatible components...</div>}
      
      {Object.entries(compatibleComponents).map(([componentType, components]) => (
        <div key={componentType} className="component-type-section">
          <h3>Compatible {componentType}s</h3>
          <div className="components-grid">
            {components.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                onSelect={() => onComponentSelect(componentType, component)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ComponentCard = ({ component, onSelect }) => (
  <div className="component-card" onClick={onSelect}>
    <div className="component-info">
      <h4>{component.brand} {component.model}</h4>
      <p className="price">${component.price}</p>
    </div>
    
    <div className="compatibility-info">
      {component.compatibility_details.map((detail, index) => (
        <div key={index} className="compatibility-detail">
          <span className={`status ${detail.status}`}>
            {detail.status.replace('_', ' ')}
          </span>
          {detail.adapters_required.length > 0 && (
            <div className="adapters-required">
              <small>Adapters: {detail.adapters_required.join(', ')}</small>
            </div>
          )}
          <p className="explanation">{detail.explanation}</p>
        </div>
      ))}
    </div>
  </div>
);
```

### Vue.js Component Example

```vue
<template>
  <div class="compatibility-finder">
    <div v-if="loading" class="loading">
      Finding compatible components...
    </div>
    
    <div v-for="(components, componentType) in compatibleComponents" 
         :key="componentType" 
         class="component-section">
      <h3>{{ componentType }} Options</h3>
      
      <div class="components-list">
        <div v-for="component in components" 
             :key="component.id"
             class="component-item"
             @click="selectComponent(componentType, component)">
          
          <div class="component-details">
            <h4>{{ component.brand }} {{ component.model }}</h4>
            <p class="price">${{ component.price }}</p>
          </div>
          
          <div class="compatibility-details">
            <div v-for="detail in component.compatibility_details" 
                 :key="detail.with_component_id"
                 class="compatibility-detail">
              <span :class="`status ${detail.status}`">
                {{ detail.status.replace('_', ' ') }}
              </span>
              <p class="explanation">{{ detail.explanation }}</p>
              
              <div v-if="detail.adapters_required.length" class="adapters">
                <small>Requires: {{ detail.adapters_required.join(', ') }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CompatibilityFinder',
  props: {
    selectedComponentIds: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      compatibleComponents: {},
      loading: false
    };
  },
  watch: {
    selectedComponentIds: {
      handler(newComponentIds) {
        this.findCompatibleComponents();
      },
      deep: true
    }
  },
  methods: {
    async findCompatibleComponents() {
      if (this.selectedComponentIds.length === 0) return;
      
      this.loading = true;
      
      try {
        const targetTypes = ['derailleur', 'cassette', 'brakes', 'chain'];
        
        const response = await axios.post('/api/compatibility/find-compatible/', {
          selected_components: this.selectedComponentIds,
          target_component_types: targetTypes
        });
        
        this.compatibleComponents = response.data.results;
      } catch (error) {
        console.error('Compatibility check failed:', error);
      } finally {
        this.loading = false;
      }
    },
    
    selectComponent(type, component) {
      this.$emit('component-selected', { type, component });
    }
  }
};
</script>

<style scoped>
.status.compatible {
  color: green;
}

.status.compatible_with_adapter {
  color: orange;
}

.status.not_compatible {
  color: red;
}
</style>
```

## Advanced Usage Scenarios

### 1. Simple Build Helper

```javascript
class BikeBuilderHelper {
  constructor(apiBaseUrl) {
    this.apiUrl = apiBaseUrl;
  }
  
  async findCompatibleForBuild(selectedComponentIds, targetTypes) {
    const response = await fetch(`${this.apiUrl}/find-compatible/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selected_components: selectedComponentIds,
        target_component_types: targetTypes
      })
    });
    
    return response.json();
  }
  
  async validateBuild(componentIds) {
    const response = await fetch(`${this.apiUrl}/validate-build/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        component_ids: componentIds
      })
    });
    
    return response.json();
  }
  
  async buildStep(currentComponentIds, nextComponentType) {
    // Find compatible components for the next step
    const compatible = await this.findCompatibleForBuild(
      currentComponentIds,
      [nextComponentType]
    );
    
    return compatible.results[nextComponentType] || [];
  }
  
  async completeBuild(startingComponentIds, targetTypes) {
    let currentBuild = [...startingComponentIds];
    const buildSteps = [];
    
    for (const targetType of targetTypes) {
      const compatibleComponents = await this.buildStep(currentBuild, targetType);
      
      buildSteps.push({
        componentType: targetType,
        options: compatibleComponents,
        selected: null
      });
    }
    
    return {
      currentBuild,
      buildSteps,
      validation: await this.validateBuild(currentBuild)
    };
  }
}

// Usage
const helper = new BikeBuilderHelper('/api/compatibility');

const buildPlan = await helper.completeBuild(
  [123, 456], // frame and crankset IDs
  ['derailleur', 'cassette', 'brakes']
);
```

### 2. Real-time Compatibility Checker

```javascript
class RealTimeCompatibilityChecker {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.cache = new Map();
    this.debounceTimer = null;
  }
  
  checkCompatibility(componentIds, callback) {
    // Debounce rapid changes
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      const cacheKey = this.getCacheKey(componentIds);
      
      if (this.cache.has(cacheKey)) {
        callback(this.cache.get(cacheKey));
        return;
      }
      
      try {
        const result = await this.performCompatibilityCheck(componentIds);
        this.cache.set(cacheKey, result);
        callback(result);
      } catch (error) {
        callback({ error: error.message });
      }
    }, 300);
  }
  
  async performCompatibilityCheck(componentIds) {
    const response = await fetch(`${this.apiUrl}/validate-build/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        component_ids: componentIds
      })
    });
    
    return response.json();
  }
  
  getCacheKey(componentIds) {
    return componentIds.sort().join('-');
  }
}

// Usage with React
const useRealTimeCompatibility = (selectedComponentIds) => {
  const [compatibility, setCompatibility] = useState(null);
  const [loading, setLoading] = useState(false);
  const checker = useRef(new RealTimeCompatibilityChecker('/api/compatibility'));
  
  useEffect(() => {
    if (selectedComponentIds.length > 1) {
      setLoading(true);
      checker.current.checkCompatibility(selectedComponentIds, (result) => {
        setCompatibility(result);
        setLoading(false);
      });
    }
  }, [selectedComponentIds]);
  
  return { compatibility, loading };
};
```

## Performance Optimization Tips

### 1. Caching Strategy
```javascript
// Implement client-side caching for frequently requested combinations
const compatibilityCache = new Map();

const getCachedCompatibility = (selectedComponentIds, targetTypes) => {
  const key = `${selectedComponentIds.sort().join('-')}-${targetTypes.join(',')}`;
  return compatibilityCache.get(key);
};

const setCachedCompatibility = (selectedComponentIds, targetTypes, result) => {
  const key = `${selectedComponentIds.sort().join('-')}-${targetTypes.join(',')}`;
  compatibilityCache.set(key, result);
  
  // Implement cache expiration
  setTimeout(() => compatibilityCache.delete(key), 300000); // 5 minutes
};
```

### 2. Batch Component Loading
```javascript
// Load component details in batches to reduce API calls
const loadComponentDetails = async (componentIds) => {
  const response = await fetch('/api/components/batch/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ component_ids: componentIds })
  });
  
  return response.json();
};
```

### 3. Incremental Compatibility Checking
```javascript
// Check compatibility incrementally as user adds components
class IncrementalCompatibilityChecker {
  constructor() {
    this.selectedComponents = [];
    this.compatibilityCache = new Map();
  }
  
  async addComponent(componentId) {
    // Check compatibility with existing components
    if (this.selectedComponents.length > 0) {
      const validation = await this.validateBuild([...this.selectedComponents, componentId]);
      
      if (!validation.is_valid) {
        return { success: false, issues: validation.issues };
      }
    }
    
    this.selectedComponents.push(componentId);
    return { success: true };
  }
  
  async findCompatibleForNext(targetTypes) {
    return await this.findCompatibleComponents(this.selectedComponents, targetTypes);
  }
  
  async validateBuild(componentIds) {
    const cacheKey = componentIds.sort().join('-');
    
    if (this.compatibilityCache.has(cacheKey)) {
      return this.compatibilityCache.get(cacheKey);
    }
    
    const response = await fetch('/api/compatibility/validate-build/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ component_ids: componentIds })
    });
    
    const result = await response.json();
    this.compatibilityCache.set(cacheKey, result);
    
    return result;
  }
}
```