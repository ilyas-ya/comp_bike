from typing import Dict, List, Any
from django.db import models
from .models import CompatibilityRule
from apps.components.models import Component, Adapter

class CompatibilityService:
    """Service for checking component compatibility"""
    
    def check_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """
        Check compatibility between two components
        Returns a dictionary with status, confidence, explanation, and optional adapters
        """
        # First check for explicit compatibility rules
        explicit_rule = self._get_explicit_rule(component_a, component_b)
        if explicit_rule:
            return self._format_explicit_result(explicit_rule)
        
        # If no explicit rule, use specification-based checking
        return self._check_specification_compatibility(component_a, component_b)
    
    def _get_explicit_rule(self, component_a: Component, component_b: Component) -> CompatibilityRule:
        """Get explicit compatibility rule between two components"""
        # Check both directions (A->B and B->A)
        rule = CompatibilityRule.objects.filter(
            is_active=True
        ).filter(
            models.Q(component_a=component_a, component_b=component_b) |
            models.Q(component_a=component_b, component_b=component_a)
        ).first()
        
        return rule
    
    def _format_explicit_result(self, rule: CompatibilityRule) -> Dict[str, Any]:
        """Format explicit rule result"""
        result = {
            'status': rule.status,
            'confidence': float(rule.confidence),
            'explanation': rule.explanation,
        }
        
        if rule.required_adapters.exists():
            result['required_adapters'] = [
                {
                    'id': adapter.id,
                    'name': adapter.name,
                    'brand': adapter.brand,
                    'description': adapter.description,
                    'price_range': adapter.price_range
                }
                for adapter in rule.required_adapters.all()
            ]
        
        return result
    
    def _check_specification_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """Check compatibility based on component specifications"""
        
        # Get category-specific compatibility checker
        if component_a.category == component_b.category:
            return self._check_same_category_compatibility(component_a, component_b)
        else:
            return self._check_cross_category_compatibility(component_a, component_b)
    
    def _check_same_category_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """Check compatibility between components of the same category"""
        category = component_a.category
        
        if category == 'bottom_bracket':
            return self._check_bottom_bracket_compatibility(component_a, component_b)
        elif category == 'cassette_derailleur':
            return self._check_cassette_derailleur_compatibility(component_a, component_b)
        elif category == 'brake_system':
            return self._check_brake_system_compatibility(component_a, component_b)
        elif category == 'wheel_frame':
            return self._check_wheel_frame_compatibility(component_a, component_b)
        elif category == 'seatpost':
            return self._check_seatpost_compatibility(component_a, component_b)
        else:
            return {
                'status': 'conditional',
                'confidence': 0.5,
                'explanation': 'Compatibility checking not yet implemented for this category'
            }
    
    def _check_cross_category_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """Check compatibility between components of different categories"""
        # This is where the main compatibility logic would go
        # For now, return a basic implementation
        
        compatible_pairs = [
            ('bottom_bracket', 'cassette_derailleur'),
            ('brake_system', 'wheel_frame'),
            ('wheel_frame', 'cassette_derailleur'),
        ]
        
        pair = (component_a.category, component_b.category)
        reverse_pair = (component_b.category, component_a.category)
        
        if pair in compatible_pairs or reverse_pair in compatible_pairs:
            return {
                'status': 'conditional',
                'confidence': 0.7,
                'explanation': 'These components may be compatible depending on specific specifications. Manual verification recommended.'
            }
        else:
            return {
                'status': 'incompatible',
                'confidence': 0.9,
                'explanation': 'These component categories are not typically used together.'
            }
    
    def _check_bottom_bracket_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """Check bottom bracket compatibility"""
        spec_a = component_a.specifications
        spec_b = component_b.specifications
        
        # Check if standards match
        standard_a = spec_a.get('standard', '')
        standard_b = spec_b.get('standard', '')
        
        if standard_a and standard_b:
            if standard_a == standard_b:
                return {
                    'status': 'compatible',
                    'confidence': 0.95,
                    'explanation': f'Both components use {standard_a} standard'
                }
            else:
                return {
                    'status': 'incompatible',
                    'confidence': 0.9,
                    'explanation': f'Incompatible standards: {standard_a} vs {standard_b}'
                }
        
        return {
            'status': 'conditional',
            'confidence': 0.5,
            'explanation': 'Insufficient specification data to determine compatibility'
        }
    
    def _check_cassette_derailleur_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """Check cassette and derailleur compatibility"""
        spec_a = component_a.specifications
        spec_b = component_b.specifications
        
        # Check speed compatibility
        speed_a = spec_a.get('speed_count')
        speed_b = spec_b.get('speed_count')
        
        if speed_a and speed_b:
            if speed_a == speed_b:
                return {
                    'status': 'compatible',
                    'confidence': 0.9,
                    'explanation': f'Both components are {speed_a}-speed'
                }
            else:
                return {
                    'status': 'incompatible',
                    'confidence': 0.85,
                    'explanation': f'Speed mismatch: {speed_a}-speed vs {speed_b}-speed'
                }
        
        return {
            'status': 'conditional',
            'confidence': 0.6,
            'explanation': 'Speed compatibility cannot be determined from available data'
        }
    
    def _check_brake_system_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """Check brake system compatibility"""
        spec_a = component_a.specifications
        spec_b = component_b.specifications
        
        # Check brake type
        type_a = spec_a.get('type', '')
        type_b = spec_b.get('type', '')
        
        if type_a and type_b:
            if type_a == type_b:
                return {
                    'status': 'compatible',
                    'confidence': 0.8,
                    'explanation': f'Both are {type_a} brake systems'
                }
            else:
                return {
                    'status': 'incompatible',
                    'confidence': 0.9,
                    'explanation': f'Brake type mismatch: {type_a} vs {type_b}'
                }
        
        return {
            'status': 'conditional',
            'confidence': 0.5,
            'explanation': 'Brake type compatibility cannot be determined'
        }
    
    def _check_wheel_frame_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """Check wheel and frame interface compatibility"""
        spec_a = component_a.specifications
        spec_b = component_b.specifications
        
        # Check axle type
        axle_a = spec_a.get('axle_type', '')
        axle_b = spec_b.get('axle_type', '')
        
        if axle_a and axle_b:
            if axle_a == axle_b:
                return {
                    'status': 'compatible',
                    'confidence': 0.9,
                    'explanation': f'Both use {axle_a} axle standard'
                }
            else:
                return {
                    'status': 'incompatible',
                    'confidence': 0.85,
                    'explanation': f'Axle type mismatch: {axle_a} vs {axle_b}'
                }
        
        return {
            'status': 'conditional',
            'confidence': 0.6,
            'explanation': 'Axle compatibility cannot be determined from available data'
        }
    
    def _check_seatpost_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """Check seatpost compatibility"""
        spec_a = component_a.specifications
        spec_b = component_b.specifications
        
        # Check diameter
        diameter_a = spec_a.get('diameter')
        diameter_b = spec_b.get('diameter')
        
        if diameter_a and diameter_b:
            if abs(float(diameter_a) - float(diameter_b)) < 0.1:  # Within 0.1mm tolerance
                return {
                    'status': 'compatible',
                    'confidence': 0.95,
                    'explanation': f'Matching diameter: {diameter_a}mm'
                }
            else:
                return {
                    'status': 'incompatible',
                    'confidence': 0.9,
                    'explanation': f'Diameter mismatch: {diameter_a}mm vs {diameter_b}mm'
                }
        
        return {
            'status': 'conditional',
            'confidence': 0.5,
            'explanation': 'Diameter information not available for comparison'
        }