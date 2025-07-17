import django_filters
from .models import Component

class ComponentFilter(django_filters.FilterSet):
    """Filter for component queries"""
    category = django_filters.ChoiceFilter(choices=Component._meta.get_field('category').choices)
    brand = django_filters.CharFilter(lookup_expr='icontains')
    price_min = django_filters.NumberFilter(field_name='price_range', lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name='price_range', lookup_expr='lte')
    
    class Meta:
        model = Component
        fields = ['category', 'brand']