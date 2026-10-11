# Standalone Frontend Assets

This directory contains the compiled frontend assets for FemAura's
standalone build. The goal of this build is to allow the interface to be
opened from local files without starting the normal frontend development
server.

## Files

-   **`femaura.iife.js`** --- Compiled JavaScript bundle in Immediately
    Invoked Function Expression (IIFE) format.
-   **`femaura.css`** --- Compiled stylesheet used by the standalone
    interface.

The bundle may include application code and frontend dependencies
packaged for this build.

## Why Use an IIFE Build?

A standalone IIFE bundle can be included by a regular HTML page without
using browser ES module imports. This can help avoid some restrictions
that browsers apply to JavaScript modules opened through the `file://`
protocol.

However, local-file execution is not guaranteed to work identically in
every browser or for every feature. Browser restrictions, external
requests, and features that require a backend or network connection may
still prevent some functionality from working offline.

## Build

The standalone bundle is configured through `vite.standalone.config.ts`.
From the repository root, run:

``` bash
pnpm build
```

Check `package.json` for the exact build scripts configured in the
current checkout.

## Maintenance

Do not edit the compiled files directly. Make changes in `src/` and
rebuild the frontend so that the standalone assets reflect the source
code.

## Scope

This directory contains generated frontend assets, not the Django
backend or its database. Features that depend on a live API or remote
data source require that service to be available; only functionality
bundled into the client can work without it.
