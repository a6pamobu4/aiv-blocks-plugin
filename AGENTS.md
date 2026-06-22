# AIV Blocks Development Rules

## WordPress Standards

-   Follow WordPress Coding Standards for PHP, JavaScript, CSS, documentation, escaping, sanitization, and internationalization.
-   Target PHP 8.1+ and the current stable WordPress release.
-   Use `block.json` metadata for block registration and asset loading.
-   Keep frontend assets block-scoped and minimal.
-   Do not enqueue global frontend CSS or JavaScript unless the whole plugin genuinely needs it.

## Block Architecture

-   Preserve public block names, attributes, class names, saved markup, and variants unless the change is explicitly versioned as breaking.
-   Prefer static blocks with clean semantic saved HTML.
-   Use dynamic blocks only when server-side rendering is required.
-   Keep controls purposeful and content-oriented. Visual design belongs in client themes.
-   Use theme support and `theme.json` presets for colors, spacing, typography, and alignment.

## Security

-   Escape all PHP output with the most specific escaping function available.
-   Sanitize input and attributes before use in PHP.
-   Verify nonces and capabilities for privileged actions.
-   Avoid inline JavaScript and inline styles except where WordPress block supports require them.

## Dependencies

-   Do not add jQuery, Bootstrap, Tailwind, external fonts, external icons, sliders, or animation libraries.
-   Keep `@wordpress/*` packages in `devDependencies`; WordPress provides runtime editor packages.
-   Use Composer dev dependencies only for tooling unless runtime PHP packages become necessary.

## Verification

-   Run `npm run start` during active SCSS/JS development when watch mode is available.
-   Run `npm run build` after SCSS, JavaScript, or block source changes.
-   Do not commit stale compiled CSS or JS.
-   Run `npm run lint:js` after JavaScript changes.
-   Run `composer run lint:php` after PHP changes.
-   Run `composer run fix:php` only for intentional PHPCS autofixes.

## Source of Truth

Use current WordPress Developer Resources as the primary source of truth:

-   Plugin Handbook
-   Theme Handbook
-   Block Editor Handbook
-   Code Reference
-   WordPress Coding Standards

Do not rely on outdated WordPress Codex pages when current Developer Resources are available.

## Repository Discipline

-   Before changing code, inspect the existing file structure, naming conventions, build setup, and registration flow.
-   Prefer small targeted changes over large rewrites.
-   Do not reorganize folders, rename public files, or change build output structure unless explicitly requested.
-   Do not modify generated `build/` files directly. Change files in `src/` and run the build command.
-   Do not mix unrelated refactors with feature work.
-   Do not introduce new dependencies without explaining why they are necessary.

## Internationalization

-   All user-facing strings must be translation-ready.
-   Use the correct text domain: `aiv-blocks`.
-   In PHP, use `__()`, `_x()`, `esc_html__()`, `esc_attr__()` and related functions where appropriate.
-   In JavaScript, use `@wordpress/i18n`.
-   Do not hard-code user-facing English strings without translation functions.

## Accessibility

-   Use semantic HTML before ARIA.
-   Do not add ARIA attributes unless they are necessary and correct.
-   Interactive elements must be keyboard accessible.
-   Links must have valid `href` values when they behave as links.
-   Buttons must use `<button>` when they trigger actions.
-   Preserve logical heading order where possible.

## Public API Stability

The following are public API and must not be changed casually:

-   Block names.
-   Attribute names and types.
-   Saved markup.
-   Stable CSS class names.
-   Variant names.
-   Hook names and filter names.

Any change to these items must be treated as a breaking change.

## SCSS and CSS Build Rules

-   All custom project styles must be written in SCSS first.
-   Do not write production CSS manually unless the file is explicitly marked as a WordPress-required file, for example a theme `style.css` header file.
-   Compiled CSS is generated output.
-   Do not edit compiled CSS files directly.
-   Do not enqueue SCSS files in WordPress. Enqueue only compiled CSS.
-   When changing styles, edit the source `.scss` files and run the appropriate npm build command.
-   Use `npm run start` for watch/autocompilation during development.
-   Use `npm run build` before committing, packaging, or delivering changes.
-   Keep SCSS modular and close to the feature it styles.
-   Avoid large global stylesheets when styles can be scoped to a block or component.
-   Do not add Bootstrap, Tailwind, Sass frameworks, CSS utility libraries, external fonts, external icons, or large reset libraries unless explicitly approved.
-   Use CSS custom properties and `theme.json` presets where possible.
-   Prefer native CSS features over extra dependencies.
-   Keep compiled CSS small, readable in development, and optimized in production.

## Gutenberg Block Styling

-   Keep block styles inside the matching block folder.
-   Use `style.scss` for frontend and editor shared styles.
-   Use `editor.scss` for editor-only styles.
-   Keep block CSS scoped to stable block classes such as `.aiv-hero`, `.aiv-section`, `.aiv-services`, `.aiv-pricing`, `.aiv-faq`, and `.aiv-cta`.
-   Keep block CSS structural and minimal. Final visual design belongs in the active theme.
-   Let `@wordpress/scripts` compile SCSS into `build/blocks/{block-name}/style-index.css` and `build/blocks/{block-name}/index.css`.
-   Do not change generated files in `build/blocks` directly.

## Theme Styling

-   Keep WordPress-required `style.css` files intact when working in a theme.
-   Use `style.css` for theme metadata only when the theme requires it.
-   Put theme SCSS sources in `assets/scss/`.
-   Compile theme CSS to `assets/css/`.
-   Enqueue compiled CSS files from theme PHP.
-   Do not enqueue SCSS files.
-   Organize theme SCSS by responsibility, such as base, layout, typography, header, footer, blocks, templates, and WooCommerce when needed.
