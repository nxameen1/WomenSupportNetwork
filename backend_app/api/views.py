from rest_framework import viewsets
from .models import Location, Resource, SymptomDictionary
from .serializers import LocationSerializer, ResourceSerializer, SymptomDictionarySerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

class SymptomDictionaryViewSet(viewsets.ModelViewSet):
    queryset = SymptomDictionary.objects.all()
    serializer_class = SymptomDictionarySerializer
