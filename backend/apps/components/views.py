from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Component, CompatibilityLink
from .serializers import ComponentSerializer, CompatibilityLinkSerializer

class ComponentViewSet(viewsets.ModelViewSet):
    """ViewSet for managing bike components"""
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['brand', 'model']
    ordering_fields = ['brand', 'model', 'created_at', 'type']
    ordering = ['brand', 'model']
    
    @action(detail=False, methods=['get'])
    def types(self, request):
        """Get all component types"""
        from .models import COMPONENT_TYPES
        return Response([{'value': value, 'label': label} for value, label in COMPONENT_TYPES])

class CompatibilityLinkViewSet(viewsets.ModelViewSet):
    """ViewSet for managing compatibility links between components"""
    queryset = CompatibilityLink.objects.all()
    serializer_class = CompatibilityLinkSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['source__brand', 'source__model', 'target__brand', 'target__model', 'notes']
    ordering_fields = ['created_at', 'type', 'status']
    ordering = ['-created_at']
