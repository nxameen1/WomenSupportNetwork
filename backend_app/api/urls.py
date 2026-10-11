from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LocationViewSet, ResourceViewSet, SymptomDictionaryViewSet

router = DefaultRouter()
router.register(r'locations', LocationViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'symptoms', SymptomDictionaryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

