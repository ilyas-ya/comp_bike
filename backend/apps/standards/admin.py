from django.contrib import admin
from .models import StandardDefinition

@admin.register(StandardDefinition)
class StandardDefinitionAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'diameter', 'width', 'is_active', 'created_at']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['is_active']
    readonly_fields = ['id', 'created_at', 'updated_at']