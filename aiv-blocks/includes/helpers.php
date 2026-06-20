<?php
/**
 * Shared helpers for AIV Blocks.
 *
 * @package AIV_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns absolute block build directories that contain block.json metadata.
 *
 * @return string[]
 */
function aiv_blocks_get_block_directories(): array {
	$candidate_roots = array(
		AIV_BLOCKS_DIR . 'build/blocks',
		AIV_BLOCKS_DIR . 'build',
		AIV_BLOCKS_DIR . 'src/build',
	);

	$directories = array();

	foreach ( $candidate_roots as $root ) {
		if ( ! is_dir( $root ) ) {
			continue;
		}

		$block_json_files = glob( trailingslashit( $root ) . '*/block.json' );

		if ( false === $block_json_files ) {
			continue;
		}

		foreach ( $block_json_files as $block_json_file ) {
			$directories[] = dirname( $block_json_file );
		}
	}

	return array_values( array_unique( $directories ) );
}

/**
 * Sanitizes an attribute intended for use as a CSS class suffix.
 *
 * @param string $value Attribute value.
 * @param string $fallback Fallback value.
 * @param string[] $allowed Allowed values.
 * @return string
 */
function aiv_blocks_sanitize_choice( string $value, string $fallback, array $allowed ): string {
	return in_array( $value, $allowed, true ) ? $value : $fallback;
}
