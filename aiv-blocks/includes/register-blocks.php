<?php
/**
 * Block registration.
 *
 * @package AIV_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'init',
	static function (): void {
		foreach ( aiv_blocks_get_block_directories() as $block_directory ) {
			register_block_type( $block_directory );
		}
	}
);

add_action(
	'admin_notices',
	static function (): void {
		if ( ! current_user_can( 'activate_plugins' ) || ! empty( aiv_blocks_get_block_directories() ) ) {
			return;
		}

		printf(
			'<div class="notice notice-warning"><p>%s</p></div>',
			esc_html__( 'AIV Blocks is active, but no built block assets were found. Run npm install and npm run build inside the plugin directory.', 'aiv-blocks' )
		);
	}
);
