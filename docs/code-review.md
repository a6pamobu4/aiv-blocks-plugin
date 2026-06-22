# Code Review Checklist

Use this checklist for changes to AIV Blocks.

## WordPress Security

- PHP output is escaped with `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`, or a more specific function.
- Input is sanitized before storage or use.
- Capability checks protect privileged admin behavior.
- Nonces protect form submissions and state-changing actions.
- No unsafe file operations, remote requests, or arbitrary includes were introduced.

## Performance

- Frontend JavaScript is avoided unless strictly needed.
- Block assets remain registered through `block.json`.
- No global frontend assets are added for block-specific behavior.
- No jQuery, Bootstrap, Tailwind, external fonts, external icons, or unnecessary libraries were introduced.
- CSS remains structural and block-scoped.

## Block API

- Block names, attributes, saved markup, class names, and variants remain backward compatible.
- `block.json` metadata is valid and assets resolve from the built block folder.
- Static blocks save semantic markup.
- Dynamic rendering is used only when needed.
- Theme-owned design concerns are not moved into the plugin.

## Accessibility

- Headings follow a sensible structure for the block context.
- Links and buttons have accessible text.
- Interactive UI uses native elements where practical.
- FAQ behavior uses native `details` and `summary`.
- Editor controls have clear labels.

## Coding Standards

- PHP follows WordPress Coding Standards.
- JavaScript passes `npm run lint:js`.
- PHP passes `composer run lint:php`.
- Generated build assets are refreshed after source changes.
- Documentation and comments are useful, concise, and current.
