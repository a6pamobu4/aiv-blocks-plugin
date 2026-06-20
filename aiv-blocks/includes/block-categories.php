<?php
/**
 * Block category registration.
 *
 * @package AIV_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter(
	'block_categories_all',
	static function ( array $categories ): array {
		$category = array(
			'slug'  => 'aiv-blocks',
			'title' => __( 'AIV Blocks', 'aiv-blocks' ),
			'icon'  => null,
		);

		foreach ( $categories as $existing_category ) {
			if ( isset( $existing_category['slug'] ) && 'aiv-blocks' === $existing_category['slug'] ) {
				return $categories;
			}
		}

		array_unshift( $categories, $category );

		return $categories;
	}
);
