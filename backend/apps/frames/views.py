from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import FrameMetadata, FRAME_TYPES
from .serializers import FrameMetadataSerializer

class FrameMetadataViewSet(viewsets.ModelViewSet):
    """ViewSet for managing bike frame metadata"""
    queryset = FrameMetadata.objects.all().select_related('component')
    serializer_class = FrameMetadataSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['component__brand', 'component__model', 'description']
    ordering_fields = ['component__brand', 'component__model', 'year', 'created_at']
    ordering = ['component__brand', 'component__model']
    
    @action(detail=False, methods=['get'])
    def frame_types(self, request):
        """Get all frame types"""
        return Response([{'value': value, 'label': label} for value, label in FRAME_TYPES])
