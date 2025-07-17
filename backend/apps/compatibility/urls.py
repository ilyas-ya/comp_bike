from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompatibilityRuleViewSet, CompatibilityCheckViewSet, check_compatibility

router = DefaultRouter()
router.register(r'compatibility-rules', CompatibilityRuleViewSet)
router.register(r'compatibility-checks', CompatibilityCheckViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('compatibility/check/', check_compatibility, name='check_compatibility'),
]