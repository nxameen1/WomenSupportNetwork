from django.db import models

class Location(models.Model):
    zip_code = models.CharField(max_length=20, db_index=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.zip_code} - {self.city}, {self.state}"

class Resource(models.Model):
    RESOURCE_TYPES = [
        ('CLINIC', 'Clinic'),
        ('SHELTER', 'Shelter'),
        ('TELEHEALTH', 'Telehealth'),
        ('OTHER', 'Other'),
    ]

    name = models.CharField(max_length=255)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, blank=True, related_name='resources')
    address = models.TextField(blank=True, help_text="Physical address if applicable")
    contact_phone = models.CharField(max_length=50, blank=True)
    website_url = models.URLField(blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.get_resource_type_display()})"

class SymptomDictionary(models.Model):
    medical_term = models.CharField(max_length=255, help_text="e.g., Somatic Symptom Disorder")
    plain_language = models.TextField(help_text="e.g., My body aches everywhere, all the time")
    icon_reference = models.CharField(max_length=255, blank=True, help_text="Identifier for frontend icon/asset")

    def __str__(self):
        return f"{self.medical_term} - {self.plain_language[:30]}"
