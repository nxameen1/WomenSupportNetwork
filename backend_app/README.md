# Backend Service: Django REST API & Geospatial Pipeline

This directory contains the Python/Django backend service that powers FemAura's data models, symptom translation engine, and resource locator API.

---

## Architecture Overview

The backend is built using **Django 4.2** and **Django REST Framework (DRF)**. It acts as the data management and translation layer, decoupled from the React frontend client.

### Primary Responsibilities
1. **Geospatial Location Storage:** Storing and querying US zip codes and latitude/longitude coordinates to identify resource density and service deserts.
2. **Resource Catalog:** Managing verified clinics, shelters, hotlines, and telehealth providers.
3. **Symptom Dictionary Translation Layer:** Maintaining a relational mapping between clinical diagnostic terminology (e.g., Somatic Symptom Disorder, Chronic Pelvic Pain) and low-literacy plain-language equivalents for intake.

---

## Database Models (`api/models.py`)

### 1. `Location`
Represents geographic coordinates for spatial analysis.
* `zip_code` (`CharField`, indexed): Indexed for fast lookup queries.
* `latitude`, `longitude` (`DecimalField`): Supports 6-decimal precision for geographic plotting.
* `city`, `state` (`CharField`): Administrative locality metadata.

### 2. `Resource`
Represents physical and digital care providers.
* `name` (`CharField`): Provider or organization title.
* `resource_type` (`CharField`, choices): Categorized into `CLINIC`, `SHELTER`, `TELEHEALTH`, or `OTHER`.
* `location` (`ForeignKey` to `Location`): Nullable relationship to support nationwide/telehealth services that lack a physical clinic address.
* `address`, `contact_phone`, `website_url`, `description`: Provider access metadata.

### 3. `SymptomDictionary`
The clinical translation table connecting patient symptom inputs to medical classification.
* `medical_term` (`CharField`): Standardized medical diagnostic term.
* `plain_language` (`TextField`): Low-literacy, colloquial description of physical experience.
* `icon_reference` (`CharField`): Identifier matching corresponding frontend visual assets.

---

## REST API Interface (`api/views.py` & `api/urls.py`)

The API exposes standard RESTful endpoints registered via DRF's `DefaultRouter`:

| Endpoint | Method | Response | Description |
| :--- | :--- | :--- | :--- |
| `/api/locations/` | `GET`, `POST` | Array / Object | Retrieve or register geographical coordinate records |
| `/api/resources/` | `GET`, `POST` | Array / Object | Query or catalog care providers, hotlines, and clinics |
| `/api/symptoms/` | `GET`, `POST` | Array / Object | Access the symptom-to-clinical-jargon translation table |

---

## Configuration & Security

* **Environment Isolation:** Secrets and environment-dependent flags are managed with `python-dotenv`. Values are loaded from `.env` in the project root.
* **Secret Key Safety:** The Django `SECRET_KEY` is loaded dynamically from `DJANGO_SECRET_KEY`. No cryptographic keys are committed to source control.
* **CORS Middleware:** `corsheaders.middleware.CorsMiddleware` is enabled to allow API communication with the frontend client running on distinct origins (e.g., `http://localhost:5173` or deployed static CDNs).

---

