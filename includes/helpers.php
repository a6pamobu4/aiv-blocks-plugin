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
	$blocks_root = AIV_BLOCKS_DIR . 'build/blocks';

	if ( ! is_dir( $blocks_root ) ) {
		return array();
	}

	$block_json_files = glob( trailingslashit( $blocks_root ) . '*/block.json' );

	if ( false === $block_json_files ) {
		return array();
	}

	return array_map( 'dirname', $block_json_files );
}

/**
 * Sanitizes an attribute intended for use as a CSS class suffix.
 *
 * @param string   $value Attribute value.
 * @param string   $fallback Fallback value.
 * @param string[] $allowed Allowed values.
 * @return string
 */
function aiv_blocks_sanitize_choice( string $value, string $fallback, array $allowed ): string {
	return in_array( $value, $allowed, true ) ? $value : $fallback;
}
