from rest_framework import serializers
from .models import Component, Adapter

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = [
            'id', 'name', 'brand', 'model', 'category', 
            'specifications', 'price_range', 'image', 
            'description', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class ComponentListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for component lists"""
    class Meta:
        model = Component
        fields = ['id', 'name', 'brand', 'category', 'price_range', 'image']

class AdapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adapter
        fields = [
            'id', 'name', 'brand', 'description', 'price_range', 
            'image', 'from_specification', 'to_specification',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']