from rest_framework import serializers
from .models import Standard

class StandardSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Standard
        fields = [
            'id', 'name', 'category', 'category_display', 'description',
            'specifications', 'diameter', 'width', 'thread_pitch',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']