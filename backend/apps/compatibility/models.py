import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.components.models import Component, CompatibilityLink

COMPATIBILITY_STATUS = [
    ('compatible', 'Compatible'),
    ('conditional', 'Conditional/Uncertain'),
    ('incompatible', 'Incompatible'),
]

class CompatibilityRule(models.Model):
    """Explicit compatibility rules between components - Enhanced version"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    component_a = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='compatibility_a')
    component_b = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='compatibility_b')
    
    status = models.CharField(max_length=20, choices=COMPATIBILITY_STATUS)
    confidence = models.DecimalField(
        max_digits=3, 
        decimal_places=2,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="Confidence level from 0.0 to 1.0"
    )
    explanation = models.TextField()
    
    # Link to the basic compatibility link if it exists
    base_link = models.ForeignKey(CompatibilityLink, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(max_length=50, default='system')  # 'system', 'admin', 'ai'
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ['component_a', 'component_b']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['confidence']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"{self.component_a} + {self.component_b}: {self.get_status_display()}"

class CompatibilityCheck(models.Model):
    """Log of compatibility checks performed - Enhanced with UUID"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    component_a = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='checks_a')
    component_b = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='checks_b')
    
    result_status = models.CharField(max_length=20, choices=COMPATIBILITY_STATUS)
    result_confidence = models.DecimalField(max_digits=3, decimal_places=2)
    result_explanation = models.TextField()
    
    # Performance tracking
    processing_time_ms = models.IntegerField(null=True, blank=True)
    
    # Request metadata
    user_ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['result_status']),
        ]
    
    def __str__(self):
        return f"Check: {self.component_a} + {self.component_b} = {self.result_status}"