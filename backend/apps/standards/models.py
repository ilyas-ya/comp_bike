import uuid
from django.db import models

# Note: Standards are now integrated as metadata in Component.specs JSON field
# This model is kept for reference and can store standard definitions

STANDARD_CATEGORIES = [
    ('bottom_bracket', 'Bottom Bracket'),
    ('axle', 'Axle Standard'),
    ('brake_mount', 'Brake Mount'),
    ('headtube', 'Headtube'),
    ('seatpost', 'Seatpost'),
    ('cassette', 'Cassette'),
    ('chain', 'Chain'),
    ('driver_body', 'Driver Body'),
    ('mount_type', 'Mount Type'),
]

class StandardDefinition(models.Model):
    """Mechanical standards definitions - Referenced in Component.specs"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=50, choices=STANDARD_CATEGORIES)
    description = models.TextField()
    specifications = models.JSONField(default=dict)
    
    # Common measurements
    diameter = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    width = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    thread_pitch = models.CharField(max_length=20, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['category', 'name']
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"