from rest_framework import serializers
from .models import CompatibilityRule, CompatibilityCheck
from apps.components.serializers import ComponentSerializer

class CompatibilityRuleSerializer(serializers.ModelSerializer):
    component_a_detail = ComponentSerializer(source='component_a', read_only=True)
    component_b_detail = ComponentSerializer(source='component_b', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = CompatibilityRule
        fields = [
            'id', 'component_a', 'component_b', 'status', 'confidence', 
            'explanation', 'base_link', 'created_at', 'updated_at', 
            'created_by', 'is_active', 'component_a_detail', 
            'component_b_detail', 'status_display'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class CompatibilityCheckSerializer(serializers.ModelSerializer):
    component_a_detail = ComponentSerializer(source='component_a', read_only=True)
    component_b_detail = ComponentSerializer(source='component_b', read_only=True)
    result_status_display = serializers.CharField(source='get_result_status_display', read_only=True)
    
    class Meta:
        model = CompatibilityCheck
        fields = [
            'id', 'component_a', 'component_b', 'result_status', 
            'result_confidence', 'result_explanation', 'processing_time_ms',
            'user_ip', 'user_agent', 'created_at', 'component_a_detail',
            'component_b_detail', 'result_status_display'
        ]
        read_only_fields = ['id', 'created_at']

class CompatibilityCheckRequestSerializer(serializers.Serializer):
    """Serializer for compatibility check requests"""
    component_a_id = serializers.UUIDField()
    component_b_id = serializers.UUIDField()

class CompatibilityResultSerializer(serializers.Serializer):
    """Serializer for compatibility check results"""
    status = serializers.CharField()
    confidence = serializers.DecimalField(max_digits=3, decimal_places=2)
    explanation = serializers.CharField()
    processing_time_ms = serializers.IntegerField(required=False)
