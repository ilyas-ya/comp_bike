import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Types de composants basés sur le schéma init.sql
COMPONENT_TYPES = [
    ('crankset', 'Crankset'),
    ('cassette', 'Cassette'),
    ('derailleur', 'Derailleur'),
    ('brakes', 'Brakes'),
    ('frame', 'Frame'),
    ('shifter', 'Shifter'),
    ('chain', 'Chain'),
    ('wheel', 'Wheel'),
]

class Component(models.Model):
    """Individual bike components - Node-based model with UUID"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    type = models.CharField(max_length=50, choices=COMPONENT_TYPES)
    speed = models.IntegerField(null=True, blank=True, help_text="e.g., 11, 12 for speed count")
    specs = models.JSONField(default=dict, help_text="JSON specifications for compatibility")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'components_component'  # Table name from init.sql
        ordering = ['brand', 'model']
        unique_together = ['brand', 'model', 'type']  # Constraint from init.sql
        indexes = [
            models.Index(fields=['brand']),
            models.Index(fields=['type']),
            models.Index(fields=['speed']),
            # GIN index pour specs sera créé via migration custom
        ]
    
    def __str__(self):
        return f"{self.brand} {self.model} ({self.get_type_display()})"

# Types de compatibilité basés sur le schéma init.sql
COMPATIBILITY_LINK_TYPES = [
    ('cassette_driver', 'Cassette to Driver Body'),
    ('shifter_derailleur', 'Shifter to Derailleur'),
    ('derailleur_cassette', 'Derailleur to Cassette'),
    ('brake_lever', 'Brake to Lever'),
    ('crankset_bb', 'Crankset to Bottom Bracket'),
    ('chain_cassette', 'Chain to Cassette'),
    ('wheel_frame', 'Wheel to Frame'),
]

COMPATIBILITY_STATUSES = [
    ('compatible', 'Compatible'),
    ('compatible_with_adapter', 'Compatible with Adapter'),
    ('not_compatible', 'Not Compatible'),
]

class CompatibilityLink(models.Model):
    """Compatibility links between components - Edge-based model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='outgoing_links')
    target = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='incoming_links')
    type = models.CharField(max_length=50, choices=COMPATIBILITY_LINK_TYPES)
    status = models.CharField(max_length=30, choices=COMPATIBILITY_STATUSES)
    adapter_required = models.BooleanField(default=False)
    notes = models.TextField(blank=True, default='')
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'compatibility_link'  # Table name from init.sql
        unique_together = ['source', 'target', 'type']  # Constraint from init.sql
        indexes = [
            models.Index(fields=['source']),
            models.Index(fields=['target']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return f"{self.source} -> {self.target} ({self.get_type_display()}): {self.get_status_display()}"