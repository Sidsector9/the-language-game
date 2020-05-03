<?php
/**
 * Plugin Name:     The Language Game
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     the-language-game
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         The_Language_Game
 */

if ( ! defined( 'TLG_PLUGIN_DIR_PATH' ) ) {
	define( 'TLG_PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'TLG_PLUGIN_DIR_URL' ) ) {
	define( 'TLG_PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );
}

function tlg_enqueue_assets() {
	wp_enqueue_script( 'tlg-script', TLG_PLUGIN_DIR_URL . 'dist/js/tlg-script.min.js', array(), null, true );
	wp_dequeue_style( 'newsuk-style' );
	wp_deregister_style( 'newsuk-style' );
}
add_action( 'wp_enqueue_scripts', 'tlg_enqueue_assets', 9999, 1 );
