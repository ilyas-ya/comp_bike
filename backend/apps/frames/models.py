import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Note: Frames are now integrated as Components with type='frame'
# This model is kept for specific frame metadata only

FRAME_TYPES = [
    ('road', 'Road'),
    ('mountain', 'Mountain'),
    ('gravel', 'Gravel'),
    ('cyclocross', 'Cyclocross'),
    ('hybrid', 'Hybrid'),
    ('bmx', 'BMX'),
    ('track', 'Track'),
]

class FrameMetadata(models.Model):
    """Additional frame-specific metadata - Links to Component with type='frame'"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    component = models.OneToOneField(
        'components.Component', 
        on_delete=models.CASCADE,
        limit_choices_to={'type': 'frame'},
        related_name='frame_metadata'
    )
    
    frame_type = models.CharField(max_length=20, choices=FRAME_TYPES)
    year = models.IntegerField(
        validators=[MinValueValidator(1980), MaxValueValidator(2030)]
    )
    
    # Frame-specific specifications stored in component.specs
    # Additional metadata can be stored here if needed
    description = models.TextField(blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['component__brand', 'component__model', 'year']
        
    def __str__(self):
        return f"{self.component} ({self.year}) - {self.get_frame_type_display()}"