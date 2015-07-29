<?php /* Template Name: Client Resources */ ?>
<?php get_header() ?>
<div class="section <?php echo $post->post_name ?>" id="<?php echo $post->post_name ?>" data-anchor="<?php echo $post->post_name ?>" data-title="<?php wp_title()?>"> 
 <!-- title -->
<section class="page-title white">
	<div class="vcenter">
<div><h1 class="underline"><?php echo $post->post_title ?></h1><?php /* <h2 class="underline"><?php echo get_field('sub_heading',$post->ID) ?></h2> */ ?></div>
</div>
</section> 
<!-- /title -->
<?php
list($src,$w,$h) = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID),'page-letterbox-image');
//$src = getRetinaSrc($src);
?>
<!-- banner -->
<section class="banner" style="background-image:url('<?php echo $src ?>');">
  
</section>   
<!-- /banner -->


    <!-- content -->
<section class="content blue">
    <div class="column-wrap">
    <?php
if(get_field('resource_links',$post->ID)):
while(the_repeater_field('resource_links',$post->ID)): 
?>
<div class="column">
    <a href="<?php echo get_sub_field('resource_url') ?>" target="_blank" class="inner">
    	<div class="vcenter">
<h3><?php echo get_sub_field('resource_title') ?></h3>
<p><?php echo get_sub_field('resource_text') ?></p>
 
    <p><span class="button"><?php echo do_shortcode(get_sub_field('resource_button_label')) ?></span></p>
</div>
</a>
</div>
<?php endwhile; ?>
<?php endif; ?>
</div></section>
<!-- /content -->


</div>
<?php get_footer() ?>