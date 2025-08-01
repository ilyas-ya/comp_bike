from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import StandardDefinition, STANDARD_CATEGORIES
from .serializers import StandardDefinitionSerializer

class StandardDefinitionViewSet(viewsets.ModelViewSet):
    """ViewSet for managing standard definitions"""
    queryset = StandardDefinition.objects.filter(is_active=True)
    serializer_class = StandardDefinitionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'category', 'created_at']
    ordering = ['category', 'name']
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get all standard categories"""
        return Response([{'value': value, 'label': label} for value, label in STANDARD_CATEGORIES])
