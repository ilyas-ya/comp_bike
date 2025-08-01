from django.contrib import admin
from .models import Component, CompatibilityLink

@admin.register(Component)
class ComponentAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model', 'type', 'speed', 'created_at']
    list_filter = ['type', 'brand', 'speed', 'created_at']
    search_fields = ['brand', 'model']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('brand', 'model', 'type', 'speed')
        }),
        ('Specifications', {
            'fields': ('specs',)
        }),
        ('Metadata', {
            'fields': ('id', 'created_at', 'updated_at')
        }),
    )

@admin.register(CompatibilityLink)
class CompatibilityLinkAdmin(admin.ModelAdmin):
    list_display = ['source', 'target', 'type', 'status', 'adapter_required', 'created_at']
    list_filter = ['type', 'status', 'adapter_required', 'created_at']
    search_fields = ['source__brand', 'source__model', 'target__brand', 'target__model', 'notes']
    readonly_fields = ['id', 'created_at']
    raw_id_fields = ['source', 'target']
