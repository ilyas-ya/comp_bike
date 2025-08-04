from rest_framework import serializers
from .models import StandardDefinition

class StandardDefinitionSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = StandardDefinition
        fields = [
            'id', 'name', 'category', 'description', 'specifications',
            'diameter', 'width', 'thread_pitch', 'created_at', 'updated_at',
            'is_active', 'category_display'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
