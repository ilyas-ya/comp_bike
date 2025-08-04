from rest_framework import serializers
from .models import Component, CompatibilityLink

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = [
            'id', 'brand', 'model', 'type', 'speed', 
            'specs', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class CompatibilityLinkSerializer(serializers.ModelSerializer):
    source_display = serializers.CharField(source='source.__str__', read_only=True)
    target_display = serializers.CharField(source='target.__str__', read_only=True)
    
    class Meta:
        model = CompatibilityLink
        fields = [
            'id', 'source', 'target', 'type', 'status', 
            'adapter_required', 'notes', 'created_at',
            'source_display', 'target_display'
        ]
        read_only_fields = ['id', 'created_at']