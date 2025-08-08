"""
Tests for Simple Compatibility API
"""

import json
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from apps.components.models import Component
from ..models import CompatibilityLink

class CompatibilityAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create test components
        self.frame = Component.objects.create(
            brand="Trek",
            model="Emonda SL6",
            type="frame",
            speed=None,
            price=2000.00,
            specs={
                "bottom_bracket_standard": "BSA",
                "brake_mount_standard": "flat_mount"
            }
        )
        
        self.crankset = Component.objects.create(
            brand="Shimano",
            model="105 R7000",
            type="crankset",
            speed=11,
            price=150.00,
            specs={
                "spindle_type": "Hollowtech II"
            }
        )
        
        self.derailleur_compatible = Component.objects.create(
            brand="Shimano",
            model="105 R7000 RD",
            type="derailleur",
            speed=11,
            price=89.99,
            specs={
                "max_cog_size": "32"
            }
        )
        
        self.derailleur_incompatible = Component.objects.create(
            brand="SRAM",
            model="Rival 12-speed",
            type="derailleur",
            speed=12,
            price=120.00,
            specs={
                "max_cog_size": "36"
            }
        )
        
        # Create compatibility links
        CompatibilityLink.objects.create(
            source=self.frame,
            target=self.crankset,
            status="compatible",
            adapter_required=False,
            notes="BSA bottom bracket compatible with Hollowtech II"
        )
        
        CompatibilityLink.objects.create(
            source=self.crankset,
            target=self.derailleur_compatible,
            status="compatible",
            adapter_required=False,
            notes="Both 11-speed components"
        )
        
        CompatibilityLink.objects.create(
            source=self.crankset,
            target=self.derailleur_incompatible,
            status="not_compatible",
            adapter_required=False,
            notes="Speed mismatch: 11-speed vs 12-speed"
        )
    
    def test_find_compatible_components_basic(self):
        """Test basic find compatible components functionality"""
        url = reverse('find-compatible')
        data = {
            "selected_components": [self.crankset.id],
            "target_component_types": ["derailleur"]
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertIn('derailleur', response.data['results'])
        
        # Should find the compatible derailleur but not the incompatible one
        derailleur_results = response.data['results']['derailleur']
        
        compatible_ids = [comp['id'] for comp in derailleur_results]
        self.assertIn(self.derailleur_compatible.id, compatible_ids)
        self.assertNotIn(self.derailleur_incompatible.id, compatible_ids)
    
    def test_find_compatible_multiple_selected(self):
        """Test finding components compatible with multiple selected components"""
        url = reverse('find-compatible')
        data = {
            "selected_components": [self.frame.id, self.crankset.id],
            "target_component_types": ["derailleur"]
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Should only return derailleurs compatible with both frame and crankset
        derailleur_results = response.data['results']['derailleur']
        
        for derailleur in derailleur_results:
            # Each derailleur should have compatibility details with both components
            compatibility_details = derailleur['compatibility_details']
            component_ids = [detail['with_component_id'] for detail in compatibility_details]
            
            # Should be compatible with both selected components
            self.assertIn(self.frame.id, component_ids)
            self.assertIn(self.crankset.id, component_ids)
    
    def test_build_validation(self):
        """Test build validation functionality"""
        url = reverse('validate-build')
        data = {
            "component_ids": [
                self.frame.id,
                self.crankset.id,
                self.derailleur_compatible.id
            ]
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('is_valid', response.data)
        self.assertIn('compatibility_matrix', response.data)
        self.assertIn('issues', response.data)
        
        # This build should be valid (all components are compatible)
        self.assertTrue(response.data['is_valid'])
        self.assertEqual(len(response.data['issues']), 0)
    
    def test_build_validation_with_incompatible_components(self):
        """Test build validation with incompatible components"""
        url = reverse('validate-build')
        data = {
            "component_ids": [
                self.crankset.id,
                self.derailleur_incompatible.id
            ]
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # This build should be invalid (incompatible components)
        self.assertFalse(response.data['is_valid'])
        self.assertGreater(len(response.data['issues']), 0)
        
        # Check that the incompatibility issue is reported
        issue = response.data['issues'][0]
        self.assertIn(self.crankset.id, [issue['component_a_id'], issue['component_b_id']])
        self.assertIn(self.derailleur_incompatible.id, [issue['component_a_id'], issue['component_b_id']])
    
    def test_empty_selected_components(self):
        """Test error handling for empty selected components"""
        url = reverse('find-compatible')
        data = {
            "selected_components": [],
            "target_component_types": ["derailleur"]
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
    
    def test_invalid_component_ids(self):
        """Test error handling for invalid component IDs"""
        url = reverse('find-compatible')
        data = {
            "selected_components": [99999],  # Non-existent ID
            "target_component_types": ["derailleur"]
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
    
    def test_compatibility_details_structure(self):
        """Test that compatibility details have correct structure"""
        url = reverse('find-compatible')
        data = {
            "selected_components": [self.crankset.id],
            "target_component_types": ["derailleur"]
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        derailleur_results = response.data['results']['derailleur']
        
        if derailleur_results:
            derailleur = derailleur_results[0]
            
            # Check component structure
            self.assertIn('id', derailleur)
            self.assertIn('brand', derailleur)
            self.assertIn('model', derailleur)
            self.assertIn('type', derailleur)
            self.assertIn('compatibility_details', derailleur)
            
            # Check compatibility details structure
            if derailleur['compatibility_details']:
                detail = derailleur['compatibility_details'][0]
                self.assertIn('with_component_id', detail)
                self.assertIn('status', detail)
                self.assertIn('adapters_required', detail)
                self.assertIn('explanation', detail)

class CompatibilityServiceTest(TestCase):
    """Test the core compatibility service logic"""
    
    def setUp(self):
        # Create test components
        self.component_a = Component.objects.create(
            brand="Test Brand A",
            model="Model A",
            type="crankset",
            speed=11,
            price=100.00
        )
        
        self.component_b = Component.objects.create(
            brand="Test Brand B",
            model="Model B",
            type="derailleur",
            speed=11,
            price=80.00
        )
        
        # Create compatibility link
        CompatibilityLink.objects.create(
            source=self.component_a,
            target=self.component_b,
            status="compatible",
            adapter_required=False,
            notes="Test compatibility"
        )
    
    def test_graph_traversal_logic(self):
        """Test that graph traversal correctly identifies compatible components"""
        from ..services.compatibility_service import CompatibilityService
        
        service = CompatibilityService()
        results = service.find_compatible_components(
            selected_component_ids=[self.component_a.id],
            target_component_types=['derailleur']
        )
        
        self.assertIn('derailleur', results)
        derailleur_results = results['derailleur']
        
        # Should find the compatible component
        compatible_ids = [comp['id'] for comp in derailleur_results]
        self.assertIn(self.component_b.id, compatible_ids)