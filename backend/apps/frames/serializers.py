from rest_framework import serializers
from .models import Frame
from apps.standards.serializers import StandardSerializer

class FrameSerializer(serializers.ModelSerializer):
    frame_type_display = serializers.CharField(source='get_frame_type_display', read_only=True)
    bottom_bracket_standard_detail = StandardSerializer(source='bottom_bracket_standard', read_only=True)
    rear_axle_standard_detail = StandardSerializer(source='rear_axle_standard', read_only=True)
    front_axle_standard_detail = StandardSerializer(source='front_axle_standard', read_only=True)
    brake_mount_standard_detail = StandardSerializer(source='brake_mount_standard', read_only=True)
    headtube_standard_detail = StandardSerializer(source='headtube_standard', read_only=True)
    
    class Meta:
        model = Frame
        fields = [
            'id', 'brand', 'model', 'year', 'frame_type', 'frame_type_display',
            'bottom_bracket_standard', 'bottom_bracket_standard_detail',
            'rear_axle_standard', 'rear_axle_standard_detail',
            'front_axle_standard', 'front_axle_standard_detail',
            'brake_mount_standard', 'brake_mount_standard_detail',
            'headtube_standard', 'headtube_standard_detail',
            'seatpost_diameter', 'specifications', 'image', 'description',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class FrameListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for frame lists"""
    frame_type_display = serializers.CharField(source='get_frame_type_display', read_only=True)
    
    class Meta:
        model = Frame
        fields = ['id', 'brand', 'model', 'year', 'frame_type', 'frame_type_display', 'image']