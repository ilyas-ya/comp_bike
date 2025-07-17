import time
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.cache import cache
from .models import CompatibilityRule, CompatibilityCheck
from .serializers import (
    CompatibilityRuleSerializer, 
    CompatibilityCheckSerializer,
    CompatibilityCheckRequestSerializer,
    CompatibilityResultSerializer
)
from .services import CompatibilityService
from apps.components.models import Component

class CompatibilityRuleViewSet(viewsets.ModelViewSet):
    """ViewSet for managing compatibility rules"""
    queryset = CompatibilityRule.objects.filter(is_active=True).select_related(
        'component_a', 'component_b'
    ).prefetch_related('required_adapters')
    serializer_class = CompatibilityRuleSerializer
    
    def perform_create(self, serializer):
        serializer.save(created_by='admin')

class CompatibilityCheckViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing compatibility check history"""
    queryset = CompatibilityCheck.objects.all().select_related(
        'component_a', 'component_b'
    ).order_by('-created_at')
    serializer_class = CompatibilityCheckSerializer

@api_view(['POST'])
def check_compatibility(request):
    """
    Check compatibility between two components
    """
    start_time = time.time()
    
    # Validate request
    serializer = CompatibilityCheckRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    component_a_id = serializer.validated_data['component_a_id']
    component_b_id = serializer.validated_data['component_b_id']
    
    # Get components
    try:
        component_a = Component.objects.get(id=component_a_id, is_active=True)
        component_b = Component.objects.get(id=component_b_id, is_active=True)
    except Component.DoesNotExist:
        return Response(
            {'error': 'One or both components not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Check cache first
    cache_key = f"compatibility_{min(component_a_id, component_b_id)}_{max(component_a_id, component_b_id)}"
    cached_result = cache.get(cache_key)
    
    if cached_result:
        return Response(cached_result)
    
    # Perform compatibility check
    compatibility_service = CompatibilityService()
    result = compatibility_service.check_compatibility(component_a, component_b)
    
    processing_time = int((time.time() - start_time) * 1000)
    result['processing_time_ms'] = processing_time
    
    # Log the check
    CompatibilityCheck.objects.create(
        component_a=component_a,
        component_b=component_b,
        result_status=result['status'],
        result_confidence=result['confidence'],
        result_explanation=result['explanation'],
        processing_time_ms=processing_time,
        user_ip=get_client_ip(request),
        user_agent=request.META.get('HTTP_USER_AGENT', '')
    )
    
    # Cache the result for 1 hour
    cache.set(cache_key, result, 3600)
    
    # Serialize and return result
    result_serializer = CompatibilityResultSerializer(result)
    return Response(result_serializer.data)

def get_client_ip(request):
    """Get client IP address from request"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip