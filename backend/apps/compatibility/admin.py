from django.contrib import admin
from .models import CompatibilityRule, CompatibilityCheck

@admin.register(CompatibilityRule)
class CompatibilityRuleAdmin(admin.ModelAdmin):
    list_display = ['component_a', 'component_b', 'status', 'confidence', 'created_by', 'is_active']
    list_filter = ['status', 'confidence', 'created_by', 'is_active', 'created_at']
    search_fields = ['component_a__name', 'component_b__name', 'explanation']
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at']
    filter_horizontal = ['required_adapters']

@admin.register(CompatibilityCheck)
class CompatibilityCheckAdmin(admin.ModelAdmin):
    list_display = ['component_a', 'component_b', 'result_status', 'result_confidence', 'processing_time_ms', 'created_at']
    list_filter = ['result_status', 'created_at']
    search_fields = ['component_a__name', 'component_b__name']
    readonly_fields = ['created_at']
    
    def has_add_permission(self, request):
        return False  # Don't allow manual creation
    
    def has_change_permission(self, request, obj=None):
        return False  # Don't allow editing