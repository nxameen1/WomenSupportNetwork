from rest_framework import serializers
from .models import Location, Resource, SymptomDictionary

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class ResourceSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)
    location_id = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(), source='location', write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Resource
        fields = '__all__'

class SymptomDictionarySerializer(serializers.ModelSerializer):
    class Meta:
        model = SymptomDictionary
        fields = '__all__'

