<?php
class Source_Digital_i18n {

	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'source-digital',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
