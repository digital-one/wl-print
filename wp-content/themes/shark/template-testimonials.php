<?php /* Template Name: Testimonials */ ?>
<?php get_header() ?>
<div class="section page what-clients-say" id="<?php echo $post->post_name ?>" data-anchor="<?php echo $post->post_name ?>" data-title="<?php wp_title()?>">
  <!-- title -->
<section class="page-title white">
  <div class="vcenter">
<div><h1><?php echo $post->post_title ?></h1><h2 class="underline"><?php echo get_field('sub_heading',$post->ID)?></h2></div>
</div>
</section>
<!-- /title -->
<?php
    $args = array(
      'hide_empty' => 0,
      'number' => 8
      );
      if($clients = get_terms( 'testimonial_category', $args)):
    
?>
<!-- featured work -->
<div id="testimonials">
    <ul id="testimonial-clients">
        <?php foreach($clients as $client): ?>
        <?php
            list($src,$w,$h) = wp_get_attachment_image_src(get_field('client_logo',$client),'full');
            ?>
     <li><a class="client"><div class="logo"><img src="<?php echo $src ?>" alt="<?php echo $client->name ?>" /></div></a></li>
 <?php endforeach ?>
</ul>
<!-- /featured work -->
<a class="close">Close</a>
<div id="testimonial-slider">
  <?php
    $args = array(
      'hide_empty' => 0,
      'number' => 8
      );
      if($clients = get_terms( 'testimonial_category', $args)):
        foreach($clients as $client): 
  $args = array(
    'post_type' => 'testimonial',
    'post_status' => 'publish',
    'tax_query' => array(
      array(
        'taxonomy' => 'testimonial_category',
        'field' => 'id',
        'terms' => $client->term_id
      )
    ),
    'orderby' => 'menu_order',
    'order' => 'ASC'
    );
  if($testimonials = get_posts($args)):
    foreach($testimonials as $testimonial):
       list($src,$w,$h) = wp_get_attachment_image_src(get_field('client_logo',$client),'full');
    ?>
<!--slide-->
<div class="slick-slide">
  <div class="vcenter">
<header class="logo"><img src="<?php echo $src; ?>" alt="<?php echo $client->name ?>" /></header>
<blockquote>
<p>&quot;<?php echo $testimonial->post_content ?>&quot;</p>
<footer><?php echo $testimonial->post_title ?></footer>
</blockquote>
</div>
</div>
<!--/slide-->
<?php
  endforeach;
  endif;
  endforeach;
  endif;
?>

</div>
</div>
<?php endif ?>
</div>
<?php get_footer() ?>