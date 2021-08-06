<?php
/**
 * The admin-specific functionality of the plugin.
 */
class Source_Digital_Admin {


	private $plugin_name;

	private $version;

	/**
	 * Initialize the class and set its properties.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/source-digital-admin.css', array(), $this->version, 'all' );

	}

	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/source-digital-admin.js', array( 'jquery' ), $this->version, false );

	}

	public function admin_menu()
	{
		add_menu_page(__( 'SourceDigital Settings', 'source-digital' ), __( 'SourceDigital Settings', 'source-digital' ), 'manage_options', 'source-digital-setting',array($this, 'source_digital_setting'));
	}

	public function source_digital_setting()
	{
		$this->call_template_file('source-digital-admin-setting');
	}

	function call_template_file($aTemplate)
	{
		ob_start();		
		include "partials/{$aTemplate}.php";		
		return ob_get_contents();		
		ob_get_clean();
	}
}
