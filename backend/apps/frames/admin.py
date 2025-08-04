from django.contrib import admin
from .models import FrameMetadata

@admin.register(FrameMetadata)
class FrameMetadataAdmin(admin.ModelAdmin):
    list_display = ['component', 'frame_type', 'year', 'created_at']
    list_filter = ['frame_type', 'year', 'created_at']
    search_fields = ['component__brand', 'component__model', 'description']
    readonly_fields = ['id', 'created_at', 'updated_at']
    raw_id_fields = ['component']
    
    fieldsets = (
        ('Frame Information', {
            'fields': ('component', 'frame_type', 'year', 'description')
        }),
        ('Metadata', {
            'fields': ('id', 'created_at', 'updated_at')
        }),
    )
