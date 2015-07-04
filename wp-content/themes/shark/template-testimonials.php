<?php /* Template Name: Testimonials */ ?>
<?php get_header() ?>
<div class="section page" id="<?php echo $post->post_name ?>" data-anchor="<?php echo $post->post_name ?>" data-title="<?php wp_title()?>">
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
      'number' => 6
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
     <li><a href="<?php echo get_permalink($client->ID) ?>" class="push-link"><div class="logo"><img src="<?php echo $src ?>" alt="<?php echo $client->name ?>" /></div></a></li>
 <?php endforeach ?>
</ul>
<!-- /featured work -->
<div id="testimonial-slider">
<!--slide-->
<div class="slick-slide">
  <div class="vcenter">
<header id="logo">Logo here</header>
<blockquote>
<p>&quote;There have been no issues with the quality of the printed piece in the entire time of working with Waddington &amp; Ledger. They set the standards on quality customer service. They perform on a level not seen from other suppliers of this type.&quote;</p>
<footer>Helen Diamand, Marketing Services Manager</footer>
</blockquote>
</div>
</div>
<!--/slide-->
<!--slide-->
<div class="slick-slide">
  <div class="vcenter">
<header id="logo">Logo here</header>
<blockquote>
<p>&quote;There have been no issues with the quality of the printed piece in the entire time of working with Waddington &amp; Ledger. They set the standards on quality customer service. They perform on a level not seen from other suppliers of this type.&quote;</p>
<footer>Helen Diamand, Marketing Services Manager</footer>
</blockquote>
</div>
</div>
<!--/slide-->
</div>
</div>
<?php endif ?>
</div>
<?php get_footer() ?>