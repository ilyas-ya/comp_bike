from django.contrib import admin
from .models import Frame

@admin.register(Frame)
class FrameAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model', 'year', 'frame_type', 'seatpost_diameter', 'is_active']
    list_filter = ['frame_type', 'brand', 'year', 'is_active', 'created_at']
    search_fields = ['brand', 'model', 'description']
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('brand', 'model', 'year', 'frame_type', 'description', 'image')
        }),
        ('Standards', {
            'fields': (
                'bottom_bracket_standard', 'rear_axle_standard', 'front_axle_standard',
                'brake_mount_standard', 'headtube_standard'
            )
        }),
        ('Measurements', {
            'fields': ('seatpost_diameter', 'specifications')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )