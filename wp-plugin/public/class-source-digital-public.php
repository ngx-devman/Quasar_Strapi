<?php

/**
 * The public-facing functionality of the plugin.
 */
class Source_Digital_Public {


	private $plugin_name;

	private $version;

	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	public function enqueue_styles() {


		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/source-digital-public.css', array(), $this->version, 'all' );

	}

	public function enqueue_scripts() {


		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/source-digital-public.js', array( 'jquery' ), $this->version, false );

	}

	public function source_digital_video( $aParams )
	{
		return $this->call_template_file('source-digital-video', $aParams );
	}

	function call_template_file($aTemplate,$aParams = array())
	{
		include "partials/{$aTemplate}.php";		
		return ob_get_clean();		
	}

}
