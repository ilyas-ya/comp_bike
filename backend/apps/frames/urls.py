from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FrameMetadataViewSet

router = DefaultRouter()
router.register(r'frame-metadata', FrameMetadataViewSet)

urlpatterns = [
    path('', include(router.urls)),
]