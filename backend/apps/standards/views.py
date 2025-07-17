from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Standard, STANDARD_CATEGORIES
from .serializers import StandardSerializer

class StandardViewSet(viewsets.ModelViewSet):
    """ViewSet for managing mechanical standards"""
    queryset = Standard.objects.filter(is_active=True)
    serializer_class = StandardSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'category', 'created_at']
    ordering = ['category', 'name']
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get all standard categories"""
        return Response([{'value': value, 'label': label} for value, label in STANDARD_CATEGORIES])