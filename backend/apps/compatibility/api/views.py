"""
Compatibility API Views
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
import logging

from apps.components.models import Component
from apps.components.serializers import ComponentSerializer
from ..engines.graph_engine import GraphCompatibilityEngine, CompatibilityStatus

logger = logging.getLogger(__name__)

class CompatibilityView(APIView):
    """
    Find compatible components by parsing the graph database
    """
    
    def __init__(self):
        super().__init__()
        self.graph_engine = GraphCompatibilityEngine()
    
    def post(self, request):
        """
        Find compatible components for user's selection
        
        Request body:
        {
            "selected_components": [123, 456, 789],
            "target_component_types": ["derailleur", "brakes"]
        }
        """
        try:
            selected_component_ids = request.data.get('selected_components', [])
            target_types = request.data.get('target_component_types', [])
            
            if not selected_component_ids:
                return Response(
                    {"error": "At least one component must be selected"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Load selected components
            selected_components = Component.objects.filter(id__in=selected_component_ids)
            
            if not selected_components.exists():
                return Response(
                    {"error": "No valid components found"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Find compatible components for each target type
            results = {}
            
            for target_type in target_types:
                compatible_components = []
                
                # Get all components of target type
                target_components = Component.objects.filter(type=target_type)
                
                for target_component in target_components:
                    is_compatible = True
                    compatibility_info = []
                    
                    # Check compatibility with each selected component
                    for selected_component in selected_components:
                        compatibility_path = self.graph_engine.check_direct_compatibility(
                            selected_component, target_component
                        )
                        
                        if compatibility_path.overall_status == CompatibilityStatus.NOT_COMPATIBLE:
                            is_compatible = False
                            break
                        elif compatibility_path.overall_status in [
                            CompatibilityStatus.COMPATIBLE, 
                            CompatibilityStatus.COMPATIBLE_WITH_ADAPTER
                        ]:
                            compatibility_info.append({
                                'with_component': selected_component.id,
                                'status': compatibility_path.overall_status.value,
                                'adapters_required': compatibility_path.required_adapters,
                                'explanation': compatibility_path.explanation
                            })
                    
                    if is_compatible:
                        compatible_components.append({
                            'component': ComponentSerializer(target_component).data,
                            'compatibility_details': compatibility_info
                        })
                
                results[target_type] = compatible_components
            
            return Response({
                'results': results,
                'selected_components': ComponentSerializer(selected_components, many=True).data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Error in compatibility API: {str(e)}")
            return Response(
                {"error": "Internal server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class BuildValidationView(APIView):
    """
    Validate a complete bike build for compatibility issues
    """
    
    def __init__(self):
        super().__init__()
        self.graph_engine = GraphCompatibilityEngine()
    
    def post(self, request):
        """
        Validate complete build compatibility
        
        Request body:
        {
            "component_ids": [123, 456, 789, 101, 112]
        }
        """
        try:
            component_ids = request.data.get('component_ids', [])
            
            if len(component_ids) < 2:
                return Response(
                    {"error": "At least two components required for validation"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Load components
            components = Component.objects.filter(id__in=component_ids)
            
            if not components.exists():
                return Response(
                    {"error": "No valid components found"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check all pairwise compatibilities
            compatibility_matrix = {}
            issues = []
            
            components_list = list(components)
            for i, comp_a in enumerate(components_list):
                for j, comp_b in enumerate(components_list):
                    if i < j:  # Avoid duplicate checks
                        compatibility_path = self.graph_engine.check_direct_compatibility(comp_a, comp_b)
                        
                        key = f"{comp_a.id}-{comp_b.id}"
                        compatibility_matrix[key] = {
                            'component_a': ComponentSerializer(comp_a).data,
                            'component_b': ComponentSerializer(comp_b).data,
                            'status': compatibility_path.overall_status.value,
                            'adapters_required': compatibility_path.required_adapters,
                            'explanation': compatibility_path.explanation
                        }
                        
                        if compatibility_path.overall_status == CompatibilityStatus.NOT_COMPATIBLE:
                            issues.append({
                                'component_a_id': comp_a.id,
                                'component_b_id': comp_b.id,
                                'issue': compatibility_path.explanation
                            })
            
            return Response({
                'is_valid': len(issues) == 0,
                'compatibility_matrix': compatibility_matrix,
                'issues': issues,
                'components': ComponentSerializer(components, many=True).data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Error in build validation API: {str(e)}")
            return Response(
                {"error": "Internal server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )