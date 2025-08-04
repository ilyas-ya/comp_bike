from rest_framework import serializers
from .models import FrameMetadata
from apps.components.serializers import ComponentSerializer

class FrameMetadataSerializer(serializers.ModelSerializer):
    component_detail = ComponentSerializer(source='component', read_only=True)
    frame_type_display = serializers.CharField(source='get_frame_type_display', read_only=True)
    
    class Meta:
        model = FrameMetadata
        fields = [
            'id', 'component', 'frame_type', 'year', 'description',
            'created_at', 'updated_at', 'component_detail', 'frame_type_display'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
