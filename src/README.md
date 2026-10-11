# Frontend Source (`src/`)

This directory contains FemAura's frontend application, built with
**React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It is
responsible for presenting information and allowing users to interact
with the resource directory and visual interface.

## Main Files

``` text
src/
├── App.tsx          # Main application interface and UI logic
├── main.tsx         # Entry point for the standard browser build
├── standalone.tsx   # Entry point for the standalone build
├── index.css        # Global styles and theme tokens
└── vite-env.d.ts    # Vite client type declarations
```

## Frontend Responsibilities

-   Display the main landing view and resource directory.
-   Let users search and filter the resource data available to the
    frontend.
-   Present interactive visual elements for exploring body areas and
    related information.
-   Display resource details and contact links where provided.
-   Provide responsive styling and keyboard-accessible interactions
    where implemented.
-   Support both a standard Vite build and a standalone build.

## Technologies

-   **React 19:** UI components and application state.
-   **TypeScript:** JavaScript with static type checking.
-   **Vite:** Local development server and build process.
-   **Tailwind CSS v4:** Utility-based styling and design tokens.
