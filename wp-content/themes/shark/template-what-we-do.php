<?php /* Template Name: What We Do */ ?>
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
<section class="banner">
    <?php

    if(get_field('image_grid')):
        $c=1;
while(the_repeater_field('image_grid')): 
    $class="";
    if($c>8) $class=' medium-up';
    if($c>10) $class=' medium-up large-up';
    if($c>12) $class=' medium-up large-up xlarge-up';
list($src,$w,$h) = wp_get_attachment_image_src(get_sub_field('image'), 'full');
?>
<div class="grid-square<?php echo $class ?>"><div class="inner-wrap"><img src="<?php echo $src ?>" /></div></div>

<?php
$c++;
endwhile;
endif;

?>
</section>   
<!-- /banner -->
 <!-- content -->
<section class="content blue">
    <nav id="sectors">
        <a class="close">Close</a>
        <?php
        $args = array(
        'hide_empty' => 0
        );
        if($terms = get_terms('casestudies_category',$args)): 
            $c=1;
        ?>
    <ul>
        <?php foreach($terms as $term): ?>
        <?php 
        list($src,$w,$h) = wp_get_attachment_image_src(get_field('white_icon',$term),'full');
       // $src = getRetinaSrc($src);
        ?>
        <li class="item item-<?php echo $c ?>">
<div class="handle hover"><div><img src="<?php echo $src ?>" alt="<?php echo $term->name ?>" /><h3><span><?php echo $term->name ?></span></h3><?php /*<h4 class="underline"><?php echo get_field('sub_heading',$term) ?></h4>*/ ?></div></div>
<div class="main"><p><?php echo $term->description ?></p>
<?php if($featured_cs = get_field('category_featured_case_study',$term)): ?>
<?php if($term->term_id!=7 and $term->term_id !=4): ?>
    <a href="<?php echo get_permalink($featured_cs->ID) ?>" class="case-study-btn button push-link">Read Case Study</a>
<?php else: ?>
  <a href="<?php echo home_url() ?>/#work" class="case-study-btn button">View Our Work</a>
<?php endif ?>
<?php endif ?>
</div><aside>
<?php if(get_field('category_services_rptr', $term)): ?>
    <ul>
<?php while(the_repeater_field('category_services_rptr',$term)): ?>
<li><span><?php echo get_sub_field('category_service')?></span></li>
<?php endwhile; ?>
</ul>
<?php endif ?>
</aside> 
</li>
<?php $c++; ?>
<?php endforeach; ?>
</ul>
<?php endif?>
</nav>
    </section>
    <!-- /content -->
</div>
<?php get_footer() ?>