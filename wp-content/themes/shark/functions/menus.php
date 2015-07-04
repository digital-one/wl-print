<?php
add_theme_support('menus');

register_nav_menus( array(
		'main_nav' => __('Main Navigation')
));


add_filter('wp_nav_menu_items','main_navigation', 10, 2);

function main_navigation( $items, $args ) {

   // if( $args->theme_location == 'main_nav')  {
        
$brochure_url = get_field('brochure_file', 'option');
       $items .=  '<li><a href="'.$brochure_url.'" target="_blank"  class="download-link">Brochure</a></li>';
  //  }
    return $items;
}
?>
