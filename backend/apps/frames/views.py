from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Frame, FRAME_TYPES
from .serializers import FrameSerializer, FrameListSerializer
from .filters import FrameFilter

class FrameViewSet(viewsets.ModelViewSet):
    """ViewSet for managing bike frames"""
    queryset = Frame.objects.filter(is_active=True).select_related(
        'bottom_bracket_standard',
        'rear_axle_standard', 
        'front_axle_standard',
        'brake_mount_standard',
        'headtube_standard'
    )
    serializer_class = FrameSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = FrameFilter
    search_fields = ['brand', 'model', 'description']
    ordering_fields = ['brand', 'model', 'year', 'created_at']
    ordering = ['brand', 'model', 'year']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return FrameListSerializer
        return FrameSerializer
    
    @action(detail=False, methods=['get'])
    def types(self, request):
        """Get all frame types"""
        return Response([{'value': value, 'label': label} for value, label in FRAME_TYPES])
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Advanced search endpoint"""
        query = request.query_params.get('q', '')
        frame_type = request.query_params.get('type', '')
        brand = request.query_params.get('brand', '')
        year_min = request.query_params.get('year_min', '')
        year_max = request.query_params.get('year_max', '')
        
        queryset = self.get_queryset()
        
        if query:
            queryset = queryset.filter(
                Q(brand__icontains=query) |
                Q(model__icontains=query) |
                Q(description__icontains=query)
            )
        
        if frame_type:
            queryset = queryset.filter(frame_type=frame_type)
        
        if brand:
            queryset = queryset.filter(brand__icontains=brand)
            
        if year_min:
            queryset = queryset.filter(year__gte=year_min)
            
        if year_max:
            queryset = queryset.filter(year__lte=year_max)
        
        # Limit results for performance
        queryset = queryset[:50]
        
        serializer = FrameListSerializer(queryset, many=True)
        return Response(serializer.data)