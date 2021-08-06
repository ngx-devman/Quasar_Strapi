<?php
/**
 * @wordpress-plugin
 * Plugin Name:       SourceDigital Video Plugin
 * Plugin URI:        https://sourcedigital.net/
 * Description:       This plugin to display video on wordpress site
 * Version:           1.0.0
 * Author:            SourceDigital
 * Author URI:        https://sourcedigital.net/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       source-digital
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 */
define( 'PLUGIN_NAME_VERSION', '1.0.0' );
/**
 * plugin name.
 */
define( 'PLUGIN_NAME', 'source-digital' );

/**
 * The code that runs during plugin activation.
  */
function activate_source_digital() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-source-digital-activator.php';
	Source_Digital_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_source_digital() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-source-digital-deactivator.php';
	Source_Digital_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_source_digital' );
register_deactivation_hook( __FILE__, 'deactivate_source_digital' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-source-digital.php';


function run_source_digital() {

	$plugin = new Source_Digital();
	$plugin->run();

}
run_source_digital();
