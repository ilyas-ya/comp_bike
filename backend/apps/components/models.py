from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

COMPONENT_CATEGORIES = [
    ('bottom_bracket', 'Bottom Bracket & Crankset'),
    ('cassette_derailleur', 'Cassette & Derailleur'),
    ('brake_system', 'Brake System'),
    ('wheel_frame', 'Wheel & Frame Interface'),
    ('seatpost', 'Seatpost & Frame'),
]

class Component(models.Model):
    """Individual bike components with specifications"""
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=50, choices=COMPONENT_CATEGORIES)
    specifications = models.JSONField(default=dict)
    price_range = models.CharField(max_length=50, null=True, blank=True)
    image = models.ImageField(upload_to='components/', null=True, blank=True)
    description = models.TextField(blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['brand', 'name']
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['brand']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"{self.brand} {self.name}"

class Adapter(models.Model):
    """Adapters that can make incompatible components work together"""
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    description = models.TextField()
    price_range = models.CharField(max_length=50, null=True, blank=True)
    image = models.ImageField(upload_to='adapters/', null=True, blank=True)
    
    # What it connects
    from_specification = models.JSONField()
    to_specification = models.JSONField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.brand} {self.name}"