from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Component, Adapter
from .serializers import ComponentSerializer, ComponentListSerializer, AdapterSerializer
from .filters import ComponentFilter

class ComponentViewSet(viewsets.ModelViewSet):
    """ViewSet for managing bike components"""
    queryset = Component.objects.filter(is_active=True)
    serializer_class = ComponentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ComponentFilter
    search_fields = ['name', 'brand', 'model', 'description']
    ordering_fields = ['name', 'brand', 'created_at', 'price_range']
    ordering = ['brand', 'name']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ComponentListSerializer
        return ComponentSerializer
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get all component categories"""
        from .models import COMPONENT_CATEGORIES
        return Response([{'value': value, 'label': label} for value, label in COMPONENT_CATEGORIES])
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Advanced search endpoint"""
        query = request.query_params.get('q', '')
        category = request.query_params.get('category', '')
        brand = request.query_params.get('brand', '')
        
        queryset = self.get_queryset()
        
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query) |
                Q(brand__icontains=query) |
                Q(model__icontains=query) |
                Q(description__icontains=query)
            )
        
        if category:
            queryset = queryset.filter(category=category)
        
        if brand:
            queryset = queryset.filter(brand__icontains=brand)
        
        # Limit results for performance
        queryset = queryset[:50]
        
        serializer = ComponentListSerializer(queryset, many=True)
        return Response(serializer.data)

class AdapterViewSet(viewsets.ModelViewSet):
    """ViewSet for managing adapters"""
    queryset = Adapter.objects.filter(is_active=True)
    serializer_class = AdapterSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['name', 'brand', 'description']