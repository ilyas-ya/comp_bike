"""
Compatibility API URLs
"""

from django.urls import path
from .views import CompatibilityView, BuildValidationView

urlpatterns = [
    path('find-compatible/', CompatibilityView.as_view(), name='find-compatible'),
    path('validate-build/', BuildValidationView.as_view(), name='validate-build'),
]