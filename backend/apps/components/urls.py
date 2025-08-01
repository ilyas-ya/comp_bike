from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComponentViewSet, CompatibilityLinkViewSet

router = DefaultRouter()
router.register(r'components', ComponentViewSet)
router.register(r'compatibility-links', CompatibilityLinkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]