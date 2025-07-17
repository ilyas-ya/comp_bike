from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.standards.models import Standard

FRAME_TYPES = [
    ('road', 'Road'),
    ('mountain', 'Mountain'),
    ('gravel', 'Gravel'),
    ('cyclocross', 'Cyclocross'),
    ('hybrid', 'Hybrid'),
    ('bmx', 'BMX'),
    ('track', 'Track'),
]

class Frame(models.Model):
    """Bike frame specifications and compatibility"""
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField(
        validators=[MinValueValidator(1980), MaxValueValidator(2030)]
    )
    frame_type = models.CharField(max_length=20, choices=FRAME_TYPES)
    
    # Standards relationships
    bottom_bracket_standard = models.ForeignKey(
        Standard, 
        on_delete=models.PROTECT, 
        related_name='frames_bb',
        limit_choices_to={'category': 'bottom_bracket'}
    )
    rear_axle_standard = models.ForeignKey(
        Standard, 
        on_delete=models.PROTECT, 
        related_name='frames_rear_axle',
        limit_choices_to={'category': 'axle'}
    )
    front_axle_standard = models.ForeignKey(
        Standard, 
        on_delete=models.PROTECT, 
        related_name='frames_front_axle',
        limit_choices_to={'category': 'axle'}
    )
    brake_mount_standard = models.ForeignKey(
        Standard, 
        on_delete=models.PROTECT, 
        related_name='frames_brake',
        limit_choices_to={'category': 'brake_mount'}
    )
    headtube_standard = models.ForeignKey(
        Standard, 
        on_delete=models.PROTECT, 
        related_name='frames_headtube',
        limit_choices_to={'category': 'headtube'}
    )
    
    # Direct measurements
    seatpost_diameter = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        help_text="Seatpost diameter in mm"
    )
    
    # Additional specifications
    specifications = models.JSONField(default=dict)
    image = models.ImageField(upload_to='frames/', null=True, blank=True)
    description = models.TextField(blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['brand', 'model', 'year']
        unique_together = ['brand', 'model', 'year']
        indexes = [
            models.Index(fields=['brand']),
            models.Index(fields=['frame_type']),
            models.Index(fields=['year']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"