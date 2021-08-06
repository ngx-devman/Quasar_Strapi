<?php if(isset($aParams['id']) && $aParams['id']) { ?>
<script type="text/javascript" src="<?php echo get_option("sd_js_file"); ?>"></script>
<div
    data-sd-experience="<?php echo get_option("sd_experience"); ?>"
    data-sd-production="<?php echo $aParams['id']; ?>"
    data-sd-account="<?php echo get_option("sd_account"); ?>"
    data-sd-timeline="<?php echo get_option("sd_timeline"); ?>">	
</div>
<?php } else { ?>
Nothing to display
<?php } ?> 