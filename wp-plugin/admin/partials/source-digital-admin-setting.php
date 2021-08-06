<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<?php
$page_url =  admin_url( 'admin.php?page=source-digital-setting' );
if ( isset( $_POST['source_digital_nonce_field'] )  
	&& wp_verify_nonce( $_POST['source_digital_nonce_field'], 'source_digital_nonce_action' ) )
{
	if($_POST['submit'])
	{
		$aVals =  array_map( 'sanitize_text_field', wp_unslash( $_POST['val'] ) );	
	
		foreach($aVals as $aKey => $aVal)
		{
			update_option($aKey,$aVal);					
		}	
		header('location:'.$page_url);

	}
}

$aSettings = array();
$aSettings['sd_experience'] = array('name' => __( 'SD Experience', 'source-digital' ), 'type' => 'text', 
	'value' => get_option("sd_experience"));
$aSettings['sd_account'] = array('name' => __( 'SD Account', 'source-digital' ), 'type' => 'text', 
	'value' => get_option("sd_account"));
$aSettings['sd_timeline'] = array('name' => __( 'SD timeline', 'source-digital' ), 'type' => 'text', 
	'value' => get_option("sd_timeline"));
$aSettings['sd_js_file'] = array('name' => __( 'SD Js File Url', 'source-digital' ), 'type' => 'url', 
	'value' => get_option("sd_js_file"));

//echo "<pre>"; print_r($aSettings); echo "</pre>";
?>

<h1><?php echo  __( 'SD Settings', 'source-digital' ) ?></h1>
<form action="" method="post" enctype="multipart/form-data">
	<?php wp_nonce_field( 'source_digital_nonce_action', 'source_digital_nonce_field' ); ?>
	<table class="form-table">
		<tbody>	
			<?php foreach ($aSettings as $aKey => $aSetting) { ?>				
			<tr>
				<th scope="row"><?php echo __( $aSetting['name'], 'source-digital' ) ?></th>
				<td>
					<input size="60" required="" type="<?php echo $aSetting['type'] ?>" value="<?php echo $aSetting['value'] ?>" name="val[<?php echo $aKey; ?>]" /> 
				</td>
			</tr>	
			<?php } ?>		
		</tbody>
	</table>
	<p class="submit"><input type="submit" value="<?php echo __( 'Save Changes', 'source-digital' ) ?>" class="button button-primary" id="submit" name="submit"></p>
</form>