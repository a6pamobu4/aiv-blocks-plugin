# AIV Blocks

AIV Blocks is a reusable Gutenberg block library for custom AIV-web WordPress projects. It provides clean block structure, editor controls, semantic markup, and minimal structural CSS for landing pages, business websites, corporate websites, and future WooCommerce work.

The plugin is intentionally not a page builder. It does not ship brand colors, fonts, icon systems, animation libraries, layout frameworks, or broad visual design decisions. Client themes own the final presentation through `theme.json`, theme styles, and block class overrides.

## Plugin vs Theme

The plugin owns:

-   Block registration and metadata.
-   Stable semantic markup.
-   Focused editor controls.
-   Minimal structural styles required for usable layout.
-   Block-scoped assets loaded through WordPress block metadata.

The theme owns:

-   Brand colors, typography, and spacing systems.
-   Detailed visual treatment of cards, buttons, backgrounds, and media.
-   Site-specific responsive refinements.
-   Any project-specific block variations or patterns.

## Installation

1. Copy the `aiv-blocks` directory into `wp-content/plugins/`.
2. From the plugin directory, run `npm install`.
3. Run `npm run build`.
4. Activate **AIV Blocks** in WordPress.

## Development

Install dependencies:

```bash
npm install
```

Build production assets:

```bash
npm run build
```

Watch during development:

```bash
npm run start
```

Lint JavaScript:

```bash
npm run lint:js
```

Format source files:

```bash
npm run format
```

## Blocks

-   `aiv/hero`
-   `aiv/section`
-   `aiv/services-grid`
-   `aiv/pricing-cards`
-   `aiv/faq`
-   `aiv/cta`

## Adding a New Block

1. Create a folder in `src/blocks/{block-name}`.
2. Add `block.json`, `index.js`, `edit.js`, `save.js`, `style.scss`, and `editor.scss`.
3. Use the `aiv` namespace and the `aiv-blocks` category.
4. Keep attributes purposeful and avoid visual controls that belong in a theme.
5. Run `npm run build` and confirm the block appears in the editor.

The webpack configuration automatically discovers block folders under `src/blocks` and builds them into `build/blocks`.

## Class Naming Policy

Top-level block classes are stable public API:

-   `.aiv-hero`
-   `.aiv-section`
-   `.aiv-services`
-   `.aiv-pricing`
-   `.aiv-faq`
-   `.aiv-cta`

Changing stable classes, saved markup, attributes, or removing variants is a breaking change because client themes may target these hooks.

## Performance Principles

-   No frontend JavaScript unless a block truly requires it.
-   No jQuery, Bootstrap, Tailwind, external fonts, or external icons.
-   Block assets are registered through `block.json` so WordPress can load them only when blocks are present.
-   Static blocks save clean markup.
-   Dynamic blocks are reserved for server-rendered data or integrations.

## Versioning

This project follows semantic versioning.

-   Patch releases fix bugs without changing saved markup or public classes.
-   Minor releases add backward-compatible blocks, attributes, variants, or editor improvements.
-   Major releases may include breaking changes.

Breaking changes include class name changes, markup changes, attribute changes, removed variants, and behavior that requires theme updates.
