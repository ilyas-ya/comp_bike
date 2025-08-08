"""
Graph-based compatibility engine for bicycle components
"""

from typing import List, Dict, Set, Tuple, Optional
from dataclasses import dataclass
from enum import Enum
import networkx as nx
from django.db import models
from ..models import CompatibilityLink
from apps.components.models import Component

class CompatibilityStatus(Enum):
    COMPATIBLE = "compatible"
    COMPATIBLE_WITH_ADAPTER = "compatible_with_adapter"
    NOT_COMPATIBLE = "not_compatible"
    UNKNOWN = "unknown"

@dataclass
class CompatibilityPath:
    """Represents a path between two components in the compatibility graph"""
    source_component: Component
    target_component: Component
    path_components: List[Component]
    compatibility_links: List[CompatibilityLink]
    overall_status: CompatibilityStatus
    confidence_score: float
    required_adapters: List[str]
    explanation: str

class GraphCompatibilityEngine:
    """
    Main compatibility engine using graph traversal algorithms
    """
    
    def __init__(self):
        self.graph = None
        self._build_compatibility_graph()
    
    def _build_compatibility_graph(self):
        """Build NetworkX graph from database"""
        self.graph = nx.DiGraph()
        
        # Add all components as nodes
        components = Component.objects.all()
        for component in components:
            self.graph.add_node(
                str(component.id),
                component=component,
                brand=component.brand,
                model=component.model,
                type=component.type,
                speed=component.speed,
                specs=component.specs
            )
        
        # Add compatibility links as edges
        links = CompatibilityLink.objects.select_related('source', 'target').all()
        for link in links:
            self.graph.add_edge(
                str(link.source_id),
                str(link.target_id),
                link=link,
                status=link.status,
                adapter_required=link.adapter_required,
                weight=self._calculate_edge_weight(link)
            )
    
    def _calculate_edge_weight(self, link: CompatibilityLink) -> float:
        """Calculate edge weight based on compatibility status"""
        weights = {
            'compatible': 1.0,
            'compatible_with_adapter': 2.0,
            'not_compatible': float('inf')
        }
        return weights.get(link.status, 10.0)
    
    def check_direct_compatibility(self, component_a: Component, component_b: Component) -> CompatibilityPath:
        """Check direct compatibility between two components"""
        node_a = str(component_a.id)
        node_b = str(component_b.id)
        
        # Check if direct edge exists
        if self.graph.has_edge(node_a, node_b):
            edge_data = self.graph[node_a][node_b]
            link = edge_data['link']
            
            return CompatibilityPath(
                source_component=component_a,
                target_component=component_b,
                path_components=[component_a, component_b],
                compatibility_links=[link],
                overall_status=CompatibilityStatus(link.status),
                confidence_score=0.95,
                required_adapters=[] if not link.adapter_required else [link.notes],
                explanation=link.notes or f"Direct compatibility: {link.status}"
            )
        
        # Check reverse direction
        if self.graph.has_edge(node_b, node_a):
            edge_data = self.graph[node_b][node_a]
            link = edge_data['link']
            
            return CompatibilityPath(
                source_component=component_a,
                target_component=component_b,
                path_components=[component_a, component_b],
                compatibility_links=[link],
                overall_status=CompatibilityStatus(link.status),
                confidence_score=0.95,
                required_adapters=[] if not link.adapter_required else [link.notes],
                explanation=link.notes or f"Direct compatibility (reverse): {link.status}"
            )
        
        # No direct compatibility found
        return self._check_indirect_compatibility(component_a, component_b)
    
    def _check_indirect_compatibility(self, component_a: Component, component_b: Component) -> CompatibilityPath:
        """Check indirect compatibility through intermediate components"""
        node_a = str(component_a.id)
        node_b = str(component_b.id)
        
        try:
            # Find shortest path
            path = nx.shortest_path(self.graph, node_a, node_b, weight='weight')
            
            if len(path) <= 3:  # Allow one intermediate component
                path_components = [Component.objects.get(id=node_id) for node_id in path]
                compatibility_links = []
                required_adapters = []
                overall_status = CompatibilityStatus.COMPATIBLE
                
                # Analyze each edge in the path
                for i in range(len(path) - 1):
                    edge_data = self.graph[path[i]][path[i + 1]]
                    link = edge_data['link']
                    compatibility_links.append(link)
                    
                    if link.adapter_required:
                        required_adapters.append(link.notes)
                    
                    if link.status == 'compatible_with_adapter':
                        overall_status = CompatibilityStatus.COMPATIBLE_WITH_ADAPTER
                    elif link.status == 'not_compatible':
                        overall_status = CompatibilityStatus.NOT_COMPATIBLE
                        break
                
                return CompatibilityPath(
                    source_component=component_a,
                    target_component=component_b,
                    path_components=path_components,
                    compatibility_links=compatibility_links,
                    overall_status=overall_status,
                    confidence_score=0.8 - (len(path) - 2) * 0.1,  # Lower confidence for longer paths
                    required_adapters=required_adapters,
                    explanation=f"Indirect compatibility through {len(path) - 2} intermediate component(s)"
                )
        
        except nx.NetworkXNoPath:
            pass
        
        # No path found, use specification-based inference
        return self._infer_compatibility_from_specs(component_a, component_b)
    
    def _infer_compatibility_from_specs(self, component_a: Component, component_b: Component) -> CompatibilityPath:
        """Infer compatibility based on component specifications"""
        # This would implement the existing specification-based logic
        # as a fallback when no graph path exists
        
        return CompatibilityPath(
            source_component=component_a,
            target_component=component_b,
            path_components=[component_a, component_b],
            compatibility_links=[],
            overall_status=CompatibilityStatus.UNKNOWN,
            confidence_score=0.5,
            required_adapters=[],
            explanation="No compatibility data available - manual verification recommended"
        )
    
    def find_compatible_components(self, component: Component, component_type: str = None) -> List[CompatibilityPath]:
        """Find all components compatible with the given component"""
        node_id = str(component.id)
        compatible_paths = []
        
        # Get all outgoing edges (components this one is compatible with)
        for neighbor_id in self.graph.neighbors(node_id):
            neighbor_component = Component.objects.get(id=neighbor_id)
            
            # Filter by component type if specified
            if component_type and neighbor_component.type != component_type:
                continue
            
            compatibility_path = self.check_direct_compatibility(component, neighbor_component)
            if compatibility_path.overall_status in [CompatibilityStatus.COMPATIBLE, CompatibilityStatus.COMPATIBLE_WITH_ADAPTER]:
                compatible_paths.append(compatibility_path)
        
        # Also check incoming edges (components compatible with this one)
        for predecessor_id in self.graph.predecessors(node_id):
            predecessor_component = Component.objects.get(id=predecessor_id)
            
            if component_type and predecessor_component.type != component_type:
                continue
            
            compatibility_path = self.check_direct_compatibility(predecessor_component, component)
            if compatibility_path.overall_status in [CompatibilityStatus.COMPATIBLE, CompatibilityStatus.COMPATIBLE_WITH_ADAPTER]:
                compatible_paths.append(compatibility_path)
        
        return compatible_paths
    
    def build_compatibility_matrix(self, components: List[Component]) -> Dict[Tuple[str, str], CompatibilityPath]:
        """Build a compatibility matrix for a set of components"""
        matrix = {}
        
        for i, comp_a in enumerate(components):
            for j, comp_b in enumerate(components):
                if i != j:  # Don't check component against itself
                    key = (str(comp_a.id), str(comp_b.id))
                    matrix[key] = self.check_direct_compatibility(comp_a, comp_b)
        
        return matrix
    
    def suggest_complete_build(self, frame: Component, preferences: Dict = None) -> Dict[str, List[CompatibilityPath]]:
        """Suggest a complete bike build based on a frame"""
        suggestions = {
            'crankset': [],
            'cassette': [],
            'derailleur': [],
            'brakes': []
        }
        
        for component_type in suggestions.keys():
            compatible_components = self.find_compatible_components(frame, component_type)
            
            # Sort by compatibility score and preference matching
            compatible_components.sort(
                key=lambda x: (
                    x.overall_status == CompatibilityStatus.COMPATIBLE,
                    x.confidence_score,
                    -len(x.required_adapters)
                ),
                reverse=True
            )
            
            suggestions[component_type] = compatible_components[:10]  # Top 10 suggestions
        
        return suggestions
    
    def refresh_graph(self):
        """Refresh the graph with latest database data"""
        self._build_compatibility_graph()