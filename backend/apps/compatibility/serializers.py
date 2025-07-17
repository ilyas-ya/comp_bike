from rest_framework import serializers
from .models import CompatibilityRule, CompatibilityCheck
from apps.components.serializers import ComponentListSerializer, AdapterSerializer

class CompatibilityRuleSerializer(serializers.ModelSerializer):
    component_a_detail = ComponentListSerializer(source='component_a', read_only=True)
    component_b_detail = ComponentListSerializer(source='component_b', read_only=True)
    required_adapters_detail = AdapterSerializer(source='required_adapters', many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = CompatibilityRule
        fields = [
            'id', 'component_a', 'component_a_detail', 'component_b', 'component_b_detail',
            'status', 'status_display', 'confidence', 'explanation',
            'required_adapters', 'required_adapters_detail',
            'created_at', 'updated_at', 'created_by'
        ]
        read_only_fields = ['created_at', 'updated_at']

class CompatibilityCheckSerializer(serializers.ModelSerializer):
    component_a_detail = ComponentListSerializer(source='component_a', read_only=True)
    component_b_detail = ComponentListSerializer(source='component_b', read_only=True)
    result_status_display = serializers.CharField(source='get_result_status_display', read_only=True)
    
    class Meta:
        model = CompatibilityCheck
        fields = [
            'id', 'component_a', 'component_a_detail', 'component_b', 'component_b_detail',
            'result_status', 'result_status_display', 'result_confidence', 'result_explanation',
            'processing_time_ms', 'created_at'
        ]
        read_only_fields = ['created_at']

class CompatibilityCheckRequestSerializer(serializers.Serializer):
    """Serializer for compatibility check requests"""
    component_a_id = serializers.IntegerField()
    component_b_id = serializers.IntegerField()
    
    def validate(self, data):
        if data['component_a_id'] == data['component_b_id']:
            raise serializers.ValidationError("Cannot check compatibility of a component with itself")
        return data

class CompatibilityResultSerializer(serializers.Serializer):
    """Serializer for compatibility check results"""
    status = serializers.ChoiceField(choices=[
        ('compatible', 'Compatible'),
        ('conditional', 'Conditional'),
        ('incompatible', 'Incompatible')
    ])
    confidence = serializers.DecimalField(max_digits=3, decimal_places=2)
    explanation = serializers.CharField()
    required_adapters = AdapterSerializer(many=True, required=False)
    alternative_suggestions = ComponentListSerializer(many=True, required=False)
    processing_time_ms = serializers.IntegerField(required=False)