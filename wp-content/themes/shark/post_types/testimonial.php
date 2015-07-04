<?php
//
// Case Studies Post Type related functions.
//

add_action('init', 'create_cpt_testimonial');
add_filter("manage_edit-testimonial_columns", "add_cpt_testimonial_columns");   
add_action("manage_testimonial_posts_custom_column",  "add_cpt_testimonial_custom_columns",10,2); 
//add_action('init', 'add_cpt_testimonial_rewrite_rules');
//add_filter('query_vars', 'add_cpt_testimonial_query_vars');

/*
add_action('admin_init', 'ci_add_cpt_gallery_meta');
add_action('save_post', 'ci_update_cpt_gallery_meta');
*/

if( !function_exists('create_cpt_testimonial') ):
function create_cpt_testimonial(){
	$labels = array(
		'name' => _x('Testimonials', 'post type general name', 'dc_theme'),
		'singular_name' => _x('Testimonial', 'post type singular name', 'br_theme'),
		'add_new' => __('New Testimonial', 'dc_theme'),
		'add_new_item' => __('Add New Testimonial', 'br_theme'),
		'edit_item' => __('Edit Testimonial', 'br_theme'),
		'new_item' => __('New Testimonial', 'br_theme'),
		'view_item' => __('View Testimonial', 'br_theme'),
		'search_items' => __('Search Testimonials', 'br_theme'),
		'not_found' =>  __('No Testimonials Found', 'br_theme'),
		'not_found_in_trash' => __('No testimonials found in the trash', 'br_theme'), 
		'parent_item_colon' => __('Parent Testimonial Item:', 'br_theme')
	);

	$args = array(
		'labels' => $labels,
		'singular_label' => __('testimonial', 'br_theme'),
		'public' => true,
		'show_ui' => true,
		'capability_type' => 'post',
		'hierarchical' => false,
		'has_archive' => true,
		'rewrite' => array('slug' => 'testimonials/archive'),
		'menu_position' => 5,
		'taxonomies' => array('testimonial-category'),
		'supports' => array('title', 'editor', 'excerpt', 'thumbnail','post-thumbnails','page-attributes')
		
	);

	register_post_type( 'testimonial' , $args );
}



add_action( 'init', 'cpt_testimonial_taxonomies');


if( !function_exists('cpt_testimonial_taxonomies') ):
function cpt_testimonial_taxonomies() {
	//
	// Create all taxonomies here.
	//
	$labels = array(
		'name' => _x( 'Testimonial Clients', 'taxonomy general name', 'dc_theme' ),
		'singular_name' => _x( 'Testimonial Client', 'taxonomy singular name', 'dc_theme' ),
		'search_items' =>  __( 'Search Testimonial Clients', 'dc_theme' ),
		'all_items' => __( 'All Testimonial Clients', 'dc_theme' ),
		'parent_item' => __( 'Parent Testimonial Clients', 'dc_theme' ),
		'parent_item_colon' => __( 'Parent Testimonial Client:', 'dc_theme' ),
		'edit_item' => __( 'Edit Testimonial Client', 'dc_theme' ), 
		'update_item' => __( 'Update Testimonial Client', 'dc_theme' ),
		'add_new_item' => __( 'Add Testimonial Client', 'dc_theme' ),
		'new_item_name' => __( 'New Client', 'dc_theme' ),
	); 	
	register_taxonomy(
		"testimonial_category", 
		"testimonial", 
		array(
			"hierarchical" => true, 
			"labels" => $labels,
			'rewrite' => array('slug' => 'testimonials/category'),
			'query_var' => true,
                        'public' => true,
                        'publicly_queryable' => true,
                        'exclude_from_search' => FALSE,
		));

}
endif;


function add_cpt_testimonial_columns($columns){
        $columns = array(
           "cb" => "<input type=\"checkbox\" />",
           "title" => "Name",
           "client" => "Client",
           "date" => "Publish Date"
        );  
	return $columns;
}

function add_cpt_testimonial_custom_columns($column,$id){
        global $post;
        switch ($column){
				 case "client":
                 $terms = get_the_terms( $id, 'testimonial_category');
                $list="";
                foreach($terms as $term):
                     if(!empty($list)) $list.=", ";
                     $list.= $term->name;
                endforeach;
                echo $list;
                break;	               
 			}
			} 

function add_cpt_testimonial_rewrite_rules(){ 

add_rewrite_rule('^testimonials/archive/yr/([^/]*)/?', 'index.php?pagename=testimonials/testimonials&yr=$matches[1]','top');

}

function add_cpt_testimonial_query_vars($public_query_vars) {
	  $public_query_vars[] = "yr";
	return $public_query_vars; 
}

endif;

?>
