import django_filters
from .models import Component

class ComponentFilter(django_filters.FilterSet):
    """Filter for component queries"""
    type = django_filters.ChoiceFilter(choices=Component._meta.get_field('type').choices)
    brand = django_filters.CharFilter(lookup_expr='icontains')
    speed = django_filters.NumberFilter()
    
    class Meta:
        model = Component
        fields = ['type', 'brand', 'speed']