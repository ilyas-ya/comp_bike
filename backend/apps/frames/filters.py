import django_filters
from .models import Frame

class FrameFilter(django_filters.FilterSet):
    """Filter for frame queries"""
    frame_type = django_filters.ChoiceFilter(choices=Frame._meta.get_field('frame_type').choices)
    brand = django_filters.CharFilter(lookup_expr='icontains')
    year_min = django_filters.NumberFilter(field_name='year', lookup_expr='gte')
    year_max = django_filters.NumberFilter(field_name='year', lookup_expr='lte')
    seatpost_diameter_min = django_filters.NumberFilter(field_name='seatpost_diameter', lookup_expr='gte')
    seatpost_diameter_max = django_filters.NumberFilter(field_name='seatpost_diameter', lookup_expr='lte')
    
    class Meta:
        model = Frame
        fields = ['frame_type', 'brand', 'bottom_bracket_standard', 'brake_mount_standard']