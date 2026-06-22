<?php
/**
 * Plugin Name: AIV Blocks
 * Description: Reusable Gutenberg blocks for custom AIV-web WordPress projects.
 * Author: AIV-web
 * Version: 0.1.0
 * Text Domain: aiv-blocks
 * Requires PHP: 8.1
 * Requires at least: 6.5
 *
 * @package AIV_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'AIV_BLOCKS_VERSION', '0.1.0' );
define( 'AIV_BLOCKS_FILE', __FILE__ );
define( 'AIV_BLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'AIV_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

require_once AIV_BLOCKS_DIR . 'includes/helpers.php';
require_once AIV_BLOCKS_DIR . 'includes/block-categories.php';
require_once AIV_BLOCKS_DIR . 'includes/register-blocks.php';

add_action(
	'plugins_loaded',
	static function (): void {
		load_plugin_textdomain( 'aiv-blocks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}
);
