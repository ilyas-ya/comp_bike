from typing import Dict, List, Any
from django.db import models
from .models import CompatibilityRule
from apps.components.models import Component, CompatibilityLink

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
        
        # Check for basic compatibility links
        basic_link = self._get_basic_link(component_a, component_b)
        if basic_link:
            return self._format_basic_link_result(basic_link)
        
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
    
    def _get_basic_link(self, component_a: Component, component_b: Component) -> CompatibilityLink:
        """Get basic compatibility link between two components"""
        # Check both directions (source->target and target->source)
        link = CompatibilityLink.objects.filter(
            models.Q(source=component_a, target=component_b) |
            models.Q(source=component_b, target=component_a)
        ).first()
        
        return link
    
    def _format_explicit_result(self, rule: CompatibilityRule) -> Dict[str, Any]:
        """Format explicit rule result"""
        return {
            'status': rule.status,
            'confidence': float(rule.confidence),
            'explanation': rule.explanation,
            'source': 'explicit_rule',
            'rule_id': str(rule.id)
        }
    
    def _format_basic_link_result(self, link: CompatibilityLink) -> Dict[str, Any]:
        """Format basic link result"""
        status_mapping = {
            'compatible': 'compatible',
            'compatible_with_adapter': 'conditional',
            'not_compatible': 'incompatible'
        }
        
        return {
            'status': status_mapping.get(link.status, 'conditional'),
            'confidence': 0.8 if link.status == 'compatible' else 0.6,
            'explanation': link.notes or f"Basic compatibility link: {link.get_status_display()}",
            'adapter_required': link.adapter_required,
            'source': 'basic_link',
            'link_id': str(link.id)
        }
    
    def _check_specification_compatibility(self, component_a: Component, component_b: Component) -> Dict[str, Any]:
        """Check compatibility based on component specifications"""
        # Basic spec-based compatibility checking
        specs_a = component_a.specs or {}
        specs_b = component_b.specs or {}
        
        # Simple speed compatibility check
        if component_a.speed and component_b.speed:
            if component_a.speed == component_b.speed:
                return {
                    'status': 'compatible',
                    'confidence': 0.7,
                    'explanation': f"Both components have {component_a.speed} speed compatibility",
                    'source': 'spec_analysis'
                }
            else:
                return {
                    'status': 'incompatible',
                    'confidence': 0.8,
                    'explanation': f"Speed mismatch: {component_a.speed} vs {component_b.speed}",
                    'source': 'spec_analysis'
                }
        
        # Default uncertain result
        return {
            'status': 'conditional',
            'confidence': 0.3,
            'explanation': "Insufficient data for automated compatibility assessment",
            'source': 'default'
        }
