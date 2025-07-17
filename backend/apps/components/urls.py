from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComponentViewSet, AdapterViewSet

router = DefaultRouter()
router.register(r'components', ComponentViewSet)
router.register(r'adapters', AdapterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]