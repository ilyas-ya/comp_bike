from django.contrib import admin
from .models import Component, Adapter

@admin.register(Component)
class ComponentAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'category', 'price_range', 'is_active', 'created_at']
    list_filter = ['category', 'brand', 'is_active', 'created_at']
    search_fields = ['name', 'brand', 'model', 'description']
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'brand', 'model', 'category', 'description')
        }),
        ('Specifications', {
            'fields': ('specifications', 'price_range', 'image')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Adapter)
class AdapterAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'price_range', 'is_active', 'created_at']
    list_filter = ['brand', 'is_active', 'created_at']
    search_fields = ['name', 'brand', 'description']
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at']