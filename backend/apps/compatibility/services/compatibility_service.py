"""
Simple Compatibility Service - Just parse the graph database
"""

from typing import List
import logging

from apps.components.models import Component
from ..engines.graph_engine import GraphCompatibilityEngine, CompatibilityStatus

logger = logging.getLogger(__name__)

class CompatibilityService:
    """
    Simple compatibility service that just queries the graph database
    """
    
    def __init__(self):
        self.graph_engine = GraphCompatibilityEngine()
    
    def find_compatible_components(self, selected_component_ids: List[int], target_component_types: List[str]) -> dict:
        """
        Find components compatible with all selected components
        
        Args:
            selected_component_ids: List of component IDs already selected
            target_component_types: List of component types to find compatibility for
            
        Returns:
            Dictionary with compatible components for each target type
        """
        
        # Load selected components
        selected_components = Component.objects.filter(id__in=selected_component_ids)
        
        if not selected_components.exists():
            return {"error": "No valid selected components found"}
        
        results = {}
        
        for target_type in target_component_types:
            compatible_components = []
            
            # Get all components of the target type
            target_components = Component.objects.filter(type=target_type)
            
            for target_component in target_components:
                is_compatible_with_all = True
                compatibility_details = []
                
                # Check compatibility with each selected component
                for selected_component in selected_components:
                    compatibility_path = self.graph_engine.check_direct_compatibility(
                        selected_component, target_component
                    )
                    
                    # If not compatible with any selected component, skip this target
                    if compatibility_path.overall_status == CompatibilityStatus.NOT_COMPATIBLE:
                        is_compatible_with_all = False
                        break
                    
                    # If compatible or compatible with adapter, add details
                    if compatibility_path.overall_status in [
                        CompatibilityStatus.COMPATIBLE, 
                        CompatibilityStatus.COMPATIBLE_WITH_ADAPTER
                    ]:
                        compatibility_details.append({
                            'with_component_id': selected_component.id,
                            'status': compatibility_path.overall_status.value,
                            'adapters_required': compatibility_path.required_adapters,
                            'explanation': compatibility_path.explanation
                        })
                
                # If compatible with all selected components, add to results
                if is_compatible_with_all and compatibility_details:
                    compatible_components.append({
                        'id': target_component.id,
                        'brand': target_component.brand,
                        'model': target_component.model,
                        'type': target_component.type,
                        'speed': target_component.speed,
                        'price': target_component.price,
                        'compatibility_details': compatibility_details
                    })
            
            results[target_type] = compatible_components
        
        return results
    
    def validate_build_compatibility(self, component_ids: List[int]) -> dict:
        """
        Validate compatibility between all components in a build
        
        Args:
            component_ids: List of component IDs in the build
            
        Returns:
            Validation results with compatibility matrix and issues
        """
        
        # Load components
        components = Component.objects.filter(id__in=component_ids)
        
        if len(components) < 2:
            return {"error": "At least 2 components required for validation"}
        
        compatibility_matrix = {}
        issues = []
        
        components_list = list(components)
        
        # Check all pairwise compatibilities
        for i, comp_a in enumerate(components_list):
            for j, comp_b in enumerate(components_list):
                if i < j:  # Avoid duplicate checks
                    compatibility_path = self.graph_engine.check_direct_compatibility(comp_a, comp_b)
                    
                    key = f"{comp_a.id}-{comp_b.id}"
                    compatibility_matrix[key] = {
                        'component_a': {
                            'id': comp_a.id,
                            'brand': comp_a.brand,
                            'model': comp_a.model,
                            'type': comp_a.type
                        },
                        'component_b': {
                            'id': comp_b.id,
                            'brand': comp_b.brand,
                            'model': comp_b.model,
                            'type': comp_b.type
                        },
                        'status': compatibility_path.overall_status.value,
                        'adapters_required': compatibility_path.required_adapters,
                        'explanation': compatibility_path.explanation
                    }
                    
                    # Track incompatible pairs
                    if compatibility_path.overall_status == CompatibilityStatus.NOT_COMPATIBLE:
                        issues.append({
                            'component_a_id': comp_a.id,
                            'component_b_id': comp_b.id,
                            'component_a_name': f"{comp_a.brand} {comp_a.model}",
                            'component_b_name': f"{comp_b.brand} {comp_b.model}",
                            'issue': compatibility_path.explanation
                        })
        
        return {
            'is_valid': len(issues) == 0,
            'compatibility_matrix': compatibility_matrix,
            'issues': issues,
            'total_components': len(components),
            'total_compatibility_checks': len(compatibility_matrix)
        }