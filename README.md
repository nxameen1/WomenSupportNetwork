# FemAura

FemAura is a web project focused on helping women find information and
support related to domestic violence (DV), sexual assault (SA),
healthcare, and other resources that can support their safety and
independence.

The project explores how thoughtful interface design, accessible
information, and technology can make support resources easier to
discover and navigate. Its direction may evolve as the project develops;
the overall goal is to build a useful, approachable resource for women
who need help.

## Project Goals

-   **Make support easier to find:** Bring relevant support resources
    and information into an accessible directory.
-   **Support accessible communication:** Explore visual and
    plain-language interactions that can help people navigate
    information without relying entirely on dense text.
-   **Improve awareness of resource access:** Use geographic information
    and data visualization to explore how support services are
    distributed.
-   **Include related opportunities:** Provide additional information
    about education, legal support, housing, and other services that may
    help women work toward safety and independence.
-   **Keep privacy in mind:** Consider how interface choices and data
    handling can reduce unnecessary exposure of sensitive searches or
    information.

## Features

-   Searchable, category-based resource directory.
-   Interactive visual interface for exploring body areas and related
    information.
-   Geographic visualization concept for exploring resource coverage and
    possible gaps.
-   Additional educational, legal, housing, and mental-health resource
    categories.
-   Standalone frontend build intended to work from local files, with
    limitations depending on browser and feature support.
-   Django backend structure for managing resource, location, and
    related data.

## Technology Stack

### Frontend

-   **React 19** --- component-based user interface
-   **TypeScript** --- typed JavaScript
-   **Vite** --- development server and build tooling
-   **Tailwind CSS v4** --- styling
-   **pnpm** --- JavaScript package management

### Backend

-   **Python and Django 4.2** --- backend application and configuration
-   **Django REST Framework** --- API structure
-   **SQLite** --- local development database, with PostgreSQL as a
    possible production database
-   **python-dotenv** --- local environment-variable configuration
-   **django-cors-headers** --- cross-origin configuration for
    frontend/API development

## Project Structure

``` text
.
├── backend_app/              # Django backend and API
├── src/                      # React and TypeScript frontend
├── standalone-assets/         # Compiled standalone frontend assets
├── index.html                # Frontend HTML entry point
├── package.json              # Frontend scripts and dependencies
├── pnpm-lock.yaml            # Resolved JavaScript dependency versions
├── vite.config.ts            # Standard frontend build configuration
└── vite.standalone.config.ts  # Standalone build configuration
```

## Getting Started

### Requirements

-   Node.js (version compatible with the project configuration)
-   pnpm (or npm, if you adapt the commands)
-   Python 3
-   pip

### Frontend

From the repository root:

``` bash
pnpm install
pnpm dev
```

Vite prints the local development URL in the terminal.

To build the frontend:

``` bash
pnpm build
```

Review `package.json` for the exact scripts available in your checkout.

### Backend

``` bash
cd backend_app
python -m venv venv
```

Activate the virtual environment:

``` bash
# macOS / Linux
source venv/bin/activate

# Windows PowerShell
# .\venv\Scripts\Activate.ps1
```

Install backend dependencies:

``` bash
pip install -r requirements.txt
```

If the project includes `.env.example`, copy it to `.env` and fill in
the required local values:

``` bash
cp .env.example .env
```

Then run:

``` bash
python manage.py migrate
python manage.py check
python manage.py runserver
```

Keep `.env` and real credentials out of version control. The exact
environment-variable names should match the backend settings.

## Privacy and Safety

FemAura is intended as an informational and support-oriented project,
not as a replacement for professional medical, legal, or crisis support.
Resource details should be checked for accuracy and kept up to date.

## Project Status

FemAura is a work in progress. Features, research questions, data
sources, and implementation details may change as the project develops.
Descriptions in this repository document the current software structure
and intended direction; they should not be read as evidence that
clinical outcomes or geographic service gaps have already been
validated.

## License

This project is licensed under the GNU GPL License.
